// screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {StyleSheet, View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChair } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { setTableInputs } from '../actions/cartaction';
import globalstyles from '../globalcss/globalstyle';
import {getTablesAPI} from '../actions/fnbactions';
import { appOrangeColor, appblueColor } from '../utils/ColorConstants';
import HeaderComponent from '../utils/headercomponent';

const TablesScreen = ({ navigation }) => {
  const tableState = useSelector((state) => state.cartinfo);
  const dispatch = useDispatch();

  const [isMergeTable,setIsMergeTable] = useState(false)
  const [shouldCallAPI,setShouldCallAPI] = useState(true)
  const colorsValue = ['#fbfeff', '#e1f8ff', '#c8f3ff']
  const colorsValueSelected = ["#ffe0b3","#ffc266","#ffa31a"]
  const [selectedTables, setSelectedTables] = useState([])
  const [selectChair, setSelectedChair] = useState([])
  const fnbinfo = useSelector((state) => state.fnbinfo);
  const [tablesList,setTablesList] = useState([])

  useEffect(()=>{
    if(tableState && tableState.tablechairs){
      const {tablechairs} = tableState
      if(tablechairs != undefined){
        const {tables,chairs} = tablechairs
        setSelectedTables(tables)
        setSelectedChair(chairs)
      }
    }
  },[tableState])

  useEffect(()=>{
    if(shouldCallAPI){
      dispatch(getTablesAPI())
      setShouldCallAPI(true)
    }
  },[])

  useEffect(()=>{
    if(fnbinfo && fnbinfo.tablesInfo){
      const {success_value} = fnbinfo.tablesInfo
      let seatsIndex = 1
      let newArray = []
      success_value.forEach((data)=>{
        let seats = getChairsDirection(data.no_of_seats,seatsIndex)
        let newData = {
          ...data,
          seats
        }
        newArray.push(newData)
        seatsIndex +=parseInt(data.no_of_seats)
      })
      setTablesList(newArray)
    }
  },[fnbinfo])

  goBack = () => {
    navigation.goBack()
  }

  onMergeTable = () => {
    // setSelectedChair([])
    setIsMergeTable(!isMergeTable)
  }

  onProcess = () => {
    if(selectedTables.length > 0 || selectChair.length > 0){
      dispatch(setTableInputs({"tables":selectedTables,"chairs":selectChair}))
      navigation.navigate("FoodCategory")
    }else{
      Alert.alert(
        'Alert!',
        'There is no items added to proceed. Please select atleast a chair to process.',
        [
          { text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }

  onSelectTable = (row,index) => {
    let newTableList = []
    const topArr = row.seats.top.map(obj => obj.id);
    const leftArr = row.seats.left.map(obj => obj.id);
    const rightArr = row.seats.right.map(obj => obj.id);
    const bottomArr = row.seats.bottom.map(obj => obj.id);
    const arrCollective = [...topArr,...leftArr,...rightArr,...bottomArr]
    if(isMergeTable){
      setSelectedChair([...selectChair,...arrCollective])
    }else{
      setSelectedChair(arrCollective)
    }

    tablesList.forEach(elem=>{
      let isTableSelected = isMergeTable && elem.isTableSelected ? elem.isTableSelected : false
      if(elem.id == row.id){
        isTableSelected = !isTableSelected
      }
      const newElem = {...elem,isTableSelected}
      newTableList.push(newElem)
    })
    setTablesList(newTableList)
  }
  onSelectChair = (chairData) => {
    if(selectChair.includes(chairData.id)){
      const filtData = selectChair.filter(elem=>elem != chairData.id)
      setSelectedChair([...filtData])
    }
    setSelectedChair([...selectChair,chairData.id])
  }
  
  const renderDynamicTables = (chairData,addonStyles) => {
    const dynamicComponents = [];
    chairData.forEach(elem=>{
      dynamicComponents.push(
        <TouchableOpacity key={elem.id} onPress={()=>onSelectChair(elem)} style={[styles.chairButton,addonStyles]}>
          <FontAwesomeIcon icon={faChair} size={30} color={selectChair.includes(elem.id) ? appOrangeColor : appblueColor} />
        </TouchableOpacity>
      );
    })
    return dynamicComponents;
  };

  renderItem = ({item,index}) => { 
    return(
    <View style={styles.flatList}>
        <View style={styles.chairRow}>
         {renderDynamicTables(item.seats.top,{transform: [{ rotate: '0deg' }]})}
        {/* <TouchableOpacity onPress={()=>onSelectChair(2)} style={selectChair.includes(2)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
            <Text style={styles.topButtonText} ></Text>
        </TouchableOpacity> */}
        </View>
        <View style={styles.chairTableSides}>
          <View style={styles.chairSides}>
            {renderDynamicTables(item.seats.left,{transform: [{ rotate: '-90deg' }],marginVertical:5})}
          </View>
          <LinearGradient
          colors={item.isTableSelected ? colorsValueSelected :  colorsValue}
          style={styles.gradientButtonView}>
            <TouchableOpacity style={styles.touchableView} onPress={()=>onSelectTable(item,index)}>
                <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          </LinearGradient>
            <View style={styles.chairSides}>
              {renderDynamicTables(item.seats.right,{transform: [{ rotate: '90deg' }],marginVertical:5})}
          </View>
        </View>
        <View style={styles.chairRow}>
          {renderDynamicTables(item.seats.bottom,{transform: [{ rotate: '180deg' }],borderTopWidth:0})}
        </View>
      </View>
  )}

  getChairsDirection = (numberofTables, index) => {
    let sideValues = 2
    if(parseInt(numberofTables) > 6){
      sideValues = 4
    }
    let mainValues = (numberofTables - sideValues)/2
    let top = []
    let bottom = []
    let indexValue = index
    for(let i = 0; i<parseInt(mainValues);i++){
      top.push({
        id:indexValue,
        chair:i,
        isSelected:false
      })
      indexValue += 1

      bottom.push({
        id:indexValue,
        chair:i,
        isSelected:false
      })
      indexValue += 1
    }
    let left = []
    let right = []
    for(let i = 0; i<parseInt(sideValues/2);i++){
      left.push({
        id:indexValue,
        chair:i,
        isSelected:false
      })
      indexValue += 1

      right.push({
        id:indexValue,
        chair:i,
        isSelected:false
      })
      indexValue += 1
    }
    let seats = {
      top,right,left,bottom
    }
    return seats
  }
  return (
    <View style={globalstyles.containerView}>
      <HeaderComponent backAction={goBack} />
      <View style={styles.contentView}>
        <View style={styles.topButtonsView}>
          <TouchableOpacity onPress={onMergeTable} style={isMergeTable ? styles.topButtonSelected : styles.topButton}>
              <Text style={styles.topButtonText} >Merge Table</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onProcess} style={styles.topButton}>
              <Text style={styles.topButtonText} >Process</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContentView}>
          <FlatList
            data={tablesList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<View style={styles.footer} />}
          />
        </View>
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
  buttonView:{
    height:150,
    width:300,
    margin:30,
    alignItems:'center',
    justifyContent:'center'
  },
  tableImage:{
    width:'100%',
    height:'100%'
  },
  flatListContainer:{
    flexGrow: 1
  },
  flatList:{
    width:'100%',
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  topButtonsView:{
    marginTop:-20,
    flex:0.1,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center'
  },
  topButton:{
    height:50,
    width:'45%',
    alignContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginHorizontal:'2.5%',
    backgroundColor:'#2B3590',
  },
  topButtonSelected:{
    height:50,
    width:'45%',
    alignContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginHorizontal:'2.5%',
    backgroundColor:'#6D6D6D'
  },
  topButtonText:{
    color:'#fff',
    height:50,
    lineHeight:50,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:17
  },
  mainContentView:{
    width:'100%',
    flex:0.9,
    alignContent:'center',
    alignItems:'center',
  },
  gradientButtonView:{
    borderWidth:2,
    borderColor:'#2B3590',
    height:150,
    width:'70%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50
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
  chairButton:{
    width:30,
    height:30,
  },
  chairRow:{
    flexDirection:'row',
    alignItems:'center',
    width:180,
    justifyContent:"space-around"
  },
  chairTableSides:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  chairSides:{
    alignItems:'center',
  },
  spaceView:{
    width:'100%',
    height:20
  },
  footer:{
    height:80
  }
})

export default TablesScreen;
