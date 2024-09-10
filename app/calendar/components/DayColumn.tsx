import React, { FunctionComponent, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Meal from './Meal';
import { MealEnum } from '@/lib/dicts';
import { Prisma } from '@prisma/client';

type Props = {
  date: Date;
  dayRecipes: Prisma.DayRecipeGetPayload<{
    include: { variant: { include: { recipe: true } } };
  }>[];
};

const DayColumn: FunctionComponent<Props> = ({ date, dayRecipes }) => {
  const [today] = useState(new Date());

  return (
    <Card className={cn('mb-10 w-full border-none shadow-none')}>
      <CardHeader className={cn('sticky top-16 z-auto m-0 bg-background p-0 pb-6 pt-2', today.getDay() == date.getDay() ? 'text-primary' : '')}>
        <CardTitle>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)}</CardTitle>
        <CardDescription>{date.toDateString()}</CardDescription>
      </CardHeader>

      <CardContent className="m-0 space-y-4 p-0">
        <Meal date={date} meal={MealEnum.BREAKFAST} dayRecipes={dayRecipes.filter((r) => r.meal == MealEnum.BREAKFAST)} />
        <Meal date={date} meal={MealEnum.SECOND_BREAKFAST} dayRecipes={dayRecipes.filter((r) => r.meal == MealEnum.SECOND_BREAKFAST)} />
        <Meal date={date} meal={MealEnum.LUNCH} dayRecipes={dayRecipes.filter((r) => r.meal == MealEnum.LUNCH)} />
        <Meal date={date} meal={MealEnum.DINNER} dayRecipes={dayRecipes.filter((r) => r.meal == MealEnum.DINNER)} />
      </CardContent>
    </Card>
  );
};
export default DayColumn;
