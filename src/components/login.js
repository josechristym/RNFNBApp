import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Keyboard, Text, View, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import { userLogin } from '../actions/usermanagementactions';
import { appOrangeColor, appblueColor } from '../utils/ColorConstants';

const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const userLoginInfo = useSelector((state) => state.userlogin);
  const [userName, onChangeUserName] = useState('finexadmin');
  const [password, onChangePassword] = useState('@#fine@2023');
  const [showLoader,setShowLoader] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [companyValues,setCompanyValues] = useState([{label:'Company 1',value:'1'},{label:'Company 2',value:'2'}, {label:'Company 3',value:'3'}])
  const [branchValues,setbranchValues] = useState([{label:'Branch 1',value:'1'},{label:'Branch 2',value:'2'}, {label:'Branch 3',value:'3'}])
  const onPressForgetPassword = () => {
    console.log("onPressForgetPassword clicked")
  }
  const onLoginPress = () => {
    // navigation.navigate('Home');
    // navigation.navigate('MainTab')
    if(userName != "" && password != ""){
      setShowLoader(true)
      dispatch(userLogin({"user_email":userName,"user_password":password}))
    }
  }
  useEffect(()=>{
    if(userLoginInfo && userLoginInfo.loginResponse){
      setShowLoader(false)
      navigation.navigate('LandingPage')
    }else if(userLoginInfo && userLoginInfo.loginFailure){
      setShowLoader(false)
      alert("Login Failed")
    }
  },[userLoginInfo])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.viewContainer}>
      </View>
      <View style={styles.centerContainer}>
        <Image source={require('../../assets/logo_transparent.jpg')} resizeMode='contain'/>
        <TextInput
          placeholder='Phone number, Username or Email'
          style={[styles.input,{marginTop:80}]}
          onChangeText={onChangeUserName}
          value={userName}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
        />
        <View style={styles.forgotButtonContainer}>
          <Text style={styles.forgotButton} >Forgot Password?</Text>
        </View>
        <TouchableOpacity onPress={onLoginPress} style={(userName != "" && password != "") ? styles.loginButtonContainer : styles.loginButtonContainerDisabled}>
          <Text style={styles.loginButton} >Log In</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.lineView} />
          <Text style={styles.orText} >OR</Text>
          <View style={styles.lineView} />
        </View>
        <View style={styles.fbContainer}>
          <Image source={require('../../assets/fbicon.jpg')} resizeMode='contain' style={styles.fbImgView}/>
          <Text style={styles.continueAsText} >Continue as</Text>
        </View>
      </View>
      {!keyboardVisible && <View style={styles.bottomContainer}>
        <View style={styles.borderView} />
        <View style={styles.signup}>
          <Text style={styles.signupDesc} >Do you have Account?</Text>
          <Text style={styles.continueAsText} >Sign Up</Text>
        </View>
      </View>}
      <Modal
        transparent
        visible={showLoader}>
        <View style={[styles.container,{backgroundColor:'rgba(255,255,255,0.75)'}]}>
          <ActivityIndicator size="large" color={appblueColor}/>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  viewContainer:{
    flex:0.15,
  },
  pickerStyle:{
    marginTop:20,
    textAlign:'center',
    fontWeight: 'bold',
    fontSize:20
  },
  centerContainer:{
    flex:1,
    width:'100%',
    alignContent:'flex-start',
    alignItems:'center',
  },
  input: {
    height: 45,
    margin: 5,
    width:'90%',
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
    backgroundColor:'#f7f8f8',
    borderColor:'#e0e1e1'
  },
  forgotButtonContainer:{
    height:20,
    width:'100%',
    alignItems:'flex-end',
    marginTop:20,
  },
  forgotButton:{
    paddingEnd:"5%",
    textDecorationLine:'underline',
    color:appblueColor,
    fontWeight:'500'
  },
  loginButtonContainer:{
    height:50,
    width:'90%',
    alignContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5,
    backgroundColor:appOrangeColor
  },
  loginButtonContainerDisabled:{
    height:50,
    width:'90%',
    opacity:0.4,
    alignContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5,
    backgroundColor:appOrangeColor,
  },
  loginButton:{
    textDecorationLine:'underline',
    color:'#fff',
    height:50,
    lineHeight:50,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17
  },
  orContainer:{
    height:30,
    width:'100%',
    flexDirection:'row',
    alignContent:'center',
    alignItems:"center",
    marginTop:20,
  },
  lineView:{
    backgroundColor:'#e0e1e1',
    height:1,
    flex:1,
    marginHorizontal:'5%',
  },
  orText:{
    color:'grey',
    height:30,
    lineHeight:30,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17
  },
  fbContainer:{
    height:30,
    width:'100%',
    flexDirection:'row',
    alignContent:'center',
    alignItems:"center",
    marginTop:20,
    padding:'5%'
  },
  fbImgView:{
    height:30,
    width:30
  },
  continueAsText:{
    textDecorationLine:'underline',
    color:appblueColor,
    height:30,
    lineHeight:30,
    fontSize:17,
    marginLeft:10,
    fontWeight:'500'
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
  borderView:{
    backgroundColor:'#e0e1e1',
    height:1.5,
    width:'100%',
  },
  signup:{
    flex:1,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center'
  },
  signupDesc:{
    color:'grey',
    height:30,
    lineHeight:30,
    fontSize:14,
    fontWeight:'300'
  }
});
