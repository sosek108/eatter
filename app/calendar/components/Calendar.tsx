'use client';
import React, { FunctionComponent, useEffect, useState } from 'react';
import DayColumn from '@/app/calendar/components/DayColumn';

type Props = {};

const Calendar: FunctionComponent<Props> = (props) => {
  const [days, setDays] = useState<Date[]>([]);

  useEffect(() => {
    let today = new Date();
    let monday = new Date(today);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    let result = [];

    while (result.length < 7) {
      result.push(new Date(monday));
      monday.setDate(monday.getDate() + 1);
    }

    setDays(result);
  }, []);
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      {days.map((day) => (
        <DayColumn key={day.toISOString()} date={day} />
      ))}
    </div>
  );
};
export default Calendar;
