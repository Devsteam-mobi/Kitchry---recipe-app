import React, {Component} from 'react';
import {
	View,
	Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {changeActiveTab, getMealPlan, getGroceryList, changeDate, changeDateForGroceryList} from '../actions';
import {Header, Tabs, SideMenu} from './common';
import {showAndroidCalendar} from '../actions/const';
import HomePage from './HomePage';
import MealPlan from './MealPlan';
import Profile from './ProfileScreen';
import GroceryList from './GroceryList';

class MainScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false,
			activeTabId: this.props.activeTabId,
			title: this.props.title
		};
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
	}

	componentDidMount() {
		//this.props.getMealPlan();
		//this.props.getGroceryList();
	}

	componentWillReceiveProps(newProps) {
		if (newProps.activeTabId !== this.props.activeTabId) {
			this.setState({
				activeTabId: newProps.activeTabId,
				title: newProps.title
			});
		}
	}

	openMenu() {
		this.setState({
			isMenuOpen: true
		});
	}

	closeMenu() {
		this.setState({
			isMenuOpen: false
		});
	}

	renderSideMenu() {
		if (this.state.isMenuOpen) {
			return (<SideMenu close={this.closeMenu}/>);
		}
		else {
			return null;
		}
	}

	showCalendar() {
		const {activeTabId} = this.state;
		const {changeDate, getMealPlan, changeDateForGroceryList, getGroceryList, currentDayForGroceryList, currentDateMealPlan} = this.props;
		if (Platform.OS === 'ios') {
			if (activeTabId === 1) {
				Actions.picker({setNewDate: changeDate, getList: getMealPlan, date: currentDateMealPlan});
			}
			if (activeTabId === 2) {
				Actions.picker({
					setNewDate: changeDateForGroceryList,
					getList: getGroceryList,
					date: currentDayForGroceryList
				});
			}
		}
		else {
			if (activeTabId === 1) {
				showAndroidCalendar(changeDate, getMealPlan, currentDateMealPlan);
			}
			if (activeTabId === 2) {
				showAndroidCalendar(changeDateForGroceryList, getGroceryList, currentDayForGroceryList);
			}
		}
	}

	renderContent() {
		switch (this.state.activeTabId) {
			case 0:
				return <HomePage/>;
			case 1:
				return <MealPlan />;
			case 2:
				return <GroceryList />;
			case 5:
				return <Profile />;
		}
	}

	render() {
		const {title} = this.props;
		const {activeTabId} = this.state;
		return (
			<View style={styles.container}>
				<Header
					title={title}
					showLeftButton={false}
					leftButtonPress={this.openMenu}
					rightButtonPress={this.showCalendar}
					showRightIcon={activeTabId === 1 || activeTabId === 2}
				/>
				{this.renderContent()}
				<Tabs id={activeTabId} onChangeTab={(id, title) => this.props.changeActiveTab(id, title)}/>
				{this.renderSideMenu()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1
	}
};
const mapStateToProps = (state) => {
	console.log("MainScreen.js mapStateToProps state", state);
	const {main, grocery, mealPlan} = state;
	const {title, activeTabId} = main;
	const {currentDayForGroceryList} = grocery;
	const {currentDateMealPlan} = mealPlan;
	return {title, activeTabId, currentDayForGroceryList, currentDateMealPlan};
};

export default connect(mapStateToProps, {
	changeActiveTab,
	getMealPlan,
	getGroceryList,
	changeDate,
	changeDateForGroceryList
})(MainScreen);

