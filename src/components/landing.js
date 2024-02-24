// screens/HomeScreen.js
import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import globalstyles from '../globalcss/globalstyle';
import CustomPicker from '../utils/custompicker';
import { appblueColor, appOrangeColor, bgGrayColor, borderGray } from '../utils/ColorConstants';

const LandingScreen = ({ navigation }) => {
  const userLoginInfo = useSelector((state) => state.userlogin);
  const [apiLoginResponse,setLoginResponse] = useState(undefined)
  const [userData,setUserData] = useState({})
  const [outletsData,setOutletsData] = useState([])
  const [storeList,setStoreList] = useState([])
  const [isCompanyPickerVisible, setCompanyPickerVisible] = useState(false);
  const [isBranchPickerVisible, setBranchPickerVisible] = useState(false);
  const [company,setCompany] = useState("")
  const [outlets,setOutlets] = useState("")
  onCloseCompanyClick=(value)=>{
    setCompany(value)
    setCompanyPickerVisible(false)
  }
  onCloseBranchClick=(value)=>{
    if(value){
      setOutlets(value)
    }
    setBranchPickerVisible(false)
  }
  goBack=()=>{
    navigation.goBack()
  }
  onContinueClick=()=>{
    if(company != "" && outlets != ""){
      navigation.navigate('MainTab')
    }
  }
  useEffect(()=>{
    if(userLoginInfo && userLoginInfo.loginResponse && apiLoginResponse == undefined){
        const {loginResponse} = userLoginInfo
        const {success_value} = loginResponse
        const {store_list,outlet,user_data} = success_value
        setLoginResponse(loginResponse)
        setUserData(user_data)
        setStoreList(store_list)
        setOutletsData(outlet)
    }
  },[userLoginInfo])

  return (
    <View style={globalstyles.containerView}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesomeIcon icon={faAngleLeft} size={30}/>
        </TouchableOpacity>
        <Image source={require('../../assets/logo_blue.jpg')} style={styles.headerIcon} resizeMode='contain'/>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.welcomeText}>Welcome {userData && userData.name} !!!</Text>
        <TouchableOpacity style={styles.pickerStyle} onPress={()=>{setCompanyPickerVisible(true)}} >
            <Text style={styles.picketText}>{company && company.name ? company.name : "Select Company"}</Text>
            <FontAwesomeIcon icon={faAngleDown} size={25} color={appblueColor}/>
            {isCompanyPickerVisible && !isBranchPickerVisible && <CustomPicker options={storeList} labelKey="name" handleClose={(value)=>onCloseCompanyClick(value)}/>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerStyle} onPress={()=>{setBranchPickerVisible(true)}}>
            <Text style={styles.picketText}>{outlets && outlets.name ? outlets.name : "Select Outlet"}</Text>
            <FontAwesomeIcon icon={faAngleDown} size={25} color={appblueColor}/>
            {!isCompanyPickerVisible && isBranchPickerVisible && <CustomPicker options={outletsData} labelKey="name" handleClose={(value)=>onCloseBranchClick(value)}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={onContinueClick} disabled={!company || !outlets} style={styles.continueButtonContainer}>
          <Text style={styles.continueButton} >Continue</Text>
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
  welcomeText:{
    fontSize:22,
    marginTop:-20,
    padding:10,
    fontWeight:'600',
    color:'#2B3590'
  },
  headerText:{
    fontSize:17,
    padding:10,
    fontWeight:'600',
    color:'#2B3590'
  },
  pickerStyle:{
    width:'90%',
    margin:'5%',
    height:45,
    borderRadius:5,
    paddingHorizontal:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth: 1,
    backgroundColor:bgGrayColor,
    borderColor:borderGray
  },
  picketText:{
    fontSize:17,
    lineHeight:30,
    // height:30,
    color:appblueColor,
    marginLeft:5
  },
  contentView:{
    flex:0.90,
    width:'100%',
    alignItems:'center'
  },
  continueButtonContainer:{
    height:50,
    width:'90%',
    alignContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5,
    backgroundColor:appOrangeColor
  },
  continueButton:{
    color:'#fff',
    height:50,
    lineHeight:50,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
})

export default LandingScreen;
