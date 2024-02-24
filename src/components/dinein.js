// screens/HomeScreen.js
import React from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faBurger, faMoneyCheckDollar, faCashRegister  } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';

const DineInScreen = ({ navigation }) => {

  goBack=()=>{
    navigation.goBack()
  }
  goToOrderScreen=()=>{
    navigation.navigate("Order")
  }
  return (
    <View style={globalstyles.containerView}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesomeIcon icon={faAngleLeft} size={30}/>
        </TouchableOpacity>
        <Image source={require('../../assets/logo_blue.jpg')} style={styles.headerIcon} resizeMode='contain'/>
        <Text style={styles.headerText}>Tasty Foods Resturant</Text>
      </View>
      <View style={styles.contentView}>
        <TouchableOpacity style={styles.buttonView} onPress={goToOrderScreen}>
          <FontAwesomeIcon icon={faBurger} size={60} color='#fff'/>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <FontAwesomeIcon icon={faCashRegister} size={60} color='#fff'/>
          <Text style={styles.buttonText}>Prepare Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <FontAwesomeIcon icon={faMoneyCheckDollar} size={60} color='#fff'/>
          <Text style={styles.buttonText}>Bill Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer} >
        <Text style={styles.headerText}>User: ABCD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView:{
    flex:0.10,
    flexDirection:'row',
    alignItems:'flex-start',
    paddingTop:10,
    width:'100%',
  },
  headerIcon:{
    height:40,
    width:80,
  },
  headerText:{
    fontSize:17,
    padding:10,
    fontWeight:'600',
    color:'#2B3590'
  },
  contentView:{
    flex:0.90,
    width:'100%',
    alignItems:'center',
    // justifyContent:'center'
  },
  buttonView:{
    backgroundColor:'#4863df',
    height:150,
    width:150,
    margin:30,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:17,
    padding:10,
    fontWeight:'400',
    color:'#fff'
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
})

export default DineInScreen;
