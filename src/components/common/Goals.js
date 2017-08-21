/**
 * Created by Devsteam.mobi on 6/25/17.
 */

import React, {Component} from 'react';
import {
	Text,
	View,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
const {width} = Dimensions.get('window');

class Goals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meal: this.props.meal
		};
	}

	renderTrack() {
		const {descriptionContainer, titleStyle, subTitleStyle} = styles;
		const {container, contentContainer, iconStyle, trackTitle, trackSubTitleContainer, activeTrackColor, trackText} = trackStyle;
		return (
			<TouchableOpacity style={container} onPress={() => Actions.measurements()}>
				<View style={contentContainer}>
					<View
						style={iconStyle}
					>
						<Text style={trackTitle}>165 lbs</Text>
					</View>
				</View>
				<View style={descriptionContainer}>
					<Text style={titleStyle}>Keep on track!</Text>
					<View style={trackSubTitleContainer}>
						<Text style={[subTitleStyle, trackText]}>Weight is 3 days old, </Text>
						<Text style={activeTrackColor}>update now.</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		const {container} = styles;
		return (
			<View style={container}>
				{this.renderTrack()}
			</View>
		);
	}
}
const colors = {
	imgBg: '#847e7e',
	activeColor: '#ffa227',
	textColorWhite: '#fff',
	subTitle: '#272525',
	borderColor: '#847e5e'
};

const styles = {
	container: {
		flex: 1,
		flexDirection: 'column',
		margin: 10,
		borderColor: colors.borderColor,
		borderBottomWidth: 1,
		paddingBottom: 10
	},
	descriptionContainer: {
		flex: 1,
		padding: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderColor: colors.descriptionBg
	},
	imgStyle: {
		height: width / 6,
		width: width / 6,
		backgroundColor: colors.imgBg,
		marginRight: 10
	},
	titleStyle: {
		color: colors.descriptionTitleColor,
		fontSize: 16,
		fontWeight: 'bold',
		paddingBottom: 10
	},
	subTitleStyle: {
		color: colors.activeColor,
		fontSize: 16,
		lineHeight: 18
	}
};

const trackStyle = {
	container: {
		flexDirection: 'row'
	},
	contentContainer: {
		width: width / 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconStyle: {
		width: width / 6,
		height: width / 6,
		backgroundColor: colors.imgBg,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
	},
	trackTitle: {
		color: colors.textColorWhite
	},
	trackSubTitleContainer: {
		flexDirection: 'row'
	},
	trackText: {
		color: colors.subTitle
	},
	activeTrackColor: {
		color: colors.activeColor
	}
};

export {Goals};