import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import {connect} from 'react-redux'
import {SafeAreaView} from 'react-navigation'
import {changeData} from "../../actions/home";

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.getParam('itemDetail').title
    });

    state = {
        loading: true,
        data: this.props.navigation.getParam('itemDetail'),
        index: this.props.navigation.getParam('index'),
        num: this.props.navigation.getParam('itemDetail').flight_number
    };

    componentDidMount() {
    }

    changeData(num,index) {
        let newNum = num ? num + '修改啦～' +  index : '0修改啦～' +  index;
        this.setState({num:newNum});
        this.props.dispatch(changeData(newNum,index))
    }

    render() {
        let {data, index, num} = this.state;
        return (
            <SafeAreaView style={s.wrap} forceInset={{top: 'never'}}>
                <Text style={s.title}>{index}--{data.title}</Text>
                <Text style={s.dec}>{data.details}</Text>
                <Text style={s.text}>unix: {data.event_date_unix}</Text>
                <Text
                    onPress={() => {this.changeData(data.flight_number,index)}}
                    style={s.text}
                >
                    click this number: {num ? num : '0'}
                </Text>

            </SafeAreaView>
        );
    }
}

const s = StyleSheet.create({
    wrap: {
        flex: 1,
        padding: 15
    },
    title: {
        fontSize: 15,
        color: '#222',
        fontWeight: 'bold',
        paddingTop: 10
    },
    dec: {
        fontSize: 13,
        color: '#888',
        padding: 15,
        marginTop: 20,
        backgroundColor: '#f5f7fe',
    },
    text: {
        fontSize: 13,
        color: '#222',
        paddingTop: 10,
    },

});

export default connect()(Detail)