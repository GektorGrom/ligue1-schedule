import { DateTime } from 'luxon';
import Speech from 'ssml-builder';

import getSchedule from '../AWS/getSchedule';

const gamesList = async (date) => {
  const speech = new Speech();
  let type = 'PlainText';
  let ssml;
  let text = 'No games for this date';
  const games = await getSchedule(DateTime.fromISO(date, { zone: 'America/Edmonton' }).startOf('day'));
  if (games && Array.isArray(games.Items)) {
    const sortedGames = games.Items.filter(el => el.isLive === 'true').sort((a, b) => a.start - b.start);
    if (sortedGames.length > 0) {
      type = 'SSML';
      console.log(sortedGames);
      sortedGames.forEach((game) => {
        speech
          .say(`At ${DateTime.fromMillis(game.start, {
            zone: 'America/Edmonton',
          }).toLocaleString(DateTime.TIME_SIMPLE)}`)
          .say(`${game.title} will playing`)
          .pause('1s');
      });
      ssml = speech.ssml();
    } else {
      text = `BeIn sport does not have Ligue 1 matches for ${date}`;
    }
  }
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

export default gamesList;
