import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity, 
  Picker,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as PATHS from '../util/paths';
import Icon from 'react-native-vector-icons/Feather';

import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

import { STYLES_DEFAULT } from '../styles/';
import { getUser } from '../services/UserService';
import { createProposta } from '../services/PropostaService';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import Alert from '../component/Alert';
import allFilled from '../util/allFilled';

function NovaProposta({ route, navigation }) {
  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  const [msgs, setMsgs] = useState({});
  const { msgData, msgHora, msgValor, msgDescricao, msg } = msgs;
  const alert = [msgData, msgHora, msgValor, msgDescricao, msg];

  const { perfil } = route.params;
  const apelido = perfil.apelido;
  const musico = perfil;
  const [estabelecimento, setEstabelecimento] = useState({});
  const [duracao, setDuracao] = useState();
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const inicialData = moment().subtract(3, 'hours');

  async function handleProposta() {
    const dia = data.substring(0,2);
    const mes = data.substring(3,5);
    const ano = data.substring(7,10);
    const novaData = mes + "/" + dia + "/" + ano;
    
    let horaFormatada = horario.substring(2,0);
    horaFormatada = Number(horaFormatada);
    const dataFormatada = moment(novaData).add(horaFormatada, 'hours');
    const horaFimFormatado = moment(dataFormatada).add(duracao, 'hours');

    if (!allFilled([data, horario, valor, descricao, duracao]))
      return setMsgs({ ...msgs, msg: 'Por Favor! Preencher todos os campos' });

      // const testeBetween = moment('2020-06-19T19:42:21.343Z').isBetween(dataFormatada, horaFimFormatado);
      // console.log(dataFormatada);
      // console.log(horaFimFormatado);
      // console.log(testeBetween);

    const dados = {
      descricao,
      data,
      hora: horario,
      dataInicio: dataFormatada,
      dataFim: horaFimFormatado,
      pagamento: valor,
      duracao,
      musico,
      estabelecimento,
      contratanteId: estabelecimento._id,
      contratadoId: musico._id,
    };

    await createProposta(dados);
    

    goPage(PATHS.PATH_BUSCA, { perfil: dados });
  }

  useEffect(() => {
    async function getDadosUser() {
      const dataUser = await AsyncStorage.getItem('@user');
      const dadosUser = dataUser ? JSON.parse(dataUser) : {};

      if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO

      const { _id } = dadosUser;
      const { data } = await getUser(_id);

      setEstabelecimento(data);
    }

    getDadosUser();
  }, []);

  return (
    <ScrollView 
    style={styles.main}
    contentContainerStyle={{
      paddingHorizontal: 16,
      paddingBottom: 16,
    }}

    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titleText}>Realizar Proposta</Text>
          <Text style={styles.subtitleText}>Informações Importantes</Text>

          <TextInput
            name='username'
            style={styles.textInput}
            placeholder='Musico'
            value={apelido}
            onChangeText={() => {}}
            editable={false}
          />
          
          {/* <TextInputMask
            style={styles.textInput}
            type={'datetime'}
            options={{
              format:'MM/DD/YYYY'
            }}
            placeholder='Data DD/MM/YYYY'
            value={data}
            onChangeText={(text) => setData(text)}
            // add the ref to a local var
          /> */}

          {/* <TouchableOpacity onPress={showDatePicker}>
            <Text>Selecionar data</Text>
          </TouchableOpacity> */}

          <DatePicker
            style={{
              ...styles.textInput,
              width: '100%',
              padding: 0,
              paddingVertical: 4,
            }}
            date={data}
            mode='date'
            placeholder='Data DD/MM/YYYY'
            format='DD/MM/YYYY'
            confirmBtnText='OK'
            cancelBtnText='CANCELAR'
            minDate = {inicialData}
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
            onDateChange={(data) => setData(data)}
          />

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
          <Text>Duração</Text>
          <Picker
            mode="dropdown"
            selectedValue={duracao}
            style={{height: 50, width: 85}}
            onValueChange={(text) => setDuracao(text)}>
            <Picker.Item label="1h" value="1" />
            <Picker.Item label="2h" value="2" />
            <Picker.Item label="3h" value="3" />
            <Picker.Item label="4h" value="4" />
            <Picker.Item label="5h" value="5" />
            <Picker.Item label="6h" value="6" />
            <Picker.Item label="7h" value="7" />
            <Picker.Item label="8h" value="8" />
            <Picker.Item label="9h" value="9" />
            <Picker.Item label="10h" value="10" />
          </Picker>

          <TextInputMask
            style={styles.textInput}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            placeholder='Valor R$'
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <TextInput
            name='descricao'
            style={styles.textInput}
            placeholder='Descricao'
            onChangeText={(text) => setDescricao(text)}
            multiline={true}
            numberOfLines={4}
          />

          <Alert show={alert.some((elem) => !!elem)} texts={alert} />
        </View>

        <TouchableOpacity
          style={styles.buttonProposta}
          onPress={() => handleProposta()}
        >
          <Text style={styles.propostaButtonText}>Realizar Proposta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  main: {
    flexGrow: 1,
    marginTop: 30,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  textInput: {
    ...STYLES_DEFAULT.textInput,
    flex: 0,
  },

  button: {
    ...STYLES_DEFAULT.button,
    backgroundColor: STYLES_DEFAULT.c2.color,
    flexGrow: 1,
    flex: 1,
  },

  titleText: {
    color: '#35AAFF',
    fontSize: 30,
    paddingTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  subtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  buttonProposta: {
    backgroundColor: '#35AAFF',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 12,
  },

  propostaButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default NovaProposta;
