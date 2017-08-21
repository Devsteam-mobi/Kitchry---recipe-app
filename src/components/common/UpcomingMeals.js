/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableWithoutFeedback
} from 'react-native';
import {Spinner} from './Spinner';
class UpcomingMeals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDetailOpen: false,
			loadingImage: true,
			meal: this.props.meal
		};
		this.showDetail = this.showDetail.bind(this);
		this.loadingStart = this.loadingStart.bind(this);
		this.loadingEnd = this.loadingEnd.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.meal !== this.props.meal) {
			this.setState({
				meal: nextProps.meal
			});
		}
	}

	renderDetail() {
		const {mealDetailStyle} = styles;
		if (this.state.isDetailOpen && this.props.meal.directions) {
			return (
				<Text style={mealDetailStyle}>{this.props.meal.directions}</Text>
			);
		} else {
			return null;
		}
	}

	showDetail() {
		this.setState({
			isDetailOpen: !this.state.isDetailOpen
		});
	}

	loadingImage() {
		if (this.state.loadingImage) {
			return (
				<Spinner/>
			);
		}
		else {
			return null;
		}
	}

	loadingStart() {
		this.setState({loadingImage: true});
	}

	loadingEnd() {
		this.setState({loadingImage: false});
	}

	render() {
		const {container, descriptionContainer, imgStyle, imgTitle, buttonStyle, titleStyle, subTitleStyle} = styles;
		const {meal} = this.state;
		return (
			<TouchableWithoutFeedback onPress={this.showDetail} style={buttonStyle}>
				<View style={container}>
					<View style={{height: 250}}>
						<Image
							source={{uri: meal.image}}
							style={imgStyle}
							onLoadStart={this.loadingStart}
							onLoadEnd={this.loadingEnd}>
							<Text style={imgTitle}>Upcoming meal</Text>
							{this.loadingImage()}
						</Image>
					</View>
					<View style={descriptionContainer}>
						<Text style={titleStyle}>{meal.title}</Text>
						<Text style={subTitleStyle}>{meal.type}</Text>
						{this.renderDetail()}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
const colors = {
	imgBg: 'rgba(0,0,0,0.1)',
	titleImageColor: '#fff',
	titleImageShodowColor: '#847e7e',
	descriptionBg: '#f6f6f8',
	descriptionTitleColor: '#000',
	descriptionSubTitleColor: '#272525',
	descriptionTextColor: '#584f4f',
	borderColor: 'rgba(0,0,0,0.3)'
};

const styles = {
	container: {
		flex: 1
	},
	buttonStyle: {
		borderColor: colors.borderColor,
		borderBottomWidth: 1,
		marginBottom: 20
	},
	descriptionContainer: {
		padding: 10,
		backgroundColor: colors.descriptionBg,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: colors.borderColor,
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderTopColor: colors.borderColor
	},
	imgStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: colors.imgBg
	},
	imgTitle: {
		backgroundColor: 'transparent',
		color: colors.titleImageColor,
		fontSize: 25,
		fontWeight: '600',
		top: 15,
		left: 15,
		textShadowColor: colors.titleImageShodowColor,
		textShadowOffset: {width: 2, height: 2}
	},
	titleStyle: {
		color: colors.descriptionTitleColor,
		fontSize: 18,
		fontWeight: 'bold',
		lineHeight: 30
	},
	subTitleStyle: {
		color: colors.descriptionSubTitleColor,
		fontSize: 16,
		lineHeight: 30
	},
	mealDetailStyle: {
		color: colors.descriptionTextColor,
		fontSize: 14,
		lineHeight: 20,
		paddingHorizontal: 10,
		paddingTop: 5
	}
};

export {UpcomingMeals};