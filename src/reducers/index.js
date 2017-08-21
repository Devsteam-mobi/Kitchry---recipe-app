/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import {combineReducers} from 'redux';
import MainScreenReducer from './MainScreenReducer';
import AuthReducer from './AuthReducer';
import MealPlanReducer from './MealPlanReducer';
import GroceryListReducer from './GroceryListReducer';
import ChatReducer from './ChatReducer';
import RecipeDetailReducer from './RecipeDetailReducer';
import HomeReducer from './HomeReducer';
import MeasurementsReducer from './MeasurementsReducer';
import ProfileReducer from './ProfileScreenReducer';

export default combineReducers({
	main: MainScreenReducer,
	auth: AuthReducer,
	mealPlan: MealPlanReducer,
	grocery: GroceryListReducer,
	chat: ChatReducer,
	recipeDetail: RecipeDetailReducer,
	home: HomeReducer,
	measurements: MeasurementsReducer,
	profile: ProfileReducer
});