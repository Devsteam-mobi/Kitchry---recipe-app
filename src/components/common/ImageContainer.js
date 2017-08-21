/**
 * Created by Devsteam.mobi on 7/13/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';

class ImageContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: this.props.imgUrl
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.setState({
				image: newProps.imgUrl
			});
		}
	}

	renderImage() {
		const {imgStyle, imageSubscribe, defaultImage} = styles;
		const {image} = this.state;
		if (image) {
			return (<Image
				source={{uri: image}}
				style={imgStyle}
			/>);
		}
		else {
			return (
				<View style={defaultImage}>
					<Text style={imageSubscribe}>Image</Text>
				</View>);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderImage()}
			</View>
		);
	}
}
const colors = {
	imgBg: '#847e7e',
	textColorWhite: '#fff'
};

const styles = {
	container: {
		flex: 0.4,
		alignItems: 'stretch'
	},
	imgStyle: {
		flex: 1,
		borderRadius: 5
	},
	defaultImage: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.imgBg,
		borderRadius: 5
	},
	imageSubscribe: {
		color: colors.textColorWhite,
		fontSize: 18
	}
};
export {ImageContainer};