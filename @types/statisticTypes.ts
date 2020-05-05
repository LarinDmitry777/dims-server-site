export interface Statistics extends NumericStatistics{
    entitiesKills: { [key: string]: number };
    blocksBreak: { [key: string]: number };
    breedAnimals: { [key: string]: number };
}

export interface StatisticPersist extends Statistics{
    players: { [key: string]: Statistics};
    uniquePlayersCount: number;
}

export interface NumericStatistics {
    joinCount: number;
    chatMessagesCount: number;
    playerDeathCount: number;
    blockBreaksCount: number;
    placedBlocksCount: number;
    entitiesKillsCount: number;
    breedAnimalsCount: number;
    extractFurnaceCount: number;
    fishingCount: number;
    enchantItemsCount: number;
}

export interface BaseStatistic extends NumericStatistics{
    uniquePlayersCount: number;
}

export interface PlayerTopEntity {
    player: string;
    value: number;
}

export enum StatisticCardColor {
    gold,
    silver,
    bronze
}

export interface StatisticCardProps {
    color?: StatisticCardColor;
    imagePath?: string;
    text: string;
    value: number;
    href?: string;
}
