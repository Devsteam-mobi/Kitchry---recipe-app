/**
 * Created by Devsteam.mobi on 7/22/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';
import {colors} from '../../actions/const';

// {this.props.messageSender}
class ChatBoxDoctor extends Component {
	render() {
		const {doctorMessageContainer, messagesContainer, messageTime, messageText, messagePhoto} = styles;
		return (
			<View style={messagesContainer}>
				<Image source={{uri: this.props.messageSenderPhoto}} style={messagePhoto} />
				<View style={doctorMessageContainer}>
					<Text style={messageText}>{this.props.messageBody}</Text>
					<Text style={messageTime}>{this.props.messageLocalTimestamp}</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	messagesContainer: {
		flexDirection: 'row',
		margin: 10,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	doctorMessageContainer: {
		borderWidth: 1,
		marginLeft: 10,
		paddingVertical: 5,
		minWidth: 100,
		maxWidth: 230,
		borderColor: 'rgba(242, 242, 242, 1)',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 10,
		flexDirection: 'column',
		borderRadius: 15,
		borderBottomLeftRadius: 0,
		backgroundColor: 'rgba(242, 242, 242, 1)'
	},
	messageTime: {
		fontSize: 10,
		paddingTop: 5,
		color: 'rgba(193, 197, 201, 1)'
	},
	messageText: {
		color: '#000'
	},
	messagePhoto: {
		width: 40,
		height: 40,
		borderRadius: 20
	}

};

export {ChatBoxDoctor};