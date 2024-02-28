// screens/HomeScreen.js
import React from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faUtensils, faTruck, faPersonBiking  } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';
import HeaderComponent from '../utils/headercomponent';
const DeliveryScreen = ({ navigation }) => {

  goBack = () => {
    navigation.goBack()
  }
  goToDinein = () => {
    navigation.navigate('Dinein')
  }
  return (
    <View style={globalstyles.containerView}>
      <HeaderComponent backAction={goBack} />
      <View style={styles.contentView}>
        <Image source={require('../../assets/delivery.jpg')} style={styles.dineInImage} resizeMode='cover'/>
        
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
  dineInImage:{
    marginTop:-20,
    height:300,
    width:'100%',
  }
})

export default DeliveryScreen;
