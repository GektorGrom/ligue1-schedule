import { format } from 'date-fns';

import requestToDayStartInMS from './requestToDayStartInMS';

test('TZ_parser', () => {
  expect(
    format(requestToDayStartInMS({
      version: 2,
      path: '/dev/ligue1/schedule/2020-02-16',
      httpMethod: 'GET',
      headers: {
        'X-Timezone-IANA': 'America/Edmonton',
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: { day: '2020-02-16' },
    }), 'T'),
  ).toBe('1581836400000');
  expect(
    format(requestToDayStartInMS({
      version: 2,
      path: '/dev/ligue1/schedule/2020-02-16',
      httpMethod: 'GET',
      headers: {
        'X-Timezone-IANA': 'America/New_York',
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: { day: '2020-02-16' },
    }), 'T'),
  ).toBe('1581829200000');
});
