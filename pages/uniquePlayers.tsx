import React, {Component} from "react";
import Header from "../components/header";
import {GetServerSideProps} from "next";
import {StatisticCardProps} from "../@types/statisticTypes";
import StatisticCard from "../components/statisticCard";
import Head from "next/head";
import {
    getBreakBlocks,
    getBreedAnimals,
    getKilledEntities,
    getStatisticCards,
    getTopPlayers,
    getUniquePlayers
} from "../lib/statAdapter";
import {StatisticsCardList} from "../components/statisticCardsList";
import {Title} from "../components/title";

export const getServerSideProps: GetServerSideProps = async context => {
    const players = getUniquePlayers();
    return {
        props: {
            players
        }
    }
}

interface PageProps {
    players: StatisticCardProps[];
}

interface PageState {

}

export default class Page extends Component<PageProps, PageState> {
    render(): React.ReactNode {
        return (
            <>
                <Head>
                    <title>DimsServer</title>
                </Head>
                <Header />
                <div className='page'>
                    <Title text='Уникальные игроки' />
                    <StatisticsCardList title='Статистика' cards={this.props.players} />
                </div>
            </>
        )
    }
}