import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ToastAndroid, Keyboard } from 'react-native';
import PrevisaoItem from './componentes/PrevisaoItem';

export default function App() {

  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const endPointSol = "https://api.openweathermap.org/data/2.5/onecall?lang=pt_br&units=metric&";  

  const apiKey = ""; //coloque sua chave da API dentro das aspas  -- site:  https://openweathermap.org/

  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);
  const [previsoes2, setPrevisoes2] = useState([]);
  const [sol, setSol] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const [city, setCity] = useState('');

  const obterPrevisoes = () => {
    if (cidade === '') {
      ToastAndroid.show("Insira uma cidade !", ToastAndroid.SHORT)
    } else {
      setPrevisoes([]);
      const target = endPoint + cidade + '&appid=' + apiKey;
      fetch(target)
        .then((dados => dados.json()))
        .then(dados => {
          setPrevisoes(dados["list"]);
          var city = dados["city"];
          obterSol(city.coord.lat, city.coord.lon);
          Keyboard.dismiss();
          setCity(cidade);
          setCidade('');
        });
    }
  }

  const obterSol = (lat, lon) => {
    setSol([]);
    const target = endPointSol + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(target)
      .then((dados => dados.json()))
      .then(dados => {
        setSol(dados["daily"]);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma cidade"
          onChangeText={capturarCidade}
          value={cidade}
        />
        <Button
          title="OK"
          onPress={() => {
            obterPrevisoes();
          }}
          color='#306464'
        />
      </View>
      <View><Text style={styles.tituloCidade}>{city.toUpperCase()}</Text></View>
      <FlatList
        data={sol}
        renderItem={
          previsao => <PrevisaoItem previsao={previsao.item}></PrevisaoItem>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  entrada: {
    flexDirection: 'column',
    color: "green"
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    textAlign: 'left',
    marginBottom: 4,
    fontSize: 18,
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 40
  },
  tituloCidade: {
    color: 'white'
  }
});