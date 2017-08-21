/**
 * Created by Devsteam.mobi on 7/5/17.
 */
import {
	GROCERY_LIST_GET_FAIL,
	GROCERY_LIST_START_LOAD,
	GROCERY_LIST_GET_SUCCESS,
	CHANGE_CURRENT_DATE_IN_GROCERY_LIST,
	GROCERY_LIST_GET_GET_BY_DATE_SUCCESS,
	ACTIVE_PERIOD,
	CHANGE_GROUP_BY
} from '../actions/types';
const INITIAL_STATE = {
	error: '',
	loading: true,
	groceryList: {},
	currentDayForGroceryList: '',
	groceryGroupIcons: [
		{
			id: 1100,
			group: 'Vegetables and Vegetable Products',
			iconName: 'vegetables'
		},
		{
			id: 2000,
			group: 'Cereal Grains and Pasta',
			iconName: 'cereal-grains-and-pasta'
		},
		{
			id: 200,
			group: 'Spices and Herbs',
			iconName: 'spices'
		},
		{
			id: 900,
			group: 'Fruits and Fruit Juices',
			iconName: 'fruits-and-fruit-juices'
		},
		{
			id: 100,
			group: 'Dairy and Egg Products',
			iconName: 'dairy-and-eggs'
		},
		{
			id: 1600,
			group: 'Legumes and Legume Products',
			iconName: 'legumes-and-legume-products'
		},
		{
			id: 600,
			group: 'Soups, Sauces, and Gravies',
			iconName: 'soups-and-sausages'
		},
		{
			id: 1800,
			group: 'Baked Products',
			iconName: 'baked-products'
		},
		{
			id: 3600,
			group: 'Restaurant Foods',
			iconName: 'restaurant-food'
		},
		{
			id: 3500,
			group: 'American Indian/Alaska Native Foods',
			iconName: 'american-indian-alaska-native-foods'
		},
		{
			id: 2500,
			group: 'Snacks',
			iconName: 'snacks'
		},
		{
			id: 700,
			group: 'Sausages and Luncheon Meats',
			iconName: 'sausages-and-luncheon-meats'
		},
		{
			id: 1000,
			group: 'Pork Products',
			iconName: 'pork'
		},
		{
			id: 1300,
			group: 'Beef Products',
			iconName: 'beef-products'
		},
		{
			id: 1500,
			group: 'Finfish and Shellfish Products',
			iconName: 'finfish-and-shellfish'
		},
		{
			id: 400,
			group: 'Fats and Oils',
			iconName: 'fats-and-oils'
		},
		{
			id: 1400,
			group: 'Beverages',
			iconName: 'beverages'
		},
		{
			id: 800,
			group: 'Breakfast Cereals',
			iconName: 'breakfast-cereals'
		},
		{
			id: 2100,
			group: 'Fast Foods',
			iconName: 'fast-food'
		},
		{
			id: 1700,
			group: 'Lamb, Veal, and Game Products',
			iconName: 'lamb-and-veal'
		},
		{
			id: 1200,
			group: 'Nut and Seed Products',
			iconName: 'nut-and-seed-products'
		},
		{
			id: 500,
			group: 'Poultry Products',
			iconName: 'poultry'
		}, {
			id: 300,
			group: 'Baby Foods',
			iconName: 'baby-foods'
		}, {
			id: 1900,
			group: 'Sweets',
			iconName: 'sweets'
		}, {
			id: 2200,
			group: 'Meals, Entrees, and Side Dishes',
			iconName: 'meals-entrees-and-side-dishes'
		}
	],
	period: 'day',
	groupBy: 'categories',
	groupGroceryListByRecipe: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GROCERY_LIST_START_LOAD:
			return {...state, loading: true, error: ''};
		case ACTIVE_PERIOD:
			return {...state, period: action.period};
		case CHANGE_GROUP_BY:
			return {...state, groupBy: action.groupBy};
		case GROCERY_LIST_GET_SUCCESS:
			return {...state, error: '', loading: false, groceryList: action.groceryList};
		case GROCERY_LIST_GET_GET_BY_DATE_SUCCESS:
			return {
				...state,
				error: '',
				loading: false,
				groceryList: action.groceryList,
				groupGroceryListByRecipe: action.groupGroceryListByRecipe,
				currentDayForGroceryList: action.date
			};
		case GROCERY_LIST_GET_FAIL:
			return {...state, error: action.error, loading: false};
		case CHANGE_CURRENT_DATE_IN_GROCERY_LIST:
			return {...state, currentDayForGroceryList: action.date};
		default:
			return state;
	}
};
