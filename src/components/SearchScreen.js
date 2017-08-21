/**
 * Created by Devsteam.mobi on 6/26/17.
 */
import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
	View,
	TouchableOpacity,
	Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from './common';

class SearchScreen extends Component {
	constructor (props) {
		super(props);
	}

	goBack () {
		Keyboard.dismiss();
		Actions.pop();
	}

	onSearchButtonPress () {

	}
	renderSearchField () {
		const {searchBarStyles, inputWrapper, iconStyle} = headerSearchScreen;
		return (
			<View style={searchBarStyles}>
				<Icon style={iconStyle} name="ios-search" size={20} color="#ccc"/>
				<View style={inputWrapper}>
					<Input
						autoFocus={true}
						placeholder='Search...'
						returnKeyType='search'
						keyboardType='default'
						onSubmitEditing={this.onSearchButtonPress.bind(this)}
					/>
				</View>
			</View>
		);
	}

	render () {
		const {headerContainer, wrapper, touchableButton, searchContent} = headerSearchScreen;
		return (
			<View style={searchContent}>
				<View style={headerContainer}>
					<View style={wrapper}>
						<TouchableOpacity style={touchableButton} onPress={this.goBack.bind(this)}>
							<Icon style={{marginLeft: 10}} name="ios-arrow-back" size={25} color="white"/>
						</TouchableOpacity>
						{this.renderSearchField()}
					</View>
				</View>
				<View>
				</View>
			</View>
		);
	}
}
const headerSearchScreen = {
	headerContainer: {
		height: 60,
		backgroundColor: '#ffa227'
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15
	},
	textInput: {
		height: 20,
		color: '#000',
		marginRight: 10
	},
	touchableButton: {
		flex: 0.2,
		paddingVertical: 12
	},
	searchBarStyles: {
		backgroundColor: '#fff',
		borderRadius: 3,
		flex: 1,
		marginRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: 30

	},
	inputWrapper: {
		flex: 1.5
	},
	iconStyle: {
		flex: 0.1,
		marginHorizontal: 5
	},
	searchContent: {
		backgroundColor: '#fff',
		flex: 1
	}
};



export default SearchScreen;
