'use client';
import React, { FunctionComponent, useEffect, useState } from 'react';
import DayColumn from '@/app/calendar/components/DayColumn';
import { Prisma } from '@prisma/client';

type Props = {
  days: Date[];
  dayRecipes: Prisma.DayRecipeGetPayload<{
    include: { variant: { include: { recipe: true } } };
  }>[];
};

const Calendar: FunctionComponent<Props> = ({ days, dayRecipes }) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      {days.map((day) => (
        <DayColumn key={day.toISOString()} date={day} dayRecipes={dayRecipes.filter((d) => d.date.toDateString() == day.toDateString())} />
      ))}
    </div>
  );
};
export default Calendar;
