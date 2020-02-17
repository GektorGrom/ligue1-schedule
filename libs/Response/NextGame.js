import { DateTime } from 'luxon';
import prettyMs from 'pretty-ms';
import Speech from 'ssml-builder';
import getNewGames from '../AWS/getNewGames';
import getSchedule from '../AWS/getSchedule';

const getNextGame = async () => {
  const speech = new Speech();
  const games = await getNewGames();
  const sortedGames = games.Items.sort((a, b) => a.matchDateTime - b.matchDateTime);
  // console.log(games);
  let type = 'PlainText';
  const text = 'Hard to say';
  let ssml;
  if (Array.isArray(sortedGames)) {
    type = 'SSML';
    const [nextGame] = sortedGames;
    const timeDiffyar = nextGame.matchDateTime - new Date().getTime();
    const date = DateTime.fromString(nextGame.date, 'LLL d, y, h:mm a');
    const getStream = await getSchedule(date.startOf('day'));
    const beInStream =
      getStream.Count > 0
        ? getStream.Items.filter(({ title }) => title.includes('Lyonnais'))
        : null;
    speech
      .say('Next game in')
      .pause('500ms')
      .sayAs({
        word: prettyMs(timeDiffyar, { verbose: true, secDecimalDigits: 0 }),
        interpret: 'time',
      })
      .pause('1s')
      .say(nextGame.match
        .replace('OL', 'Olympique Lyonnais')
        .replace('-', 'against'))
      .say('at')
      .sayAs({
        word: date.toLocaleString(),
        interpret: 'date',
        format: 'mdy',
      })
      .sayAs({
        word: date.toLocaleString(DateTime.TIME_SIMPLE),
        interpret: 'time',
      });
    if (beInStream && beInStream.length > 0) {
      speech
        .pause('1s')
        .say(`You can watch a game at ${beInStream[0].chanel}`)
        .pause('0.3s')
        .say('And stream will be');
      if (beInStream[0].isLive) {
        speech
          .phoneme('ipa', 'laɪv', 'live');
      } else {
        speech
          .say('recorded');
      }
    }
    ssml = speech.ssml();
  }
  console.log(ssml);
  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type,
        text,
        ssml,
      },
      shouldEndSession: true,
    },
  };
};

export default getNextGame;
