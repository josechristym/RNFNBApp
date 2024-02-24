// screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {StyleSheet, View, Image, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { setTableInputs } from '../actions/cartaction';
import globalstyles from '../globalcss/globalstyle';
import {getTablesAPI} from '../actions/fnbactions';

const TablesScreenOG = ({ navigation }) => {
  const tableState = useSelector((state) => state.cartinfo);
  const dispatch = useDispatch();

  const [isMergeTable,setIsMergeTable] = useState(false)
  const [shouldCallAPI,setShouldCallAPI] = useState(true)
  const colorsValue = ['#fbfeff', '#e1f8ff', '#c8f3ff']
  const colorsValueSelected = ["#ffe0b3","#ffc266","#ffa31a"]
  const [selectedTables, setSelectedTables] = useState([])
  const [selectChair, setSelectedChair] = useState([])
  const tb1Indexes = [1,2,3,4,5,6]
  const tb2Indexes = [7,8,9,10]
  const tb3Indexes = [11,12,13,14,15,16,17,18,19,20]
  const fnbinfo = useSelector((state) => state.fnbinfo);
  const [userData,setUserData] = useState({})
  const userLoginInfo = useSelector((state) => state.userlogin);

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
    if(userLoginInfo && userLoginInfo.loginResponse){
        const {loginResponse} = userLoginInfo
        const {success_value} = loginResponse
        const {user_data} = success_value
        setUserData(user_data)
    }
  },[userLoginInfo])

  useEffect(()=>{
    if(shouldCallAPI){
      dispatch(getTablesAPI())
      setShouldCallAPI(true)
    }
  },[])

  useEffect(()=>{
    if(fnbinfo && fnbinfo.tablesInfo){
      console.log("console..",fnbinfo.tablesInfo)
    }
  },[fnbinfo])

  goBack = () => {
    navigation.goBack()
  }

  onMergeTable = () => {
    setSelectedTables([])
    setSelectedChair([])
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

  onSelectTable = (tableIndex) => {
    if(isMergeTable){
      if(selectedTables.includes(tableIndex)){
        let newList = selectedTables.filter(elem=>elem!=tableIndex)
        setSelectedTables(newList)
        let newChairList = [...selectChair]
        if(tableIndex == 1){
          newChairList = selectChair.filter(elem=>!tb1Indexes.includes(elem))
        }else if(tableIndex == 2){
          newChairList = selectChair.filter(elem=>!tb2Indexes.includes(elem))
        }else if(tableIndex == 3){
           newChairList = selectChair.filter(elem=>!tb3Indexes.includes(elem))
        }
        setSelectedChair(newChairList)
      }else{
        setSelectedTables([
          ...selectedTables,tableIndex
        ])
        if(tableIndex == 1){
          setSelectedChair([
            ...selectChair,...tb1Indexes
          ])
        }else if(tableIndex == 2){
          setSelectedChair([
            ...selectChair,...tb2Indexes
          ])
        }else if(tableIndex == 3){
          setSelectedChair([
            ...selectChair,...tb3Indexes
          ])
        }
      }
    }
  }
  onSelectChair = (chairIndex) => {
    if(!isMergeTable){
      if(selectChair.includes(chairIndex)){
        let newList = selectChair.filter(elem=>elem!=chairIndex)
        setSelectedChair(newList)
      }else{
        setSelectedChair([
          ...selectChair,chairIndex
        ])
      }
    }
  }
  renderTable=() =>{
    <View style={globalstyles.containerView}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesomeIcon icon={faAngleLeft} size={30}/>
        </TouchableOpacity>
        <Image source={require('../../assets/logo_blue.jpg')} style={styles.headerIcon} resizeMode='contain'/>
        <Text style={styles.headerText}>Tasty Foods Resturant</Text>
      </View>
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
          <View style={styles.spaceView} />
          {/* *************** Table 1 View Start *************** */}
          <View style={styles.chairRow}>
            <TouchableOpacity onPress={()=>onSelectChair(1)} style={selectChair.includes(1)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onSelectChair(2)} style={selectChair.includes(2)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chairTableSides}>
            <View style={styles.chairSides}>
              <TouchableOpacity onPress={()=>onSelectChair(3)} style={selectChair.includes(3)?{...styles.chairButton,borderRightWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderRightWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
            </View>
            {/* <LinearGradient
            colors={selectedTables.includes(1) ? colorsValueSelected :  colorsValue}
            style={styles.gradientButtonView}>
              <TouchableOpacity style={styles.touchableView} onPress={()=>onSelectTable(1)}>
                  <Text style={styles.buttonText}>T-1</Text>
              </TouchableOpacity>
            </LinearGradient> */}
            <View style={styles.chairSides}>
              <TouchableOpacity onPress={()=>onSelectChair(4)} style={selectChair.includes(4)?{...styles.chairButton,borderLeftWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderLeftWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.chairRow}>
            <TouchableOpacity onPress={()=>onSelectChair(5)} style={selectChair.includes(5)?{...styles.chairButton,borderTopWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderTopWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onSelectChair(6)} style={selectChair.includes(6)?{...styles.chairButton,borderTopWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderTopWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          {/* *************** Table 1 View End *************** */}

          <View style={styles.spaceView} />

          {/* *************** Table 2 View Start *************** */}
          <View style={{...styles.chairRow,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>onSelectChair(7)} style={selectChair.includes(7)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chairTableSides}>
            <View style={styles.chairSides}>
              <TouchableOpacity onPress={()=>onSelectChair(8)} style={selectChair.includes(8)?{...styles.chairButton,borderRightWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderRightWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
            </View>
            {/* <LinearGradient
            colors={selectedTables.includes(2) ? colorsValueSelected :  colorsValue}
            style={{...styles.gradientButtonView,width:150}}>
              <TouchableOpacity style={styles.touchableView} onPress={()=>onSelectTable(2)}>
                  <Text style={styles.buttonText}>T-2</Text>
              </TouchableOpacity>
            </LinearGradient> */}
            <TouchableOpacity onPress={()=>onSelectChair(9)} style={selectChair.includes(9)?{...styles.chairButton,borderLeftWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderLeftWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          <View style={{...styles.chairRow,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>onSelectChair(10)} style={selectChair.includes(10)?{...styles.chairButton,borderTopWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderTopWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          {/* *************** Table 2 View End *************** */}

          <View style={styles.spaceView} />

          {/* *************** Table 3 View Start *************** */}
          <View style={styles.chairRow}>
            <TouchableOpacity onPress={()=>onSelectChair(11)} style={selectChair.includes(11)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onSelectChair(12)} style={selectChair.includes(12)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onSelectChair(13)} style={selectChair.includes(13)?{...styles.chairButton,borderBottomWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderBottomWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chairTableSides}>
            <View style={styles.chairSides}>
              <TouchableOpacity onPress={()=>onSelectChair(14)} style={selectChair.includes(14)?{...styles.chairButton,borderRightWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderRightWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onSelectChair(15)} style={selectChair.includes(15)?{...styles.chairButton,borderRightWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderRightWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
            </View>
            {/* <LinearGradient
            colors={selectedTables.includes(3) ? colorsValueSelected :  colorsValue}
            style={{...styles.gradientButtonView,width:250}}>
              <TouchableOpacity style={styles.touchableView} onPress={()=>onSelectTable(3)}>
                  <Text style={styles.buttonText}>T-3</Text>
              </TouchableOpacity>
            </LinearGradient> */}
            <View style={styles.chairSides}>
              <TouchableOpacity onPress={()=>onSelectChair(16)} style={selectChair.includes(16)?{...styles.chairButton,borderLeftWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderLeftWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onSelectChair(17)} style={selectChair.includes(17)?{...styles.chairButton,borderLeftWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderLeftWidth:0}}>
                  <Text style={styles.topButtonText} ></Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.chairRow}>
            <TouchableOpacity onPress={()=>onSelectChair(18)} style={selectChair.includes(18)?{...styles.chairButton,borderTopWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderTopWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onSelectChair(19)} style={selectChair.includes(19)?{...styles.chairButton,borderTopWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderTopWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onSelectChair(20)} style={selectChair.includes(20)?{...styles.chairButton,borderTopWidth:0,backgroundColor:'#70db70'}:{...styles.chairButton,borderTopWidth:0}}>
                <Text style={styles.topButtonText} ></Text>
            </TouchableOpacity>
          </View>
          {/* *************** Table 3 View End *************** */}
        </View>
      </View>
      <View style={styles.bottomContainer} >
        <Text style={styles.headerText}>User: {userData && userData.name}</Text>
      </View>
    </View>
    };
  return (
    <View style={globalstyles.containerView}></View>)
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
  bottomContainer:{
    position:'absolute',
    flexDirection:'row',
    height:60,
    width:'100%',
    bottom: 0
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
    alignItems:'center'
  },
  gradientButtonView:{
    backgroundColor:'#4863df',
    borderWidth:2,
    borderColor:'#2B3590',
    height:120,
    width:200,
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
  chairButton:{
    width:30,
    height:30,
    borderColor:'#2B3590',
    borderWidth:5
  },
  chairRow:{
    flexDirection:'row',
    alignItems:'center',
    width:180,
    justifyContent:'space-between'
  },
  chairTableSides:{
    flexDirection:'row',
    alignItems:'center'
  },
  chairSides:{
    alignItems:'center',
  },
  spaceView:{
    width:'100%',
    height:20
  }
})

export default TablesScreenOG;
