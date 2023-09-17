import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultForm.module.scss';
import { TriangleIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function DefaultRegisterForm() {
    const [activeBtn, setActiveBtn] = useState(null);
    const [selectedValue, setSelectedValue] = useState({ Month: 'Month', Day: 'Day', Year: 'Year' });

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1 to 31
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); // Last 100 years

    const handleClick = (btnName) => {
        if (activeBtn === btnName) {
            setActiveBtn(null);
        } else {
            setActiveBtn(btnName);
        }
    };

    const handleSelectValue = (value) => {
        setSelectedValue({
            ...selectedValue,
            [activeBtn]: value,
        });
        setActiveBtn(null);
    };

    return (
        <div>
            <h4 className={cx('dob-title')}>When's your birthday?</h4>
            <div className={cx('dob-container')}>
                {Object.entries(selectedValue).map(([btnName, selected]) => (
                    <div className={cx('dob-btn')} key={btnName} onClick={() => handleClick(btnName)}>
                        {selected}
                        <TriangleIcon className={cx(activeBtn === btnName ? 'right-icon-rotated' : 'right-icon')} />
                        {activeBtn === btnName && (
                            <div className={cx('dropdown')} onClick={(e) => e.stopPropagation()}>
                                {btnName === 'Month' &&
                                    months.map((month) => (
                                        <div
                                            className={cx('option-item')}
                                            key={month}
                                            onClick={() => handleSelectValue(month)}
                                        >
                                            {month}
                                        </div>
                                    ))}
                                {btnName === 'Day' &&
                                    days.map((day) => (
                                        <div
                                            className={cx('option-item')}
                                            key={day}
                                            onClick={() => handleSelectValue(day)}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                {btnName === 'Year' &&
                                    years.map((year) => (
                                        <div
                                            className={cx('option-item')}
                                            key={year}
                                            onClick={() => handleSelectValue(year)}
                                        >
                                            {year}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className={cx('text')}>Your birthday won't be shown publicly</p>
            <div className={cx('main-container')}>Main</div>
        </div>
    );
}

export default DefaultRegisterForm;
