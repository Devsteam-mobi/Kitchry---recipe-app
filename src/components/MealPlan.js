/**
 * Created by Devsteam.mobi on 7/4/17.
 */

import React, {Component} from 'react';
import {
	View,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import {MealPreview, InfoBox}from './common';
import ListTitle from './common/ListTitle';
import {connect} from 'react-redux';
import {getMealPlan, changeDate, getRecipeById} from '../actions';
import {prettyDate, colors} from '../actions/const';

class MealPlan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meals: this.props.mealPlans.mealplan,
			date: this.props.currentDateMealPlan
		};
	}

	componentDidMount() {
		const {currentDateMealPlan, changeDate, getMealPlan} = this.props;
		if (!currentDateMealPlan) {
			changeDate(prettyDate());
			getMealPlan();
		} else {
			getMealPlan(currentDateMealPlan);
		}

	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.setState({
				meals: newProps.mealPlans.mealplan,
				date: newProps.currentDateMealPlan
			});
		}
	}

	onMealPress(id, img) {
		this.props.getRecipeById(id, img);
	}

	renderMeals() {
		const {meals} = this.state;
		if (this.props.loading) {
			return (
				<ActivityIndicator style={{margin: 20}} color={colors.primaryOrange} size={'large'}/>
			);
		}
		else {
			if (meals && meals.length > 0) {
				return meals.map((meal, index) => {
					if (meal.id === -1) {
						return null;
					} else {
						return <MealPreview
							meal={meal}
							key={index}
							getRecipeById={() => this.onMealPress(meal.id, meal.image)}/>;
					}
				});
			} else {
				return (
					<InfoBox message={'No meal plan found for this day'}/>
				);
			}
		}
	}

	render() {
		const {scrollContainer} = styles;
		const {changeDate, getMealPlan} = this.props;
		return (
			<View style={scrollContainer}>
				<ListTitle needArrow date={this.state.date} changeDate={changeDate} getList={getMealPlan} mealplan/>
				<ScrollView>
					{this.renderMeals()}
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	scrollContainer: {
		flex: 1,
		marginBottom: 60,
		marginHorizontal: 10
	}
};

const mapStateToProps = ({mealPlan}) => {
	const {mealPlans, currentDateMealPlan, loading} = mealPlan;
	return {mealPlans, currentDateMealPlan, loading};
};

export default connect(mapStateToProps, {getMealPlan, changeDate, getRecipeById})(MealPlan);

