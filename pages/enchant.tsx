import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Header from '../components/header';
import { StatisticCardProps } from '../@types/statisticTypes';
import { getTopPlayers } from '../lib/statAdapter';
import StatisticsCardList from '../components/statisticCardsList';
import Title from '../components/title';

export const getServerSideProps: GetServerSideProps = async () => {
  const topPlayers = getTopPlayers('enchantItemsCount');
  return {
    props: {
      topPlayers,
    },
  };
};

interface Props {
    topPlayers: StatisticCardProps[];
}


export default ({ topPlayers }: Props): JSX.Element => (
  <>
    <Head>
      <title>DimsServer</title>
    </Head>
    <Header />
    <div className="page">
      <Title text="Зачарование" />
      <StatisticsCardList title="Рейтинг" cards={topPlayers} />
    </div>
  </>
);
