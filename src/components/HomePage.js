/**
 * Created by Devsteam.mobi on 6/25/17.
 */

import React, {Component} from 'react';
import {
	ScrollView,
	View,
	ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import {UpcomingMeals, ReviewYesterday, Goals} from './common';
import {getMealPlan, getDataForHomePage, openRecipe} from '../actions';
import {colors} from '../actions/const';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingUpcoming: this.props.loadingUpcoming,
			loadingReviewList: this.props.loadingReviewList,
			upcomingMeal: this.props.upcomingMeal,
			reviewMealList: this.props.reviewMealList,
			idPressedItem: ''
		};
	}

	componentDidMount() {
		this.props.getDataForHomePage();
	}

	componentWillReceiveProps(newProps) {
		if (newProps.upcomingMeal !== this.props.upcomingMeal) {
			this.setState({
				upcomingMeal: newProps.upcomingMeal,
				loadingUpcoming: newProps.loadingUpcoming
			});
		}
		if (newProps.reviewMealList !== this.props.reviewMealList || newProps.reviewMealList.length !== this.props.reviewMealList.length) {
			this.setState({
				reviewMealList: newProps.reviewMealList,
				loadingReviewList: newProps.loadingReviewList
			});
		}
	}

	renderReviewList() {
		const {loadingReviewList, reviewMealList} = this.state;
		if (!loadingReviewList && reviewMealList && reviewMealList.length > 0) {
			return (<ReviewYesterday
				list={reviewMealList}
				onPressItem={(item, img) => this.props.openRecipe(item, img)}/>);
		} else {
			return null;
		}
	}

	renderUpcoming() {
		const {loadingUpcoming, upcomingMeal} = this.state;
		if (!loadingUpcoming && upcomingMeal) {
			return <UpcomingMeals meal={upcomingMeal}/>;
		} else {
			return null;
		}
	}

	renderUpcomingMeal() {
		const {loadingReviewList, loadingUpcoming} = this.state;
		if (!loadingUpcoming && !loadingReviewList) {
			return (
				<ScrollView style={styles.container}>
					{this.renderUpcoming()}
					{this.renderReviewList()}
					<Goals meal={this.props.listDish[2]}/>
				</ScrollView>
			);
		}
		else {
			return <ActivityIndicator style={{margin: 20}} color={colors.primaryOrange} size={'large'}/>;
		}
	}

	render() {
		return (
			<View style={{flex: 1}}>
				{this.renderUpcomingMeal()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		marginBottom: 60
	}
};
const mapStateToProps = ({main, home}) => {
	const {title, listDish, newsList} = main;
	const {
		error,
		loadingUpcoming,
		loadingReviewList,
		upcomingMeal,
		reviewMealList
	} = home;
	return {
		title, listDish, newsList, error,
		loadingUpcoming,
		loadingReviewList,
		upcomingMeal,
		reviewMealList
	};
};

export default connect(mapStateToProps, {getMealPlan, getDataForHomePage, openRecipe})(HomePage);

