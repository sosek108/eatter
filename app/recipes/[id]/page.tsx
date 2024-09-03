import Layout from '@/components/layout/layout';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Watch } from 'lucide-react';
import RecipeVariant from '@/app/recipes/[id]/components/RecipeVariant';
import { enrichVariant, sumVariants } from '@/actions/recipes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

async function getRecipe(id: number) {
  return prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      variants: {
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      },
    },
  });
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const recipe = await getRecipe(+id);

  if (!recipe) {
    return notFound();
  }
  const variants = await Promise.all(recipe.variants.map(enrichVariant));

  const summary = await sumVariants(...variants);

  return (
    <Layout>
      <div className={'grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Card className="col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>Ut culpa aute pariatur esse enim laboris eu excepteur ipsum do magna voluptate.</CardDescription>
              </CardHeader>
            </Card>
            <Tabs defaultValue="variants" className="col-span-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="variants">
                <div className="grid grid-cols-2 gap-4">
                  {variants.map((variant) => (
                    <RecipeVariant variant={variant} key={variant.id} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="summary">
                <Card className="col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="p-0">
                        <TableRow>
                          <TableHead>Ingredient</TableHead>
                          <TableHead>Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {summary.map((ingredient) => (
                          <TableRow key={ingredient.name}>
                            <TableCell className="font-medium">{ingredient.name}</TableCell>
                            <TableCell>
                              {ingredient.quantity} {ingredient.unit} ({ingredient.grams}g)
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Steps</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm" dangerouslySetInnerHTML={{ __html: recipe.steps }} />

              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Watch className={'h-5 w-5'} /> Preparation time: 15 min.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">Nutrition Facts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Glimmer Lamps x <span>2</span>
                    </span>
                    <span>$250.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Aqua Filters x <span>1</span>
                    </span>
                    <span>$49.00</span>
                  </li>
                </ul>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$299.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$25.00</span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>$329.00</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Liam Johnson</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">Same as shipping address</div>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>Liam Johnson</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">liam@acme.com</a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">+1 234 567 890</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">November 23, 2023</time>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
