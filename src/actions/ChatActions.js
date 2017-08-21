/**
 * Created by Devsteam.mobi on 7/5/17.
 */
import {
	START_LOAD_CHAT_MESSAGE,
	LOAD_CHAT_MESSAGE_SUCCESS,
	LOAD_CHAT_MESSAGE_FAIL,
	CHANGE_MESSAGE_LIST
} from './types';
import {HOST, getKeyFromStorage} from './const';

const loadingChatMessageSuccess = (dispatch, messages, user, doctor, profile) => {
	dispatch({
		type: LOAD_CHAT_MESSAGE_SUCCESS,
		payload: messages,
		userId: user,
		doctorId: doctor,
		profile: profile
	});
};

const loadingChatMessageFail = (dispatch, error) => {
	dispatch({
		type: LOAD_CHAT_MESSAGE_FAIL,
		error: error
	});
};

export const getChatMessage = () => {
	return dispatch => {
		dispatch({type: START_LOAD_CHAT_MESSAGE});
		getKeyFromStorage('chat').then((store) => {
			const {token, email, userId, doctorId, profile} = store;
			let url = HOST + 'api/v2/mobile/chat';
			let body = 'userName=' + encodeURIComponent(email) + '&token=' + token;
			makeRequest('POST', dispatch, url, body, loadingChatMessageSuccess, loadingChatMessageFail, Number(userId), Number(doctorId), profile);
		});
	};
};

const changeMessageArray = (dispatch, messages) => {
	dispatch({
		type: CHANGE_MESSAGE_LIST,
		payload: messages
	});
};

export const sendMessage = (text, allMessage) => {
	return dispatch => {
		getKeyFromStorage('chat').then((store) => {
			const {token, email} = store;
			let url = HOST + 'api/v2/mobile/chat';
			let body = 'userName=' + encodeURIComponent(email) + '&token=' + token + '&messageType=text&messageBody=' + encodeURIComponent(text);
			makeRequest('PATCH', dispatch, url, body, changeMessageArray, loadingChatMessageFail, null, null, null, allMessage);
		});
	};
};

const makeRequest = (type, dispatch, url, body, onSuccess, onFail, user, doctor, profile, allmessage) => {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let result = JSON.parse(xhr.responseText);
				if (result.status === 'success') {
					if (user) {
						return onSuccess(dispatch, result.messages, user, doctor, profile);
					} else {
						return onSuccess(dispatch, allmessage);
					}
				}
				else {
					onFail(dispatch);
				}
			} else {
				onFail(dispatch);
			}
		}
	};
	xhr.open(type, url);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.timeout = 5000;
	xhr.addEventListener('timeout', () => {
		return onFail(dispatch);
	});
	xhr.send(body);
};



