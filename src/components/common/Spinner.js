/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import React, {Component} from 'react';
import {
	View,
	ActivityIndicator,
	Dimensions
} from 'react-native';
const {width} = Dimensions.get('window');

class Spinner extends Component {
	render () {
		const {container} = activityIndicatorStyle;
		return (
			<View style={container}>
				<ActivityIndicator color={colors.idicatorColor} size={'large'}/>
			</View>
		);
	}
}
const colors = {
	idicatorColor: '#fff'
};

const activityIndicatorStyle = {
	container: {
		flex: 1,
		width: width,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
};
export {Spinner};