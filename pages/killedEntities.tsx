import React, {Component} from "react";
import Header from "../components/header";
import {GetServerSideProps} from "next";
import {PlayerTopEntity, StatisticCardProps, StatisticPersist} from "../@types/statisticTypes";
import StatisticCard from "../components/statisticCard";
import {strings} from "../lib/strings";
import {imagePaths} from "../lib/imagesPaths";
import fs from 'fs';
import Head from "next/head";
import prettyBytes from "next/dist/lib/pretty-bytes";
import {getKilledEntities, getTopPlayers} from "../lib/statAdapter";
import {PlayersTop} from "../components/playersTop";
import statisticCard from "../components/statisticCard";

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
    topPlayers: PlayerTopEntity[];
    statisticCards: StatisticCardProps[];
}

interface PageState {

}

export default class IndexPage extends Component<PageProps, PageState> {
    render(): React.ReactNode {
        const statisticCards = this.props.statisticCards.slice();

        return (
            <>
                <Head>
                    <title>DimsServer</title>
                </Head>
                <Header />
                <div className='page'>
                    <h1 className='title'>Убийство существ:</h1>
                    <PlayersTop topPlayers={this.props.topPlayers} />
                    <div className='title'>Статистика:</div>
                    <div className='statisticCardList'>
                        {this.props.statisticCards.map(card => {
                            return (
                                <StatisticCard text={card.text} value={card.value} imagePath={card.imagePath} />
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}