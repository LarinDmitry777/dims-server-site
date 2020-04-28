import style from './statisticCard.module.css';
import React from "react";

interface Props {
    imagePath?: string;
    text: string;
    value: string;
}

export default function StatisticCard(props: Props) {
    return (
        <div className={style.statisticCard}>
            <img className={style.statisticCard__image} src={props.imagePath} alt='' />
            <div className={style.statisticCard__text}>{props.text}</div>
            <div className={style.statisticCard__value}>{props.value}</div>
        </div>
    )
}