import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Input from '../components/Input';
import {compararClave} from '../services/services';
const TengoCuenta = ({showModalTengo,setShowModalTengo}) => {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const datos = () => {
      compararClave(correo,password);
        setShowModalTengo(false);
    
    }
  return (
    <Modal visible={showModalTengo} >
    <View style={styles.container}>
     <Text style={styles.title}> Iniciar Sesión</Text> 
     
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
          <Text>Ingresar</Text>
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

export default TengoCuenta;
