'use client';
import React, { FunctionComponent, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RichText from '@/components/ui/rich-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import VariantForm from './VariantForm';
import createRecipe from '@/actions/recipes';
import { translateVariant, VariantEnum } from '@/lib/dicts';

type Props = {};

export const RecipeSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  steps: z.string().min(1, { message: 'Steps are required' }),
  variants: z.array(
    z.object({
      ingredients: z.array(
        z.object({
          ingredient: z.number().min(1, { message: 'Ingredient is required' }),
          quantity: z.string().min(1, { message: 'Quantity is required' }),
        }),
      ),
      variant: z.string().min(1, { message: 'Variant is required' }),
    }),
  ),
});

export type RecipeType = z.infer<typeof RecipeSchema>;

const RecipesForm: FunctionComponent<Props> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<RecipeType>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      steps: '<ul><li>🥕 Peel the carrots</li><li>🥔 Peel the potatoes</li></ul>',
      variants: [
        {
          ingredients: [
            {
              ingredient: undefined,
              quantity: '1',
            },
          ],

          variant: VariantEnum.HUBERT,
        },
        {
          ingredients: [
            {
              ingredient: undefined,
              quantity: '1',
            },
          ],
          variant: VariantEnum.MARTA,
        },
      ],
    },
  });

  const onSubmit = async (data: RecipeType) => {
    await createRecipe(data).then(() => {
      // setDialogOpen(false);
    });
  };

  const cloneVariant = (from: number, to: number) => {};

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
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogTitle>Create recipe</DialogTitle>
          <DialogDescription>Insert data for new recipe</DialogDescription>
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

            <Accordion className={'space-y-2'} type={'multiple'} defaultValue={[VariantEnum.HUBERT, VariantEnum.MARTA]}>
              <AccordionItem className={'rounded-md border px-3'} value={VariantEnum.HUBERT}>
                <AccordionTrigger>{translateVariant(VariantEnum.HUBERT)}</AccordionTrigger>
                <AccordionContent>
                  <VariantForm index={0} variantName={VariantEnum.HUBERT} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className={'rounded-md border px-3'} value={VariantEnum.MARTA}>
                <AccordionTrigger>{translateVariant(VariantEnum.MARTA)}</AccordionTrigger>
                <AccordionContent>
                  <VariantForm index={1} variantName={VariantEnum.MARTA} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <FormField
              control={form.control}
              name={'steps'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steps</FormLabel>
                  <FormControl>
                    <RichText value={field.value} onChange={field.onChange} />
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
