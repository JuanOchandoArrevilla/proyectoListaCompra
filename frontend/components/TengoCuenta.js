import { StyleSheet, Button, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input';
import { compararClave } from '../services/services';


const TengoCuenta = ({ showModalTengo, setShowModalTengo, navigation }) => {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const datos = () => {
    compararClave(correo, password);
    setShowModalTengo(false);

  }
  return (
    <Modal visible={showModalTengo} >
      <View style={styles.container}>
        <Text style={styles.title}> Iniciar sesión</Text>

        <Input
          style={styles.inputData}
          placeholder="Correo"
          onChangeText={setCorreo}
          value={correo}
        />
        <Input
          style={styles.inputData}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}

        />

        <Button style={styles.botIngresar}
          onPress={() => navigation.navigate('MainMenu')}
          title="ingresar"
        />

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
    color: 'white',
    bottom: 80,
  },
  botIngresar: {
    backgroundColor: "#C4C4C4",
    padding: 10,
    top: 30,
    borderRadius: 5

  },
  inputData: {
    borderRadius: 5,
    color: 'white',

  }

})

export default TengoCuenta;
