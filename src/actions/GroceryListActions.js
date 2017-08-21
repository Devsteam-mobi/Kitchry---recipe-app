/**
 * Created by Devsteam.mobi on 7/4/17.
 */
import {
	GROCERY_LIST_GET_FAIL,
	GROCERY_LIST_START_LOAD,
	CHANGE_CURRENT_DATE_IN_GROCERY_LIST,
	GROCERY_LIST_GET_GET_BY_DATE_SUCCESS,
	ACTIVE_PERIOD,
	CHANGE_GROUP_BY
} from './types';
import {Actions} from 'react-native-router-flux';
import {HOST, getKeyFromStorage, prettyDate, groupArray} from './const';

export const changePeriod = (period) => {
	return dispatch => dispatch({type: ACTIVE_PERIOD, period: period === 'day' ? 'day' : 'week'});
};

export const changeGroupBy = () => {
	return (dispatch, store) => {
		let active = store().grocery.groupBy === 'recipes' ? 'categories' : 'recipes';
		dispatch({type: CHANGE_GROUP_BY, groupBy: active});
	};
};

const loadingCroceryListFaill = (dispatch) => {
	dispatch({
		type: GROCERY_LIST_GET_FAIL,
		error: 'Huiston we have a problem'
	});
	Actions.auth({type: 'replace'});
};

export const changeDateForGroceryList = (date) => {
	return dispatch => dispatch({
		type: CHANGE_CURRENT_DATE_IN_GROCERY_LIST,
		date: date
	});
};

const loadingGroceryListByDateSuccess = (dispatch, data, date, groupGroceryListByRecipe) => {
	dispatch({
		type: GROCERY_LIST_GET_GET_BY_DATE_SUCCESS,
		groceryList: data,
		groupGroceryListByRecipe: groupGroceryListByRecipe,
		date: date
	});
};

export const getGroceryList = () => {
	return (dispatch, store) => {
		dispatch({type: GROCERY_LIST_START_LOAD});
		let period = store().grocery.period;
		let date = store().grocery.currentDayForGroceryList;
		getKeyFromStorage().then((stores) => {
			const {token, email} = stores;
			let url = HOST + 'api/v2/mobile/grocery';
			let currentDate = date ? date : prettyDate();
			let utc = -1 * parseInt((new Date().getTimezoneOffset()) / 60);
			let body = 'userName=' + encodeURIComponent(email) + '&token=' + token + '&utcOffsetHours=' + utc + '&date=' + encodeURIComponent(currentDate) + '&period=' + period;
			makeRequest(dispatch, url, body, loadingGroceryListByDateSuccess, loadingCroceryListFaill, currentDate);
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
					let groupByTypes = groupArray(result.grocery, true);
					let groupByRecipe = groupArray(result.grocery);
					return onSuccess(dispatch, groupByTypes, date, groupByRecipe);
				}
				else {
					dispatch({
						type: GROCERY_LIST_GET_FAIL,
						error: 'Huiston we have a problem'
					});
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
