/**
 * Created by viktoria on 12.04.17.
 */
import React from 'react';
import {
	View,
	TextInput
} from 'react-native';

const Input = (
	{
		value,
		changeText,
		placeholder,
		secureTextEntry,
		error,
		onSubmitEditing,
		rel,
		returnKeyType,
		keyboardType,
		newStyles,
		autoFocus,
		multiline
	}) => {
	const {textInput, errorStyle} = InputFieldStyles;
	return (
		<View>
			<View>
				<TextInput
					ref={rel}
					returnKeyType={returnKeyType}
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
					onSubmitEditing={onSubmitEditing}
					placeholder={placeholder}
					autoCorrect={false}
					value={value}
					onChangeText={changeText}
					underlineColorAndroid={'transparent'}
					blurOnSubmit={true}
					autoCapitalize="none"
					style={ error ? errorStyle : (newStyles ? newStyles : textInput)}
					autoFocus={autoFocus}
					multiline={multiline}
				/>
			</View>
		</View>
	);
};

const InputFieldStyles = {
	inputHeight: {
		height: 50
	},
	textInput: {
		height: 50,
		backgroundColor: 'transparent',
		color: 'grey',
		paddingHorizontal: 8,
		borderRadius: 15
	},
	errorStyle: {
		height: 50,
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 15,
		color: '#000',
		paddingHorizontal: 8
	},
	requireField: {
		color: 'red'
	}
};



export {Input};