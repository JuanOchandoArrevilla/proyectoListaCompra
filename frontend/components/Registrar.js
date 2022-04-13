import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from "react";
import Input from '../components/Input';


const Registar = ({registrarUsuario,showModalRegistrar, setShowModalRegistrar}) => {

const [nombre,setNombre] = useState("");
const [apellidos,setApellidos] = useState("");
const [correo, setCorreo] = useState("");
const [password, setPassword] = useState("");


const datos = () => {
    registrarUsuario(nombre,apellidos,correo,password);
    setShowModalRegistrar(false);

}

  return (
    // animationType={'fade' } transparent={true}
    <Modal visible={showModalRegistrar} >
    <View style={styles.container}>
     <Text style={styles.title}> Introduce datos para registrarse</Text> 
     <Input 
       placeholder="nombre"
       onChangeText={setNombre}
       value={nombre}  
       />
       <Input 
       placeholder="apellidos"
       onChangeText={setApellidos}
       value={apellidos}  
       />
      <Input 
       placeholder="correo"
       onChangeText={setCorreo}
       value={correo}  
       />
       <Input 
       placeholder="contraseña"
       onChangeText={setPassword}
       value={password}
       
       />

  <TouchableOpacity style={styles.botIngresar}
         onPress={() => datos()} >
          <Text>Registrar</Text>
        </TouchableOpacity>

</View>

 </Modal>

  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#202620",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color:'white',
    bottom:80, 
  },
  botIngresar:{
    backgroundColor: "#C4C4C4",
    padding: 10,

  }
 
})

export default Registar;