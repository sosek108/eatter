'use server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { IngredientType } from '@/app/ingredients/components/IngredientsForm';

export default async function createIngredient(test: IngredientType) {
  await prisma.ingredient.create({
    data: test,
  });

  revalidatePath('/ingredients');
}

export async function searchIngredients(search: string): Promise<IngredientType[]> {
  return prisma.ingredient.findMany({
    where: {
      name: {
        contains: search,
      },
    },
  });
}
