import Layout from '@/components/layout/layout';
import Calendar from './components/Calendar';
import { getDayRecipes } from '@/actions/recipes';

export async function getData() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  const days = [];

  while (days.length < 7) {
    days.push(new Date(monday));
    monday.setDate(monday.getDate() + 1);
  }

  return {
    days,
    dayRecipes: await getDayRecipes({
      start: days[0],
      end: days[6],
    }),
  };
}

export default async function CalendarPage() {
  const data = await getData();

  console.log(data);
  return (
    <Layout>
      <Calendar days={data.days} dayRecipes={data.dayRecipes} />
    </Layout>
  );
}
