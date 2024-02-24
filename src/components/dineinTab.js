// screens/HomeScreen.js
import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useSelector } from 'react-redux';
import { faAngleLeft, faBurger, faMoneyCheckDollar, faCashRegister  } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';
import { appThemeColor, dininButtonBlue } from '../utils/ColorConstants';

const DineInTabScreen = ({ navigation }) => {

  const userLoginInfo = useSelector((state) => state.userlogin);
  const [userData,setUserData] = useState({})
  goBack=()=>{
    navigation.goBack()
  }
  goToOrderS=()=>{
    navigation.navigate("Order")
  }
  useEffect(()=>{
    if(userLoginInfo && userLoginInfo.loginResponse){
        const {loginResponse} = userLoginInfo
        const {success_value} = loginResponse
        const {user_data} = success_value
        setUserData(user_data)
    }
  },[userLoginInfo])
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
      <View style={styles.bottomContainer} >
        <Text style={styles.headerText}>User: {userData && userData.name}</Text>
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
  imageContainer:{
    marginTop:-40,
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
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
})

export default DineInTabScreen;
