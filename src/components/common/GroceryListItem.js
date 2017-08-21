/**
 * Created by Devsteam.mobi on 7/12/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import {colors} from '../../actions/const';
import Icon from 'react-native-vector-icons/FontAwesome';

class GroceryListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCheck: false
		};
		this.onPress = this.onPress.bind(this);
	}

	componentDidMount() {
		const {item} = this.props;
		AsyncStorage.getItem(item.ndb, (err, res) => {
			if (res) {
				this.setState({
					isCheck: true
				});
			}
		});
	}

	renderIcon() {
		const {iconStyle} = styles;
		if (this.state.isCheck) {
			return <Icon style={iconStyle} name='check' size={20} color={colors.primaryGreen}/>;
		} else {
			return <Icon style={iconStyle} name='check' size={20} color={'rgba(0,0,0,0.3)'}/>;
		}
	}

	onPress() {
		const {item} = this.props;
		const {isCheck} = this.state;
		if (isCheck) {
			AsyncStorage.removeItem(item.ndb, (err) => {
				if (!err) {
					this.setState({
						isCheck: false
					});
				}
			});
		}
		else {
			AsyncStorage.setItem(item.ndb, item.ndb, (err) => {
				if (!err) {
					this.setState({
						isCheck: true
					});
				}
			});
		}
	}

	render() {
		const {container, titleStyle, qtyStyle} = styles;
		const {item} = this.props;
		const checkStyle = this.state.isCheck ? {textDecorationLine: 'line-through'} : null;
		return (
			<TouchableOpacity onPress={this.onPress}>
				<View style={container}>
					{this.renderIcon()}
					<Text style={[titleStyle, checkStyle]}>{item.name}</Text>
					<Text style={[qtyStyle, checkStyle]}>{item.qty} {item.unit}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
const styles = {
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 3,
		paddingVertical: 10,
		marginBottom: 7,
		borderBottomColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: 1
	},
	titleStyle: {
		fontSize: 18,
		flex: 0.6,
		marginRight: 5
	},
	iconContainer: {
		flex: 0.1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	qtyStyle: {
		flex: 0.3,
		textAlign: 'center',
		fontWeight: '500'
	},
	iconStyle: {
		flex: 0.1,
		marginRight: 5
	}
};
export {GroceryListItem};