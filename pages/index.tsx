import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { StatisticCardProps } from '../@types/statisticTypes';
import { getBaseStatistic } from '../lib/statAdapter';
import StatisticsCardList from '../components/statisticCardsList';
import Header from '../components/header';

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    cards: getBaseStatistic(),
  },
});


interface Props {
    cards: StatisticCardProps[];
}

export default ({ cards }: Props): JSX.Element => (
  <>
    <Head>
      <title>DimsServer</title>
    </Head>
    <Header />
    <div className="page">
      <StatisticsCardList title="Общая статистика" cards={cards} />
    </div>
  </>
);
