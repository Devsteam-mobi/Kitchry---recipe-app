/**
 * Created by Devsteam.mobi on 7/24/17.
 */
import {
	START_LOAD_DATA,
	LOAD_UPCOMING_MEAL_SUCCESS,
	LOAD_UPCOMING_MEAL_FAIL,
	LOAD_REVIEW_MEAL_LIST_SUCCESS,
	LOAD_REVIEW_MEAL_LIST_FAIL
} from './types';
import {HOST, getKeyFromStorage} from './const';

const loadingUpcomingSuccess = (dispatch, upcomingMeal) => {
	dispatch({
		type: LOAD_UPCOMING_MEAL_SUCCESS,
		upcomingMeal: upcomingMeal.mealplan
	});
};

const loadingReviewMealListSuccess = (dispatch, reviewMealList) => {
	dispatch({
		type: LOAD_REVIEW_MEAL_LIST_SUCCESS,
		reviewMealList: reviewMealList.mealplan
	});
};

const loadingUpcomingFail = (dispatch, error) => {
	dispatch({
		type: LOAD_UPCOMING_MEAL_FAIL,
		error: error || 'Nothing to show'
	});
};
const loadingReviewMealListFail = (dispatch, error) => {
	dispatch({
		type: LOAD_REVIEW_MEAL_LIST_FAIL,
		error: error || 'Nothing to show'
	});
};

export const getDataForHomePage = () => {
	return dispatch => {
		dispatch({type: START_LOAD_DATA});
		getKeyFromStorage().then((stores) => {
			const {token, email} = stores;
			let utc = -1 * parseInt((new Date().getTimezoneOffset()) / 60);
			let upcomingMealOptions = {
				url: HOST + 'api/v2/mobile/mealplan/upcoming',
				body: 'userName=' + encodeURIComponent(email) + '&token=' + token + '&utcOffsetHours=' + utc
			};
			let reviewMealOptions = {
				url: HOST + 'api/v2/mobile/mealplan/review',
				body: 'userName=' + encodeURIComponent(email) + '&token=' + token + '&utcOffsetHours=' + utc
			};
			getData(dispatch, upcomingMealOptions.url, upcomingMealOptions.body)
				.then(result => loadingUpcomingSuccess(dispatch, result)).catch(() => loadingUpcomingFail(dispatch));
			getData(dispatch, reviewMealOptions.url, reviewMealOptions.body)
				.then(result =>{ loadingReviewMealListSuccess(dispatch, result);}).catch(() => loadingReviewMealListFail(dispatch));
		});
	};
};

const getData = (dispatch, url, body) => {
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
		},
		body: body
	};
	return fetch(url, options).then(res => res.json());
};


// const makeRequest = (dispatch, url, body, onSuccess, onFail) => {
// 	return new Promise(
// 		(resolve, reject) => {
// 			let xhr = new XMLHttpRequest();
// 			xhr.onreadystatechange = () => {
// 				if (xhr.readyState === 4) {
// 					if (xhr.status === 200) {
// 						let result = JSON.parse(xhr.responseText);
// 						console.log(result.status);
//
// 						if (result.status === 'success') {
// 							onSuccess(dispatch, result);
// 							resolve(result);
// 						}
// 						else {
// 							console.log(result);
// 							onFail(dispatch);
// 							reject(xhr.message);
// 						}
// 					}
// 					else {
// 						onFail(dispatch);
// 						reject(xhr.status);
//
// 					}
// 				}
// 			};
// 			xhr.open('POST', url);
// 			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 			xhr.setRequestHeader('Accept', 'application/json');
// 			xhr.timeout = 5000;
// 			xhr.addEventListener('timeout', () => {
// 				onFail(dispatch, xhr.status);
// 				reject('Load more then 5 sec');
// 			});
// 			xhr.send(body);
// 		});
// };
