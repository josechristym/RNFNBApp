// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {StyleSheet, FlatList, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import globalstyles from '../globalcss/globalstyle';
import { getAllGroups } from '../actions/fnbactions';
import HeaderComponent from '../utils/headercomponent';
import { appOrangeColor,appblueColor } from '../utils/ColorConstants';

const FoodCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  // const colorsValue = ['#fbfeff', '#e1f8ff', '#c8f3ff']
  const colorsValue = [appblueColor,'#acc0fe']
  const fnbinfo = useSelector((state) => state.fnbinfo);
  const [groups,setGroups] = useState([])
  gotToList=(group)=>{
    navigation.navigate("FoodList",{
      "groupId":group.under_group
    })
  }

  goBack=()=>{
    navigation.goBack()
  }

  useEffect(()=>{
    dispatch(getAllGroups())
  },[])
  useEffect(()=>{
    if(fnbinfo && fnbinfo.groupsInfo){
      const {groupsInfo} = fnbinfo
        const {success_value} = groupsInfo
        setGroups(success_value)
    }
  },[fnbinfo])

  renderItem=({item})=>{
    return <LinearGradient
    colors={colorsValue}
    style={styles.buttonView}>
        <TouchableOpacity style={styles.touchableView} onPress={()=>gotToList(item)}>
            <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
    </LinearGradient>
  }
  return (
    <View style={globalstyles.containerView}>
      <HeaderComponent backAction={goBack}/>
      <View style={styles.contentView}>
        <View style={styles.inputView}>
            <TextInput
                placeholder='Search Food...'
                style={styles.input}
                />
            <FontAwesomeIcon icon={faSearch} size={20}/>
        </View>
        <FlatList
          data={groups}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
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
    margin:10,
    borderRadius:75,
    borderWidth:2,
    borderColor:'#2B3590',
    height:150,
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
    color:'#fff'
  }
  
})

export default FoodCategoryScreen;
