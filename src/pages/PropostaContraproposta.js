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
} from 'react-native';

import { createHistoricoProposta } from '../services/PropostaHistoricoService';

import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker';

import * as PATHS from '../util/paths';

import {
  getInfoById,
  changeProposta,
} from '../services/PropostaService';
import { getUser } from '../services/UserService';

import { STYLES_DEFAULT } from '../styles/';

function PropostaContraproposta({ route, navigation }) {
  const [propostaInfo, setPropostaInfo] = useState({});
  const [contratado, setContratado] = useState({});
  const [contratante, setContratante] = useState({});
  const [horario, setHorario] = useState();
  const [valor, setValor] = useState();
  //const [perfil, setPerfil] = useState({});
  const { dados } = route.params;
  const { _id } = dados;
  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  function handleAceitar() {
    let contraPropostaStatus = true;

    if(dados.contraProposta === true){
      contraPropostaStatus = false;
    }

    const novosDados = {
      hora: horario,
      pagamento: valor,
      contraProposta: contraPropostaStatus,
    };

    const contraPropostaHistorico = {
      propostaId: _id,
      proposta: dados,
    }

    createHistoricoProposta(contraPropostaHistorico);

    changeProposta(_id, novosDados);
    goPage(PATHS.PATH_ROTA_PROPOSTA, {dados: novosDados})
  }

  useEffect(() => {
    async function handleGetDados() {
      let { data } = await getInfoById(_id);
      const { contratadoId, contratanteId } = data;
      setPropostaInfo(data);

      const data1 = await getUser(contratadoId);
      const dataInfo1 = data1.data;
      setContratado(dataInfo1);

      const data2 = await getUser(contratanteId);
      const dataInfo2 = data2.data;
      setContratante(dataInfo2);
    }

    handleGetDados();
  }, []);

  async function handleAcepptProposta() {
    Alert.alert(
      'Realizar contraproposta',
      'Você realmente deseja realizar uma contraproposta?',
      [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        { text: 'Sim', onPress: () => handleAceitar() },
      ]
    );
  }
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
        <Text style={styles.titleText}>Realizar Contrapropostas</Text>

        <View style={styles.box}>
          <Text style={styles.subTitleText}>Nome</Text>
          <Text style={styles.dataText}>{dados.nome}</Text>

          <Text style={styles.subTitleText}>Data</Text>
          <Text style={styles.dataText}>{dados.data}</Text>

          <Text style={styles.subTitleText}>Horario</Text>

          <DatePicker
            style={{
              ...styles.textInput,
              width: '100%',
              padding: 0,
              paddingVertical: 4,
            }}
            date={horario}
            mode='time'
            placeholder='Horario HH:mm'
            format='HH:mm'
            confirmBtnText='OK'
            cancelBtnText='CANCELAR'
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateInput: {
                borderWidth: 0,
                paddingHorizontal: 10,
                margin: 0,
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
            }}
            onDateChange={(text) => setHorario(text)}
          />

        
          <Text style={styles.subTitleText}>Valor</Text>
          <TextInputMask
            style={styles.textInput}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: ''
            }}
            placeholder='Valor R$'
            value={valor}
            onChangeText={(text) => setValor(text)}
          />
    
          <Text style={styles.subTitleText}>Descrição</Text>
          <Text style={styles.dataText}>{dados.descricao}</Text>
          

        </View>
        <View style={styles.buttonsContainer}>
          

          <TouchableOpacity
            onPress={() => handleAcepptProposta()}
            style={styles.aceitarButton}
          >
            <Text style={styles.aceitarButtonText}>Realizar contraproposta</Text>
          </TouchableOpacity>
        </View>
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

  titleText: {
    color: '#35AAFF',
    fontSize: 30,
    paddingTop: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subTitleText: {
    fontSize: 24,
    paddingBottom: 5,
    paddingTop: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontFamily: 'sans-serif-medium',
  },

  dataText: {
    fontSize: 16,
    fontFamily: 'sans-serif',
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
