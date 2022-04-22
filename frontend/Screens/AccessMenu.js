import React from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity, Image } from "react-native";

import { useState, useEffect } from "react";
import Registrar from '../components/Registrar';
import TengoCuenta from '../components/TengoCuenta';

import { crearUsuario } from '../services/services';

const AccessMenu = ({navigation}) => {
    const [showModalRegistrar, setShowModalRegistrar] = useState(false);
    const [showModalTengo, setShowModalTengo] = useState(false);
    const [users, setUsers] = useState([]);

    const registrarUsuario = (nombre, apellidos, correo, password) => {
        crearUsuario(nombre, apellidos, correo, password);
    }
    return (
        <View style={styles.container}>
            <Text
                style={styles.textTitle}>
                Crea tu lista de la compra de forma sencilla
            </Text>
            <Image
                style={styles.logo}
                source={require("../assets/mainScreenImg.png")}
            />

            <View style={styles.butRegistrar}>
                <TouchableOpacity
                    onPress={() => setShowModalRegistrar(true)}
                >
                    <Text>Registrar con E-mail</Text>

                </TouchableOpacity>
                <Registrar
                    registrarUsuario={registrarUsuario}
                    showModalRegistrar={showModalRegistrar}
                    setShowModalRegistrar={setShowModalRegistrar}
                />
            </View>
            <View style={styles.butTengo}>
                <TouchableOpacity
                    onPress={() => setShowModalTengo(true)}
                >
                    <Text>Ya tengo cuenta</Text>
                </TouchableOpacity>
                <TengoCuenta
                    showModalTengo={showModalTengo}
                    setShowModalTengo={setShowModalTengo}
                />
            </View>
            <Button
                title="ingresar"
                onPress={() => navigation.navigate('MainMenu')}
            />
            <Text
                style={styles.textPrivacidad}>
                Al utilizar esta aplicacion, aceptas nuestros Terminos de uso y
                Politicas de privacidad
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 45,
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#202620",
        alignItems: "center",
        justifyContent: "space-between",
    },

    butRegistrar: {
        alignItems: "center",
        backgroundColor: "#C4C4C4",
        borderRadius: 5,
        width: 150,
        height: 40,
    },

    butTengo: {
        width: 150,
        height: 40,
        alignItems: "center",
        backgroundColor: "#C4C4C4",
        borderRadius: 5

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
        top: 32,
        color: "#C4C4C4",
        fontSize: 40,
        fontWeight: "bold",
    },
});

export default AccessMenu