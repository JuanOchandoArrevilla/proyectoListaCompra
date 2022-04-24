import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useContext }from 'react'
import Input from '../components/Input';
import {AuthContext} from '../context/AuthContext';
const NameList = ({ route,navigation}) => {

  const { idUsuario } = route.params;
  const [nombreLista, setNombreLista] = useState("");
  const {crearNombreLista} = useContext(AuthContext);


  return (
    <View>
      <Input placeholder="nombre de Lista" onChangeText={setNombreLista} value={nombreLista} />
        <TouchableOpacity  onPress={() => crearNombreLista(nombreLista,idUsuario)}>
            <Text>Guardar Lista</Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({})

export default NameList
