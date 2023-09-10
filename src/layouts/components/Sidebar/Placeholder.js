import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Placeholder() {
    return <div className={cx('place-holder')}></div>;
}

export default Placeholder;
