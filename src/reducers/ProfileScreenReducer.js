import {
	UPLOAD_PROFILE_IMAGE,
	UPLOAD_PROFILE_IMAGE_FAIL,
	UPLOAD_PROFILE_IMAGE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	message: '',
	error: '',
	uploading: false
};

export default (state = INITIAL_STATE, action) => {
	console.log("ProfileScreenReducer.js", action)
	switch (action.type) {
		case UPLOAD_PROFILE_IMAGE:
			return {...state, uploading: true};
		case UPLOAD_PROFILE_IMAGE_FAIL:
			return {...state, uploading: false, error: action.payload};
		case UPLOAD_PROFILE_IMAGE_SUCCESS:
			return {...state, uploading: false, message: action.payload};
		default:
			return state;
	}
};