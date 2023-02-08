import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/dc60cb071cfa78089851f938d59db628~c5_300x300.webp?x-expires=1675947600&x-signature=cotcj4jT9rUIVMg7dteKzeW40Ag%3D  "
                alt="Name"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>sssorn_chonnasorn</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>Sorn</span>
            </div>
        </div>
    );
}

export default AccountItem;
