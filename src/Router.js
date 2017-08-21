/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import MainScreen from './components/MainScreen';
import SearchScreen from './components/SearchScreen';
import LoginScreen from './components/LoginScreen';
import DatePicker from'./components/DatePicker';
import Chat from'./components/Chat';
import RecipeDetail from'./components/RecipeDetail';
import MeasurementsForm from './components/MeasurementsForm';
import GroceryList from './components/GroceryList';

import ProfileScreen from './components/ProfileScreen';

class RouterComponent extends Component {

	render() {
		return (
			<Router>
				<Scene key='auth' hideNavBar initial>
					<Scene key='login' component={LoginScreen} panHandlers={null}/>
				</Scene>
				<Scene key="main">
					<Scene key="mainScreen" hideNavBar component={MainScreen} title=""/>
				</Scene>
				<Scene key="search" hideNavBar component={SearchScreen}/>
				<Scene key="picker" hideNavBar component={DatePicker}/>
				<Scene key="grocery" hideNavBar component={GroceryList}/>
				<Scene key="chat" hideNavBar component={Chat}/>
				<Scene key="recipeDetail" hideNavBar component={RecipeDetail}/>
				<Scene key="measurements" direction="vertical" hideNavBar component={MeasurementsForm}/>
				<Scene key="profile" direction="vertical" hideNavBar component={ProfileScreen}/>
			</Router>
		);
	}
}

export default RouterComponent;