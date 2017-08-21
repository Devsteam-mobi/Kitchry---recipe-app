/**
 * Created by Devsteam.mobi on 7/4/17.
 */
import {
	MEAL_PLAN_GET_FAIL,
	MEAL_PLAN_START_LOAD,
	CHANGE_CURRENT_DATE_IN_MEAL_PLAN,
	MEAL_PLAN_GET_BY_DATE_SUCCESS
} from './types';
import {Actions} from 'react-native-router-flux';
import {prettyDate, HOST, getKeyFromStorage} from './const';

const loadingMealFail = (dispatch) => {
	dispatch({
		type: MEAL_PLAN_GET_FAIL,
		error: 'Huiston we have a problem'
	});
	Actions.auth({type: 'replace'});
};

export const changeDate = (date) => {
	return dispatch => dispatch({
		type: CHANGE_CURRENT_DATE_IN_MEAL_PLAN,
		date: date
	});
};

const loadingMealByDateSuccess = (dispatch, mealPlan, date) => {
	dispatch({
		type: MEAL_PLAN_GET_BY_DATE_SUCCESS,
		meals: mealPlan,
		date: date
	});
};

export const getMealPlan = (date) => {
	return dispatch => {
		dispatch({type: MEAL_PLAN_START_LOAD});
		getKeyFromStorage().then((stores) => {
			const {token, email} = stores;
			let url = HOST + 'api/v2/mobile/mealplan';
			let utc = -1 * parseInt((new Date().getTimezoneOffset()) / 60);
			let currentDate = date ? date : prettyDate();
			let body = 'userName=' + encodeURIComponent(email) + '&token=' + token + '&utcOffsetHours=' + utc + '&date=' + encodeURIComponent(currentDate);
			makeRequest(dispatch, url, body, loadingMealByDateSuccess, loadingMealFail, currentDate);
		});
	};
};


const makeRequest = (dispatch, url, body, onSuccess, onFail, date) => {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let result = JSON.parse(xhr.responseText);
				if (result.status === 'success') {
					return onSuccess(dispatch, result, date);
				}
				else {
					onFail(dispatch);
				}
			}
			else {
				onFail(dispatch);
			}
		}
	};
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.timeout = 5000;
	xhr.addEventListener('timeout', () => {
		return onFail(dispatch);
	});
	xhr.send(body);
};
