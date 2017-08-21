/**
 * Created by Devsteam.mobi on 7/23/17.
 */
import React, {Component} from 'react';
import {
	View,
	Image,
	ScrollView,
	Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	BackHeader,
	IconRowsForRecipeDetail,
	RecipeDescriptionContainer,
	RecipeListIngredientsContainer
} from './common';
import DecisionComponent from './common/DecisionComponent';
import {connect} from 'react-redux';
import {sendConfirm, changeMealList} from '../actions';
import {formatDate} from '../actions/const';

class RecipeDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirm: this.props.confirm
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.sendConfirm !== this.props.confirm) {
			this.setState({
				sendConfirm: nextProps.confirm
			});
		}
	}

	renderImage() {
		const {recipeImg} = this.props;
		const {imgContainer, imgStyle} = styles;
		return (
			<View style={imgContainer}>
				<Image
					source={{uri: recipeImg}}
					style={imgStyle}
				/>
			</View>
		);
	}

	renderNDB() {
		if (this.props.recipe.ndb) {
			return <RecipeListIngredientsContainer list={this.props.recipe.ndb}/>;
		}
		else {
			return null;
		}
	}

	renderDecisionRow() {
		if (this.props.showTab) {
			return (
				<DecisionComponent
					sendConfirm={(id, isLike, isConfirm) => this.props.sendConfirm(id, isLike, isConfirm)}
					planId={this.props.recipe.recipe.plan_id}/>
			);
		} else {
			return null;
		}

	}

	renderDescription() {
		const {directions} = this.props.recipe.recipe;
		const {descriptionContainer} = styles;
		if (!this.props.showTab) {
			return (
				<View style={descriptionContainer}>
					{this.renderNDB()}
					<RecipeDescriptionContainer description={directions}/>
				</View>
			);
		} else {
			return null;
		}
	}

	renderDate() {
		const {recipe} = this.props.recipe;
		const {dateContainer, recipeType, recipeDate} = styles;
		if (this.props.showTab) {
			return (
				<View style={dateContainer}>
					<Text style={recipeType}>{recipe.type}</Text>
					<Text style={recipeDate}>{formatDate(recipe.date)}</Text>
				</View>
			);
		} else {
			return null;
		}
	}

	render() {
		const {header} = styles;
		return (
			<View style={{flex: 1}}>
				<BackHeader title={'Recipe'} leftButtonPress={() => Actions.pop()}/>
				<ScrollView>
					<View style={header}>
						{this.renderImage()}
						<IconRowsForRecipeDetail recipe={this.props.recipe.recipe}/>
					</View>
					{this.renderDate()}
					{this.renderDescription()}
					{this.renderDecisionRow()}
				</ScrollView>
			</View>
		);
	}
}
const styles = {
	imgContainer: {
		height: 250,
		alignItems: 'stretch',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.2)'
	},
	imgStyle: {
		flex: 1,
		borderRadius: 5
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.2)',
		paddingBottom: 20
	},
	descriptionContainer: {
		flex: 1,
		marginHorizontal: 10,
		paddingBottom: 10,
		paddingTop: 10
	},
	dateContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0,0,0,0.2)'
	},
	recipeType: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	recipeDate: {
		fontSize: 18
	}
};

const mapStateToProps = ({recipeDetail}) => {
	const {
		error,
		loading,
		recipe,
		recipeImg,
		showTab,
		confirm
	} = recipeDetail;
	return {
		error,
		loading,
		recipe,
		recipeImg,
		showTab,
		confirm
	};
};

export default connect(mapStateToProps, {sendConfirm, changeMealList})(RecipeDetail);

