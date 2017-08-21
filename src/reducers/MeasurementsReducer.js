/**
 * Created by Devsteam.mobi on 7/29/17.
 */
import {
	SEND_MEASUREMENTS,
	SEND_MEASUREMENTS_SUCCESS,
	SEND_MEASUREMENTS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	error: '',
	loading: false,
	measurementsData: {
		weight: {
			title: 'Weight',
			amount: 67,
			unit: 'lbs'
		},
		muscle: {
			title: 'Muscle Mass',
			amount: 25,
			unit: '%'
		},
		wellness: {
			title: 'Wellness',
			amount: 7,
			unit: 'pts'
		}
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SEND_MEASUREMENTS:
			return {...state, loading: true, error: ''};
		case SEND_MEASUREMENTS_SUCCESS:
			return {...state, loading: false, measurementsData: action.measurementsData};
		case SEND_MEASUREMENTS_FAIL:
			return {...state, error: action.error, loading: false};
		default:
			return state;
	}
};



