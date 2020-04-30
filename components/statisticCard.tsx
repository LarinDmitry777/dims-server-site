import style from './statisticCard.module.css';
import React from "react";
import {StatisticCardColor, StatisticCardProps} from "../@types/statisticTypes";
import Link from "next/link";

const colorDict = {
    [StatisticCardColor.bronze]: style.statisticCard_bronze,
    [StatisticCardColor.silver]: style.statisticCard_silver,
    [StatisticCardColor.gold]: style.statisticCard_gold,
}

export default function StatisticCard(props: StatisticCardProps) {

    const card = (
        <div className={`${style.statisticCard} 
                         ${props.color === undefined ? '' : colorDict[props.color]}
                         ${props.href === undefined ? '' : style.statisticCard_cursor_pointer}`}>
            <img className={style.statisticCard__image} src={props.imagePath} alt='' />
            <div className={style.statisticCard__text}>{props.text}</div>
            <div className={style.statisticCard__value}>{props.value}</div>
        </div>
    );

    if (props.href === undefined) {
        return card;
    }

    return (
        <Link href={props.href}>
            <a>
                {card}
            </a>
        </Link>
    )
}