import Button from '../../components/Button/button';
import SearchTextField from '../../components/SearchField/searchField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

function Header() {
    const [date, setDate] = React.useState(null);

    const openModal = () => {
        console.log('Modal opened!');
    };

    return (

        <div className="header-container">
            <div className="left-side">
                <Button label='Report Your Daily Tasks' onClick={openModal} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        className='datepicker'
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                    />
                </LocalizationProvider>
            </div>
            <div className="right-side">
                <SearchTextField />
            </div>
        </div>

    );
}

export default Header;
