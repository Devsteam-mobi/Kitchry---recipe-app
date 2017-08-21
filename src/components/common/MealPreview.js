/**
 * Created by Devsteam.mobi on 7/7/17.
 */
/**
 * Created by Devsteam.mobi on 7/5/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import {ImageContainer} from './ImageContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

class MealPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meal: this.props.meal
		};
		this.onPressMeal = this.onPressMeal.bind(this);
	}

	renderIconsColumn(item1, item2) {
		const {iconTitle, iconsRow, leftColumnIconsContainer, rightColumnIconsContainer} = styles;
		return (
			<View
				style={iconsRow}>
				<View style={leftColumnIconsContainer}>
					<Icon name={item1.name} color={colors.iconColor} size={18}/>
					<Text style={iconTitle}>{item1.value}</Text>
				</View>
				<View style={rightColumnIconsContainer}>
					<Icon name={item2.name} color={colors.iconColor} size={18}/>
					<Text style={iconTitle}>{item2.value}</Text>
				</View>
			</View>);
	}

	renderRowWithIcons(cusin, time, ckal, totalServings) {
		const {iconRowContainer} = styles;
		let allItems = [{name: 'globe', value: cusin || 'Famous'}, {
			name: 'clock-o',
			value: time || '30min'
		}, {name: 'cutlery', value: (ckal || 0 ) + ' Cal'}, {name: 'child', value: totalServings}];

		return (
			<View style={iconRowContainer}>
				{this.renderIconsColumn(allItems[0], allItems[1])}
				{this.renderIconsColumn(allItems[2], allItems[3])}
			</View>
		);
	}

	onPressMeal() {
		this.props.getRecipeById();
	}

	render() {
		const {meal} = this.state;
		const {container, descriptionContainer, mealTitle, mealType} = styles;
		return (
			<TouchableOpacity style={container} onPress={this.onPressMeal}>
				<ImageContainer imgUrl={meal.image}/>
				<View style={descriptionContainer}>
					<Text style={mealTitle}>{meal.title || 'Meal Title'}</Text>
					<Text
						style={mealType}>{meal.type}</Text>
					{this.renderRowWithIcons(meal.cuisine, meal.cookingTime, meal.kcal, meal.totalServings)}
				</View>
			</TouchableOpacity>
		);
	}
}
const colors = {
	imgBg: '#847e7e',
	iconColor: 'rgb(203, 75, 63)',
	textColorWhite: '#fff',
	textColorBlack: '#000'
};

const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		borderTopWidth: 1,
		borderColor: 'rgba(0,0,0,0.1)',
		paddingVertical: 10
	},
	descriptionContainer: {
		flex: 0.8,
		paddingVertical: 5,
		paddingHorizontal: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	mealTitle: {
		fontSize: 16
	},
	mealType: {
		color: colors.textColorBlack,
		fontSize: 14,
		fontWeight: 'bold',
		paddingVertical: 5
	},
	iconRowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	iconsRow: {
		flexDirection: 'column',
		marginBottom: 5,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		flex: 1
	},
	iconTitle: {
		paddingHorizontal: 2,
		fontSize: 12
	},
	leftColumnIconsContainer: {
		flexDirection: 'row',
		padding: 0,
		marginBottom: 2,
		marginLeft: 5
	},
	rightColumnIconsContainer: {
		flexDirection: 'row',
		padding: 0,
		marginLeft: 5
	}
};

export {MealPreview};