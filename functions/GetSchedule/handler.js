import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import requestToDayStartInMS from '../../libs/requestToDayStartInMS';

import getSchedule from '../../libs/AWS/getSchedule';

async function schedule(event) {
  const response = await getSchedule(requestToDayStartInMS(event));
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

const handler = middy(schedule)
  .use(cors())
  .use(httpErrorHandler());
module.exports.schedule = handler;
