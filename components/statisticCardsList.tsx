import React from 'react';
import style from './statisticCardsList.module.css';
import { StatisticCardProps } from '../@types/statisticTypes';
import StatisticCard from './statisticCard';

interface Props {
   title: string;
   cards: StatisticCardProps[];
}

export default function StatisticsCardList({ title, cards }: Props): JSX.Element {
  return (
    <>
      <h1 className={style.statisticCardList__title}>{title}</h1>
      <div className={style.statisticCardList}>
        {cards.map((card) => (
          <StatisticCard
            text={card.text}
            value={card.value}
            imagePath={card.imagePath}
            color={card.color}
            href={card.href}
            key={card.text}
          />
        ))}
      </div>
    </>
  );
}
