import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Input from "../Input";
import { AuthContext } from "../../context/AuthContext";
import { ContexInput } from "../../context/ContexInput";
import AppLoader from "../AppLoader";

const Ingresar = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { ingresarUsuario, loginPending, errorIngresar } = useContext(AuthContext);
  const { showModalIngresar,setShowModalIngresar } = useContext(ContexInput);

  return (
    <Modal visible={showModalIngresar}>
      {loginPending ? <AppLoader /> : null}

      <View style={styles.container}>
        <Text style={styles.title}> Iniciar Sesión</Text>

        <Input
         style={styles.inputData}
         placeholder="correo"
         onChangeText={setCorreo} 
         value={correo} />
        <Input
          style={styles.inputData}
          placeholder="contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.botIngresar}
          onPress={() => ingresarUsuario(correo, password)}>
          <Text>Ingresar</Text>
        </TouchableOpacity>
        {errorIngresar && <Text>correo o contraseña incorrecto</Text>}

        <TouchableOpacity
          style={styles.botNoTengo}
          onPress={() => setShowModalIngresar(false) }
          >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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
    color: 'white',
    bottom: 80,
  },
  botIngresar: {
    backgroundColor: "#C4C4C4",
    padding: 10,
    top: 30,
    borderRadius: 5

  },
  botNoTengo:{
    backgroundColor: "#C4C4C4",
    padding: 10,
    top: 50,
    borderRadius: 5
  },
  inputData: {
    borderRadius: 5,
    color: 'white',

  }

})


export default Ingresar;