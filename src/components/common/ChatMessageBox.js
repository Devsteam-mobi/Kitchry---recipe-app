/**
 * Created by Devsteam.mobi on 7/22/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../actions/const';

class ChatMessageBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	onTextChange(text) {
		this.setState({
			text: text
		});
	}

	renderAttachButton() {
		return (
			<Icon name='paperclip' size={30} color={'#cfd0d2'} />
		)
	}

	onAttachButtonPress() {
		console.log('Attach')
	}

	renderButtonSend() {
		if (Platform.OS === 'ios') {
			return <Icon name="paper-plane" size={25} color={'#cfd0d2'}/>;
		} else {
			return <Icon name="paper-plane" size={25} color={'#cfd0d2'}/>;
		}
	}

	onButtonPress(text) {
		if (text) {
			this.props.sendMessage(text);
			this.setState({
				text: ''
			});
		}
	}

	renderTextInput() {
		const {textInputStyle} = styles;
		if (Platform.OS === 'ios') {
			return (<TextInput
				style={textInputStyle}
				autoCorrect={false}
				underlineColorAndroid={'transparent'}
				value={this.state.text}
				returnKeyType='go'
				placeholder={'Type a message...'}
				onChangeText={(text) => this.onTextChange(text)}
				onSubmitEditing={event => this.onButtonPress(event.nativeEvent.text)}
			/>);
		}
		else {
			return (<TextInput
				style={textInputStyle}
				autoCorrect={false}
				value={this.state.text}
				underlineColorAndroid={'transparent'}
				returnKeyLabel='go'
				placeholder={'Type a message...'}
				multiline={true}
				onChangeText={(text) => this.onTextChange(text)}
				onSubmitEditing={event => this.onButtonPress(event.nativeEvent.text)}
			/>);
		}
	}

	render() {
		const {container, buttonContainer} = styles;
		return (
			<View style={container}>

				<TouchableOpacity
					style={buttonContainer}
					onPress={() => this.onAttachButtonPress()}
					>
					{this.renderAttachButton()}
				</TouchableOpacity>

				{this.renderTextInput()}

				<TouchableOpacity
					style={buttonContainer}
					onPress={() => this.onButtonPress(this.state.text)}
				>{this.renderButtonSend()}
				</TouchableOpacity>

			</View>
		);
	}
}

const styles = {
	container: {
		height: 60,
		borderTopWidth: 1,
		borderColor: '#f2f2f2',
		flexDirection: 'row',
		bottom: 0
	},
	buttonContainer: {
		flex: 0.15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInputStyle: {
		flex: 0.85,
		alignItems: 'stretch',
		marginVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
		paddingHorizontal: 5,
		fontSize: 14
	}
};

export {ChatMessageBox};