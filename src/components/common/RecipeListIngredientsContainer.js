/**
 * Created by Devsteam.mobi on 7/23/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, showAnimation} from '../../actions/const';
import {GroceryListItem} from './GroceryListItem';

class RecipeListIngredientsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isListOpen: false
		};
		this.animatedValue = new Animated.Value(0);
	}

	renderList() {
		const {list} = this.props;
		if (this.state.isListOpen) {
			if (list.length > 0) {
				return list.map((item, index) => {
					return (
						<GroceryListItem item={item} key={index}/>
					);
				});
			}
		}
		else {
			return null;
		}
	}

	onPress() {
		if (!this.state.isListOpen) {
			showAnimation(this.animatedValue, 1);
		} else {
			showAnimation(this.animatedValue, 0);
		}
		this.setNewState();
	}

	setNewState() {
		this.setState({
			isListOpen: !this.state.isListOpen
		});
	}

	render() {
		const {buttonContainer, textContainer, textStyle} = styles;
		const spin = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '-180deg']
		});
		return (
			<View style={{flex: 1}}>
				<TouchableOpacity style={buttonContainer} onPress={() => this.onPress()}>
					<View style={textContainer}>
						<Text style={textStyle}>Ingredients</Text>
						<Animated.View style={{transform: [{rotate: spin}]}}>
							<Icon name={'angle-down'} size={22} color={colors.primaryOrange}/>
						</Animated.View>
					</View>
				</TouchableOpacity>
				<View style={{marginLeft: 10}}>
					{this.renderList()}
				</View>
			</View>
		);
	}
}
const styles = {
	buttonContainer: {
		height: 60,
		flexDirection: 'column',
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.primaryGreen,
		marginTop: 10
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	textStyle: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 18,
		marginRight: 10,
		flex: 0.8
	}
};
export {RecipeListIngredientsContainer};