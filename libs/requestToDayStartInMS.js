import { toDate } from 'date-fns-tz';

function requestToDayStartInMS(event) {
  let timeZone = 'America/New_York';
  let day;
  try {
    timeZone = event.headers['x-timezone-offset'];
    day = event.pathParameters.day;
  } catch (e) {
    day = new Date();
  }
  return toDate(day, { timeZone });
}

export default requestToDayStartInMS;
