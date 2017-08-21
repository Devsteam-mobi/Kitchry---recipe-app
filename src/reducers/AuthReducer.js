/**
 * Created by Devsteam.mobi on 7/2/17.
 */
import {
	DETECT_PLATFORM,
	DEVICE_DIMENSIONS,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: '',
	success: false,
	platform: '',
	loading: false,
	deviceDimensions: {},
	token: '',
	doctorPhoto: '',
	profile: '',
	client: {}
};

export default (state = INITIAL_STATE, action) => {
	console.log("AuthReducer", action)
	switch (action.type) {
		case EMAIL_CHANGED:
			return {...state, email: action.payload};
		case PASSWORD_CHANGED:
			return {...state, password: action.payload};
		case LOGIN_USER:
			return {...state, loading: true, error: ''};
		case LOGIN_USER_SUCCESS:
			return {...state, error: '', loading: false, password: '', email: action.email, token: action.token, profile: action.profile, client: action.client};
		case LOGIN_USER_FAIL:
			return {...state, error: action.error, password: '', loading: false};
		case DETECT_PLATFORM:
			return {...state, platform: action.payload};
		case DEVICE_DIMENSIONS:
			return {...state, deviceDimensions: action.payload};
		default:
			return state;
	}
};
