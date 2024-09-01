import Layout from '@/components/layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import IngredientsForm from '@/app/ingredients/components/IngredientsForm';
import { prisma } from '@/lib/db';
import IngredientsTable from '@/app/ingredients/components/IngredientsTable';

export default async function IngredientsPage() {
  const ingredients = await prisma.ingredient.findMany();

  return (
    <Layout>
      <IngredientsForm />
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
          <CardDescription>Add a little bit of hug</CardDescription>
        </CardHeader>
        <CardContent>
          <IngredientsTable ingredients={ingredients} />
        </CardContent>
      </Card>
    </Layout>
  );
}
