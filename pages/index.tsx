import React, {Component} from "react";
import Header from "../components/header";
import {GetServerSideProps} from "next";
import {StatisticPersist} from "../@types/statisticTypes";
import style from "./index.module.css";
import StatisticCard from "../components/statisticCard";
import {strings} from "../lib/strings";
import {imagePaths} from "../lib/imagesPaths";
import fs from 'fs';
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async context => {
    const filePath = './../../serverPaper/scriptcraft/data/statistic-store.json';
    const fileContent = fs.readFileSync(filePath).toString();
    const statistic: StatisticPersist = JSON.parse(fileContent);
    return {
        props: {
            joinCount: statistic.joinCount,
            chatMessagesCount: statistic.chatMessagesCount,
            playerDeathCount: statistic.playerDeathCount,
            blockBreaksCount: statistic.blockBreaksCount,
            placedBlocksCount: statistic.placedBlocksCount,
            entitiesKillsCount: statistic.entitiesKillsCount,
            breedAnimalsCount: statistic.breedAnimalsCount,
            extractFurnaceCount: statistic.extractFurnaceCount,
            fishingCount: statistic.fishingCount,
            enchantItemsCount: statistic.enchantItemsCount,
            uniquePlayersCount: statistic.uniquePlayersCount
        }
    }
}

interface PageProps {
    joinCount: string;
    chatMessagesCount: number;
    playerDeathCount: number;
    blockBreaksCount: number;
    placedBlocksCount: number;
    entitiesKillsCount: number;
    breedAnimalsCount: number;
    extractFurnaceCount: number;
    fishingCount: number;
    enchantItemsCount: number;
    uniquePlayersCount: number;
}

interface PageState {

}

export default class IndexPage extends Component<PageProps, PageState> {
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
                    <h1 className={style.title}>Общая статистика:</h1>
                    <div className={style.statisticCardList}>
                        {this.getPropsKey().map((propKey: string) => {
                            return (
                                    <StatisticCard text={strings[propKey]}
                                                   value={this.props[propKey]}
                                                   imagePath={imagePaths[propKey]}
                                                   key={propKey}/>
                                )
                        })}
                    </div>
                </div>
            </>
        )
    }
}