import Button from '../../components/Button/button';
import SearchTextField from '../../components/SearchField/searchField';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker"
import { useContext, useState } from 'react';
import ModalComponent  from '../../components/Modal/modal';
import './header.scss';
import { AppContext } from '../../appContext';

function Header() {
    const { selectedDate, setSelectedDate } = useContext(AppContext);
    const [openModal, setOpenModal] = useState(false);
    
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (

        <div className="header-container">
            <ModalComponent open={openModal} onClose={() => setOpenModal(false)}/>
            <div className="left-side">
                <Button label='Report Your Daily Tasks' onClick={() => setOpenModal(true)} />
                <DatePicker
                    className='datepicker-container'
                    selected={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div className="right-side">
                <SearchTextField />
            </div>
        </div>

    );
}

export default Header;
