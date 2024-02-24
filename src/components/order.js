// screens/HomeScreen.js
import React,{useEffect,useState} from 'react';
import {StyleSheet, ScrollView, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faChair } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

import globalstyles from '../globalcss/globalstyle';
import { getDineinOptions } from '../actions/fnbactions';
import { appBlackColor, appOrangeColor, appThemeColor, appblueColor, dininButtonBlue } from '../utils/ColorConstants';

const OrderScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const dineInDetails = useSelector((state) => state.fnbinfo);
  const [apiCallDone,setAPICallDone] = useState(false)
  const userLoginInfo = useSelector((state) => state.userlogin);
  const [userData,setUserData] = useState({})
  const [dineinOptions,setDineinOptions] = useState([])
  useEffect(()=>{
    if(userLoginInfo && userLoginInfo.loginResponse){
        const {loginResponse} = userLoginInfo
        const {success_value} = loginResponse
        const {user_data} = success_value
        setUserData(user_data)
    }
  },[userLoginInfo])

  useEffect(()=>{
    if(!apiCallDone){
      dispatch(getDineinOptions())
    }
    setAPICallDone(true)
  },[])

  useEffect(()=>{
    if(dineInDetails && dineInDetails.dineinoptions){
      const {dineinoptions} = dineInDetails
      const {success_value} = dineinoptions
      setDineinOptions(success_value)
    }
  },[dineInDetails])

  goBack=()=>{
    navigation.goBack()
  }

  const colorsValue = [appblueColor,'#acc0fe']

  goToTables=()=>{
    navigation.navigate("Tables")
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
      <View style={styles.imageContainer}>
          <View style={styles.headingView}>
             <Text style={styles.dineinOption}>Pick your Dine-In option</Text>
          </View>
          <View style={styles.mask} />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollContainer}>
          {dineinOptions.map((item, index)=>(
            <LinearGradient
            key={index}
            colors={colorsValue}
            end={ {x: 1.0, y: 0.9} }
            style={styles.buttonView}>
                <TouchableOpacity style={styles.touchableView} onPress={goToTables}>
                    <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
            </LinearGradient>))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer} >
        <Text style={styles.headerText}>User:  {userData && userData.name}</Text>
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
    color:appblueColor
  },
  dineinOption:{
    fontSize:30,
    fontWeight:'600',
    color:appThemeColor
  },
  contentView:{
    flex:0.90,
    width:'100%',
    alignItems:'center',
    // justifyContent:'center'
  },
  scrollView:{
    flex:1,
    width:"100%",
  },
  scrollContainer:{
    width:'100%',
    height:'100%',
    alignContent:'center',
    alignItems:'center'
  },
  imageContainer:{
    marginTop:-40,
    width: '100%',
    height: 300,
    overflow: 'hidden',
    position: 'relative',
  },
  headingView:{
    width: '100%',
    height: '100%',
    backgroundColor:appBlackColor,
    alignItems:'center',
    justifyContent:'center'
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
    borderRadius:10,
    height:150,
    width:'80%',
    margin:15,
    alignItems:'center',
    justifyContent:'center'
  },
  touchableView:{
    backgroundColor:'transparent',
    height:'100%',
    width:"100%",
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:17,
    padding:10,
    fontWeight:'600',
    color:appThemeColor
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
})

export default OrderScreen;
