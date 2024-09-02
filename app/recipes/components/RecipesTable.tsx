import React, { FunctionComponent } from 'react';
import { RecipeType } from './RecipesForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WithId } from '@/lib/utils';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

type Props = {
  recipes: WithId<Omit<RecipeType, 'variants'>>[];
};

const RecipesTable: FunctionComponent<Props> = ({ recipes }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          {/*<TableHead className="hidden sm:table-cell">Meal</TableHead>*/}
          {/*<TableHead className="hidden sm:table-cell">Type</TableHead>*/}
          {/*<TableHead className="hidden md:table-cell">Date</TableHead>*/}
          {/*<TableHead className="text-right">Amount</TableHead>*/}
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes.map((recipe) => (
          <TableRow key={recipe.id}>
            <TableCell>
              <Link href={`/recipes/${recipe.id}`} className={'flex items-center gap-1 hover:underline'}>
                <ExternalLink className={'h-3.5 w-3.5'} />
                <div className="font-medium">{recipe.name}</div>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default RecipesTable;
