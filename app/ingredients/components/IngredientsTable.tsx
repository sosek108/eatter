import React, { FunctionComponent } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IngredientType } from '@/app/ingredients/components/IngredientsForm';

type Props = {
  ingredients: IngredientType[];
};

const IngredientsTable: FunctionComponent<Props> = ({ ingredients }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Grams</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient, idx) => (
          <TableRow key={idx}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>
              {ingredient.gramsPerUnit} / {ingredient.unit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IngredientsTable;
