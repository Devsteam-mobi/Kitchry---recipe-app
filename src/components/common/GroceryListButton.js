/**
 * Created by Devsteam.mobi on 7/12/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import {GroceryListItem} from './GroceryListItem';
import {colors} from '../../actions/const';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import foodIcon from '../../selection.json';
const FoodIcon = createIconSetFromIcoMoon(foodIcon);


class GroceryListButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isListShow: false
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.setState({
				isListShow: false
			});
		}
	}

	renderList() {
		if (this.state.isListShow) {
			if (this.props.list && this.props.list.length > 0) {
				return this.props.list.map((item, index) => {
					return (
						<GroceryListItem item={item} key={index}/>
					);
				});
			}
		} else {
			return null;
		}
	}

	onButtonPress() {
		this.setState({
			isListShow: !this.state.isListShow
		});
	}

	render() {
		const {buttonContainer, textContainer, textStyle, groupIconContainer} = styles;
		const iconName = this.state.isListShow ? 'angle-up' : 'angle-down';
		return (
			<View>
				<TouchableOpacity
					style={buttonContainer}
					onPress={() => this.onButtonPress()}>
					<View style={textContainer}>
						<View style={groupIconContainer}>
							<FoodIcon name={this.props.iconName} size={25} color={colors.primaryOrange}/>
						</View>
						<Text
							style={textStyle}>{this.props.title} ({this.props.list.length})
						</Text>
						<Icon name={iconName} size={22} color={colors.primaryOrange}/>
					</View>
				</TouchableOpacity>
				<View style={{marginLeft: 20}}>
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
		borderBottomColor: colors.primaryGreen
	},
	groupIconContainer: {
		flex: 0.1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
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

export {GroceryListButton};