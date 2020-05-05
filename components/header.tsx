import React, { Component } from 'react';
import Link from 'next/link';

import styles from './header.module.css';

interface State {
  isNotificationVisible: boolean;
  timeoutToHideNotification?: NodeJS.Timeout;
  notificationX: number;
  notificationY: number;
}

export default class Header extends Component<{}, State> {
  private readonly domainName = 'dimsserv.ru';

  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.copyAddress = this.copyAddress.bind(this);

    this.state = {
      isNotificationVisible: false,
      notificationX: 0,
      notificationY: 0,
    };
  }

  private copyAddress(event: React.MouseEvent<HTMLElement>): void {
    const text = event.currentTarget.textContent;
    const tempTextBox = document.createElement('input');
    document.getElementsByTagName('body').item(0).appendChild(tempTextBox);
    tempTextBox.value = text;
    tempTextBox.select();
    tempTextBox.setSelectionRange(0, 9999);
    document.execCommand('Copy');
    tempTextBox.remove();

    const clickX = event.clientX;
    const clickY = event.clientY;

    this.showNotification(clickX, clickY);
  }

  private showNotification(x: number, y: number): void {
    this.setState((state: State) => {
      if (state.timeoutToHideNotification !== undefined) {
        clearTimeout(state.timeoutToHideNotification);
      }
      const timeout = setTimeout(() => {
        this.setState({ isNotificationVisible: false });
      }, 1000);
      return ({
        isNotificationVisible: true,
        timeoutToHideNotification: timeout,
        notificationX: x - 80,
        notificationY: y - 40,
      });
    });
    this.setState({ isNotificationVisible: true });
  }

  render(): React.ReactNode {
    const { notificationX, notificationY, isNotificationVisible } = this.state;
    return (
      <header className={styles.header}>
        <Link href="/">
          <a>
            <div className={styles.header__serverName}>
              Dims server
            </div>
          </a>
        </Link>
        {isNotificationVisible
          ? (
            <div
              className={`${styles.header__notification}`}
              style={{
                left: notificationX,
                top: notificationY,
              }}
            >
              Текст скопирован в буфер обмена
            </div>
          ) : null}
        <div className={styles.header__subtitle}>
          Адрес сервера:
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            role="button"
            tabIndex={0}
            className={styles.header__subtitle_highlighted}
            onClick={this.copyAddress}
          >
            {this.domainName}
          </div>
        </div>
      </header>
    );
  }
}
