export interface Statistics {
    entitiesKills: { [key: string]: number; };
    blocksBreak: { [key: string]: number; };
    breedAnimals: { [key: string]: number; };
    joinCount: number;
    chatMessagesCount: number;
    playerDeathCount: number;
    blockBreaksCount: number;
    placedBlocksCount: number;
    entitiesKillsCount: number;
    breedAnimalsCount: number
    extractFurnaceCount: number;
    fishingCount: number;
    enchantItemsCount: number;
}

export interface StatisticPersist extends Statistics{
    players: { [key: string]: Statistics};
    uniquePlayersCount: number;
}