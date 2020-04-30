import style from './statisticCard.module.css';
import React from "react";
import {StatisticCardColor, StatisticCardProps} from "../@types/statisticTypes";

const colorDict = {
    [StatisticCardColor.bronze]: style.statisticCard_bronze,
    [StatisticCardColor.silver]: style.statisticCard_silver,
    [StatisticCardColor.gold]: style.statisticCard_gold,
}

export default function StatisticCard(props: StatisticCardProps) {

    return (
        <div className={`${style.statisticCard} ${props.color === undefined ? '' : colorDict[props.color]}`}>
            <img className={style.statisticCard__image} src={props.imagePath} alt='' />
            <div className={style.statisticCard__text}>{props.text}</div>
            <div className={style.statisticCard__value}>{props.value}</div>
        </div>
    )
}