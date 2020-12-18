import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';

import { getAll } from '../services/PropostaHistoricoService';

import * as PATHS from '../util/paths';

import {
  getInfoById,
  changeProposta,
} from '../services/PropostaService';
import { getUser } from '../services/UserService';

import { STYLES_DEFAULT } from '../styles/';

function PropostaContraproposta({ route, navigation }) {
  const [listaPropostas, setListaPropostas] = useState([]);
  const filtro = true;
  //const [perfil, setPerfil] = useState({});
  const { dados } = route.params;
  const { _id } = dados;
  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  useEffect(() => {
    async function handleGetDados() {
      const lista = await getAll(_id);
      const { data } = lista;
      setListaPropostas(data);
    }

    handleGetDados();
  }, []);

  // if (!_id)
  //   return (
  //     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  //       <View style={styles.perfil}>
  //         <Text>Loading...</Text>
  //       </View>
  //     </ScrollView>
  //   );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.perfil}>
        <Text style={styles.titleText}>Histórico de propostas</Text>

        {filtro && listaPropostas.map(proposta =>{
            return (
              <View style={styles.viewList}>
                <Text style={styles.subTitleText}>Nome</Text>
                <Text style={styles.dataText}>{proposta.proposta.nome}</Text>

                <Text style={styles.subTitleText}>Data</Text>
                <Text style={styles.dataText}>{proposta.proposta.data}</Text>

                <Text style={styles.subTitleText}>Horário de Inicio</Text>
                <Text style={styles.dataText}>{proposta.proposta.hora}</Text>

                <Text style={styles.subTitleText}>Pagamento</Text>
                <Text style={styles.dataText}>{proposta.proposta.pagamento}</Text>
          
                <Text style={styles.subTitleText}>Descrição</Text>
                <Text style={styles.dataText}>{proposta.proposta.descricao}</Text>
                <View style={styles.line}>
                <ImageBackground
                  source={require('../images/line.jpg')}
                  style={styles.lineImage}
                />
                </View>
              </View>
            );
        })

        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  perfil: {
    paddingHorizontal: 10,
    marginTop: 12,
    marginHorizontal: 8,
  },
  line: {
    width: 380,
    height: 50,
  },
  lineImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: '#35AAFF',
    fontSize: 30,
    paddingTop: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subTitleText: {
    fontSize: 20,
    paddingBottom: 5,
    paddingTop: 11,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontFamily: 'sans-serif-medium',
  },

  dataText: {
    fontSize: 16,
    fontFamily: 'sans-serif',
  },

  viewList: {
    marginTop: 8,
    marginBottom: 20,
  },

  buttonProposta: {
    backgroundColor: '#35AAFF',
    flex: 1,
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 12,
  },

  propostaButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 48,
  },

  rejeitarButton: {
    backgroundColor: '#e33d3d',
    width: 155,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  rejeitarButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
    paddingRight: 12,
  },

  aceitarButton: {
    backgroundColor: '#04d361',
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  aceitarButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
    paddingRight: 12,
  },
});

export default PropostaContraproposta;
