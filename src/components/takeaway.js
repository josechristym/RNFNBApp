// screens/HomeScreen.js
import React from 'react';
import {StyleSheet, View, Image } from 'react-native';
import globalstyles from '../globalcss/globalstyle';
import HeaderComponent from '../utils/headercomponent';
const TakeAwayScreen = ({ navigation }) => {

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
        <Image source={require('../../assets/take_away.jpg')} style={styles.dineInImage} resizeMode='cover'/>
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
  },
})

export default TakeAwayScreen;
