import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';


const Cartao = (props) => {

    return (
        <View style={{ ...estilos.cartao, ...props.estilos }}>
            {props.children}
        </View>
    );
}

const estilos = StyleSheet.create({
    cartao: {
        alignItems: 'center',
        elevation: 4,
        backgroundColor: '#79B0B5',
        padding: 12,
        borderRadius: 12,
        marginTop: 5
    }
})

export default Cartao;