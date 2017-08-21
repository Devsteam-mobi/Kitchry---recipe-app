/**
 * Created by Devsteam.mobi on 8/3/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {changeGroupBy} from '../../actions';
import {colors} from '../../actions/const';

class GroupGroceryTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupBy: this.props.groupBy
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.setState({
				groupBy: newProps.groupBy
			});
		}
	}

	onTabPress(groupBy) {
		if (groupBy !== this.props.groupBy) {
			this.props.changeGroupBy();
		}
	}

	render() {
		const {groupBy} = this.state;
		const {container, tabStyle, rightTab, tabTitle, tabActiveTitle} = styles;
		const recipesStyle = groupBy === 'categories' ? tabTitle : tabActiveTitle;
		const categoriesStyle = groupBy === 'categories' ? tabActiveTitle : tabTitle;
		return (
			<View style={{height: 60}}>
				<View style={container}>
					<TouchableOpacity
						onPress={() => this.onTabPress('recipes')}
						style={[tabStyle]}>
						<Text style={recipesStyle}>RECIPES</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.onTabPress('categories')}
						style={[tabStyle, rightTab]}>
						<Text style={categoriesStyle}>CATEGORIES</Text>
					</TouchableOpacity>
				</View>
			</View>);
	}
}
const color = {
	iconColor: '#929292'
};

const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		borderTopColor: '#c9cacc',
		borderTopWidth: 1
	},
	tabStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightTab: {
		borderLeftColor: '#c9cacc',
		borderLeftWidth: 1
	},
	tabTitle: {
		color: color.iconColor,
		fontWeight: 'bold'
	},
	tabActiveTitle: {
		color: colors.primaryOrange,
		fontWeight: 'bold'
	}
};

const mapStateToProps = ({grocery}) => {
	const {groupBy} = grocery;
	return {groupBy};
};

export default connect(mapStateToProps, {changeGroupBy})(GroupGroceryTabs);

