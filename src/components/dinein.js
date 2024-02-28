// screens/HomeScreen.js
import React from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faBurger, faMoneyCheckDollar, faCashRegister  } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';
import HeaderComponent from '../utils/headercomponent';

const DineInScreen = ({ navigation }) => {

  goBack=()=>{
    navigation.goBack()
  }
  goToOrderScreen=()=>{
    navigation.navigate("Order")
  }
  return (
    <View style={globalstyles.containerView}>
      <HeaderComponent backAction={goBack} />
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
})

export default DineInScreen;
