import getSchedule from './getSchedule';

test('dynamo-index', async () => {
  const x = await getSchedule(new Date('2021-08-06'));
  console.log(x);
  return {};
});
