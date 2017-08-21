/**
 * Created by Devsteam.mobi on 6/26/17.
 */
import React, {Component} from 'react';
import {
	Animated,
	Dimensions,
	View,
	Text,
	PanResponder,
	TouchableWithoutFeedback
} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
let menuWidth = (deviceWidth / 4) * 3;
let maxOpacity = 0.4;
let minOpacity = 0.05;
let currentOpacity = maxOpacity;

class SideMenu extends Component {

	constructor (props) {
		super(props);
		this.state = {
			filters: ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4', 'Menu 5'],
			backgroundColor: new Animated.Value(0),
			backgroundPosition: -deviceWidth,
			menuPosition: 0,
			minAutoOpacity: 'rgba(0, 0, 0,' + minOpacity + ')',
			maxAutoOpacity: 'rgba(0, 0, 0,' + maxOpacity + ')',
			opacityValue: 'rgba(0, 0, 0,' + currentOpacity + ')',
			activeClass: sideMenuStyles.itemContainer,
			velocity: 0,
			isMenuOpen: false
		};
		this.menuAnimationValue = new Animated.Value(-menuWidth);
	}

	componentWillMount () {
		this.state.left = this.menuAnimationValue.x;
		this.state.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, gestureState) => {
				this.setState({
					touch: true
				});
				let newDX = gestureState.dx >= 0 ? false : gestureState.dx;
				if (newDX !== false) {
					this.setState({
						velocity: gestureState.vx
					});
					this.menuAnimationValue.setValue(gestureState.dx);
					this.changeBackgroundOpacity(this.menuAnimationValue._value);
				}
			},
			onPanResponderEnd: (e, gestureState) => {
				this.menuAnimationValue.flattenOffset();
				if (gestureState.moveX === 0 && gestureState.x0 > menuWidth + 5) {
					this.closeModal(this.state.velocity);
				} else if (gestureState.moveX === 0 && gestureState.moveX === 0 && gestureState.x0 < menuWidth) {
					return false;
				} else {
					if (gestureState.dx < (-deviceWidth / 3)) {
						this.setState({
							maxAutoOpacity: this.state.opacityValue
						}, () => {
							this.closeModal(this.state.velocity);
						});
					} else {
						this.setState({
							minAutoOpacity: this.state.opacityValue
						}, () => {
							this.openModal();
						});
					}
				}
			}
		});
		this.openModal();
	}

	changeBackgroundOpacity (move) {
		/*linear interpolation (distance and opacity)*/
		let value = maxOpacity + ((move - 0) / (-menuWidth - 0) * ((minOpacity - maxOpacity) / 1));
		currentOpacity = value;
		this.setState({
			opacityValue: 'rgba(0, 0, 0,' + value + ')'
		});
	}

	changeBackgroundPosition (position) {
		this.setState({
			backgroundPosition: position
		});
	}

	changeOpacityValForAnimation () {
		return this.setState({
			minAutoOpacity: 'rgba(0, 0, 0,' + minOpacity + ')',
			maxAutoOpacity: 'rgba(0, 0, 0,' + maxOpacity + ')'
		});
	}

	openModal () {
		this.state.backgroundColor.setValue(0);
		this.changeBackgroundPosition(0);
		Animated.parallel([
			Animated.timing(this.menuAnimationValue, {
				duration: 600,
				toValue: 0
			}),
			Animated.timing(this.state.backgroundColor, {
				duration: 600,
				toValue: 600
			})
		]).start(() => {
			this.setState({
				isMenuOpen: true
			});
			this.changeOpacityValForAnimation();
		});
	}

	closeModal () {
		Animated.parallel([
			Animated.timing(this.menuAnimationValue, {
				duration: 600,
				toValue: (-menuWidth)
			}),
			Animated.timing(this.state.backgroundColor, {
				duration: 600,
				toValue: 0
			})
		]).start(() => {
			this.changeBackgroundPosition(-deviceWidth);
			this.state.backgroundColor.setValue(600);
			this.changeOpacityValForAnimation();
			this.setState({
				isMenuOpen: false
			}, () => this.props.close());
		});
	}

	renderList () {
		let arr = this.state.filters;
		return arr.map((rowData, index) => {
			const {itemContainer, itemTextElement} = sideMenuStyles;
			return (
				<TouchableWithoutFeedback
					key={index}
					onPressIn={() => this.closeModal()}>
					<View style={ itemContainer}>
						<Text style={itemTextElement}>{rowData}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		});
	}

	renderHeader () {
		return (
			<View style={{height: 20, backgroundColor: '#ffa227'}}>
			</View>
		);
	}

	render () {
		let color = this.state.backgroundColor.interpolate({
			inputRange: [0, 600],
			outputRange: [this.state.minAutoOpacity, this.state.maxAutoOpacity]
		});
		return (
			<Animated.View
				style={[{
					height: deviceHeight,
					width: deviceWidth,
					position: 'absolute',
					top: 0,
					left: this.state.backgroundPosition,
					backgroundColor: this.state.touch ? this.state.opacityValue : color
				}]}
				{...this.state.panResponder.panHandlers}>
				<Animated.View
					style={[
						{
							height: deviceHeight,
							width: menuWidth,
							position: 'absolute',
							top: 0,
							//left: this.state.menuPosition,
							justifyContent: 'center',
							backgroundColor: 'white'
						},
						{
							transform: [{
								translateX: this.menuAnimationValue
							}]
						}]
					}>
					<View style={{flex: 1}}>
						{this.renderHeader()}
						{this.renderList()}
					</View>
				</Animated.View>
			</Animated.View>
		);
	}
}

const sideMenuStyles = {
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between'

	},
	itemTextElement: {
		marginHorizontal: 15,
		paddingVertical: 15
	},
	activeItem: {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		borderLeftWidth: 5,
		borderLeftColor: 'orange',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}
};


export {SideMenu};
