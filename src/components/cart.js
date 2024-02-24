// screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faPlusCircle, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { updateCartValue } from '../actions/cartaction';
import globalstyles from '../globalcss/globalstyle';

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const tableState = useSelector((state) => state.cartinfo);
    const colorsValue = ['#efeff5', '#e0e0eb', '#d0d0e1']
    const [cartItems,setCartItems] = useState([])
    goBack=()=>{
        navigation.goBack()
    }

    goToPrevious=(item,optionValue)=>{
        navigation.goBack()
    }

    addQuantity=(item)=>{
        let newCartValue = []
        cartItems.forEach(element => {
            let newelem = {...element}
            if(element.id == item.id){
                newelem.quantity = newelem.quantity + 1
            }
            newCartValue.push(newelem)
        });
        setCartItems(newCartValue)
        dispatch(updateCartValue(newCartValue))
    }
    removeQuantity=(item)=>{
        let newCartValue = []
        cartItems.forEach(element => {
            let newelem = {...element}
            if(element.id == item.id && newelem.quantity != 1){
                newelem.quantity = newelem.quantity - 1
            }
            newCartValue.push(newelem)
        });
        setCartItems(newCartValue)
        dispatch(updateCartValue(newCartValue))
    }
    removeItem=(item)=>{
        const newCartValue = cartItems.filter(elem=>elem.id!=item.id)
        setCartItems(newCartValue)
        dispatch(updateCartValue(newCartValue))
    }
    removeAddon=(item,addon)=>{
        let newCartValue = []
        cartItems.forEach(element => {
            let newelem = {...element}
            if(element.id == item.id){
               const filteredElem = element.addons.filter(ele=>ele.addonItem!=addon.addonItem)
               newelem.addons = [...filteredElem]
            }
            newCartValue.push(newelem)
        });
        setCartItems(newCartValue)
        dispatch(updateCartValue(newCartValue))
    }
    useEffect(()=>{
        if(tableState && tableState.cartValue){
          const {cartValue} = tableState
          if(cartValue != undefined){
            setCartItems(cartValue)
          }
        }
      },[tableState])

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
                <Text style={styles.subheaderText}>Cart Items</Text>
            </View>
            {cartItems && cartItems.map((item, index) => (
                <LinearGradient colors={colorsValue} style={styles.categoryViewRow} key={index}>
                    <View style={styles.cartItem}>
                        <Text style={styles.itemText}>{item.itemName}</Text>
                        <Text style={styles.sizeText}>{item.size}</Text>
                        <TouchableOpacity onPress={()=>addQuantity(item)}><FontAwesomeIcon icon={faPlusCircle} size={20}/></TouchableOpacity>
                        <TextInput placeholder='Qty' value={item.quantity.toString()} editable={false} style={styles.input} />
                        <TouchableOpacity onPress={()=>removeQuantity(item)}><FontAwesomeIcon icon={faMinusCircle} size={20}/></TouchableOpacity>
                        <TouchableOpacity onPress={()=>removeItem(item)}><FontAwesomeIcon icon={faTrash} size={20}/></TouchableOpacity>
                    </View>
                    <Text style={{...styles.subheaderText,fontSize:15, }}>Addons : {item.addons&&item.addons.length}</Text>
                    {item.addons && item.addons.map((data,indexValue)=>(
                    <View style={styles.cartItem} key={indexValue}>
                        <Text style={styles.itemText}>{data.addonItem}</Text>
                        <Text style={styles.sizeText}>{data.cost}</Text>
                        <TouchableOpacity onPress={()=>removeAddon(item,data)}><FontAwesomeIcon icon={faTrash} size={20}/></TouchableOpacity>
                    </View>
                    ))}
                </LinearGradient>
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
    alignItems:'center',
    width:'90%',
    margin:'5%',
    borderRadius:10,
    borderColor:'black'
  },
  cartItem:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
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
    width:'100%'
  },
  itemText:{
    fontSize:17,
    padding:10,
    fontWeight:'500',
    color:'#000',
    textAlign:'left'
  },
  sizeText:{
    fontSize:15,
    padding:10,
    fontWeight:'300',
    color:'#000',
    textAlign:'left'
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

export default CartScreen;
