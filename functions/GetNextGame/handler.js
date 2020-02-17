import gamesList from '../../libs/Response/GamesLIst';
import getNextGame from '../../libs/Response/NextGame';

module.exports.luckyNumber = async (event, context, callback) => {
  let intent;
  console.log(JSON.stringify(event.request));
  if (event.request && event.request.intent) {
    // eslint-disable-next-line prefer-destructuring
    intent = event.request.intent;
  }
  if (intent && intent.name === 'searchGame') {
    let text = 'Can not find opponent team';
    if (intent.slots && intent.slots.Team && intent.slots.Team.value) {
      text = intent.slots.Team.value;
      console.log(intent.slots.Team.resolutions);
    }
    const tempResponse = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text,
        },
        shouldEndSession: true,
      },
    };
    callback(null, tempResponse);
    return;
  }
  let response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Hello there. French football support 2 requests for now. First is next game, Second one is Be In Sport matches for specific day',
      },
      shouldEndSession: true,
    },
  };
  if (intent) {
    if (intent.name === 'NextGame') {
      response = await getNextGame();
    }
    if (intent.name === 'BeinSportGames' && intent.slots['AMAZON.DATE'].value) {
      response = await gamesList(intent.slots['AMAZON.DATE'].value);
    }
  }


  callback(null, response);
};
