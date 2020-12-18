import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getUser } from '../services/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import { getById } from '../services/AvaliacaoService';

import { useIsFocused } from '@react-navigation/native';

import ListaAvaliar from '../component/ListaAvaliar';

function AvaliacaoHome() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getDados() {
      const dataUser = await AsyncStorage.getItem('@user');
      const dadosUser = dataUser ? JSON.parse(dataUser) : {};

      if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO

      const { _id } = dadosUser;
      const estado = 'pendente';

      const response = await getById(_id, estado);

      setAvaliacoes(response.data);
    }

    getDados();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Avaliar Eventos</Text>
      <ScrollView
        style={styles.avaliacaoList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {avaliacoes.map((avaliacao) => {
          return (
            <ListaAvaliar
              key={avaliacao._id}
              avaliacaoId={avaliacao._id}
              descricao={avaliacao.proposta.descricao}
              pagamento={avaliacao.proposta.pagamento}
              estabelecimento={avaliacao.proposta.musico.apelido}
              imagem={avaliacao.proposta.musico.img}
              //   setRefresh = {setRefresh}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },

  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#35AAFF',
    marginBottom: 10,
    marginTop: 15,
  },

  textCategoria: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  avaliar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
  },

  containerAvaliar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  textArea: {
    height: 100,
    justifyContent: 'flex-start',
  },

  avaliarButton: {
    backgroundColor: '#35AAFF',
    width: 200,
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 12,
  },

  avaliarButtonText: {
    color: '#FFF',
    fontSize: 20,
    marginLeft: 16,
  },

  avaliacaoList: {
    marginTop: 30,
  },
});

export default AvaliacaoHome;
