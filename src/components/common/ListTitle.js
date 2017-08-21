/**
 * Created by Devsteam.mobi on 7/16/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changePeriod} from '../../actions';
import {View, Text, TouchableOpacity} from 'react-native';
import {formatDate, colors, prettyDate} from '../../actions/const';
import Icon from 'react-native-vector-icons/FontAwesome';

class ListTitle extends Component {
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

	loadPrevDay() {
		let tmp = new Date(this.props.date).getTime() - 60 * 60 * 24 * 1000;
		let prevDay = new Date(tmp);
		this.props.changeDate(prettyDate(prevDay));
		this.props.getList(prettyDate(prevDay));
	}

	loadNextDay() {
		let tmp = new Date(this.props.date).getTime() + 60 * 60 * 24 * 1000;
		let nextDay = new Date(tmp);
		this.props.changeDate(prettyDate(nextDay));
		this.props.getList(prettyDate(nextDay));
	}

	renderArrowLeft() {
		const {iconStyle, center} = styles;
		if (this.props.needArrow) {
			return (
				<TouchableOpacity style={[center, iconStyle]} onPress={() => this.loadPrevDay()}>
					<Icon name="angle-left" style={iconStyle} size={22} color={colors.primaryOrange}/>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	}

	renderArrowRight() {
		const {iconStyle, center} = styles;
		if (this.props.needArrow) {
			return (
				<TouchableOpacity style={[center, iconStyle]} onPress={() => this.loadNextDay()}>
					<Icon name="angle-right" style={iconStyle} size={22} color={colors.primaryOrange}/>
				</TouchableOpacity>

			);
		} else {
			return null;
		}
	}

	render() {
		const {dateContainer, date, center} = styles;
		const {period} = this.state;
		const {mealplan} = this.props;
		const week = mealplan ? null : period === 'day' ? null : ' + 7days';
		return (
			<View style={dateContainer}>
				{this.renderArrowLeft()}
				<Text style={[date, center]}>{formatDate(this.props.date)}{week}</Text>
				{this.renderArrowRight()}
			</View>
		);
	}
}
const styles = {
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10
	},
	date: {
		fontSize: 20,
		flex: 0.7,
		textAlign: 'center'
	},
	iconStyle: {
		flex: 0.15
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	}
};

const mapStateToProps = ({grocery}) => {
	const {period} = grocery;
	return {period};
};

export default connect(mapStateToProps, {changePeriod})(ListTitle);

