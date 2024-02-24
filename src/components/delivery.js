// screens/HomeScreen.js
import React from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faUtensils, faTruck, faPersonBiking  } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';
const DeliveryScreen = ({ navigation }) => {

  goBack = () => {
    navigation.goBack()
  }
  goToDinein = () => {
    navigation.navigate('Dinein')
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
        <Image source={require('../../assets/delivery.jpg')} style={styles.dineInImage} resizeMode='cover'/>
        
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
  dineInImage:{
    marginTop:-40,
    height:300,
    width:'100%',
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
})

export default DeliveryScreen;
