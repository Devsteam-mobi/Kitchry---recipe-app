/**
 * Created by Devsteam.mobi on 7/23/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../actions/const';

class IconRowsForRecipeDetail extends Component {
	render() {
		const {cuisine, cook_time, kcal, total_servings, title} = this.props.recipe;
		const {container, iconContainer, iconTitle, titleStyle} = styles;
		const allItems = [{
			name: 'globe',
			value: cuisine || 'Famous'
		}, {
			name: 'users',
			value: (total_servings || 0 ) + ' Serving'
		}, {
			name: 'cutlery',
			value: (kcal || 0 ) + ' Cal'
		}, {
			name: 'clock-o',
			value: cook_time || '30min'
		}];
		return (
			<View style={{flex: 1}}>
				<Text style={titleStyle}>{title}</Text>
				<View style={container}>
					{allItems.map((icon, index) => {
						return (
							<View style={iconContainer} key={index}>
								<Icon name={icon.name} color={colors.primaryOrange} size={18}/>
								<Text style={iconTitle}>{icon.value}</Text>
							</View>);
					})}
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		paddingHorizontal: 10,
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	iconContainer: {
		flexDirection: 'row',
		paddingRight: 5
	},
	iconTitle: {
		color: '#000',
		paddingLeft: 5
	},
	titleStyle: {
		color: '#000',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: 20
	}
};

export {IconRowsForRecipeDetail};