/**
 * Created by viktoria on 12.04.17.
 */

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	Text,
	TouchableWithoutFeedback,
	View,
	Platform
} from 'react-native';

const CheckboxComponent = ({checked, text, color, onPress, style}) => {
	const isChecked = () => {
		if (checked) {
			if (Platform.OS === 'ios') {
				return (
					<Icon style={styles.iconStyles} name="check-circle" color={color}/>
				);
			} else {
				return (
					<Icon style={styles.iconStyles} name="dot-circle-o" color={color}/>
				);
			}
		} else {
			return (
				<Icon style={styles.iconStyles} name="circle-thin" color={color}/>
			);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={onPress} style={style ? style : styles.touchableContainer}>
			<View style={styles.container}>
				{isChecked()}
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = {
	touchableContainer: {
		marginVertical: 5
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	iconStyles: {
		marginHorizontal: 5,
		fontSize: 20
	},
	text: {
		alignSelf: 'center',
		color: '#fff'
	}
};

export {CheckboxComponent};