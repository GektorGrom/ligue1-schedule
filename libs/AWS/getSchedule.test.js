import getSchedule from './getSchedule';

test('dynamo-index', async () => {
  const x = await getSchedule();
  console.log(x);
  return {};
});
