import AWS from 'aws-sdk';
import { addDays, startOfDay, format } from 'date-fns';

const client = new AWS.DynamoDB.DocumentClient();

const getSchedule = async (startDate = startOfDay(new Date())) => client
  .scan({
    TableName: 'BeIN_schedule',
    FilterExpression: '#startTime > :startDay AND #endTime < :endDay',
    ExpressionAttributeNames: {
      '#startTime': 'start',
      '#endTime': 'start',
    },
    ExpressionAttributeValues: {
      ':startDay': +format(startDate, 'T'),
      ':endDay': +format(addDays(startDate, 1), 'T'),
    },
  })
  .promise().then(({ Items }) => Items.sort((a, b) => a.start - b.start));

export default getSchedule;
