// screens/HomeScreen.js
import React from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import globalstyles from '../globalcss/globalstyle';
const FoodCategoryScreen = ({ navigation }) => {

  goBack=()=>{
    navigation.goBack()
  }

  const colorsValue = ['#fbfeff', '#e1f8ff', '#c8f3ff']

  gotToList=()=>{
    navigation.navigate("FoodList")
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
        <View style={styles.inputView}>
            <TextInput
                placeholder='Search Food...'
                style={styles.input}
                />
            <FontAwesomeIcon icon={faSearch} size={20}/>
        </View>
        <View style={styles.categoryViewRow}>
            <LinearGradient
            colors={colorsValue}
            style={styles.buttonView}>
                <TouchableOpacity style={styles.touchableView} onPress={gotToList}>
                    <Text style={styles.buttonText}>Juices</Text>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
            colors={colorsValue}
            style={styles.buttonView}>
                <TouchableOpacity style={styles.touchableView} onPress={gotToList}>
                    <Text style={styles.buttonText}>Coffee</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
        <View style={styles.categoryViewRow}>
            <LinearGradient
            colors={colorsValue}
            style={styles.buttonView}>
                <TouchableOpacity style={styles.touchableView} onPress={gotToList}>
                    <Text style={styles.buttonText}>Tea</Text>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
            colors={colorsValue}
            style={styles.buttonView}>
                <TouchableOpacity style={styles.touchableView} onPress={gotToList}>
                    <Text style={styles.buttonText}>Veggies</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
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
  inputView: {
    height: 45,
    margin: 5,
    width:'90%',
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
    backgroundColor:'#f7f8f8',
    borderColor:'#e0e1e1',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  input: {
    height: 45,
    width:'80%',
    fontSize:16
  },
  categoryViewRow:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'90%',
    margin:'5%'
  },
  buttonView:{
    backgroundColor:'#4863df',
    borderWidth:2,
    borderColor:'#2B3590',
    height:100,
    width:150,
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
    color:'#000'
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
  
})

export default FoodCategoryScreen;
