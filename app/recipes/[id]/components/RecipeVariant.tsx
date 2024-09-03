import React, { FunctionComponent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { translateVariant } from '@/lib/dicts';
import { EnrichedRecipeVariant } from '@/actions/recipes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Props = {
  variant: EnrichedRecipeVariant;
};

const RecipeVariant: FunctionComponent<Props> = ({ variant }) => {
  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle>{translateVariant(variant.variant)}</CardTitle>
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
            {variant.ingredients.map((ingredient) => (
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
  );
};
export default RecipeVariant;
