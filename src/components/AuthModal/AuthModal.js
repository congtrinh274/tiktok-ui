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
};

const MODAL_SIGNUP_DATA_EXPANDED = {
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

function AuThModal({ onToggleModal }) {
    const currentUser = false;
    const [displayedForm, setDisplayedForm] = useState('login');
    const [history, setHistory] = useState([MODAL_LOGIN_DATA]);
    const [additional, setAdditional] = useState(true);
    const currentTab = history[history.length - 1];

    useEffect(() => {
        setAdditional(true);
    }, [history]);

    useEffect(() => {
        let AuthType = null;
        if (displayedForm === 'login') {
            AuthType = MODAL_LOGIN_DATA;
        } else if (displayedForm === 'signup') {
            AuthType = MODAL_SIGNUP_DATA;
        } else {
            AuthType = MODAL_SIGNUP_DATA_EXPANDED;
        }
        setHistory([AuthType]);
    }, [displayedForm, currentUser]);

    const handleGoBack = () => {
        history[0] === MODAL_SIGNUP_DATA_EXPANDED
            ? setDisplayedForm('signup')
            : setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleClickAuthItem = (item) => {
        const isParent = !!item.children;
        if (isParent) {
            setHistory((prev) => [...prev, item.children]);
        }
    };

    const handleClickSeeMore = () => {
        setDisplayedForm('signupExpanded');
        setAdditional(false);
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
                                    {additional && displayedForm === 'signup' && (
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
                        {displayedForm === 'login' ? (
                            <>
                                Don't have an account?
                                <span className={cx('signup-btn')} onClick={() => setDisplayedForm('signup')}>
                                    Sign up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?
                                <span className={cx('signup-btn')} onClick={() => setDisplayedForm('login')}>
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

AuThModal.propTypes = {
    onToggleModal: PropTypes.func,
};

export default AuThModal;
