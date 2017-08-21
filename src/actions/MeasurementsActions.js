/**
 * Created by Devsteam.mobi on 7/29/17.
 */
import {
	SEND_MEASUREMENTS,
	SEND_MEASUREMENTS_SUCCESS,
	SEND_MEASUREMENTS_FAIL
} from './types';
import {Actions} from 'react-native-router-flux';
import {HOST, getKeyFromStorage, prettyDate} from './const';

const sendMeaserentsSuccess = (dispatch, data) => {
	dispatch({
		type: SEND_MEASUREMENTS_SUCCESS,
		measurementsData: data
	});
	Actions.pop();
};

const sendMeaserentsFail = (dispatch, error) => {
	dispatch({
		type: SEND_MEASUREMENTS_FAIL,
		error: error
	});
};

export const sendMeaserentsToServer = (data) => {
	return dispatch => {
		dispatch({type: SEND_MEASUREMENTS});
		getKeyFromStorage().then((stores) => {
			const {token, email} = stores;
			let utc = -1 * parseInt((new Date().getTimezoneOffset()) / 60);
			let url = HOST + 'api/v2/mobile/measurements';
			let body = 'userName=' + encodeURIComponent(email) + '&token=' + token + '&date=' + prettyDate() + '&utcOffsetHours=' + utc;
			let whbody = body + '&title=' + encodeURIComponent(data.weight.title) + '&unit=' + encodeURIComponent(data.weight.unit) + '&amount=' + encodeURIComponent(data.weight.amount);
			let msbody = body + '&title=' + encodeURIComponent(data.muscle.title) + '&unit=' + encodeURIComponent(data.muscle.unit) + '&amount=' + encodeURIComponent(data.muscle.amount);
			let wlbody = body + '&title=' + encodeURIComponent(data.wellness.title) + '&unit=' + encodeURIComponent(data.wellness.unit) + '&amount=' + encodeURIComponent(data.wellness.amount);

			return Promise.all([
				makeRequest(dispatch, url, whbody),
				makeRequest(dispatch, url, msbody),
				makeRequest(dispatch, url, wlbody)
			]).then(res => {
				console.log(res);
				sendMeaserentsSuccess(dispatch, data);
			}).catch(error => sendMeaserentsFail(dispatch, error.message));
		});
	};
};

const makeRequest = (dispatch, url, body) => {
	return new Promise(
		(resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						let result = JSON.parse(xhr.responseText);
						console.log(result);
						if (result.status === 'success') {
							resolve(result);
						}
						else {
							reject(xhr.status);
						}
					}
					else {
						reject(xhr.status);

					}
				}
			};
			xhr.open('PATCH', url);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.timeout = 5000;
			xhr.addEventListener('timeout', () => {
				reject('Load more then 5 sec');
			});
			xhr.send(body);
		});
};