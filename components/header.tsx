import styles from './header.module.css';
import React, {Component} from "react";
import Link from "next/link";

interface ComponentState {
    isNotificationVisible: boolean;
    timeoutToHideNotification?: NodeJS.Timeout;
    notificationX: number;
    notificationY: number;
}

export default class Header extends Component<{}, {}> {
    state = {
        isNotificationVisible: false,
        notificationX: 0,
        notificationY: 0
    }

    private readonly domainName = 'dimsserv.ru';

    constructor(props) {
        super(props);
        this.showNotification = this.showNotification.bind(this);
        this.copyAddress = this.copyAddress.bind(this);
    }

    private copyAddress(event: React.MouseEvent<HTMLElement>) {
        const text = event.currentTarget.textContent;
        const tempTextBox = document.createElement('input');
        document.getElementsByTagName('body').item(0).appendChild(tempTextBox);
        tempTextBox.value = text;
        tempTextBox.select();
        tempTextBox.setSelectionRange(0, 9999);
        document.execCommand("Copy");
        tempTextBox.remove();

        const clickX = event.clientX;
        const clickY = event.clientY;

        this.showNotification(clickX, clickY);
    }

    private showNotification(x: number, y: number) {
        this.setState((state: ComponentState) => {
            if (state.timeoutToHideNotification !== undefined) {
                clearTimeout(state.timeoutToHideNotification);
            }
            const timeout = setTimeout(() => {
                this.setState({isNotificationVisible: false})
            }, 1000);
            return ({
                isNotificationVisible: true,
                timeoutToHideNotification: timeout,
                notificationX: x - 80,
                notificationY: y - 40
            });
        });
        this.setState({isNotificationVisible: true});
    }

    render(): React.ReactNode {
        return (
            <header className={styles.header}>
                <Link href='/'>
                    <a>
                        <div className={styles.header__serverName}>Dims server</div>
                    </a>
                </Link>
                {this.state.isNotificationVisible
                    ? (
                        <div className={`${styles.header__notification}`}
                             style={{left: this.state.notificationX, top: this.state.notificationY}}>
                            Текст скопирован в буфер обмена
                        </div>
                    ) : null}
                <div className={styles.header__subtitle}>
                    Адрес сервера:
                    <span className={styles.header__subtitle_highlighted}
                          onClick={this.copyAddress}>
                        {this.domainName}
                    </span>
                </div>
            </header>
        )
    }
}