import React, {Component} from "react";
import Header from "../components/header";
import {GetServerSideProps} from "next";
import {StatisticCardProps} from "../@types/statisticTypes";
import Head from "next/head";
import {getBaseStatistic} from "../lib/statAdapter";
import {StatisticsCardList} from "../components/statisticCardsList";

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            cards: getBaseStatistic()
        }
    }
}

interface PageState {

}

interface PageProps {
    cards: StatisticCardProps[]
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
                    <StatisticsCardList title={'Общая статистика'} cards={this.props.cards} />
                </div>
            </>
        )
    }
}