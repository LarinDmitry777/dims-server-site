import React, {Component} from "react";
import Header from "../components/header";
import {GetServerSideProps} from "next";
import {StatisticCardProps} from "../@types/statisticTypes";
import StatisticCard from "../components/statisticCard";
import Head from "next/head";
import {getKilledEntities, getTopPlayers} from "../lib/statAdapter";
import {StatisticsCardList} from "../components/statisticCardsList";
import {Title} from "../components/title";

export const getServerSideProps: GetServerSideProps = async context => {
    const topPlayers = getTopPlayers('entitiesKillsCount');
    const statisticCards = getKilledEntities();
    return {
        props: {
            topPlayers,
            statisticCards
        }
    }
}

interface PageProps {
    topPlayers: StatisticCardProps[];
    statisticCards: StatisticCardProps[];
}

interface PageState {

}

export default class IndexPage extends Component<PageProps, PageState> {
    render(): React.ReactNode {
        return (
            <>
                <Head>
                    <title>DimsServer</title>
                </Head>
                <Header />
                <div className='page'>
                    <Title text='Убийства существ' />
                    <StatisticsCardList title='Рейтинг' cards={this.props.topPlayers} />
                    <StatisticsCardList title='Статистика' cards={this.props.statisticCards} />
                </div>
            </>
        )
    }
}