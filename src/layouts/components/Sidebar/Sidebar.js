import { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    UsersIcon,
    LiveIcon,
    HomeActiveIcon,
    LiveActiveIcon,
    UsersActiveIcon,
    ExploreActionIcon,
    ExploreIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import * as userService from '~/services/userService';
import Placeholder from './Placeholder';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar({ onToggleModal }) {
    const currentUser = false;
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((preUsers) => [...preUsers, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);

    const handleSeeAll = () => {
        setPage(page + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    style={{ width: '100%', height: '100%' }}
                    renderThumbVertical={({ style, ...props }) => (
                        <div
                            {...props}
                            style={{
                                ...style,
                                backgroundColor: '#1618230f',
                                borderRadius: '4px',
                                top: '-2px',
                            }}
                        />
                    )}
                >
                    <div className={cx('content')}>
                        <Menu>
                            <MenuItem
                                title="For You"
                                to={config.routes.home}
                                icon={<HomeIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                title="Following"
                                to={config.routes.following}
                                icon={<UsersIcon />}
                                activeIcon={<UsersActiveIcon />}
                            />
                            <MenuItem
                                title="Explore"
                                to={config.routes.explore}
                                icon={<ExploreIcon />}
                                activeIcon={<ExploreActionIcon />}
                            />
                            <MenuItem
                                title="LIVE"
                                to={config.routes.live}
                                icon={<LiveIcon />}
                                activeIcon={<LiveActiveIcon />}
                            />
                        </Menu>

                        <Placeholder />

                        {currentUser ? (
                            <SuggestedAccounts
                                label="Following accounts"
                                data={suggestedUsers}
                                onSeeAll={handleSeeAll}
                            />
                        ) : (
                            <div className={cx('login-container')}>
                                <p className={cx('text')}>Log in to follow creators, like videos, and view comments.</p>
                                <Button className={cx('login-btn')} onClick={onToggleModal} outline large>
                                    Log in
                                </Button>
                            </div>
                        )}

                        <Placeholder />

                        <div className={cx('footer')}>
                            <div className={cx('link-container')}>
                                <p className={cx('nav-link')} href="#">
                                    About
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Newsroom
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Contact
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Careers
                                </p>
                            </div>

                            <div className={cx('link-container')}>
                                <p className={cx('nav-link')} href="#">
                                    TikTok for Good
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Advertise
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Developers
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Transparency
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    TikTok rewards
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    TikTok Embeds
                                </p>
                            </div>

                            <div className={cx('link-container')}>
                                <p className={cx('nav-link')} href="#">
                                    Help
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Safety
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Terms
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Privacy
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Creator Portal
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Community Guidelines
                                </p>
                            </div>

                            <div className={cx('link-container')}>
                                <p className={cx('nav-link')} href="#">
                                    Dance
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Arts
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Food and Drink
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Tourism
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Production and Manufacturing
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Vehicles and Transportation
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Relationship
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    TikTok Style
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Athletics
                                </p>
                                <p className={cx('nav-link')} href="#">
                                    Hobbies
                                </p>
                            </div>
                            <span className={cx('copyright')}>© Cong Trinh 2023</span>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </div>
    );
}

export default Sidebar;
