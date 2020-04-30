import fs from "fs";
import {BaseStatistic, PlayerTopEntity, StatisticPersist, StatisticCardProps} from "../@types/statisticTypes";
import statisticCard from "../components/statisticCard";
import {imagePaths} from "./imagesPaths";
import {strings} from "./strings";

//Временное решение, пока не будет совершен переход на микросервисы
const filePath = './../../serverPaper/scriptcraft/data/statistic-store.json'
let lastStatisticUpdateTime: number;
let statistis: StatisticPersist;

function getStatisticObject(): StatisticPersist {
    const statisticUpdateTimeMillis = 60 * 1000;
    if (lastStatisticUpdateTime === undefined ||
        lastStatisticUpdateTime + statisticUpdateTimeMillis < Date.now()) {
        const statisticFileText = fs.readFileSync(filePath).toString();
        statistis = JSON.parse(statisticFileText);
    }

    return statistis;
}

export function getBaseStatistic(): BaseStatistic {
    const statistic = getStatisticObject();
    return {
        joinCount: statistic.joinCount,
        chatMessagesCount: statistic.chatMessagesCount,
        playerDeathCount: statistic.playerDeathCount,
        blockBreaksCount: statistic.blockBreaksCount,
        placedBlocksCount: statistic.placedBlocksCount,
        entitiesKillsCount: statistic.entitiesKillsCount,
        breedAnimalsCount: statistic.breedAnimalsCount,
        extractFurnaceCount: statistic.extractFurnaceCount,
        fishingCount: statistic.fishingCount,
        enchantItemsCount: statistic.enchantItemsCount,
        uniquePlayersCount: statistic.uniquePlayersCount
    }
}

export function getTopPlayers(numericStatName: string) {
    const stat = getStatisticObject();
    const playerTopEntities: PlayerTopEntity[] = [];
    for (const player of Object.keys(stat.players)) {
        playerTopEntities.push({
            player,
            value: stat.players[player][numericStatName]
        });
    }
    playerTopEntities.sort((a, b) => b.value - a.value);

    return playerTopEntities.slice(0, 3);
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