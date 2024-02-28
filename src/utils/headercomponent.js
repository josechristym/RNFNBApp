// screens/HomeScreen.js
import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useSelector } from 'react-redux';
import { faAngleLeft, faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import { appblueColor } from '../utils/ColorConstants';

const HeaderComponent = ({ backAction }) => {

  const userLoginInfo = useSelector((state) => state.userlogin);
  const [userData,setUserData] = useState({})
  useEffect(()=>{
    if(userLoginInfo && userLoginInfo.loginResponse){
        const {loginResponse} = userLoginInfo
        const {success_value} = loginResponse
        const {user_data} = success_value
        setUserData(user_data)
    }
  },[userLoginInfo])
  return (
      <View style={styles.headerView}>
        <View style={styles.headerBackView}>
          <TouchableOpacity onPress={backAction}>
            <FontAwesomeIcon icon={faAngleLeft} size={30}/>
          </TouchableOpacity>
          <Image source={require('../../assets/logo_blue.jpg')} style={styles.headerIcon} resizeMode='contain'/>
        </View>
        <Text style={styles.headerText}>Tasty Foods Resturant</Text>
        <View style={styles.profileContainer}>
            <FontAwesomeIcon icon={faUserCircle} size={30} color={appblueColor}/>
            <Text style={styles.userName}>{userData && userData.name}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  headerView:{
    flex:0.10,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-between',
    paddingTop:10,
    width:'100%',
  },
  headerBackView:{
    flexDirection:'row',
    alignItems:'flex-start',
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
  profileContainer:{
    marginEnd:10,
    justifyContent:'center',
    alignItems:'center'
  },
  userName:{
    fontSize:12,
    fontWeight:'400',
    color:'#2B3590'
  }
})

export default HeaderComponent;
