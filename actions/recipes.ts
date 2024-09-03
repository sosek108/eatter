'use server';

import { RecipeType } from '@/app/recipes/components/RecipesForm';
import { prisma } from '@/lib/db';
import { Prisma, RecipeVariant } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export default async function createRecipe(recipe: RecipeType) {
  await prisma.recipe.create({
    data: {
      ...recipe,
      variants: {
        create: recipe.variants.map((variant) => ({
          variant: variant.variant,
          ingredients: {
            create: variant.ingredients.map((ingredient) => ({
              quantity: +ingredient.quantity,
              ingredientId: ingredient.ingredient,
            })),
          },
        })),
      },
    },
  });

  revalidatePath('/recipes');
}

export type EnrichedRecipeVariantIngredient = {
  name: string;
  unit: string;
  quantity: number;
  grams: number;
};

export type EnrichedRecipeVariant = {
  ingredients: EnrichedRecipeVariantIngredient[];
} & RecipeVariant;

export async function enrichVariant(
  variant: Prisma.RecipeVariantGetPayload<{
    include: {
      ingredients: {
        include: { ingredient: true };
      };
    };
  }>,
): Promise<EnrichedRecipeVariant> {
  return {
    ...variant,
    ingredients: variant.ingredients.map((i) => ({
      name: i.ingredient.name,
      unit: i.ingredient.unit,
      quantity: i.quantity,
      grams: i.ingredient.gramsPerUnit * i.quantity,
    })),
  };
}

export type IngredientsSummaryType = {
  name: string;
  unit: string;
  quantity: number;
  grams: number;
  parts: EnrichedRecipeVariantIngredient[];
};

export async function sumVariants(...variants: EnrichedRecipeVariant[]) {
  const ingredients: IngredientsSummaryType[] = [];

  variants.forEach((variant) => {
    variant.ingredients.forEach((ingredient: any) => {
      const existing = ingredients.find((i) => i.name === ingredient.name);
      if (existing) {
        existing.quantity += ingredient.quantity;
        existing.grams += ingredient.grams;
        existing.parts.push(ingredient);
      } else {
        ingredients.push({ ...ingredient, parts: [ingredient] });
      }
    });
  });

  return ingredients;
}
