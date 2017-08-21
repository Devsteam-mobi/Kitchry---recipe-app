/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import {Spinner} from './Spinner';
const {width} = Dimensions.get('window');
import {formatDate, colors} from '../../actions/const';


class ReviewYesterday extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDetailOpen: false,
			loadingImage: true,
			list: this.props.list,
			position: 0,
			width: width,
			height: 120
		};
		this.loadingStart = this.loadingStart.bind(this);
		this.loadingEnd = this.loadingEnd.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.list !== this.props.list) {
			this.setState({
				list: nextProps.list
			});
		}
	}

	loadingImage() {
		if (this.state.loadingImage) {
			return (
				<Spinner/>
			);
		}
		else {
			return null;
		}
	}

	loadingStart() {
		this.setState({loadingImage: true});
	}

	loadingEnd() {
		this.setState({loadingImage: false});
	}

	onMealPress(meal, img) {
		let recipe = {
			recipe: meal
		};
		this.props.onPressItem(recipe, img);
	}

	renderItem(meal, index) {
		console.log(meal);
		const {height} = this.state;
		const {container, descriptionContainer, sectionContainer, imgStyle, titleStyle, dateStyle, subTitleStyle} = styles;
		return (
			<TouchableOpacity
				style={[sectionContainer, {width: this.state.width}]}
				key={index}
				onPress={() => this.onMealPress(meal, meal.image)}
				activeOpacity={0.9}
			>
				<View style={[container, {height: height}]}>
					<Image
						source={{uri: meal.image}}
						style={[imgStyle]}
					/>
					<View style={descriptionContainer}>
						<Text style={titleStyle}>{meal.title}</Text>
						<View>
							<Text style={subTitleStyle}>{meal.type}</Text>
							<Text style={dateStyle}>{formatDate(meal.date)}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	/*renderDate(date) {
	 //const {width, position, list} = this.state;
	 let currentDay = formatDate(date);
	 let today = formatDate();
	 let tomorrow = formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
	 let yesterday = formatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000));
	 //let currentDay = '';
	 // if (position >= width && position && width) {
	 // 	currentDay = prettyDate(new Date(list[Math.round(position / width)].date));
	 // } else {
	 // 	currentDay = prettyDate(new Date(list[0].date));
	 // }
	 switch (currentDay) {
	 case today:
	 return 'Today';
	 case tomorrow:
	 return 'Tomorrow';
	 case yesterday:
	 return 'Yesterday';
	 default:
	 return currentDay;
	 }
	 }*/

	renderId() {
		const {width, position} = this.state;
		return Math.round(position / width) + 1;
	}

	render() {
		const {title, componentContainer} = styles;
		const {list} = this.state;
		const listItems = list.map((item, index) => {
			return this.renderItem(item, index);
		});
		return (
			<View style={componentContainer}>
				<Text style={title}>Open Feedback {this.renderId()}</Text>
				<ScrollView
					horizontal={ true }
					pagingEnabled={ true }
					scrollEventThrottle={100}
					showsHorizontalScrollIndicator={ false }
					style={{flex: 1}}
					onScroll={(e) => {
						this.setState({
							position: e.nativeEvent.contentOffset.x
						});
					}}
					onLayout={(e) => {
						this.setState({
							width: e.nativeEvent.layout.width
						});
					}}
					directionalLockEnabled={true}
				>
					{listItems}
				</ScrollView>
			</View>

		);
	}
}
const color = {
	imgBg: '#847e7e',
	borderColor: '#847e5e'
};

const styles = {
	componentContainer: {
		flex: 1,
		marginTop: 10
	},
	sectionContainer: {
		paddingHorizontal: 10
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		borderBottomColor: color.borderColor,
		borderBottomWidth: 1,
		paddingBottom: 10
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		paddingBottom: 10,
		paddingLeft: 10
	},
	descriptionContainer: {
		flex: 2,
		padding: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderColor: color.descriptionBg
	},
	imgStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginRight: 10
	},
	titleStyle: {
		color: color.descriptionTitleColor,
		fontSize: 16,
		fontWeight: 'bold',
		paddingBottom: 10
	},
	subTitleStyle: {
		color: colors.primaryOrange,
		fontSize: 16,
		lineHeight: 18,
		fontWeight: 'bold'
	},
	dateStyle: {
		fontSize: 14,
		lineHeight: 18,
		color: '#000',
		paddingVertical: 5
	}
};

export {ReviewYesterday};