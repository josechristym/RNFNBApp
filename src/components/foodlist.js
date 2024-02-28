// screens/HomeScreen.js
import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import {StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faGlassWater, faCartShopping, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { setCartValue } from '../actions/cartaction';
import globalstyles from '../globalcss/globalstyle';
import { getAllProducts } from '../actions/fnbactions';
import HeaderComponent from '../utils/headercomponent';

const FoodListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const route = useRoute();
    const fnbinfo = useSelector((state) => state.fnbinfo);
    const colorsValue = ['#4d88ff', '#0055ff', '#003cb3']
    const [products,setProducts] = useState([])
    const [options,setOptions] = useState([{name:'Cafe Late',id:1,size:[1,2,3],selected:0},{name:'Expresso',id:2,size:[1,2],selected:0},{name:'Americano',id:3,size:[1,2,3],selected:0},{name:'Mocca',id:4,size:[1,2,3],selected:0}])
    const { groupId } = route.params;
    goBack=()=>{
        navigation.goBack()
    }
    goToCart=()=>{
        navigation.navigate("Cart")
    }

    goToAddon=(item,optionValue)=>{
        let newOptions = []
        let storeOption = {}
        options.forEach(element => {
            let newElem = {...element}
            if(item.option == element.option){
                if(element.option == item.option){
                    newElem.selected = optionValue
                }else{
                    newElem.selected = 0
                }
                storeOption = {itemName:newElem.option,id:newElem.id,size:newElem.selected,quantity:1,addons:[]}
            }
            newOptions.push(newElem)
        });
        setOptions(newOptions)
        dispatch(setCartValue(storeOption))
        navigation.navigate("FoodAddons",{data:storeOption.id,previousValue:storeOption})
    }

    useEffect(()=>{
      // dispatch(getAllProducts())
    },[])

    useEffect(()=>{
      if(fnbinfo && fnbinfo.productsInfo){
        const {productsInfo} = fnbinfo
          const {success_value} = productsInfo
          const value = success_value.filter(item=>item.group_guid == groupId)
          setProducts(value)
      }
    },[fnbinfo])

    renderItem=({item})=>{
      return <View style={styles.categoryViewRow}>
            <LinearGradient
            colors={colorsValue}
            style={styles.buttonView}>
                <View style={styles.touchableView}>
                    <Text style={styles.buttonText}>{item.name}</Text>
                </View>
            </LinearGradient>
            <TouchableOpacity onPress={()=>goToAddon(item,3)} style={styles.tumblerIcon}>
                <FontAwesomeIcon icon={faGlassWater} color={item.size && item.size.includes(3)?'#99bbff':'transparent'} size={80}/>
                {item.selected == 3 && <FontAwesomeIcon icon={faCheckCircle} color='green' size={20} style={styles.tickIconLarge}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goToAddon(item,2)} style={styles.tumblerIcon}>
                <FontAwesomeIcon icon={faGlassWater} color={item.size && item.size.includes(2)?'#99bbff':'transparent'} size={50}/>
                {item.selected == 2 && <FontAwesomeIcon icon={faCheckCircle} color='green' size={20} style={styles.tickIconMedium}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>goToAddon(item,1)} style={styles.tumblerIcon}>
                <FontAwesomeIcon icon={faGlassWater} color={item.size && item.size.includes(1)?'#99bbff':'transparent'} size={30}/>
                {item.selected == 1 && <FontAwesomeIcon icon={faCheckCircle} color='green' size={20} style={styles.tickIconSmall}/>}
            </TouchableOpacity>
        </View>
    }
    return (
        <View style={globalstyles.containerView}>
        <HeaderComponent backAction={goBack} />
        <View style={styles.contentView}>
            <View style={{...styles.categoryViewRow,marginTop:-20}}>
                <Text style={styles.subheaderText}>Coffee</Text>
                <TouchableOpacity onPress={goToCart}><FontAwesomeIcon icon={faCartShopping} color='#a8323a' size={30}/></TouchableOpacity>    
            </View>
            <FlatList
              data={options}
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
    height:50,
    width:100,
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
  }
})

export default FoodListScreen;
