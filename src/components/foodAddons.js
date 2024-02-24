// screens/HomeScreen.js
import React, {useState,useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faGlassWater, faCartShopping, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { setCartValue } from '../actions/cartaction';
import globalstyles from '../globalcss/globalstyle';
const FoodAddOnScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const tableState = useSelector((state) => state.cartinfo);
    const route = useRoute();
    const { data, previousValue } = route.params;
    const colorsValue = ['#4d88ff', '#0055ff', '#003cb3']
    const [options,setOptions] = useState([{option:'Coconut Milk',value:'0.500 Fils'},{option:'Badam Milk',value:'0.750 Fils'},{option:'Oats Milk',value:'0.250 Fils'},{option:'Extra Cream',value:'Free'}])
    const [prevAdons, setPrevAddons] = useState([])
    const [selecteditem,setSelectedItem] = useState([])

    goBack=()=>{
        navigation.goBack()
    }

    goToPrevious=(item)=>{
        const addonData = {
            addonItem:item.option,
            cost:item.value
        }
        let localprevAdons = []
        if(prevAdons.length > 0){
            localprevAdons = prevAdons.filter(elem=>elem.addonItem != addonData.addonItem)
        }
        localprevAdons.push(addonData)
        let storeOption = {...selecteditem}
        storeOption.addons = localprevAdons
        dispatch(setCartValue(storeOption))
        navigation.goBack()
    }

    goToCart=()=>{
        navigation.navigate("Cart")
    }

    useEffect(()=>{
        if(tableState && tableState.cartValue){
          const {cartValue} = tableState
          if(cartValue != undefined){
            let selectedData = cartValue.filter(elem=>elem.id==data)
            if(selectedData && selectedData.length > 0){
                let addons = selectedData[0].addons
                setSelectedItem(selectedData[0])
                setPrevAddons(addons)
            }
          }
        }
      },[tableState,data])

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
            <View style={{...styles.categoryViewRow,marginTop:-20}}>
                <Text style={styles.subheaderText}>Coffee</Text>
                <TouchableOpacity onPress={goToCart}><FontAwesomeIcon icon={faCartShopping} color='#a8323a' size={30}/></TouchableOpacity>    
            </View>
            {options.map((item, index) => (
                <View style={styles.categoryViewRow} key={index}>
                    <LinearGradient
                    colors={colorsValue}
                    style={styles.buttonView}>
                        <View style={styles.touchableView}>
                            <Text style={styles.buttonText}>{item.option}</Text>
                        </View>
                    </LinearGradient>
                    <LinearGradient
                    colors={colorsValue}
                    style={styles.buttonView}>
                        <TouchableOpacity style={styles.touchableView} onPress={()=>goToPrevious(item)}>
                            <Text style={styles.buttonText}>{item.value}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            ))}
            
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
  categoryViewRow:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width:'90%',
    margin:'5%'
  },
  buttonView:{
    backgroundColor:'#4863df',
    borderWidth:2,
    borderColor:'#002266',
    height:80,
    width:150,
    alignItems:'center',
    justifyContent:'center'
  }, 
  subheaderText:{
    fontSize:20,
    padding:10,
    fontWeight:'600',
    color:'#000',
    textAlign:'left',
    width:'70%'
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
  },
  tumblerIcon:{
  },
  tickIconLarge:{
    position: 'absolute',
    top: 30,
    left: 30,
  },
  tickIconMedium:{
    position: 'absolute',
    top: 15,
    left: 15,
  },
  tickIconSmall:{
    position: 'absolute',
    top: 5,
    left: 5,
  },
  input: {
    height: 45,
    margin: 5,
    width:45,
    borderWidth: 1,
    padding: 10,
    borderRadius:5,
    backgroundColor:'#f7f8f8',
    borderColor:'#e0e1e1',
    textAlign:'center'
  },
  bottomContainer:{
    position:'absolute',
    height:60,
    width:'100%',
    bottom: 0,
  },
})

export default FoodAddOnScreen;
