/**
 * Created by Devsteam.mobi on 7/30/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {changePeriod, getGroceryList} from '../../actions';
import {colors} from '../../actions/const';

class GroceryTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			period: this.props.period
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.setState({
				period: newProps.period
			});
		}
	}

	onTabPress(name) {
		this.props.changePeriod(name);
		this.props.getGroceryList();
	}

	render() {
		const {period} = this.state;
		const {container, tabStyle, rightTab, tabTitle} = styles;
		const dayStyle = period === 'day' ? 'rgba(255,255,255,0.1)' : 'transparent';
		const rightStyle = period === 'week' ? 'rgba(255,255,255,0.1)' : 'transparent';
		return (
			<View style={{height: 60}}>
				<View style={container}>
					<TouchableOpacity
						onPress={() => this.onTabPress('day')}
						style={[tabStyle, {backgroundColor: dayStyle}]}>
						<Text style={tabTitle}>Daily</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.onTabPress('week')}
						style={[tabStyle, rightTab, {backgroundColor: rightStyle}]}>
						<Text style={tabTitle}>Weekly</Text>
					</TouchableOpacity>
				</View>
			</View>);
	}
}
const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
		backgroundColor: colors.primaryGreen,
		borderTopColor: 'rgba(255,255,255,0.3)',
		borderTopWidth: 1
	},
	tabStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightTab: {
		borderLeftColor: 'rgba(255,255,255,0.4)',
		borderLeftWidth: 1
	},
	tabTitle: {
		color: '#fff'
	}
};

const mapStateToProps = ({grocery}) => {
	const {period} = grocery;
	return {period};
};

export default connect(mapStateToProps, {changePeriod, getGroceryList})(GroceryTabs);

