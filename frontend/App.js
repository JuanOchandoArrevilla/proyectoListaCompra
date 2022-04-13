import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState,useEffect } from "react";
import Registrar from './components/Registrar';
import TengoCuenta from './components/TengoCuenta';
import {crearUsuario} from './services/services';
export default function App() {

  const [showModalRegistrar, setShowModalRegistrar] = useState(false);
  const [showModalTengo, setShowModalTengo] = useState(false);
  const [users,setUsers] = useState([]);

  const registrarUsuario = (nombre,apellidos,correo, password) => {  
    crearUsuario(nombre,apellidos,correo, password);
  } 

  return (


    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Crear tu lista de la compra de forma sencilla
      </Text>
      <Image style={styles.logo} source={require("./assets/compra.jpg")} />
        <TouchableOpacity style={styles.butRegistrar}
         onPress={() => setShowModalRegistrar(true)} >
          <Text>Registrar con E-mail</Text>
        </TouchableOpacity>
        <Registrar registrarUsuario={registrarUsuario} showModalRegistrar={showModalRegistrar} setShowModalRegistrar={setShowModalRegistrar}/>
        <TouchableOpacity style={styles.butTengo}
           onPress={() => setShowModalTengo(true)} >
          <Text>Ya tengo cuenta</Text>
        </TouchableOpacity>
        <TengoCuenta showModalTengo={showModalTengo} setShowModalTengo={setShowModalTengo}/>
      <Text style={styles.textPrivacidad}>
        Al utilizar esta aplicacion, aceptas nuestros Terminos de uso y
        Politicas de privacidad
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 25,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
    alignItems: "center",
    justifyContent: "space-between",
  },
  butRegistrar: {
    top: 10,
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    padding: 10,
  },
  butTengo: {
    bottom: 20,
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    padding: 10,
  },
  logo: {
    top: 30,
    width: 150,
    height: 150,
  },
  textPrivacidad: {
    bottom: 50,
    color: "#C4C4C4",
  },
  textTitle: {
    top: 40,
    color: "#C4C4C4",
    fontSize: 40,
    fontWeight: "bold",
  },
});
