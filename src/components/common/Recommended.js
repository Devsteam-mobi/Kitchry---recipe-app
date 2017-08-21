// /**
//  * Created by Devsteam.mobi on 6/25/17.
//  */
// import React, {Component} from 'react';
// import {
// 	Text,
// 	View,
// 	Dimensions,
// 	Animated,
// 	PanResponder,
// 	Image,
// 	ScrollView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const {width} = Dimensions.get('window');
//
// class Recommended extends Component {
// 	constructor (props) {
// 		super(props);
// 		this.state = {
// 			news: this.props.news,
// 			activeId: 0,
// 			activeElemenetPosition: 0
// 		};
// 		this.containerPosition = new Animated.Value(0);
// 	}
//
// 	componentWillMount () {
//
// 		this.state.panResponder = PanResponder.create({
// 			onStartShouldSetPanResponder: () => true,
// 			onStartShouldSetPanResponderCapture: () => true,
// 			onMoveShouldSetPanResponder: () => true,
// 			onMoveShouldSetPanResponderCapture: () => true,
// 			onPanResponderGrant: () => true,
// 			onPanResponderMove: (e, gestureState) => this.handleResponderMove(gestureState.dx),
// 			onPanResponderRelease: (e, gestureState) => this.handleResponderEnd(gestureState.dx),
// 			onPanResponderTerminate: (e, gs) => this.handleResponderEnd(gs.dx),
// 			onPanResponderEnd: (e, gs) => this.handleResponderEnd(gs.dx),
// 			onShouldBlockNativeResponder: () => false
// 		});
// 	}
//
// 	handleResponderMove (dx) {
// 		if (dx < -5 || dx > 5) {
// 			if (this.containerPosition._value <= 0 && this.containerPosition._value >= (this.state.news.length - 1) * (-1) * width) {
// 				let newDx = this.state.activeId * (-1) * width + dx;
// 				this.containerPosition.setValue(newDx);
// 			}
// 		}
// 	}
//
// 	handleResponderEnd (dx) {
// 		if (dx !== 0) {
// 			if (dx < -40 && this.containerPosition._value >= (this.state.news.length - 1) * (-1) * width) {
// 				if (this.state.activeId >= 0) {
// 					if (this.state.activeId < this.state.news.length) {
// 						let id = this.state.activeId + 1;
// 						let newPosition = id * (width) * (-1);
// 						this.setState({
// 							activeId: id,
// 							activeElemenetPosition: newPosition
// 						}, () => console.log(this.state.activeId));
// 						this.animateElement(newPosition, id);
// 					}
// 					else {
// 						let id = this.state.activeId;
// 						let newPosition = id * (width) * (-1);
// 						this.setState({
// 							activeId: id,
// 							activeElemenetPosition: newPosition
// 						});
// 						this.animateElement(newPosition, id);
// 					}
// 				}
//
// 			}
// 			else {
// 				if (this.state.activeId <= this.state.news.length && this.state.activeId > 0 && this.containerPosition._value >= (this.state.news.length - 1) * (-1) * width) {
// 					let id = this.state.activeId <= this.state.news.length ? this.state.activeId - 1 : this.state.activeId;
// 					let newPosition = id * (width) * (-1);
// 					this.setState({
// 						activeId: id,
// 						activeElemenetPosition: newPosition
// 					});
// 					this.animateElement(newPosition, id);
// 				}
// 				else {
// 					let id = this.state.activeId;
// 					let newPosition = id * (width) * (-1);
// 					this.setState({
// 						activeId: id,
// 						activeElemenetPosition: newPosition
// 					});
// 					this.animateElement(newPosition, id);
// 				}
// 			}
// 		}
// 	}
//
//
// 	animateElement (toValue) {
// 		Animated.timing(this.containerPosition, {
// 			duration: 600,
// 			toValue: toValue
// 		}).start();
// 	}
//
// 	renderNews (key, news) {
// 		const numberRow = Math.round((width / 3) / 20);
// 		const {container, content, contentContainer, title, newsContainer, imgStyle, newsTitle, textContainer} = newsStyles;
// 		return (
// 			<View
// 				key={key}
// 				style={container}>
// 				<View style={content}>
// 					<View style={contentContainer}>
// 						<Text style={title}>Because you ate/progress to goal</Text>
// 						<View style={newsContainer}>
// 							<Image
// 								source={{uri: news.img}}
// 								style={imgStyle}
// 							/>
// 							<View style={textContainer}>
// 								<Text style={newsTitle}>{news.title}</Text>
// 								<Text
// 									numberOfLines={numberRow}
// 									ellipsizeMode={'tail'}>
// 									{news.description}
// 								</Text></View>
// 						</View>
// 					</View>
// 				</View>
// 			</View>
// 		);
// 	}
//
// 	renderIcons (elem, index) {
// 		let active = this.state.activeId === index ? 'circle' : 'circle-thin';
// 		return (
// 			<View key={index} style={{padding: 2}}>
// 				<Icon name={active} size={12} color={'orange'}/>
// 			</View>
// 		);
//
// 	}
//
// 	render () {
// 		const listItems=
// 		const {title, indicatorsContainer} = styles;
// 		return (
// 			<View>
// 				<Text style={title}>Recommended</Text>
// 				<ScrollView
// 					horizontal={ true }
// 					pagingEnabled={ true }
// 					scrollEventThrottle={100}
// 					showsHorizontalScrollIndicator={ false }
// 					style={{flex: 1}}
// 					onScroll={(e) => {
// 						this.setState({
// 							position: e.nativeEvent.contentOffset.x
// 						});
// 					}}
// 					onLayout={(e) => {
// 						this.setState({
// 							width: e.nativeEvent.layout.width
// 						});
// 					}}
// 					directionalLockEnabled={true}
// 				>
// 					{listItems}
// 				</ScrollView>
// 			</View>
// 		);
// 	}
// }
//
// const styles = {
// 	title: {
// 		fontSize: 22,
// 		fontWeight: 'bold',
// 		paddingLeft: 10
// 	},
// 	indicatorsContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	}
// };
//
// const newsStyles = {
// 	container: {
// 		width: width,
// 		height: width / 3 + 50,
// 		flexDirection: 'row'
// 	},
// 	content: {
// 		position: 'absolute'
// 	},
// 	contentContainer: {
// 		flex: 1,
// 		flexDirection: 'column',
// 		padding: 10
// 	},
// 	title: {
// 		fontSize: 18,
// 		fontWeight: 'bold'
// 	},
// 	newsContainer: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		paddingVertical: 10
// 	},
// 	imgStyle: {
// 		width: width / 3,
// 		height: width / 3
// 	},
// 	textContainer: {
// 		width: width - width / 3 - 40,
// 		height: width / 3,
// 		flexDirection: 'column',
// 		marginHorizontal: 20
// 	},
// 	newsTitle: {
// 		fontSize: 16,
// 		fontWeight: '500'
// 	}
// };
//
// export {Recommended};
