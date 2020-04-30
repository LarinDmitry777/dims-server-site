import {PlayerTopEntity, StatisticCardColor} from "../@types/statisticTypes";
import style from './playersTop.module.css';
import React from "react";
import StatisticCard from "./statisticCard";

interface PlayerTopComponentProps {
    topPlayers: PlayerTopEntity[];
}

export function PlayersTop(props: PlayerTopComponentProps) {
    return(
        <div className={style.component}>
            <h1 className={style.component__title}>Лидеры</h1>
            <div className={style.component__playersTopList}>
                <StatisticCard text={props.topPlayers[0].player}
                               value={props.topPlayers[0].value}
                               color={StatisticCardColor.gold}
                               imagePath={'images/icons/steve.png'} />
                <StatisticCard text={props.topPlayers[1].player}
                               value={props.topPlayers[1].value}
                               color={StatisticCardColor.silver}
                               imagePath={'images/icons/steve.png'} />
                <StatisticCard text={props.topPlayers[2].player}
                               value={props.topPlayers[2].value}
                               color={StatisticCardColor.bronze}
                               imagePath={'images/icons/steve.png'} />
            </div>
        </div>
    )
}