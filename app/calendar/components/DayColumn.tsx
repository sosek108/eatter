import React, { FunctionComponent, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ListTodo, Plus, RefreshCcw, Replace, UserPen } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  date: Date;
};

const DayColumn: FunctionComponent<Props> = ({ date }) => {
  const [today] = useState(new Date());

  return (
    <Card className={cn('mb-10 w-full border-none shadow-none')}>
      <CardHeader className={cn('m-0 p-0 pb-6', today.getDay() == date.getDay() ? 'text-primary' : '')}>
        <CardTitle>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)}</CardTitle>
        <CardDescription>{date.toDateString()}</CardDescription>
      </CardHeader>

      <CardContent className="m-0 space-y-4 p-0">
        <div className="font-semibold">Breakfast</div>
        <Card className="group p-0">
          <CardContent className="px-3 py-3 text-sm font-semibold">
            <div className="pb-2">🦄 🐴</div>
            Owsianka na mleku kakaowym
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
        <div className="font-semibold">Second breakfast</div>
        <Button className="w-full text-muted-foreground" icon={Plus} variant={'outline'} size={'sm'}>
          Second breakfast
        </Button>
        <div className="font-semibold">Lunch</div>
        <Button className="w-full text-muted-foreground" icon={Plus} variant={'outline'} size={'sm'}>
          Lunch
        </Button>
        <div className="font-semibold">Dinner</div>
        <Button className="w-full text-muted-foreground" icon={Plus} variant={'outline'} size={'sm'}>
          Dinner
        </Button>
      </CardContent>
    </Card>
  );
};
export default DayColumn;
