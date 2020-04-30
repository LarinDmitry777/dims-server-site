import style from './title.module.css'
import React from "react";

interface Props {
    text: string;
}

export function Title(props: Props) {
    return (
        <div className={style.titleWrapper}>
            <h1 className={style.titleWrapper__title}>{props.text}</h1>
        </div>
    )
}