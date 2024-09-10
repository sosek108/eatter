import { MealEnum, translateMeal, translateVariant, VariantEnum } from '@/lib/dicts';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Prisma, Recipe } from '@prisma/client';
import { Check, ChevronsUpDown, Edit, ExternalLink, ListTodo, Plus, Replace, UserPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRecipes, saveDayMultipleVariants } from '@/actions/recipes';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

type Props = {
  meal: MealEnum;
  date: Date;
  dayRecipes: Prisma.DayRecipeGetPayload<{
    include: { variant: { include: { recipe: true } } };
  }>[];
};

export const DayRecipeSchema = z.object({
  meal: z.string(),
  date: z.date(),
  variants: z.array(z.string()).min(1, { message: 'At least one variant is required' }),
  recipe: z.number().optional(),
  secondRecipe: z.number().optional(),
  secondVariants: z.array(z.string()).optional(),
});

export type DayRecipeType = z.infer<typeof DayRecipeSchema>;

type DayMealRepresentation = {
  id: number;
  recipe: Recipe;
  variants: string[];
};

const Meal: FunctionComponent<Props> = ({ meal, date, dayRecipes }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recipes, setRecipes] = useState<Prisma.RecipeGetPayload<{ include: { variants: true } }>[]>([]);
  const form = useForm<DayRecipeType>({
    resolver: zodResolver(DayRecipeSchema),
    defaultValues: {
      meal,
      date,
      recipe: dayRecipes[0]?.variant.recipe.id,
      variants: dayRecipes.filter((r) => r.variant.recipe.id === dayRecipes[0]?.variant.recipe.id).map((v) => `${v.variant.id}`),
      secondRecipe: dayRecipes.find((r) => r.variant.recipe.id !== dayRecipes[0]?.variant.recipe.id)?.variant.recipe.id,
      secondVariants: dayRecipes.filter((r) => r.variant.recipe.id !== dayRecipes[0]?.variant.recipe.id).map((v) => `${v.variant.id}`),
    },
  });
  const selectedRecipeId = form.watch('recipe');
  const selectedSecondRecipeId = form.watch('secondRecipe');
  const selectedVariants = form.watch('variants');
  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId);
  const selectedSecondRecipe = recipes.find((r) => r.id === selectedSecondRecipeId);

  const fetchRecipes = async (search: string) => {
    await getRecipes(search).then((recipes) => {
      setRecipes(recipes ?? []);
    });
  };

  const onSubmit = async (data: DayRecipeType) => {
    console.log('morwa data', data);
    await saveDayMultipleVariants({
      ...data,
      variants: [...data.variants, ...(data.secondVariants ?? [])],
    }).then(() => {
      setDialogOpen(false);
    });
  };

  useEffect(() => {
    void fetchRecipes('');
  }, []);

  useEffect(() => {
    if (selectedRecipeId) {
      const recipe = recipes.find((r) => r.id === selectedRecipeId);
      if (recipe) {
        form.setValue(
          'variants',
          recipe.variants.map((v) => `${v.id}`),
        );
      }
    }
  }, [selectedRecipeId]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex items-center justify-between font-semibold">
        {translateMeal(meal)}
        {dayRecipes.length > 0 && (
          <DialogTrigger asChild>
            <Button size={'icon'} className="h-3" icon={Edit} variant={'ghost'}></Button>
          </DialogTrigger>
        )}
      </div>
      {dayRecipes.length ? (
        <>
          {dayRecipes
            .reduce((acc, next): DayMealRepresentation[] => {
              const existing = acc.find((el) => el.recipe.id === next.variant.recipe.id);
              if (existing) {
                existing.variants.push(next.variant.variant);
              } else {
                acc.push({ id: next.id, recipe: next.variant.recipe, variants: [next.variant.variant] });
              }
              return acc;
            }, [] as DayMealRepresentation[])
            .map((dayMeal: any) => (
              <Card className="group p-0" key={dayMeal.id}>
                <CardContent className="px-3 py-3 text-sm font-semibold">
                  <div className="pb-2">{dayMeal.variants.map((v: VariantEnum) => translateVariant(v, true))}</div>
                  {dayMeal.recipe.name}
                </CardContent>
                <CardFooter className="flex justify-between px-3">
                  <div className="flex gap-2">
                    <Button
                      className="h-8 w-8 transition-opacity group-hover:visible group-hover:opacity-100 sm:invisible sm:opacity-0"
                      variant="outline"
                      size="icon"
                      icon={Replace}
                    />
                    <Button
                      className="h-8 w-8 transition-opacity group-hover:visible group-hover:opacity-100 sm:invisible sm:opacity-0"
                      variant="outline"
                      size="icon"
                      icon={ExternalLink}
                    />
                    <Button
                      className="h-8 w-8 transition-opacity group-hover:visible group-hover:opacity-100 sm:invisible sm:opacity-0"
                      variant="outline"
                      size="icon"
                      icon={UserPen}
                    />
                    <Button
                      className="h-8 w-8 transition-opacity group-hover:visible group-hover:opacity-100 sm:invisible sm:opacity-0"
                      variant="outline"
                      size="icon"
                      icon={ListTodo}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
        </>
      ) : (
        <DialogTrigger asChild>
          <Button className="w-full text-muted-foreground" icon={Plus} variant={'outline'} size={'sm'}>
            {translateMeal(meal)}
          </Button>
        </DialogTrigger>
      )}
      <Form {...form}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogTitle>{translateMeal(meal)}</DialogTitle>
          <DialogDescription>{date.toDateString()}</DialogDescription>
          <form onSubmit={form.handleSubmit(onSubmit, (r) => console.log('morwa error', r))} className={'space-y-4'}>
            <FormField
              control={form.control}
              name="recipe"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('d w-full min-w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? recipes.find((el) => el.id === field.value)?.name : 'Select recipe'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search ingredient..." />
                        <CommandList>
                          <CommandEmpty>No recipe found.</CommandEmpty>
                          <CommandGroup>
                            {recipes.map((recipe) => (
                              <CommandItem
                                value={`${recipe.id}`}
                                key={recipe.id}
                                onSelect={() => {
                                  form.setValue('recipe', recipe.id);
                                }}
                              >
                                <Check className={cn('mr-2 h-4 w-4', recipe.id === field.value ? 'opacity-100' : 'opacity-0')} />
                                {recipe.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {recipes && selectedRecipe && (
              <FormField
                key={selectedRecipeId}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <ToggleGroup value={field.value} type="multiple" className={'justify-start'} onValueChange={field.onChange}>
                      {selectedRecipe.variants.map((variant) => (
                        <ToggleGroupItem variant={'outline'} key={variant.id} value={`${variant.id}`}>
                          {translateVariant(variant.variant, true)}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                    <FormMessage />
                  </FormItem>
                )}
                name={'variants'}
              />
            )}
            {selectedRecipe && selectedVariants?.length <= 1 && (
              <>
                <FormField
                  control={form.control}
                  name="secondRecipe"
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn('d w-full min-w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                            >
                              {field.value ? recipes.find((el) => el.id === field.value)?.name : 'Select recipe'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search ingredient..." />
                            <CommandList>
                              <CommandEmpty>No recipe found.</CommandEmpty>
                              <CommandGroup>
                                {recipes.map((recipe) => (
                                  <CommandItem
                                    value={`${recipe.id}`}
                                    key={recipe.id}
                                    onSelect={() => {
                                      form.setValue('secondRecipe', recipe.id);
                                    }}
                                  >
                                    <Check className={cn('mr-2 h-4 w-4', recipe.id === field.value ? 'opacity-100' : 'opacity-0')} />
                                    {recipe.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedSecondRecipe && (
                  <FormField
                    key={selectedRecipeId}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <ToggleGroup value={field.value} type="multiple" className={'justify-start'} onValueChange={field.onChange}>
                          {selectedSecondRecipe.variants.map((variant) => (
                            <ToggleGroupItem variant={'outline'} key={variant.id} value={`${variant.id}`}>
                              {translateVariant(variant.variant, true)}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                    name={'secondVariants'}
                  />
                )}
              </>
            )}
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
export default Meal;
