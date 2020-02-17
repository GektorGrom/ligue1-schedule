import AWS from 'aws-sdk';
import { addDays, startOfDay, format } from 'date-fns';

const client = new AWS.DynamoDB.DocumentClient();

const getSchedule = async (startDate = startOfDay(new Date())) => client
  .scan({
    TableName: 'BeIN_schedule',
    FilterExpression: '#startTime > :expiration AND #endTime < :stopTime',
    ExpressionAttributeNames: {
      '#startTime': 'start',
      '#endTime': 'start',
    },
    ExpressionAttributeValues: {
      ':expiration': +format(startDate, 'T'),
      ':stopTime': +format(addDays(startDate, 1), 'T'),
    },
  })
  .promise().then(({ Items }) => Items);

export default getSchedule;
