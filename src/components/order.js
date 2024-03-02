// screens/HomeScreen.js
import React,{useEffect,useState} from 'react';
import {StyleSheet, ScrollView, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import globalstyles from '../globalcss/globalstyle';
import { getDineinOptions } from '../actions/fnbactions';
import { appBlackColor, bgGrayColor, appThemeColor, appblueColor } from '../utils/ColorConstants';
import HeaderComponent from '../utils/headercomponent';

const OrderScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const dineInDetails = useSelector((state) => state.fnbinfo);
  const [apiCallDone,setAPICallDone] = useState(false)
  const [dineinOptions,setDineinOptions] = useState([])

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

  const headerColorsValue = [appBlackColor,bgGrayColor]

  goToTables=()=>{
    navigation.navigate("Tables")
  }

  return (
    <View style={globalstyles.containerView}>
      <HeaderComponent backAction={goBack} />
      <View style={styles.contentView}>
      <View style={styles.imageContainer}>
          <LinearGradient style={styles.headingView} colors={headerColorsValue} end={ {x: 0.9, y: 0.9} }>
             <Text style={styles.dineinOption}>Pick your Dine-In option</Text>
          </LinearGradient>
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
  dineinOption:{
    fontSize:30,
    fontWeight:'600',
    color:appThemeColor
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
    marginTop:-20,
    width: '100%',
    height: 300,
    overflow: 'hidden',
    position: 'relative',
  },
  headingView:{
    width: '100%',
    height: '100%',
    backgroundColor:appblueColor,
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
})

export default OrderScreen;
