import React, { Component,Fragment } from 'react';
import { View,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	ActivityIndicator} from 'react-native';
import {connect} from 'react-redux'
import {withNavigationFocus} from 'react-navigation';
import {loadData} from '../../actions/home'

class Home extends Component {
	constructor(props) {
		super(props);
	}


	componentDidMount(){
		let {dispatch} = this.props;
		dispatch(loadData())
	}

	_renderItem(item,index){
		return (
			<TouchableOpacity
				key={index}
				style={s.itemCnt}
				activeOpacity={1}
				onPress={() => {
				this.props.navigation.push('Detail', {
					itemDetail: item,
					index: index
				})
			}}
			>
				<Text style={s.title}>{index}---{item.title}</Text>
				<Text style={s.dec}>{item.details}</Text>
				<Text style={s.text}>unix: {item.event_date_unix}</Text>
				<Text style={s.text}>number: {item.flight_number ? item.flight_number : '0'}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		let {loading,data} = this.props;
		return (
			<View style={s.wrap}>
				{loading ? (
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<ActivityIndicator/>
					</View>
				) : (
					<FlatList style={{flex: 1,backgroundColor: '#EDF0F2'}}
							  data={data}
							  renderItem={({item, index}) => this._renderItem(item, index)}
							  keyExtractor={item=> item.event_date_utc}
							  ListEmptyComponent={this._renderNoResult()}
					/>

				)}

			</View>
		);
	}

	_renderNoResult() {
		return (
			<View style={s.noResult}>
				<Text style={s.noResultText}>No records found</Text>
			</View>
		)
	}


}

const s = StyleSheet.create({
    wrap:{
		flex:1
	},
	itemCnt: {
		backgroundColor: '#fff',
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 15,
		color: '#222',
		fontWeight: 'bold'
	},
	dec: {
		fontSize: 13,
		color: '#888',
		padding: 10,
		marginTop: 10,
		backgroundColor: '#f5f7fe',
	},
	text: {
		fontSize: 13,
		color: '#222',
		paddingTop: 10,
	},
	noResult: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: 50,
		width: '100%'
	},
	noResultText: {
		paddingTop: 10,
		fontSize: 13,
		color: '#222',
		width: '100%',
		textAlign: 'center'
	},
	
});

export default connect(state => {
	return {
		data: state.home.data,
		loading: state.home.pageLoading,
	}
})(withNavigationFocus(Home))