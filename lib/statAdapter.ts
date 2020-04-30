import fs from "fs";
import {BaseStatistic, StatisticCardColor, StatisticCardProps, StatisticPersist} from "../@types/statisticTypes";
import {imagePaths} from "./imagesPaths";
import {strings} from "./strings";

//Временное решение, пока не будет совершен переход на микросервисы
const filePath = './../../serverPaper/scriptcraft/data/statistic-store.json'
let lastStatisticUpdateTime: number;
let statistis: StatisticPersist;

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
    'uniquePlayersCount'
];

const baseStatisticHrefs = {
    entitiesKillsCount: 'killedEntities'
}

function getStatisticObject(): StatisticPersist {
    const statisticUpdateTimeMillis = 60 * 1000;
    if (lastStatisticUpdateTime === undefined ||
        lastStatisticUpdateTime + statisticUpdateTimeMillis < Date.now()) {
        const statisticFileText = fs.readFileSync(filePath).toString();
        statistis = JSON.parse(statisticFileText);
    }

    return statistis;
}

export function getBaseStatistic(): StatisticCardProps[] {
    const statistic = getStatisticObject();

    return  baseStatisticLines.map(line => {
        const cardObject: StatisticCardProps = {
            imagePath: imagePaths[line],
            text: strings[line],
            value: statistic[line]
        }
        if (baseStatisticHrefs[line] !== undefined) {
            cardObject.href = baseStatisticHrefs[line];
        }

        return cardObject;
    })
}

export function getTopPlayers(numericStatName: string): StatisticCardProps[] {
    const stat = getStatisticObject();
    const staticCards: StatisticCardProps[] = [];
    for (const player of Object.keys(stat.players)) {
        staticCards.push({
            imagePath: 'images/icons/steve.png',
            text: `${player}`,
            value: stat.players[player][numericStatName]
        });
    }

    staticCards.sort((a, b) => b.value - a.value);
    const result = staticCards.slice(0, 3);

    result[0].color = StatisticCardColor.gold;
    result[1].color = StatisticCardColor.silver;
    result[2].color = StatisticCardColor.bronze;

    result[0].text = `👑 ${result[0].text} 👑`;

    return result;
}

export function getKilledEntities(): StatisticCardProps[] {
    const stat = getStatisticObject();
    const killedEntities = stat.entitiesKills;
    const result: StatisticCardProps[] = [];
    for(const entity of Object.keys(killedEntities)){
        result.push({
            text: strings[entity],
            value: killedEntities[entity],
            imagePath: imagePaths[entity]
        });
    }

    result.sort((a, b) => b.value - a.value);

    return result;
}