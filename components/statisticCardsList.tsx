import style from './statisticCardsList.module.css'
import {StatisticCardProps} from "../@types/statisticTypes";
import React from "react";
import StatisticCard from "./statisticCard";

interface Props {
   title: string;
   cards: StatisticCardProps[]
}

export function StatisticsCardList(props: Props) {
   return (
       <>
          <h1 className={style.statisticCardList__title}>{props.title}</h1>
          <div className={style.statisticCardList}>
             {props.cards.map(card => {
                return (
                    <StatisticCard text={card.text}
                                   value={card.value}
                                   imagePath={card.imagePath}
                                   color={card.color}
                                   href={card.href}
                                   key={card.text}/>
                )
             })}
          </div>
       </>
   )
}