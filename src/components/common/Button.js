/**
 * Created by viktoria on 12.04.17.
 */

import React from 'react';
import {
	Text,
	TouchableOpacity
} from 'react-native';

const Button = ({title, onPress, stylesContainer, styleText}) => {
	const {touchableElement, textButton} = buttonStyles;
	return (
		<TouchableOpacity style={stylesContainer ? stylesContainer : touchableElement} onPress={onPress}>
			<Text style={styleText ? styleText : textButton}>{title}</Text>
		</TouchableOpacity>
	);
};
const buttonStyles = {
	touchableElement: {
		backgroundColor: 'white',
		alignItems: 'center',
		marginHorizontal: 20,
		borderRadius: 15
	},
	textButton: {
		color: 'rgb(57, 192, 111)',
		paddingVertical: 15,
		fontWeight: 'bold'
	}
};


export {Button};