'use client';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import saveIngredient from '@/actions/ingredients';
import { PlusCircle } from 'lucide-react';

type Props = {};

export const IngredientSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  gramsPerUnit: z.number().min(1, { message: 'Grams per unit is required' }),
});

export type IngredientType = z.infer<typeof IngredientSchema>;

const IngredientsForm: FunctionComponent<Props> = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<IngredientType>({
    resolver: zodResolver(IngredientSchema),
  });

  const onSubmit = async (data: IngredientType) => {
    await saveIngredient(data).then(() => {
      setDialogOpen(false);
    });
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="ml-auto flex items-center gap-2">
        <DialogTrigger asChild>
          <Button size={'sm'} icon={PlusCircle}>
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add ingredient</span>
          </Button>
        </DialogTrigger>
      </div>
      <Form {...form}>
        <DialogContent>
          <DialogTitle>Create ingredient</DialogTitle>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="🥕 Carrot" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'flex space-x-4'}>
              <FormField
                control={form.control}
                name={'gramsPerUnit'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grams per unit</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="69" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'unit'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scoop">Scoop</SelectItem>
                        <SelectItem value="tablespoon">Tablespoon</SelectItem>
                        <SelectItem value="babyspoon">Babyspoon</SelectItem>
                        <SelectItem value="glass">Glass</SelectItem>
                        <SelectItem value="grams">Grams</SelectItem>
                        <SelectItem value="can">Can</SelectItem>
                        <SelectItem value="piece">Pieces</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default IngredientsForm;
