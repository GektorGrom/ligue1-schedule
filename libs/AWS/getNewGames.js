import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

const today = new Date();

const getNewGames = async () => {
  const gameList = await client.scan({
    TableName: 'OL_fixtures',
    FilterExpression: '#matchTime > :expiration',
    ExpressionAttributeValues: {
      ':expiration': today.getTime(),
    },
    ExpressionAttributeNames: {
      '#matchTime': 'matchDateTime',
    },
  }).promise();
  return gameList;
};

export default getNewGames;
