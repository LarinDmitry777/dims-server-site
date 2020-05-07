import fs from 'fs';
import { StatisticCardColor, StatisticCardProps, StatisticPersist } from '../@types/statisticTypes';
import { getString } from './strings';
import { getImage } from './imagesPaths';

// Временное решение, пока не будет совершен переход на микросервисы
const filePath = './../../serverPaper/scriptcraft/data/statistic-store.json';
let lastStatisticUpdateTime: number;
let statistics: StatisticPersist;

const baseStatisticLines = [
  'joinCount',
  'chatMessagesCount',
  'playerDeathCount',
  'blockBreaksCount',
  'placedBlocksCount',
  'entitiesKillsCount',
  'breedAnimalsCount',
  'extractFurnaceCount',
  'fishingCount',
  'enchantItemsCount',
  'uniquePlayersCount',
];

const baseStatisticHrefs = {
  entitiesKillsCount: 'killedEntities',
  blockBreaksCount: 'blockBreaks',
  breedAnimalsCount: 'breed',
  placedBlocksCount: 'placedBlocks',
  playerDeathCount: 'deaths',
  chatMessagesCount: 'chatMessages',
  extractFurnaceCount: 'furnaceExtract',
  fishingCount: 'fishing',
  enchantItemsCount: 'enchant',
  joinCount: 'serverJoin',
  uniquePlayersCount: 'uniquePlayers',
};

function getStatisticObject(): StatisticPersist {
  const statisticUpdateTimeMillis = 60 * 1000;
  if (lastStatisticUpdateTime === undefined
        || lastStatisticUpdateTime + statisticUpdateTimeMillis < Date.now()) {
    const statisticFileText = fs.readFileSync(filePath).toString();
    statistics = JSON.parse(statisticFileText);
  }

  return statistics;
}

export function getBaseStatistic(): StatisticCardProps[] {
  const statistic = getStatisticObject();

  return baseStatisticLines.map((line) => {
    const cardObject: StatisticCardProps = {
      imagePath: getImage(line),
      text: getString(line),
      value: statistic[line],
    };
    if (baseStatisticHrefs[line] !== undefined) {
      cardObject.href = baseStatisticHrefs[line];
    }

    return cardObject;
  });
}

export function getTopPlayers(numericStatName: string): StatisticCardProps[] {
  const stat = getStatisticObject();
  const staticCards: StatisticCardProps[] = [];
  Object.keys(stat.players).forEach((player) => {
    staticCards.push({
      imagePath: 'images/icons/steve.png',
      text: `${player}`,
      value: stat.players[player][numericStatName],
    });
  });
  staticCards.sort((a, b) => b.value - a.value);
  const result = staticCards.slice(0, 3);

  result[0].color = StatisticCardColor.gold;
  result[1].color = StatisticCardColor.silver;
  result[2].color = StatisticCardColor.bronze;

  result[0].text = `👑 ${result[0].text} 👑`;

  return result;
}

export function getStatisticCards(groupName: string): StatisticCardProps[] {
  const stat = getStatisticObject();
  const group = stat[groupName];
  const result: StatisticCardProps[] = [];
  Object.keys(group).forEach((key) => {
    result.push({
      text: getString(key),
      value: group[key],
      imagePath: getImage(key),
    });
  });
  result.sort((a, b) => b.value - a.value);

  return result;
}

export function getKilledEntities(): StatisticCardProps[] {
  return getStatisticCards('entitiesKills');
}

export function getBreakBlocks(): StatisticCardProps[] {
  return getStatisticCards('blocksBreak');
}

export function getUniquePlayers(): StatisticCardProps[] {
  const stat = getStatisticObject();
  const result: StatisticCardProps[] = [];
  let idx = 1;
  Object.keys(stat.players).forEach((key) => {
    result.push({
      imagePath: 'images/icons/steve.png',
      text: key,
      value: idx,
    });
    idx += 1;
  });

  return result;
}
