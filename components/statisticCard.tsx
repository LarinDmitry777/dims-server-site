import Link from 'next/link';
import React from 'react';

import { StatisticCardColor } from '../@types/statisticTypes';

import style from './statisticCard.module.css';

interface Props {
  color: StatisticCardColor;
  href: string;
  text: string;
  value: number;
  imagePath: string;
}

const colorsDict = {
  [StatisticCardColor.bronze]: style.statisticCard_bronze,
  [StatisticCardColor.silver]: style.statisticCard_silver,
  [StatisticCardColor.gold]: style.statisticCard_gold,
};

export default function StatisticCard({
  color, href, text, value, imagePath,
}: Props): JSX.Element {
  const card = (
    <div className={`${style.statisticCard} 
                     ${color === undefined ? '' : colorsDict[color]}
                     ${href === undefined ? '' : style.statisticCard_cursor_pointer}`}
    >
      <img className={style.statisticCard__image} src={imagePath} alt="" />
      <div className={style.statisticCard__text}>{text}</div>
      <div className={style.statisticCard__value}>{value}</div>
    </div>
  );

  if (href === undefined) {
    return card;
  }

  return (
    <Link href={href}>
      <a>
        {card}
      </a>
    </Link>
  );
}
