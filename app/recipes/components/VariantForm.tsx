'use client';
import React, { FunctionComponent } from 'react';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn, WithId } from '@/lib/utils';
import { Check, ChevronsUpDown, PlusCircle, Trash } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { searchIngredients } from '@/actions/createIngredient';
import { IngredientType } from '@/app/ingredients/components/IngredientsForm';

type Props = {
  variantName: string;
  index: number;
};

const VariantForm: FunctionComponent<Props> = ({ variantName, index, ...props }) => {
  const prefix = `variants.${index}`;
  const form = useFormContext();
  const { remove, append, fields } = useFieldArray({
    control: form.control,
    name: `${prefix}.ingredients`,
    keyName: '_id',
  });
  const [ingredients, setIngredients] = React.useState<WithId<IngredientType>[]>([]);
  React.useEffect(() => {
    doSearchIngredients('').then((ingredients) => {
      setIngredients(ingredients as WithId<IngredientType>[]);
    });
  }, []);
  const doSearchIngredients = async (search: string) => {
    return await searchIngredients(search);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field._id} className={'flex flex-col gap-1 p-1 sm:flex-row'}>
          <FormField
            control={form.control}
            name={`${prefix}.ingredients.${index}.ingredient`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredient</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn('d w-full min-w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? ingredients.find((ingredient) => ingredient.id === field.value)?.name : 'Select ingredient'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search ingredient..." />
                      <CommandList>
                        <CommandEmpty>No ingredient found.</CommandEmpty>
                        <CommandGroup>
                          {ingredients.map((ingredient) => (
                            <CommandItem
                              value={`${ingredient.id}`}
                              key={ingredient.id}
                              onSelect={() => {
                                form.setValue(`${prefix}.ingredients.${index}.ingredient`, ingredient.id);
                              }}
                            >
                              <Check className={cn('mr-2 h-4 w-4', ingredient.id === field.value ? 'opacity-100' : 'opacity-0')} />
                              {ingredient.name}
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
          <FormField
            control={form.control}
            name={`${prefix}.ingredients.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder={'Quantity'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button icon={Trash} variant={'outline'} size={'sm'} className={'mt-6 border-none'} onClick={() => remove(index)} />
        </div>
      ))}
      <div className={'mt-4 flex justify-end gap-2'}>
        <Button
          size={'sm'}
          type={'button'}
          icon={PlusCircle}
          variant={'outline'}
          onClick={() => {
            append({ ingredient: undefined, quantity: '1' });
          }}
        >
          Add ingredient
        </Button>
      </div>
      <input type={'hidden'} {...form.register('variant')} />
    </div>
  );
};

export default VariantForm;
