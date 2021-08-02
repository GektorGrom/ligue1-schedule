import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import requestToDayStartInMS from '../../libs/requestToDayStartInMS';

import getSchedule from '../../libs/AWS/getSchedule';

async function schedule(event) {
  console.log(event.headers);
  const response = await getSchedule(requestToDayStartInMS(event));
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

const handler = middy(schedule)
  .use(httpErrorHandler());

module.exports.schedule = handler;
