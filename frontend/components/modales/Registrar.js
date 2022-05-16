import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Input from "../Input";
import { ContexInput } from "../../context/ContexInput";
import { AuthContext } from "../../context/AuthContext";

import AppLoader from "../AppLoader";

const Registar = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [validarNombre, setValidarNombre] = useState(false);
  const [validarApellidos, setValidarApellidos] = useState(false);
  const [validarCorreo, setValidarCorreo] = useState(false);
  const [validarPassword, setValidarPassword] = useState(false);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [ingresar, setIngresar] = useState(false);
  const { registrarUsuario, showModalRegistrar, setShowModalRegistrar } =
    useContext(ContexInput);
  const { loginPending, setLoginPending } = useContext(AuthContext);


  useEffect(() => {
    let validaNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let validaEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!validaNombre.test(nombre)) {
      setValidarNombre(true);
      setErrorNombre("introduzca nombre correcto");
    } else {
      setValidarNombre(false);
    }

    if (!validaNombre.test(apellidos)) {
      setValidarApellidos(true);
      setErrorApellidos("introduzca apellido correcto");
    } else {
      setValidarApellidos(false);
    }

    if (!validaEmail.test(correo)) {
      setValidarCorreo(true);
      setErrorCorreo("correo invalido");
    } else {
      setValidarCorreo(false);
    }

    if (password.length < 6) {
      setValidarPassword(true);
      setErrorPassword("la contraseña tiene que ser mayor a 6 caracteres");
    } else {
      setValidarPassword(false);
    }
  }, [nombre, correo, apellidos, password]);

  const datos = () => {
    setLoginPending(true);
    if (
      !validarNombre &&
      !validarApellidos &&
      !validarCorreo &&
      !validarPassword
    ) {
      registrarUsuario(nombre, apellidos, correo, password);
      setShowModalRegistrar(false);
      setNombre("");
      setApellidos("");
      setCorreo("");
      setPassword("");
      setLoginPending(false);
    } else {
      setIngresar(true);
      setLoginPending(false);
    }
  };

  return (
    // animationType={'fade' } transparent={true}
    <Modal visible={showModalRegistrar}>
      {loginPending ? <AppLoader /> : null}

      <View style={styles.container}>
        <Text style={styles.title}> Introduce datos para registrarte</Text>
        <Input
          style={styles.inputData}
          placeholder="Nombre"
          onChangeText={setNombre}
        />
        {validarNombre && <Text>{errorNombre}</Text>}
        <Input
          style={styles.inputData}
          placeholder="Apellidos"
          onChangeText={setApellidos}
          value={apellidos}
        />
        {validarApellidos && <Text>{errorApellidos}</Text>}

        <Input
          style={styles.inputData}
          placeholder="Correo"
          onChangeText={setCorreo}
          value={correo} />
        {validarCorreo && <Text>{errorCorreo}</Text>}

        <Input
          style={styles.inputData}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        {validarPassword && <Text>{errorPassword}</Text>}

        <TouchableOpacity
          style={styles.botIngresar}
          onPress={() => datos()}>
          <Text>Registrar</Text>
        </TouchableOpacity>

        {ingresar && <Text>error al ingresar datos</Text>}
        <TouchableOpacity
          style={styles.botVolver}
          onPress={() => setShowModalRegistrar(false)}
        >
          <Text>Volver</Text>
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
    fontSize: 36,
    fontWeight: "bold",
    color: 'white',
    bottom: 80,
    textAlign: 'center'
  },
  botIngresar: {
    backgroundColor: "#C4C4C4",
    padding: 10,
    borderRadius: 15,
    width: 100,
    alignItems: 'center',
  },
  botVolver: {
    backgroundColor: "#C4C4C4",
    padding: 10,
    borderRadius: 15,
    top: 20,
    width: 100,
    alignItems: 'center',
  },
  inputData: {
    borderRadius: 5,
    color: 'white'
  }

})
export default Registar;
