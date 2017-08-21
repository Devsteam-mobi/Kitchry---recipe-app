/**
 * Created by Devsteam.mobi on 7/28/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import {BackHeader}from './common';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {colors} from '../actions/const';
import {sendMeaserentsToServer} from '../actions';

class MeasurementsForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.measurementsData,
			loading: this.props.loading
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loading !== this.props.loading) {
			this.setState({
				loading: nextProps.loading
			});
		}
	}

	onTextChange(text, name) {
		let data = this.state.data;
		data[name].amount = text;
		this.setState({
			data: data
		});
	}

	rowItem(item, index) {
		const {data} = this.state;
		const {inputContainer, unitStyle, titleContainer, title, input, unitAmountContainer} = styles;
		return (
			<View key={index} style={inputContainer}>
				<View style={titleContainer}>
					<Text style={title}>{data[item].title}</Text>
				</View>
				<View style={unitAmountContainer}>
					<TextInput
						style={[input]}
						value={data[item].amount.toString()}
						underlineColorAndroid={'transparent'}
						keyboardType={'numeric'}
						placeholder={'Input number'}
						autoCorrect={false}
						autoCapitalize="none"
						onChangeText={(text) => {
							this.onTextChange(text, item);
						}}
						maxLength={5}
					/>
					<Text style={unitStyle}>{data[item].unit}</Text>
				</View>
			</View>
		);
	}

	onButtonPress() {
		console.log(this.state.data);
		this.props.sendMeaserentsToServer(this.state.data);
	}

	renderButtons() {
		const {buttonContainer, button, buttonTitleContainer, buttonTitle} = styles;
		if (this.state.loading) {
			return (<ActivityIndicator style={{margin: 20}} color={colors.primaryOrange} size={'large'}/>
			);
		}
		else {
			return (
				<View style={buttonContainer}>
					<TouchableOpacity
						style={button}
						onPress={() => this.onButtonPress()}
					>
						<View style={buttonTitleContainer}>
							<Text style={buttonTitle}>Save changes</Text>
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	}


	render() {
		const {data} = this.state;
		const list = Object.keys(data).map((item, index) => {
			return this.rowItem(item, index);
		});
		return (
			<View style={{flex: 1}}>
				<BackHeader title={'Measurements'} leftButtonPress={() => Actions.pop()}/>
				{list}
				{this.renderButtons()}
			</View>
		);
	}
}
const styles = {
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomColor: 'rgba(0,0,0,0.3)',
		borderBottomWidth: 1
	},
	titleContainer: {
		width: '70%'
	},
	title: {
		fontSize: 18
	},
	input: {
		backgroundColor: '#fff',
		fontWeight: 'bold',
		height: 40,
		width: '60%',
		color: colors.primaryOrange,
		textAlign: 'right'
	},
	unitAmountContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	unitStyle: {
		paddingLeft: 3,
		fontSize: 16,
		color: colors.primaryOrange
	},
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 90
	},
	button: {
		flex: 1,
		width: '80%',
		backgroundColor: colors.primaryGreen,
		paddingVertical: 20,
		paddingHorizontal: 20,
		marginVertical: 20,
		borderRadius: 5,
		justifyContent: 'center'
	},
	buttonTitleContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTitle: {
		color: '#fff',
		fontSize: 18
	}
};

const mapStateToProps = ({measurements}) => {
	const {
		error,
		loading,
		measurementsData
	} = measurements;
	return {
		error,
		loading,
		measurementsData
	};
};

export default connect(mapStateToProps, {sendMeaserentsToServer})(MeasurementsForm);

