/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import {DatePickerAndroid, AsyncStorage, Animated} from 'react-native';
export const colors = {
	primaryOrange: 'rgb(234, 98, 80)',
	primaryGreen: 'rgb(57, 192, 111)'
};

export const showAnimation = (animatedVaue, value, callback) => {
	Animated.timing(
		animatedVaue,
		{
			toValue: value,
			duration: 450
		}
	).start(() => callback ? callback() : null);
};

export const HOST = 'http://test.kitchry.com/';

export const prettyDate = (date) => {
	if (!date) {
		date = new Date();
	}
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	return month + '/' + day + '/' + year;
};

export const showAndroidCalendar = (changeDate, getData, currentDate) => {
	let date = new Date();
	if (currentDate) {
		let tmp = new Date();
		date = new Date(currentDate);
		date.setHours(tmp.getHours());
		date.setMinutes(tmp.getMinutes());
		date.setSeconds(tmp.getSeconds());
	}
	try {
		DatePickerAndroid.open({
			date: date
		}).then((event) => {
			if (event.action === DatePickerAndroid.dateSetAction) {
				let chooseDate = event.month + 1 + '/' + event.day + '/' + event.year;
				changeDate(chooseDate);
				getData(chooseDate);
			} else {
				console.log(event);
			}
		});
	} catch ({code, message}) {
		console.log(code, message);
	}
};

export const groupArray = (arr, gropeBy) => {
	let groups = {};
	for (let i = 0; i < arr.length; i++) {
		let groupName = gropeBy ? arr[i].group : arr[i].recipeTitle;
		if (!groups[groupName]) {
			groups[groupName] = [];
		}
		groups[groupName].push(arr[i]);
	}
	return groups;
};

export const getKeyFromStorage = (chat) => {
	console.log("getKeyFromStorage input", chat);
	let tmp = ['kitchry', 'userKitchry'];

	if (chat) {
		tmp = ['kitchry', 'userKitchry', 'userId', 'doctorId', 'profile'];
	};

	// for AuthActions.js
	if (chat == "auth") {
		tmp = ['kitchry', 'userKitchry', 'profile', 'client'];
	};

	return AsyncStorage.multiGet(tmp, (err, stores) => {
		if (!err) {
			return stores;
		}
	}).then(stores => {

		console.log("const.js getKeyFromStorage stores: ", stores);

		let data = {token: stores[0][1], email: stores[1][1]};
		if (chat) {
            data = {
            token: stores[0][1],
            email: stores[1][1],
            userId: stores[2][1],
            doctorId: stores[3][1],
            profile: stores[4][1]
            };

		};

		// for AuthActions.js
		if (chat == "auth") {
			data = {token: stores[0][1], email: stores[1][1], profile: stores[2][1], client: [3][1]};
		};

		return data;
	});
};

export const formatDate = (dateSting) => {

	let ticks = Date.parse(dateSting);

	let parsedDate = new Date(ticks);

	let formattedDate = parsedDate.toDateString();

	return formattedDate.slice(0, 3) + ',' + formattedDate.slice(3);
};
