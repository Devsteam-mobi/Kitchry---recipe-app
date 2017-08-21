/**
 * Created by Devsteam.mobi on 7/22/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View
} from 'react-native';
import {colors} from '../../actions/const';

class ChatBoxUser extends Component {
	render() {
		const {userMessageContainer, messagesContainer, messageTime, messageText} = styles;
		return (
			<View style={messagesContainer}>
				<View style={userMessageContainer}>
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
		marginRight: -230,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	userMessageContainer: {
		borderWidth: 1,
		paddingVertical: 5,
		maxWidth: 230,
		marginRight: 10,
		borderColor: 'rgba(44, 194, 107, 1)',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		paddingHorizontal: 10,
		borderRadius: 15,
		borderBottomRightRadius: 0,
		backgroundColor: 'rgba(44, 194, 107, 1)'

	},
	messageTime: {
		position: 'relative',
		fontSize: 10,
		paddingTop: 5,
		color: 'rgba(242, 242, 242, 1)',
	},
	messageText: {
		color: '#fff'
	}
};

export {ChatBoxUser};