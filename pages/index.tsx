import React, {Component} from "react";
import Header from "../components/header";
import {GetServerSideProps} from "next";
import {BaseStatistic, StatisticPersist} from "../@types/statisticTypes";
import StatisticCard from "../components/statisticCard";
import {strings} from "../lib/strings";
import {imagePaths} from "../lib/imagesPaths";
import fs from 'fs';
import Head from "next/head";
import Link from "next/link";
import {getBaseStatistic} from "../lib/statAdapter";

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: getBaseStatistic()
    }
}

interface PageState {

}

export default class IndexPage extends Component<BaseStatistic, PageState> {
    private readonly linkUrls = {
        entitiesKillsCount: 'killedEntities'
    }

    private getPropsKey() {
        const keys = [];
        for (const prop in this.props) {
            keys.push(prop);
        }

        return keys;
    }

    render(): React.ReactNode {
        return (
            <>
                <Head>
                    <title>DimsServer</title>
                </Head>
                <Header />
                <div className='page'>
                    <h1 className='title'>Общая статистика:</h1>
                    <div className='statisticCardList'>
                        {this.getPropsKey().map((propKey: string) => {
                            const url = this.linkUrls[propKey] === undefined
                                ? 'index'
                                : this.linkUrls[propKey];
                            return (
                                    <Link href={url}>
                                        <a>
                                        <StatisticCard text={strings[propKey]}
                                                       value={this.props[propKey]}
                                                       imagePath={imagePaths[propKey]}
                                                       key={propKey}/>
                                        </a>
                                    </Link>
                                    )
                        })}
                    </div>
                </div>
            </>
        )
    }
}