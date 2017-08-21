/**
 * Created by Devsteam.mobi on 7/23/17.
 */
import {
	START_LOAD_RECIPE,
	LOAD_RECIPE_SUCCESS,
	LOAD_RECIPE_FAIL,
	SEND_CONFIRM,
	SEND_CONFIRM_SUCCESS,
	SEND_CONFIRM_FAIL,
	LOAD_REVIEW_MEAL_LIST_SUCCESS,
	START_LOAD_DATA
} from './types';
import {HOST, getKeyFromStorage} from './const';
import {Actions} from 'react-native-router-flux';

const loadingRecipeSuccess = (dispatch, recipe, img, showtab) => {
	dispatch({
		type: LOAD_RECIPE_SUCCESS,
		recipe: recipe,
		recipeImg: img,
		showTab: !!showtab
	});
	Actions.recipeDetail();
};

export const changeMealList = (id) => {
	return (dispatch, getState) => {
		const {reviewMealList} = getState().home;
		for (let i = 0; i < reviewMealList.length; i++) {
			if (reviewMealList[i].plan_id === id) {
				reviewMealList.splice(i, 1);
				changeList(dispatch, reviewMealList);
			}
		}
	};
};

const changeList = (dispatch, list) => {
	dispatch({
		type: LOAD_REVIEW_MEAL_LIST_SUCCESS,
		reviewMealList: new Array().concat(list)
	});
};

export const openRecipe = (recipe, img) => {
	return dispatch => loadingRecipeSuccess(dispatch, recipe, img, true);
};

const loadingRecipeFail = (dispatch, error) => {
	dispatch({
		type: LOAD_RECIPE_FAIL,
		error: error
	});
};

export const getRecipeById = (id, recipeImg) => {
	return dispatch => {
		dispatch({type: START_LOAD_RECIPE});
		getKeyFromStorage().then((store) => {
			const {token, email} = store;
			let url = HOST + 'api/v2/mobile/recipe';
			let body = 'userName=' + encodeURIComponent(email) + '&token=' + token + '&recipeId=' + id;
			makeRequest(dispatch, 'POST', url, body, loadingRecipeSuccess, loadingRecipeFail, recipeImg);
		});
	};
};

export const sendConfirm = (planId, isLike, isConfirm) => {
	return dispatch => {
		dispatch({type: SEND_CONFIRM});
		dispatch({type: START_LOAD_DATA});
		getKeyFromStorage().then((store) => {
			const {token, email} = store;
			let url = HOST + 'api/v2/mobile/mealplan/review';
			let utc = -1 * parseInt((new Date().getTimezoneOffset()) / 60);
			let body = 'userName=' + encodeURIComponent(email) + '&utcOffsetHours=' + utc + '&token=' + token
				+ '&planId=' + planId + '&isConfirmed=' + isConfirm + '&isLiked=' + isLike;
			makeRequest(dispatch, 'PATCH', url, body, sendConfirmSuccess, sendConfirmFail);
		});
	};
};

const sendConfirmSuccess = (dispatch) => {
	dispatch({
		type: SEND_CONFIRM_SUCCESS
	});
	Actions.pop();
};

const sendConfirmFail = (dispatch) => {
	dispatch({
		type: SEND_CONFIRM_FAIL,
		error: 'Confirm not send'
	});
};

const makeRequest = (dispatch, type, url, body, onSuccess, onFail, recipeImg) => {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let result = JSON.parse(xhr.responseText);
				if (result.message === 'success') {
					return onSuccess(dispatch, result, recipeImg);
				}
				else {
					if (result.status === 'success') {
						return onSuccess(dispatch);
					} else {
						onFail(dispatch);
					}
				}
			} else {
				onFail(dispatch);
			}
		}
	};
	xhr.open(type, url);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.timeout = 5000;
	xhr.addEventListener('timeout', () => {
		return onFail(dispatch);
	});
	xhr.send(body);
};


