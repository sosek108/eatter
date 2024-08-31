'use client';
import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {};

const IngredientsFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  unit: z.string().min(1, { message: 'Unit is required' }),
  gramsPerUnit: z.number().min(1, { message: 'Grams per unit is required' }),
});

const IngredientsForm: FunctionComponent<Props> = (props) => {
  const form = useForm<z.infer<typeof IngredientsFormSchema>>({
    resolver: zodResolver(IngredientsFormSchema),
  });

  const onSubmit = () => {};
  return (
    <Form {...form}>
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
          <Button variant="secondary" type="button">
            Cancel
          </Button>
          <Button>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default IngredientsForm;
