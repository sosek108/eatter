'use server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { IngredientType } from '@/app/ingredients/components/IngredientsForm';

export default async function ingredients(test: IngredientType) {
  await prisma.ingredient.create({
    data: test,
  });

  revalidatePath('/ingredients');
}
