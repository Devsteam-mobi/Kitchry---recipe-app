/**
 * Created by Devsteam.mobi on 7/4/17.
 */
import {
	MEAL_PLAN_GET_FAIL,
	MEAL_PLAN_GET_SUCCESS,
	MEAL_PLAN_START_LOAD,
	CHANGE_CURRENT_DATE_IN_MEAL_PLAN,
	MEAL_PLAN_GET_BY_DATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	error: '',
	loading: true,
	mealPlans: {},
	currentDateMealPlan: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MEAL_PLAN_START_LOAD:
			return {...state, loading: true, error: ''};
		case MEAL_PLAN_GET_SUCCESS:
			return {...state, error: '', loading: false, mealPlans: action.payload};
		case MEAL_PLAN_GET_BY_DATE_SUCCESS:
			return {...state, error: '', loading: false, mealPlans: action.meals, currentDate: action.date};
		case MEAL_PLAN_GET_FAIL:
			return {...state, error: action.error, loading: false};
		case CHANGE_CURRENT_DATE_IN_MEAL_PLAN:
			return {...state, currentDateMealPlan: action.date};
		default:
			return state;
	}
};
