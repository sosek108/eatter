import Layout from '@/components/layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RecipesForm from '@/app/recipes/components/RecipesForm';
import { prisma } from '@/lib/db';
import RecipesTable from './components/RecipesTable';

async function getData() {
  return prisma.recipe.findMany();
}

export default async function RecipesPage() {
  const recipes = await getData();
  return (
    <Layout>
      <RecipesForm />
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Recipes</CardTitle>
          <CardDescription>Recipe for otters&#39; love 💖</CardDescription>
        </CardHeader>
        <CardContent>
          <RecipesTable recipes={recipes} />
        </CardContent>
      </Card>
    </Layout>
  );
}
