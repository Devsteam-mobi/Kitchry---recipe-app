/**
 * Created by Devsteam.mobi on 7/10/17.
 */
/**
 * Created by Devsteam.mobi on 7/5/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	DatePickerIOS,
	TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {prettyDate, colors} from '../actions/const';
import {BackHeader} from './common';

class DatePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(this.props.date),
			formatDate: ''
		};
		this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
		this.onApproveButtonPress = this.onApproveButtonPress.bind(this);
	}

	componentDidMount() {
		this.setState({
			formatDate: prettyDate(this.state.date)
		});
	}


	onDateChange(date) {
		this.setState({
			date: date,
			formatDate: prettyDate(date)
		});
	}

	onCancelButtonPress() {
		Actions.pop();
	}

	onApproveButtonPress() {
		const {formatDate} = this.state;
		const {setNewDate, getList} = this.props;
		setNewDate(formatDate);
		getList(formatDate);
		Actions.pop();
	}

	renderDatePicker() {
		return (
			<DatePickerIOS
				style={{paddingHorizontal: 10}}
				date={this.state.date}
				mode="date"
				onDateChange={(date) => this.onDateChange(date)}/>
		);
	}

	render() {
		const {container, buttonContainer, title, buttonStyle, buttonApprove, buttonCancel, buttonTitle} = styles;
		return (
			<View style={container}>
				<BackHeader leftButtonPress={() => Actions.pop()}/>
				<Text style={title}>Choose date</Text>
				{this.renderDatePicker()}
				<View style={buttonContainer}>
					<TouchableOpacity style={[buttonStyle, buttonCancel]} onPress={this.onCancelButtonPress}>
						<Text
							style={buttonTitle}>Cancel
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[buttonStyle, buttonApprove]} onPress={this.onApproveButtonPress}><Text
						style={buttonTitle}>Ok</Text></TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		marginBottom: 60
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 10
	},
	buttonStyle: {
		height: 40,
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	buttonApprove: {
		backgroundColor: colors.primaryGreen,
		marginLeft: 5
	},
	buttonCancel: {
		backgroundColor: colors.primaryOrange
	},
	buttonTitle: {
		color: '#fff',
		fontSize: 18
	},
	title: {
		textAlign: 'center',
		fontSize: 22,
		paddingVertical: 10
	}
};

export default DatePicker;
