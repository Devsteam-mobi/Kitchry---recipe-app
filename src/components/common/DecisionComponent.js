/**
 * Created by Devsteam.mobi on 7/26/17.
 */
import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import {changeMealList} from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../actions/const';

class DecisionComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultColor: 'rgba(0,0,0,0.2)',
			activeColor: colors.primaryOrange,
			isLike: false,
			isDislike: false,
			isTried: true,
			activeButton: false,
			loading: this.props.confirm,
			error: this.props.error
		};
		this.sendConfirmDecision = this.sendConfirmDecision.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error !== this.props.error) {
			this.setState({
				error: nextProps.error
			});
		}
	}

	makeLike() {
		if (this.state.isDislike) {
			this.setState({
				isLike: !this.state.isLike,
				isDislike: false,
				activeButton: true
			});
		} else {
			this.setState({
				isLike: !this.state.isLike,
				activeButton: true
			});
		}
	}

	makeDisLike() {
		if (this.state.isLike) {
			this.setState({
				isLike: false,
				isDislike: !this.state.isDislike,
				activeButton: true
			});
		} else {
			this.setState({
				isDislike: !this.state.isDislike,
				activeButton: true
			});
		}
	}

	triedIt() {
		this.setState({
			isTried: !this.state.isTried,
			activeButton: true
		});
	}

	sendConfirmDecision() {
		const {isLike, isTried} = this.state;
		const {sendConfirm, planId, changeMealList} = this.props;
		let isLiked = isLike ? 1 : 0;
		let isConfirm = isTried ? 1 : 0;
		changeMealList(planId);
		sendConfirm(planId, isLiked, isConfirm);
	}

	renderButton() {
		const {submitButton, submitButtonTitle, buttonReady} = styles;
		const {loading, activeButton} = this.state;
		const buttonStyle = activeButton ? [submitButton, buttonReady] : submitButton;
		if (!loading) {
			return (
				<TouchableOpacity
					style={buttonStyle}
					disabled={!activeButton}
					onPress={this.sendConfirmDecision}
				>
					<Text style={submitButtonTitle}>Send your decision</Text>
				</TouchableOpacity>
			);
		} else {
			return <ActivityIndicator style={{margin: 20}} color={colors.primaryOrange} size={'large'}/>;
		}

	}

	renderError() {
		if (this.state.error) {
			return (
				<Text style={{paddingTop: 5, textAlign: 'center', color: 'red'}}>Try again letter</Text>
			);
		} else {
			return null;
		}
	}

	render() {
		const {defaultColor, activeColor, isDislike, isLike, isTried} = this.state;
		const {container, buttonsContainer, buttonsColumnContainer, columnTitle, buttonStyle} = styles;
		return (
			<View style={container}>
				<View style={buttonsContainer}>
					<View style={buttonsColumnContainer}>
						<Text style={columnTitle}>Did you like it?</Text>
						<View style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 10,
							paddingHorizontal: 10
						}}>
							<View style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<TouchableOpacity onPress={this.makeLike.bind(this)}>
									<View style={[buttonStyle]}>
										<Icon
											size={30}
											name='thumbs-o-up'
											color={isLike ? activeColor : defaultColor}
										/>
										<Text style={{marginLeft: 5}}>I like it!</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={this.makeDisLike.bind(this)}>
									<View style={buttonStyle}>
										<Icon
											size={30}
											name='thumbs-o-down'
											color={isDislike ? activeColor : defaultColor}
										/>
										<Text style={{marginLeft: 5}}>I didn't like it!</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={this.triedIt.bind(this)}>
									<View style={buttonStyle}>
										<Icon
											size={30}
											name='times'
											color={isTried ? defaultColor : 'red'}
											style={{marginRight: 5}}/>
										<Text>I didn't tried it</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				{this.renderError()}
				<View style={{flex: 1}}>
					{this.renderButton()}
				</View>
			</View>
		);
	}
}
const styles = {
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 10
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: 10,
		justifyContent: 'space-between',
		alignItems: 'stretch'
	},
	buttonsColumnContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	columnTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000'
	},
	buttonStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	submitButton: {
		flex: 1,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	buttonReady: {
		backgroundColor: colors.primaryGreen
	},
	submitButtonTitle: {
		color: '#fff',
		fontSize: 15
	}
};

const mapStateToProps = ({home, recipeDetail}) => {
	const {reviewMealList} = home;
	const {recipe, error} = recipeDetail;
	return {reviewMealList, recipe, error};
};

export default connect(mapStateToProps, {changeMealList})(DecisionComponent);


