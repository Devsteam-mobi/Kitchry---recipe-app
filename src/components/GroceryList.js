/**
 * Created by Devsteam.mobi on 7/5/17.
 */
import React, {Component} from 'react';
import {
	View,
	ScrollView,
	ActivityIndicator,
	Platform
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {GroceryListButton, InfoBox, Header} from './common';
import ListTitle from './common/ListTitle';
import {getGroceryList, changeDateForGroceryList, changePeriod} from '../actions';
import {prettyDate, colors, showAndroidCalendar} from '../actions/const';
import GroceryTabs from './common/GroceryTabs';
import GroupGroceryTabs from './common/GroupGroceryTabs';

class GroceryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: this.props.currentDayForGroceryList,
			period: this.props.period,
			groceryList: this.props.groceryList,
			groupBy: this.props.groupBy,
			groupGroceryListByRecipe: this.props.groupGroceryListByRecipe,
			error: this.props.error
		};
	}

	componentDidMount() {
		const {currentDayForGroceryList, changeDateForGroceryList, getGroceryList} = this.props;
		if (!currentDayForGroceryList) {
			changeDateForGroceryList(prettyDate());
			getGroceryList();
		}
		else {
			getGroceryList(currentDayForGroceryList);
		}
	}

	showCalendar() {
		const {changeDateForGroceryList, getGroceryList, currentDayForGroceryList} = this.props;
		if (Platform.OS === 'ios') {
			Actions.picker({
				setNewDate: changeDateForGroceryList,
				getList: getGroceryList,
				date: currentDayForGroceryList
			});
		}
		else {
			showAndroidCalendar(changeDateForGroceryList, getGroceryList, currentDayForGroceryList);
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.setState({
				date: newProps.currentDayForGroceryList,
				groceryList: newProps.groceryList,
				period: newProps.period,
				error: newProps.error,
				groupBy: newProps.groupBy,
				groupGroceryListByRecipe: newProps.groupGroceryListByRecipe
			});
		}
	}

	findIcons(groupName, id) {
		let icon = 'restaurant-food';
		const {groceryGroupIcons} = this.props;
		for (let i = 0; i < groceryGroupIcons.length; i++) {
			if (groupName.toLowerCase() === groceryGroupIcons[i].group.toLowerCase() || id === groceryGroupIcons[i].id) {
				icon = groceryGroupIcons[i].iconName;
			}
		}
		return icon;
	}

	renderGroupList(groupBy) {
		const {loading} = this.props;
		const {groceryList, error, period, groupGroceryListByRecipe} = this.state;
		if (loading) {
			return <ActivityIndicator style={{margin: 20}} color={colors.primaryOrange} size={'large'}/>;
		}
		else {
			if (groceryList && Object.keys(groceryList).length > 0 && !error) {
				let list = groupBy === 'recipes' ? groupGroceryListByRecipe : groceryList;
				return Object.keys(list).map((key, index) => {
					let icon = groupBy === 'recipes' ? 'restaurant-food' : this.findIcons(key, groceryList[key].groupId);
					return (
						<GroceryListButton
							key={index}
							title={key}
							list={list[key]}
							iconName={icon}
						/>);
				});
			} else {
				let message = period === 'day' ? 'No grocery list found for this day' : 'No grocery list found for this period';
				return (
					<InfoBox message={message}/>
				);
			}
		}
	}

	renderList(groupBy) {
		const {padding} = styles;
		return (
			<ScrollView style={padding}>
				{this.renderGroupList(groupBy)}
			</ScrollView>
		);
	}

	render() {//categories
		const {container, padding} = styles;
		const {getGroceryList, changeDateForGroceryList} = this.props;
		const {groupBy} = this.state;
		return (
			<View style={container}>
				<Header
					title={'Grocery list'}
					back
					rightButtonPress={() => this.showCalendar()}
					leftButtonPress={() => Actions.pop()}
					showRightIcon={true}
				/>
				<GroceryTabs/>
				<ListTitle
					style={padding}
					needArrow date={this.state.date}
					changeDate={changeDateForGroceryList}
					getList={getGroceryList}/>
				{groupBy === 'recipes' ? this.renderList('recipes') : this.renderList('categories')}
				<GroupGroceryTabs/>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1
	},
	padding: {
		paddingHorizontal: 10
	}
};

const mapStateToProps = ({grocery}) => {
	const {groceryList, currentDayForGroceryList, groceryGroupIcons, loading, period, error, groupBy, groupGroceryListByRecipe} = grocery;
	return {
		groceryList,
		currentDayForGroceryList,
		groceryGroupIcons,
		loading,
		period,
		error,
		groupBy,
		groupGroceryListByRecipe
	};
};

export default connect(mapStateToProps, {getGroceryList, changeDateForGroceryList, changePeriod})(GroceryList);

