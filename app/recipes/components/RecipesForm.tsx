'use client';
import React, { FunctionComponent, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {};

export const RecipeSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  ingredients: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
    }),
  ),
});

export type RecipeType = z.infer<typeof RecipeSchema>;

const RecipesForm: FunctionComponent<Props> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const form = useForm<RecipeType>({
    resolver: zodResolver(RecipeSchema),
  });

  const onSubmit = async (data: RecipeType) => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="ml-auto flex items-center gap-2">
        <DialogTrigger asChild>
          <Button size={'sm'} icon={PlusCircle}>
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add recipe</span>
          </Button>
        </DialogTrigger>
      </div>
      <Form {...form}>
        <DialogContent>
          <DialogTitle>Create recipe</DialogTitle>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="🐀 Ratatouille" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button>Save</Button>
              <Button variant="secondary" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default RecipesForm;
