import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Text,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import * as PATHS from '../../util/paths';

import Alert from '../../component/Alert';
import { STYLES_DEFAULT } from '../../styles/';
import allFilled from '../../util/allFilled';
import { USER_MUSICO } from '../../util/typesUser';
import { postUser } from '../../services/UserService';
import { getCEP } from '../../services/ApiExternal';

const INIT_ENDERECO = {
  rua: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  cep: '',

  numero: '',
  complemento: '',
};

function CadEndereco({ route, navigation }) {
  const [dados, setDados] = useState({});
  const [endereco, setEndereco] = useState(INIT_ENDERECO);
  const [isLoading, setLoading] = useState(false);

  const [msg, setMsg] = useState('');
  const alert = [msg];

  useEffect(() => {
    if (route.params?.dados) {
      const { dados } = route.params;

      setDados(dados);
    }
  }, [route.params?.dados]);

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  async function saveStorage(saveUser) {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(saveUser));
    } catch (error) {
      setMsg('Erro ao salvar dados no sistema!');
    }
  }

  const handleCadastro = async () => {
    const camposObrigatorios = [
      endereco.cep,
      endereco.logradouro,
      endereco.cidade,
      endereco.bairro,
      endereco.uf,
    ];
    if (!allFilled(camposObrigatorios))
      return setMsg(
        'Por Favor! Verificar se ao menos foi preenchido: cep, rua, bairro, cidade e estado!'
      );

    setMsg('');

    const params = {
      ...dados,
      ...endereco,
    };

    const { data, status } = await postUser(params);

    if (status !== 200)
      return setMsg('Erro ao cadastrar, tente novamente mais tarde.');

    const { _id, typeUser, username, apelido } = data;
    await saveStorage({ _id, typeUser, username, apelido });

    goPage(PATHS.PATH_CADASTRO_INSTRU_GEN, { id: _id, typeUser });
  };

  async function handleCep(cep) {
    setEndereco({ ...endereco, cep });

    if (cep) {
      const regexCEP = /^[0-9]{5}-[0-9]{3}$/;
      const hasCEP = regexCEP.test(cep);

      if (hasCEP) {
        setLoading(true);
        try {
          const {
            data: { logradouro, bairro, uf, localidade },
          } = await getCEP(cep.replace('-', ''));

          setLoading(false);
          setEndereco({
            logradouro,
            bairro,
            uf,
            cidade: localidade,
            cep,
            numero: '',
            complemento: '',
          });
        } catch (error) {
          console.log({ error });
          setLoading(false);
        }
      }
    }
  }

  const { logradouro, cidade, numero, bairro, cep, complemento, uf } = endereco;

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titleText}>Cadastre seu endereço</Text>

          <View style={styles.cadSteps}>
            <ProgressBar
              progress={0.75}
              width={'100%'}
              color={STYLES_DEFAULT.c1.color}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={{ ...styles.textInput, flex: 0.4 }}
              name='cep'
              placeholder='CEP'
              value={cep}
              onChangeText={(cep) => handleCep(cep)}
            />
            {isLoading && (
              <View style={styles.containerLoading}>
                <Text>Carregando...</Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={{ ...styles.textInput, flex: 0.7 }}
              name='logradouro'
              placeholder='Rua'
              value={logradouro}
              onChangeText={(logradouro) =>
                setEndereco({ ...endereco, logradouro })
              }
            />

            <TextInput
              style={{ ...styles.textInput, flex: 0.2 }}
              name='numero'
              placeholder='Nº'
              value={numero}
              onChangeText={(numero) => setEndereco({ ...endereco, numero })}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={{ ...styles.textInput, flex: 0.5 }}
              name='bairro'
              placeholder='Bairro'
              value={bairro}
              onChangeText={(bairro) => setEndereco({ ...endereco, bairro })}
            />

            <TextInput
              style={{ ...styles.textInput, flex: 0.4 }}
              name='complemento'
              placeholder='Complemento'
              value={complemento}
              onChangeText={(complemento) =>
                setEndereco({ ...endereco, complemento })
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={{ ...styles.textInput, flex: 0.7 }}
              name='cidade'
              placeholder='Cidade'
              value={cidade}
              onChangeText={(cidade) => setEndereco({ ...endereco, cidade })}
            />

            <TextInput
              style={{ ...styles.textInput, flex: 0.2 }}
              name='uf'
              placeholder='Estado'
              value={uf}
              onChangeText={(uf) => setEndereco({ ...endereco, uf })}
            />
          </View>

          <Alert show={alert.some((elem) => !!elem)} texts={alert} />
        </View>

        <View style={styles.box}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              underlayColor='#5C73F2'
              onPress={() => handleCadastro()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{`${
                dados.typeUser == USER_MUSICO ? 'Próximo' : 'Cadastrar'
              }`}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  main: {
    ...STYLES_DEFAULT.main,
    flexGrow: 1,
    alignItems: 'stretch',
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
    marginBottom: 30,
    fontSize: 20,
    color: '#5B5A5A',
    letterSpacing: 2,
    textAlign: 'left',
  },

  containerLoading: {
    flex: 0.5,
    justifyContent: 'center',
  },
});

export default CadEndereco;
