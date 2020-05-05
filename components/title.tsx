import React from 'react';

import style from './title.module.css';


interface Props {
    text: string;
}

export default function Title({ text }: Props): JSX.Element {
  return (
    <div className={style.titleWrapper}>
      <h1 className={style.titleWrapper__title}>{text}</h1>
    </div>
  );
}
