import * as React from 'react';
import { useState } from "react";
import { Text, View, Image, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';

export default function FilterCheckbox ({ type, handleCheckbox, filter }) {
  const [isChecked, setIsChecked] = useState(false)

  function handleCheck (checked) {
    setIsChecked(checked)
    handleCheckbox(checked, type)
  } 


  return (
    <View style={styles.typeFilter}>
      <Text style={{padding: 5}}>{type}</Text>
      {(isChecked || filter.includes(type)) ?
          <TouchableOpacity style={styles.btn} onPress={() => handleCheck(false)}>
              <Image style={styles.img} source={{ uri: "https://i.stack.imgur.com/OWcpX.png"}}/>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleCheck(true)} style={styles.btn}>
              <Image style={styles.img} source={{ uri: "https://i.stack.imgur.com/Kn8zA.png" }} />
          </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  typeFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  img:{
      height:20,
      width: 20
  },
  btn:{
      flexDirection: 'row'
  }
});