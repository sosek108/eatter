'use server';

import { RecipeType } from '@/app/recipes/components/RecipesForm';
import { prisma } from '@/lib/db';
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
