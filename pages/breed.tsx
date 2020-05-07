import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../components/header';
import { StatisticCardProps } from '../@types/statisticTypes';
import { getStatisticCards, getTopPlayers } from '../lib/statAdapter';
import StatisticsCardList from '../components/statisticCardsList';
import Title from '../components/title';

export const getServerSideProps: GetServerSideProps = async () => {
  const topPlayers = getTopPlayers('breedAnimalsCount');
  const statisticCards = getStatisticCards('breedAnimals');
  return {
    props: {
      topPlayers,
      statisticCards,
    },
  };
};

interface Props {
    topPlayers: StatisticCardProps[];
    statisticCards: StatisticCardProps[];
}

export default ({ topPlayers, statisticCards }: Props): JSX.Element => (
  <>
    <Head>
      <title>DimsServer</title>
    </Head>
    <Header />
    <div className="page">
      <Title text="Разведение животных" />
      <StatisticsCardList title="Рейтинг" cards={topPlayers} />
      <StatisticsCardList title="Статистика" cards={statisticCards} />
    </div>
  </>
);
