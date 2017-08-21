/**
 * Created by Devsteam.mobi on august, 07, 2017.
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	Button,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import IconII from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoder';
import {uploadProfileImage} from '../actions';

var ImagePicker = require("react-native-image-picker");
var Platform = require('react-native').Platform;
var ScreenHeight = Dimensions.get("window").height;


export class ProfileScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			avatarSource: '',
			city: '',
			regionName: '',
			initialPosition: {
				latitude: 0,
				longitude: 0
			}
		};
	}

	watchId: ?number = null

  componentDidMount() {
  	console.log("ProfileScreen.js ScreenHeight", ScreenHeight);
  	console.log("ProfileScreen.js Platform: ", Platform);
  	// First geolocation method
  	navigator.geolocation.getCurrentPosition((position) => {
  		console.log("ProfileScreen.js componentDidMount position", position);
  		var lat = parseFloat(position.coords.latitude);
  		var long = parseFloat(position.coords.longitude);

  		var initialRegion = {
  			latitude: lat,
  			longitude: long
  		};
  	}, (error) => {
  		console.log("ProfileScreen.js navigator error", JSON.stringify(error));
  		
  		console.log(JSON.stringify(error));

  		if (error) {
				this.getLocationWithFreegeoip();
			}
  	}, {
  		enableHighAccuracy: true,
  		maximumAge: 1000,
  		timeout: 1000
  	});

  	this.watchId = navigator.geolocation.watchPosition((position) => {
  		var lat = parseFloat(position.coords.latitude);
  		var long = parseFloat(position.coords.longitude); 

  		var lastRegion = {
  			latitude: lat,
  			longitude: long
  		};

  		Geocoder.geocodePosition({
  			lat: lastRegion.latitude,
  			lng: lastRegion.longitude
  		}).then(res => {
  			console.log("ProfileScreen.js Geocoder.geocodePosition: ", res);
  			this.setState({
  				city: res[0].locality,
  				regionName: res[0].adminArea
  			});
			})
			.catch((err) => {
				console.log("ProfileScreen.js Geocoder.geocodePosition error ", err);
				if (err) {
					this.getLocationWithFreegeoip();
				};
			});
  	});
  }

   getLocationWithFreegeoip() {
  		// Second geolocation method
  		var url = 'https://freegeoip.net/json/';
	    fetch(url)
	      .then((response) => response.json())
	      .then((responseJson) => {
	        console.log("ProfileScreen.js: ", responseJson, "city: ",  responseJson.city);
	        this.setState({
	          countryName: responseJson.country_name,
	          regionName: responseJson.region_name,
	          city: responseJson.city
	        });
	      })
	      .catch((error) => {
	       	console.error(error);
	      });
  	}

  componentWillUnmount() {
  	navigator.geolocation.clearWatch(this.watchId);
  }

	showPicker() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      console.log('Response Data = ', response.data);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        console.log("ProfileScreen.js Platform: ", Platform);
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });

        this.props.uploadProfileImage({base64: response.data});

        console.log("ProfileScreen.js this.state.avatarSource", source);
      }
    })
  }

	render() {
		console.log("ProfileScreen.js ImagePicker: ", ImagePicker);
		const {profile, name} = this.props.client;
		const {weight, wellness, muscle} = this.props.measurements;
		// console.log("ProfileScreen.js this.state.avatarSource", this.state.avatarSource);

		console.log("render: ", this.state.avatarSource);

		return (
			<View style={profileStyles.mainContentContainer}>			

				<View style={profileStyles.personalData}>
					<View style={profileStyles.cameraContainer}>
						<TouchableOpacity
							onPress={this.showPicker.bind(this)}>
							<IconII name="ios-camera" style={profileStyles.cameraIcon}/>
						</TouchableOpacity>
					</View>

					<View style={profileStyles.personPhotoContainer}>
						<TouchableOpacity
							onPress={this.showPicker.bind(this)}>
							{ // { resizeMode: 'cover', width: null }
								this.state.avatarSource
								?
								<Image style={Platform.OS == "ios" ? profileStyles.userImageIOS : profileStyles.userImageANDROID} source={this.state.avatarSource}/>
								:
									profile
									?
									<Image style={Platform.OS == "ios" ? profileStyles.userImageIOS : profileStyles.userImageANDROID} source={{uri: profile}}/>
									:
									<IconII name="ios-person" style={{fontSize: 100}}/>		
							}
						</TouchableOpacity>
					</View>
					
					<View style={profileStyles.personName}>
						<Text style={profileStyles.personNameText}>
							{name}
						</Text>
					</View>
					
					<View style={profileStyles.location}>
						<IconII name="ios-pin" style={{fontSize: 25}}/>
						<Text style={profileStyles.locationText}>
							{ (this.state.city == '' || this.state.regionName == '')
								?
								'In processing ...'
								:
								this.state.city + ", " + this.state.regionName
							}
						</Text>
					</View>
				</View>

				<View style={profileStyles.lineSeparator}></View>

				<View style={profileStyles.dietGoalsContainer}>
					<Text style={profileStyles.dietGoalsHeader}>
							DIET GOALS
					</Text>
					<View style={profileStyles.dietGoalsBody}>
						<View style={profileStyles.dietGoalsItem}>
							<Text style={profileStyles.dietGoalsNumber}>
								{weight.amount}
							</Text>
							<Text style={profileStyles.dietGoalsParameter}>
								Weight
							</Text>
						</View>
						<View style={profileStyles.dietGoalsItem}>
							<Text style={profileStyles.dietGoalsNumber}>
								{muscle.amount}
							</Text>
							<Text style={profileStyles.dietGoalsParameter}>
								Muscle Mass
							</Text>
						</View>
						<View style={profileStyles.dietGoalsItem}>
							<Text style={profileStyles.dietGoalsNumber}>
								{wellness.amount}
							</Text>
							<Text style={profileStyles.dietGoalsParameter}>
								Wellness
							</Text>
						</View>
					</View>
				</View>
			</View>
		);

	}
}

const profileStyles = {
	mainContentContainer: {
		display: 'flex',
		flexDirection: "column",
		backgroundColor: "transparent",
		height: 0.95 * ScreenHeight - 80 - 60,
		alignItems: "center",
		justifyContent: "center"
	},
	cameraContainer: {
		width: 400,
		height: 170,
		backgroundColor: "#f2f2f2",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0
	},
	cameraIcon: {
		fontSize: 40,
		marginBottom: 50
	},
	personPhotoContainer: {
		width: 130,
		height: 130,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f2f2f2",
		borderRadius: 65,
		marginTop: -65,
		borderWidth: 3,
		borderColor: "white",
		alignSelf: "center",
		overflow: "hidden"
	},
	personName: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 5,
		marginBottom: 5
	},
	personNameText: {
		fontSize: 20
	},
	personalData: {
		flex: 1
	},
	location: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		display: "flex",
	},
	locationText: {
		marginLeft: 10
	},
	lineSeparator: {
		height: 2,
		width: 400,
		backgroundColor: "#f4f4f4"
	},
	dietGoalsContainer: {
		flex: 0.32,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	dietGoalsHeader: {
		alignSelf: "flex-start",
		fontSize: 15,
		color: "#ed6d56",
		marginTop: 35,
		marginBottom: 14,
		marginLeft: 6
	},
	dietGoalsBody: {
		width: 350,
		flexDirection: "row",
		display: "flex",
		justifyContent: "space-around"
	},
	dietGoalsItem: {
		flexDirection: "column",
		alignItems: "center",
	},
	dietGoalsNumber: {
		fontSize: 25,
		color: "#f86331",
		marginBottom: 5
	},
	dietGoalsParameter: {
		fontSize: 18,
		color: "#080808"
	},
	userImageANDROID: {
		width: 124,
		height: 124,
		borderRadius: 100
	},
	userImageIOS: {
		width: 200,
		height: 200
	}
};

const mapStateToProps = (state) => {
	return {
		client: state.auth.client,
		profile: state.auth.profile,
		measurements: state.measurements.measurementsData
	};
};

export default connect(mapStateToProps, {
	uploadProfileImage
})(ProfileScreen);
