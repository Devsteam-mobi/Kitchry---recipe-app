/**
 * Created by Devsteam.mobi on 7/24/17.
 */
import {
	START_LOAD_DATA,
	LOAD_UPCOMING_MEAL_SUCCESS,
	LOAD_UPCOMING_MEAL_FAIL,
	LOAD_REVIEW_MEAL_LIST_SUCCESS,
	LOAD_REVIEW_MEAL_LIST_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	error: '',
	loadingUpcoming: true,
	loadingReviewList: true,
	upcomingMeal: {},
	reviewMealList: []
};
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_LOAD_DATA:
			return {...state, loading: true};
		case LOAD_UPCOMING_MEAL_SUCCESS:
			return {...state, loadingUpcoming: false, upcomingMeal: action.upcomingMeal};
		case LOAD_UPCOMING_MEAL_FAIL:
			return {...state, loadingUpcoming: false, error: action.error};
		case LOAD_REVIEW_MEAL_LIST_SUCCESS:
			return {...state, loadingReviewList: false, reviewMealList: action.reviewMealList};
		case LOAD_REVIEW_MEAL_LIST_FAIL:
			return {...state, loadingReviewList: false, error: action.error};
		default:
			return state;
	}
};