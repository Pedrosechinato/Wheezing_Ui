import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import moment from 'moment';

import { getById } from '../services/PropostaService';
import { createAvalicao } from '../services/AvaliacaoService';

import * as PATHS from '../util/paths';

import AsyncStorage from '@react-native-community/async-storage';

import {
  getInfoById,
  acceptProposta,
  rejectProposta,
} from '../services/PropostaService';
import { getUser } from '../services/UserService';

import { STYLES_DEFAULT } from '../styles/';

function PropostaDetalhe({ route, navigation }) {
  const status = 'accepted';
  const [propostaInfo, setPropostaInfo] = useState({});
  const [buttonAceitar, setButtonAceitar] = useState(true);
  const [buttonRejeitar, setButtonRejeitar] = useState(true);
  const [buttonContra, setButtonContra] = useState(true);
  const [userType, setUserType] = useState('');
  const [estadoProposta, setEstadoProposta] = useState(false);

  //const [perfil, setPerfil] = useState({});
  const { perfil } = route.params;
  const { _id, cidade, nome, descricao, contratadoId } = perfil;
  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  function handleAceitar() {
    const dadoAvaliacao = {
      proposta: propostaInfo,
      propostaId: _id,
      contratanteId: propostaInfo.contratanteId,
      contratadoId,
      contratanteNome: propostaInfo.estabelecimento.nome,
    }

    if(estadoProposta === false) {
      createAvalicao(dadoAvaliacao);
      acceptProposta(_id);
      navigation.goBack();
    } else {
      Alert.alert("Erro na Proposta","Músico ja possui um show nesse periodo, realize uma contraproposta")
    }  
  }
  function handleRecusar() {
    rejectProposta(_id);
    navigation.goBack();
  }

  useEffect(() => {
    async function handleGetDados() {
      let { data } = await getInfoById(_id);
      const propostaData = data;
      setPropostaInfo(data);

      const dataUser = await AsyncStorage.getItem('@user');
        const dadosUser = dataUser ? JSON.parse(dataUser) : {};
          
        if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO
        
        const userData = await getUser(dadosUser._id);
  
        const {typeUser} = userData.data;
        setUserType(typeUser);

        if(typeUser === 'USER_ESTABELECIMENTO' && propostaData.status === 'false' && propostaData.contraProposta === false){
          setButtonRejeitar(false);
          setButtonContra(false);
        }

        if(typeUser === 'USER_MUSICO' && propostaData.status === 'false' && propostaData.contraProposta === true){
          setButtonRejeitar(false);
          setButtonContra(false);
        }

        if(propostaData.status === 'accepted'){
          setButtonRejeitar(false);
          setButtonContra(false);
        }

        if(propostaData.status === 'reject'){
          setButtonAceitar(false);
          setButtonRejeitar(false);
          setButtonContra(false);
        }

        const response = await getById(contratadoId,status);
        const propostas = response.data;

        propostas.map(proposta => {
          const inicialData = moment().subtract(3, 'hours');
          const compararDataInicio = moment(propostaData.dataInicio).isBetween(proposta.dataInicio, proposta.dataFim);
          const compararDataFim = moment(propostaData.dataFim).isBetween(proposta.dataInicio, proposta.dataFim);
          const compararInicial = moment(inicialData).isAfter(propostaData.dataInicio);
          const compararIgual = moment(propostaData.dataInicio).isSame(proposta.dataInicio);
          console.log(inicialData, propostaData.dataInicio);



          console.log(compararDataInicio, compararDataFim, compararInicial, compararIgual);
          if (compararDataInicio === true || compararDataFim === true || compararInicial === true || compararIgual === true) {
            setEstadoProposta(true)
          }
        })
      
    }
    
    handleGetDados();
  }, []);

  async function handleRejectProposta() {
    Alert.alert(
      'Recusar Proposta',
      'Você realmente deseja recusar essa proposta?',
      [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        { text: 'Sim', onPress: () => handleRecusar() },
      ]
    );
  }

  async function handleAcepptProposta() {
    Alert.alert(
      'Aceitar Proposta',
      'Você realmente deseja aceitar essa proposta?',
      [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        { text: 'Sim', onPress: () => handleAceitar() },
      ]
    );
  }
  if (!_id)
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.perfil}>
          <Text>Loading...</Text>
        </View>
      </ScrollView>
    );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.perfil}>
        <Text style={styles.titleText}>Detalhe da proposta</Text>

        <View style={styles.box}>
          <Text style={styles.subTitleText}>Nome</Text>
          <Text style={styles.dataText}>{nome}</Text>

          <Text style={styles.subTitleText}>Data</Text>
          <Text style={styles.dataText}>{propostaInfo.data}</Text>

          <Text style={styles.subTitleText}>Horario</Text>
          <Text style={styles.dataText}>{propostaInfo.hora}</Text>

          <Text style={styles.subTitleText}>Duração</Text>
          <Text style={styles.dataText}>{propostaInfo.duracao}</Text>

          <Text style={styles.subTitleText}>Valor</Text>
          <Text style={styles.dataText}>{propostaInfo.pagamento}</Text>

          {/* <Avaliacao /> */}
          <Text style={styles.subTitleText}>Descrição</Text>
          <Text style={styles.dataText}>{propostaInfo.descricao}</Text>
        </View>

        
        <View style={styles.buttonsContainer}>
        {buttonAceitar &&
          <TouchableOpacity
            onPress={() => handleRejectProposta()}
            style={styles.rejeitarButton}
          >
            <Text style={styles.rejeitarButtonText}>Rejeitar</Text>
          </TouchableOpacity>
        }

        {buttonRejeitar &&
            <TouchableOpacity
            onPress={() => handleAcepptProposta()}
            style={styles.aceitarButton}
            >
            <Text style={styles.aceitarButtonText}>Aceitar</Text>
        </TouchableOpacity> 
        } 
        </View>
          
        {buttonContra &&
        <View style={styles.buttonContrapropostaContainer}>
          <TouchableOpacity
            onPress={() => goPage(PATHS.PATH_PROPOSTA_CONTRAPROPOSTA, {dados: perfil})}
            style={styles.buttonProposta}
          >
            <Text style={styles.propostaButtonText}>Contraproposta</Text>
          </TouchableOpacity>
        </View>
        }
        
        <View style={styles.buttonContrapropostaContainer}>
          <TouchableOpacity
            onPress={() => goPage(PATHS.PATH_PROPOSTA_HISTORICO, {dados: perfil})}
            style={styles.buttonProposta}
          >
            <Text style={styles.propostaButtonText}>Histórico</Text>
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
    height: 58,
    width: 160,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  propostaButtonText: {
    color: '#028090',
    fontWeight: 'bold',
    fontSize: 20,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },

  buttonContrapropostaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

export default PropostaDetalhe;
