import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import AuthenModal from '~/components/AuthModal';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [modal, setModal] = useState(false);

    const handleOnToggleModal = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <Header onToggleModal={handleOnToggleModal} />
                <div className={cx('container')}>
                    <Sidebar onToggleModal={handleOnToggleModal} />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            {modal && <AuthenModal onToggleModal={handleOnToggleModal} />}
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
