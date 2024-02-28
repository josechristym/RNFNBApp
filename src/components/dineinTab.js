// screens/HomeScreen.js
import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useSelector } from 'react-redux';
import { faAngleLeft, faBurger, faMoneyCheckDollar, faCashRegister, faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';
import { appThemeColor, appblueColor, dininButtonBlue } from '../utils/ColorConstants';
import HeaderComponent from '../utils/headercomponent';

const DineInTabScreen = ({ navigation }) => {
  goBack=()=>{
    navigation.goBack()
  }
  goToOrderS=()=>{
    navigation.navigate("Order")
  }
  return (
    <View style={globalstyles.containerView}>
      <HeaderComponent backAction={goBack} />
      <View style={styles.contentView}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/dinin_image.jpg')} style={styles.dineInImage} resizeMode='cover'/>
          <View style={styles.mask} />
        </View>
        <TouchableOpacity style={styles.buttonView} onPress={goToOrderS}>
          <FontAwesomeIcon icon={faBurger} size={30} color='#fff'/>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <FontAwesomeIcon icon={faCashRegister} size={30} color='#fff'/>
          <Text style={styles.buttonText}>Prepare Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <FontAwesomeIcon icon={faMoneyCheckDollar} size={30} color='#fff'/>
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
  },
  imageContainer:{
    marginTop:-20,
    width: '100%',
    height: 300,
    overflow: 'hidden',
    position: 'relative',
  },
  dineInImage:{
    width: '100%',
    height: '100%',
  },
  mask: {
    position: 'absolute',
    bottom: -70,
    left: 0,
    width: '100%',
    height: 100,
    backgroundColor: appThemeColor,
    borderRadius: 30,
    zIndex: 1,
    transform: [{ rotate: '180deg' }],
  },
  buttonView:{
    backgroundColor:dininButtonBlue,
    height:70,
    width:'90%',
    marginHorizontal:30,
    marginTop:20,
    alignItems:'center',
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingLeft:30
  },
  buttonText:{
    fontSize:17,
    padding:10,
    fontWeight:'400',
    color:'#fff'
  }
})

export default DineInTabScreen;
