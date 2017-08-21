/**
 * Created by Devsteam.mobi on 7/5/17.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	Animated,
	Easing,
	ActivityIndicator,
	Platform,
	KeyboardAvoidingView,
	Keyboard,
	ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {getChatMessage, sendMessage} from '../actions';
import {colors} from '../actions/const';
import {BackHeader, ChatMessageBox, ChatBoxUser, ChatBoxDoctor} from './common';
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: this.props.chatMessages,
			loading: this.props.loading,
			protected: this.props.profile
		};
		this.animatedValue = new Animated.Value(0)
	}

	componentWillMount() {
		this.props.getChatMessage();
	}

	componentWillUpdate(){
		this.animateChatBoxUser();
	}

	animateChatBoxUser() {
		this.animatedValue.setValue(0)
		Animated.timing(
			this.animatedValue,
			{
				toValue: 1,
				duration: 400,
				easing: Easing.linear
			}
		).start()
	}

	sendMessage(text) {
		const {messages} = this.state;
		const {doctorId, userId} = this.props;
		let tmp = messages;
		tmp.push({
			body: text,
			receiver_user_id: doctorId,
			sender_user_id: userId,
			timestamp_utc: new Date().toUTCString(),
			type: 'text'
		});
		this.setState({
			messages: tmp
		});
		Keyboard.dismiss();
		this.props.sendMessage(text, tmp);
	}

	componentWillUnmount() {
		Keyboard.dismiss();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props || nextProps.chatMessages.length !== this.props.chatMessages.length) {
			this.setState({
				messages: nextProps.chatMessages,
				loading: nextProps.loading,
				profile:nextProps.profile
			});
		}
	}

	renderListMessages(item, index) {
		// (new Date(item.timestamp_utc)).toLocaleString()
		const marginRight = this.animatedValue.interpolate({
			inputRange: [0, 1],
    		outputRange: [0, 230]
		})

		if (item.sender_user_id === this.props.doctorId) {
			return (
				<ChatBoxDoctor 
				key={index} 
				messageBody={item.body} 
				messageSender={item.sender_name}
				messageSenderPhoto={this.state.profile}
				messageLocalTimestamp={(new Date(item.timestamp_utc)).toLocaleString([], {hour: '2-digit', minute:'2-digit'})} />
			);
		}
		else {
			return (
				<Animated.View key={index} style={{marginRight}}>
					<ChatBoxUser 
					messageBody={item.body} 
					messageSender={item.sender_name}
					messageLocalTimestamp={(new Date(item.timestamp_utc)).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}/>
				</Animated.View>
			);
		}
	}

	renderChatMessage() {
		if (this.state.loading) {
			return <ActivityIndicator style={{margin: 20}} color={colors.primaryOrange} size={'large'}/>;
		}
		else {
			return this.state.messages.map((item, index) => {
				return this.renderListMessages(item, index);
			});
		}
	}

	renderScrollView() {
		return (
			<ScrollView
				onLayout={() => {
					this.scrollView.scrollToEnd({animated: true});
				}}
				onContentSizeChange={() => {
					this.scrollView.scrollToEnd({animated: false});
				}}
				ref={scrollView => this.scrollView = scrollView}>
				{this.renderChatMessage()}
			</ScrollView>
		);
	}

	renderChat() {
		if (Platform.OS === 'ios') {
			return (
				<KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
					{this.renderScrollView()}
					<ChatMessageBox sendMessage={(text) => this.sendMessage(text)}/>
				</KeyboardAvoidingView>
			);
		} else {
			return (
				<View style={{flex: 1}}>
					{this.renderScrollView()}
					<ChatMessageBox sendMessage={(text) => this.sendMessage(text)}/>
				</View>
			);
		}

	}

	render() {
		return (
			<View style={styles.container}>
				<BackHeader leftButtonPress={() => {
					Keyboard.dismiss();
					Actions.pop();
				}} title={'Chat'}/>
				{this.renderChat()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'column'
	}
};


const mapStateToProps = ({chat}) => {
	const {loading, chatMessages, error, userId, doctorId, profile} = chat;
	return {loading, chatMessages, error, userId, doctorId, profile};
};

export default connect(mapStateToProps, {getChatMessage, sendMessage})(Chat);
