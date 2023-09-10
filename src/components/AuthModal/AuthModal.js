import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AuthModal.module.scss';

import config from '~/config';
import {
    AppleIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    CloseIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KakaoTalkIcon,
    LineIcon,
    QRcodeIcon,
    TwitterIcon,
    UserIcon,
} from '~/components/Icons';
import Button from '../Button';
import DefaultLoginForm from './AuthForm/DefaultLoginForm';
import DefaultRegisterForm from './AuthForm/DefaultRegisterForm';

const cx = classNames.bind(styles);

const MODAL_LOGIN_DATA = {
    title: 'Log in to TikTok',
    data: [
        {
            icon: <QRcodeIcon />,
            label: 'Use QR Code',
        },
        {
            icon: <UserIcon />,
            label: 'Use phone / email / username',
            children: {
                title: 'Log in',
                type: 'component',
                data: DefaultLoginForm,
            },
        },
        {
            icon: <FacebookIcon />,
            label: 'Continue with Facebook',
        },
        {
            icon: <GoogleIcon />,
            label: 'Continue with Google',
        },
        {
            icon: <TwitterIcon />,
            label: 'Continue with Twitter',
        },
        {
            icon: <LineIcon />,
            label: 'Continue with LINE',
        },
        {
            icon: <KakaoTalkIcon />,
            label: 'Continue with KakaoTalk',
        },
        {
            icon: <AppleIcon />,
            label: 'Continue with Apple',
        },
        {
            icon: <InstagramIcon />,
            label: 'Continue with Instagram',
        },
    ],
};

const MODAL_SIGNUP_DATA = {
    title: 'Sign up for TikTok',
    data: [
        {
            icon: <UserIcon />,
            label: 'Use phone or email',
            children: {
                title: 'Sign up',
                type: 'component',
                data: DefaultRegisterForm,
            },
        },
        {
            icon: <FacebookIcon />,
            label: 'Continue with Facebook',
        },
        {
            icon: <GoogleIcon />,
            label: 'Continue with Google',
        },
    ],
    additional: [
        {
            icon: <TwitterIcon />,
            label: 'Continue with Twitter',
        },
        {
            icon: <LineIcon />,
            label: 'Continue with Line',
        },
        {
            icon: <KakaoTalkIcon />,
            label: 'Continue with KakaoTalk',
        },
    ],
};

function AuThenModal({ onToggleModal }) {
    const currentUser = false;
    const [isLoginDisplay, setIsLoginDisplay] = useState(true);
    const [history, setHistory] = useState([MODAL_LOGIN_DATA]);
    const [showSeeMoreBtn, setShowSeeMoreBtn] = useState(true);
    const currentTab = history[history.length - 1];

    useEffect(() => {
        const AuthType = isLoginDisplay ? MODAL_LOGIN_DATA : MODAL_SIGNUP_DATA;
        setHistory([AuthType]);
    }, [isLoginDisplay, currentUser]);

    const handleToggleForm = () => {
        setIsLoginDisplay(!isLoginDisplay);
    };

    const handleGoBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleClickAuthItem = (item) => {
        const isParent = !!item.children;
        if (isParent) {
            setHistory((prev) => [...prev, item.children]);
        }
    };

    const handleClickSeeMore = () => {
        if (showSeeMoreBtn) {
            MODAL_SIGNUP_DATA.data = [...MODAL_SIGNUP_DATA.data, ...MODAL_SIGNUP_DATA.additional];
            setShowSeeMoreBtn(false); // Ẩn nút "see-more-btn"
        }
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('overlay')} onClick={onToggleModal}></div>
            <div className={cx('wrapper')}>
                {history.length > 1 && (
                    <div className={cx('back-btn')} onClick={handleGoBack}>
                        <ChevronLeftIcon />
                    </div>
                )}
                <div className={cx('close-inner-btn')} onClick={onToggleModal}>
                    <CloseIcon />
                </div>
                <div className={cx('container')}>
                    <div className={cx('auth-ways-container')}>
                        <div className={cx('inner-container')}>
                            <h2 className={cx('title')}>{currentTab.title}</h2>
                            {currentTab.type === 'component' ? (
                                <currentTab.data />
                            ) : (
                                <>
                                    {currentTab.data.map((item, index) => (
                                        <Button
                                            key={index}
                                            className={cx('type-btn')}
                                            text
                                            large
                                            customLeftIcon
                                            leftIcon={item.icon}
                                            disabled={!item.children}
                                            onClick={() => {
                                                handleClickAuthItem(item);
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                    {showSeeMoreBtn && !isLoginDisplay && (
                                        <div className={cx('see-more-btn')} onClick={handleClickSeeMore}>
                                            <ChevronDownIcon />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className={cx('policy-confirm-container')}>
                        <p className={cx('policy-confirm-text')}>
                            By continuing, you agree to TikTok’s{' '}
                            <a href={config.routes.legal} target="blank">
                                Terms of Service
                            </a>{' '}
                            and confirm that you have read TikTok’s{' '}
                            <a href={config.routes.legal} target="blank">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                    <div className={cx('footer')}>
                        {isLoginDisplay ? (
                            <>
                                Don't have an account?
                                <span className={cx('signup-btn')} onClick={handleToggleForm}>
                                    Sign up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?
                                <span className={cx('signup-btn')} onClick={handleToggleForm}>
                                    Log in
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

AuThenModal.propTypes = {
    onToggleModal: PropTypes.func,
};

export default AuThenModal;
