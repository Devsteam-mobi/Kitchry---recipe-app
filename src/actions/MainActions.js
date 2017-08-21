/**
 * Created by Devsteam.mobi on 7/4/17.
 */
import {CHANGE_ACTIVE_TAB} from './types';

export const changeActiveTab = (id, title) => {
	return dispatch => dispatch({type: CHANGE_ACTIVE_TAB, activeTabId: id, title: title});
};