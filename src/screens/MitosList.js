import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,FlatList,TouchableHighlight,Image} from 'react-native';
import { NavigationActions,DrawerActions } from 'react-navigation';
import {StackActions} from 'react-navigation';
import { connect } from 'react-redux';
import{getMitosList,setActiveArtigo}	from '../actions/MitosActions';
import ArtigosItem from '../components/ArtigosList/ArtigosItem';


export class MitosList extends Component {

	static navigationOptions = ({navigation}) => ({
	    header:null
	});

	constructor(props) {
		super(props);
		this.state = {};
        this.props.getMitosList();
        this.artigoClick = this.artigoClick.bind(this);
	}

	artigoClick(item){
        this.props.setActiveArtigo(item.key);
        this.props.navigation.navigate('MitosInterno');
	}

	render() {
		return (
			<View style={styles.container}>
			    <View style={styles.header}>
			        <TouchableHighlight  onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
			            <Image style={styles.menuImage} source={require('../assets/images/menu.png')}/>
			        </TouchableHighlight>
			    </View>
			    <FlatList
                   data={this.props.artigos}
                   renderItem={({item})=><ArtigosItem data={item} onPress={this.artigoClick}/>}
			    />
                
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1, 
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#EEEEEE'
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
		ArtigoAtivo:state.mitos.ArtigoAtivo,
		artigos:state.mitos.artigos
	};
};

const MitosListConnect = connect(mapStateToProps, { getMitosList,setActiveArtigo})(MitosList);
export default  MitosListConnect;
















