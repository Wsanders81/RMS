import UserDatePicker from "./UserDatePicker"
import {Box} from '@mui/material'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import moment from 'moment';
import { getSales } from "../actions/actions";
export default function Sales(){
    const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
    const token = useSelector(store => store.userReducer.token)
    console.log(token)
	const handleChange = (e) => {
		if (e.target.name === 'begDate') {
			setBegDate((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value
			}));
		}
		else {
			setEndDate((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value
			}));
		}
	};

	const handleSubmit = () => {
		const bdate = moment(begDate).format("YYYY-MM-DD")
        const edate = moment(endDate).format("YYYY-MM-DD")
		const response = getSales(bdate, edate)
	}
    return (
        <Box>
            <h1>Sales</h1>
            <UserDatePicker
            begDate={begDate}
            endDate={endDate}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            />
        </Box>
    )
}