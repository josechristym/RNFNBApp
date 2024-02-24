// screens/HomeScreen.js
import React,{useState} from 'react';
import {StyleSheet, View, Button, Modal, FlatList, Text, TouchableHighlight } from 'react-native';
import { appblueColor } from './ColorConstants';

const CustomPicker = ({options,handleClose,labelKey}) => {
    renderItem = ({item}) => { 
      return(
      <TouchableHighlight style={styles.flatList} onPress={()=>handleClose(item)} activeOpacity={0.6} underlayColor={appblueColor}>
          <Text style={styles.buttonText}>{item[labelKey]}</Text>
      </TouchableHighlight>
    )}

    return (
      <View style = {{backgroundColor:"transparent"}}>
         <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={()=>handleClose(null)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <FlatList
                  data={options}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.flatListContainer}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={<View style={styles.footer} />}
                />
                <Button title="Close" onPress={()=>handleClose(null)} />
              </View>
            </View>
          </Modal>
        </View>
      );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width:'100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    elevation: 5,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  flatList:{
    width:'100%',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1
  },
  buttonText:{
    fontSize:15,
    fontWeight:"500"
  }
})

export default CustomPicker;
