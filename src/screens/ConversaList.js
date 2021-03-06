import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,FlatList,TouchableHighlight,Image} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {StackActions,DrawerActions} from 'react-navigation';
import { connect } from 'react-redux';
import{getChatList,setActiveChat}	from '../actions/ChatActions';
import ConversasItem from '../components/ConversaList/ConversasItem';


export class ConversaList extends Component {

	static navigationOptions = ({navigation}) => ({
	    header:null
	});

	constructor(props) {
		super(props);
		this.state = {};
		let tela = 1;
        this.props.getChatList(this.props.uid,tela);
        this.conversaClick = this.conversaClick.bind(this);
	}

	conversaClick(data){
        this.props.setActiveChat(data.key);
	}

	render() {
        if (this.props.chatAtivo != ''){
			this.props.navigation.navigate('ConversaInterna');
		}
		return (
			<View style={styles.container}>
			    <View style={styles.header}>
			        <TouchableHighlight  onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
			            <Image style={styles.menuImage} source={require('../assets/images/menu.png')}/>
			        </TouchableHighlight>
			    </View>
			    <FlatList
                   data={this.props.chats}
                   renderItem={({item})=><ConversasItem data={item} onPress={this.conversaClick}/>}		

			    />
                
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1, 
		
	},
	header:{
		width:'100%',
		height:60,
		backgroundColor:'#a8119c',
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center'
	},
	menuImage:{
		width:52,
		height:52
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		chatAtivo:state.chat.chatAtivo,
		chats:state.chat.chats,
		uid:state.auth.uid,
	};
};

const ConversaListConnect = connect(mapStateToProps, { getChatList,setActiveChat})(ConversaList);
export default  ConversaListConnect;
















