import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Header from '../components/header';
import { StatisticCardProps } from '../@types/statisticTypes';
import { getUniquePlayers } from '../lib/statAdapter';
import StatisticsCardList from '../components/statisticCardsList';
import Title from '../components/title';

export const getServerSideProps: GetServerSideProps = async () => {
  const players = getUniquePlayers();
  return {
    props: {
      players,
    },
  };
};

interface PageProps {
    players: StatisticCardProps[];
}

export default ({ players }: PageProps): JSX.Element => (
  <>
    <Head>
      <title>DimsServer</title>
    </Head>
    <Header />
    <div className="page">
      <Title text="Уникальные игроки" />
      <StatisticsCardList title="Статистика" cards={players} />
    </div>
  </>
);
