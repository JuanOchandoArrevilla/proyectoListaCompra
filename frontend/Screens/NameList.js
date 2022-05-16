import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Input from '../components/Input';
import { AuthContext } from '../context/AuthContext';
const NameList = ({ route, navigation }) => {

  const { idUsuario } = route.params;
  const [nombreLista, setNombreLista] = useState("");
  const { crearNombreLista } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Input placeholder="Nombre de Lista" onChangeText={setNombreLista} value={nombreLista} />
        <TouchableOpacity onPress={() => crearNombreLista(nombreLista, idUsuario)}
          style={styles.button}
        >
          <Text style={styles.saveText}>Crear lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
  },
  input: {
    width: 300,
    backgroundColor: 'green',
    top: 200,
    alignItems: 'center',
    left: 45,
    padding: 10,
    borderRadius: 10
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: 110,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
  }

})

export default NameList
