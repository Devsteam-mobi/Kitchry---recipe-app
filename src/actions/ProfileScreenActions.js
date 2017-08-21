import {HOST, getKeyFromStorage} from './const';
import {
	UPLOAD_PROFILE_IMAGE,
	UPLOAD_PROFILE_IMAGE_FAIL,
	UPLOAD_PROFILE_IMAGE_SUCCESS
} from './types';

export const uploadProfileImage = ({base64}) => {
	console.log("ProfileScreenActions.js uploadProfileImage");
	return (dispatch) => {
		

		// let body = "&content_type=image/png" +
  //   "&name=" + pathToImage +
  //   "&file=base64string" +
  //   "&photo=" + base64;

  	getKeyFromStorage().then((stores) => {
			console.log("ProfileScreenActions.js checkAuth stores", stores);
			const {token, email} = stores;
			let url = HOST + 'api/v2/mobile/profile/photo';
			// let utc = new Date().getTimezoneOffset() / 60;
			// let currentDate = prettyDate();
			// 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='
			// var body = 'image=' + '' +
	  //   '&imageType=image/jpg' +
	  //   '&userName=' + email +
	  //   '&token=' + token;



	  	var body = 'image=' + base64 +
	    '&imageType=image/jpg' +
	    '&userName=' + encodeURIComponent(email) +
	    '&token=' + token;


			console.log("ProfileScreenActions.js uploadProfileImage body: ", body);
			makeRequest(dispatch, url, body, uploadProfileImageSuccess, uploadProfileImageFail);
		});

    // var body = 'image=' + 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=' +
    // '&imageType=image/jpg' +
    // '&userName=' + test@gmail.com
    // '&token=' + VI7C5ZPBXICECWUHVD74TRELUBA47H2Y;

		
	};

};

const uploadProfileImageSuccess = (dispatch, message) => {
	dispatch({
		type: UPLOAD_PROFILE_IMAGE_SUCCESS,
		payload: message
	});
};

const uploadProfileImageFail = (dispatch, error) => {
	dispatch({
		type: UPLOAD_PROFILE_IMAGE_FAIL,
		payload: error
	});
};

const makeRequest = (dispatch, url, body, onSuccess, onFail) => {
	console.log("ProfileScreenActions.js makeRequest url: ", url, "body: ", body);
	dispatch({type: UPLOAD_PROFILE_IMAGE});
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let result = JSON.parse(xhr.responseText);

				console.log("ProfileScreenActions.js makeRequest result: ", result);

				if (result.status === 'success') {
					var message = "Success message";
					onSuccess(dispatch, message);
				}
				else {
					return onFail(dispatch, "error message");
				}
			}
			else {
				return onFail(dispatch,  "error message");
			}
		}
	};

	xhr.open('POST', url);

	// Change later RequestHeaders
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.timeout = 5000;
	xhr.addEventListener('timeout', () => {
		return onFail(dispatch);
	});
	xhr.send(body);
};