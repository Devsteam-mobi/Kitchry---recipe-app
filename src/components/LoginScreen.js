/**
 * Created by Devsteam.mobi on 7/2/17.
 */

import React, {Component} from 'react';
import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	Platform,
	ActivityIndicator,
	StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {emailChanged, checkAuth, passwordChanged, loginUser, detectPlatform, getDeviceDimensions} from '../actions';
import {Input, Button} from './common';

let nextInput;
export class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: this.props.loading,
			passwordVisibility: true,
			visibilityIconColor: '#fff',
			error: this.props.error
		};
		this.onButtonPress = this.onButtonPress.bind(this);
	}

	componentWillMount() {
		this.props.checkAuth();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loading !== this.props.loading) {
			this.setState({
				loading: nextProps.loading,
				error: nextProps.error
			});
		}
	}


	getNextInput(data) {
		nextInput = data;
	}

	changeFocus() {
		if (nextInput !== undefined) {
			nextInput.focus();
		}
	}

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}


	onButtonPress() {
		const {email, password} = this.props;
		this.props.loginUser({email, password});
		Keyboard.dismiss();
	}

	changePasswordVisibility() {
		let iconColor = this.state.visibilityIconColor === '#fff' ? 'red' : '#fff';
		this.setState({
			passwordVisibility: !this.state.passwordVisibility,
			visibilityIconColor: iconColor
		});
	}

	renderStatusBar() {
		if (Platform.OS === 'android') {
			return (<StatusBar
				translucent={true}
				backgroundColor={'transparent'}
			/>);
		} else {
			return (<StatusBar
				barStyle="light-content"
			/>);
		}
	}

	renderButtonSubmit() {
		if (this.state.loading) {
			return <ActivityIndicator color={'#fff'} size={'large'}/>;
		} else {
			return (
				<Button
					title="Get Started"
					onPress={this.onButtonPress}
				/>
			);
		}
	}

	showError() {
		if (this.state.error) {
			return (
				<Text
					style={{
						paddingVertical: 7,
						textAlign: 'center',
						color: 'red'
					}}>{this.state.error}</Text>
			);
		}
		else {
			return null;
		}
	}

	showForm() {
		if (Platform.OS === 'ios') {
			return (
				<KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
					{this.renderLoginFields()}
				</KeyboardAvoidingView>
			);
		}
		else {
			return (
				<View style={{flex: 1}}>
					{this.renderLoginFields()}
				</View>
			);
		}
	}

	showLoading() {
		const {iconStyle, formContainer, inputsContainer, inputWrap, firstInput, wrapper, lastInput} = loginStyles;

		if (this.state.loading) {
			return (
				<View style={{flex: 1}}>
					<ActivityIndicator color={'#fff'} size={'large'}/>
				</View>
			);
		} else {
			return (
				<View style={formContainer}>
					<View style={inputsContainer}>
						<View style={[inputWrap, firstInput]}>
							<Icon style={iconStyle} name="ios-mail-outline" size={20} color="#fff"/>
							<View style={wrapper}>
								<Input
									placeholder='E-mail'
									keyboardType='email-address'
									returnKeyType='next'
									changeText={this.onEmailChange.bind(this)}
									value={this.props.email}
									onSubmitEditing={this.changeFocus.bind(this)}
								/>
							</View>
						</View>
						<View style={[inputWrap, lastInput]}>
							<Icon style={iconStyle} name="ios-unlock" size={20} color="#fff"/>
							<View style={wrapper}>
								<Input
									rel={this.getNextInput.bind(this)}
									secureTextEntry={this.state.passwordVisibility}
									placeholder='password'
									changeText={this.onPasswordChange.bind(this)}
									value={this.props.password}
									returnKeyType='go'
									onSubmitEditing={this.onButtonPress}
								/>
							</View>
							<TouchableWithoutFeedback onPress={() => this.changePasswordVisibility()}>
								<Icon
									style={iconStyle}
									name="ios-eye"
									size={25}
									color={this.state.visibilityIconColor}/>
							</TouchableWithoutFeedback>
						</View>
					</View>
					{this.renderButtonSubmit()}
					{this.showError()}
				</View>
			);
		}
	}

	renderLoginFields() {
		const {screenContainer, logoContainer, titleApp} = loginStyles;
		return (
			<View style={screenContainer}>
				<View style={logoContainer}>
					<Text style={titleApp}>KITCHRY</Text>
				</View>
				{this.showLoading()}
			</View>
		);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				{this.renderStatusBar()}
				{this.showForm()}
			</View>
		);

	}
}

const loginStyles = {
	screenContainer: {
		flex: 1,
		backgroundColor: 'rgb(57, 192, 111)'
	},
	titleApp: {
		color: '#fff',
		fontSize: 30
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		marginTop: 50,
		justifyContent: 'center'
	},
	formContainer: {
		padding: 10,
		flexDirection: 'column',
		marginBottom: 50
	},
	inputsContainer: {
		marginHorizontal: 20,
		marginBottom: 5,
		borderRadius: 5,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	inputWrap: {
		borderColor: 'rgba(255,255,255,0.6)',
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 3,
		marginVertical: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)'
	},
	wrapper: {
		flex: 1.5
	},
	iconStyle: {
		flex: 0.15,
		marginHorizontal: 5,
		paddingLeft: 10
	},
	lastInput: {},
	checkboxWrapper: {
		marginTop: 15
	}

};

const mapStateToProps = (state) => {
	console.log("LoginScreen.js mapStateToProps state", state);
	const {auth} = state;
	const {email, password, error, platform, loading} = auth;
	return {email, password, error, platform, loading};
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser,
	detectPlatform,
	getDeviceDimensions,
	checkAuth
})(LoginScreen);
