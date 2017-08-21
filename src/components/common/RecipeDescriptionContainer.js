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

class RecipeDescriptionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDescriptionOpen: true
		};
		this.animatedValue = new Animated.Value(0);
	}

	renderDescription() {
		const {description} = this.props;
		const {descriptionContainer, descriptionStyle} = styles;
		if (this.state.isDescriptionOpen) {
			return (
				<View style={descriptionContainer}>
					<Text style={descriptionStyle}>{description}</Text>
				</View>
			);
		}
		else {
			return null;
		}
	}

	onPress() {
		if (this.state.isDescriptionOpen) {
			showAnimation(this.animatedValue, 1);
		} else {
			showAnimation(this.animatedValue, 0);
		}
		this.setNewState();
	}

	setNewState() {
		this.setState({
			isDescriptionOpen: !this.state.isDescriptionOpen
		});
	}

	render() {
		const {buttonContainer, textContainer, textStyle} = styles;
		const spin = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '180deg']
		});
		// const scale = this.animatedValue.interpolate({
		// 	inputRange: [0, 1],
		// 	outputRange: ['0deg', '-180deg']
		// });
		return (
			<View style={{flex: 1}}>
				<TouchableOpacity style={buttonContainer} onPress={() => this.onPress()}>
					<View style={textContainer}>
						<Text style={textStyle}>Description</Text>
						<Animated.View style={{transform: [{rotate: spin}]}}>
							<Icon name={'angle-up'} size={22} color={colors.primaryOrange}/>
						</Animated.View>
					</View>
				</TouchableOpacity>
				{this.renderDescription()}
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
		borderBottomColor: colors.primaryGreen
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
	},
	descriptionContainer: {
		paddingHorizontal: 10
	},
	descriptionStyle: {
		fontSize: 16,
		color: '#000'
	}
};
export {RecipeDescriptionContainer};