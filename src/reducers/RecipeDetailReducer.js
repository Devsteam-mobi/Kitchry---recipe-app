/**
 * Created by Devsteam.mobi on 7/23/17.
 */
import {
	START_LOAD_RECIPE,
	LOAD_RECIPE_SUCCESS,
	LOAD_RECIPE_FAIL,
	SEND_CONFIRM,
	SEND_CONFIRM_SUCCESS,
	SEND_CONFIRM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	error: '',
	loading: false,
	recipe: {},
	recipeImg: '',
	showTab: false,
	confirm: false
};
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_LOAD_RECIPE:
			return {...state, loading: true};
		case LOAD_RECIPE_SUCCESS:
			return {
				...state,
				loading: false,
				recipe: action.recipe,
				recipeImg: action.recipeImg,
				showTab: action.showTab
			};
		case LOAD_RECIPE_FAIL:
			return {...state, loading: false, error: action.error};
		case SEND_CONFIRM:
			return {...state, confirm: true};
		case SEND_CONFIRM_SUCCESS:
			return {...state, confirm: false};
		case SEND_CONFIRM_FAIL:
			return {...state, confirm: false, error: action.error};
		default:
			return state;
	}
};