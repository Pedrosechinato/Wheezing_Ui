import React, { useEffect, useState } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ProgressBar } from 'react-native-paper';

import * as PATHS from '../../util/paths';
import Alert from '../../component/Alert';
import { STYLES_DEFAULT } from '../../styles/';
import { USER_MUSICO } from '../../util/typesUser';
import validaCpfCnpj from '../../util/validaCpfCnpj';
import allFilled from '../../util/allFilled';
import { hasDocumento } from '../../services/ValidaService';
import useDebounce from '../../util/useDebounce';

function CadDados({ route, navigation }) {
  const [dados, setDados] = useState({});
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');

  const [documento, setDocumento] = useState('');
  const [vDocumento, setVDocumento] = useState(true);

  const [msgDocumento, setMsgDocumento] = useState('');
  const [msgDocumento2, setMsgDocumento2] = useState('');
  const [msg, setMsg] = useState('');

  const [isSearching, setIsSearching] = useState(false);

  const alert = [msgDocumento, msgDocumento2, msg];

  const { typeUser } = dados;

  useEffect(() => {
    if (route.params?.typeUser) {
      const { typeUser } = route.params;
      setDados({ typeUser });
    }
  }, [route.params?.typeUser]);

  const debouncedSearchDocumento = useDebounce(documento, 500);

  useEffect(() => {
    if (debouncedSearchDocumento) {
      const fetchData = async () => {
        setIsSearching(true);
        const { data } = await hasDocumento(documento);
        setIsSearching(false);
        const { valido } = data;
        const isValid = valido && vDocumento;
        const MSG_DOC = isValid ? 'Documento já cadastrado.' : '';
        setVDocumento(!isValid);
        setMsgDocumento2(MSG_DOC);
      };
      const textLengh = typeUser === USER_MUSICO ? 13 : 17;
      if (documento.length >= textLengh) {
        fetchData();
      }
    } else {
      setMsgDocumento2('');
    }
  }, [debouncedSearchDocumento]);

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  const EX_CPF_CPNJ = `Ex.: ${
    typeUser === USER_MUSICO ? '999.999.999-99' : '99.999.999/9999-99'
  }`;
  const MENSAGE_CPF_CPNJ = `Documento errado! ${EX_CPF_CPNJ}`;

  function isDocumento(text, force) {
    const vDoc = validaCpfCnpj(text);
    setDocumento(text);
    const textLengh = typeUser === USER_MUSICO ? 13 : 17;
    if (!force && text.length <= textLengh) return false;
    setVDocumento(vDoc);
    setMsgDocumento(vDoc ? '' : MENSAGE_CPF_CPNJ);
  }

  function nextPage() {
    isDocumento(documento, true);
    if (!allFilled([documento, nome, apelido]))
      return setMsg('Por Favor! Preencher todos os campos!');

    setMsg('');

    if (!vDocumento) {
      return setMsgDocumento(MENSAGE_CPF_CPNJ);
    }

    goPage(PATHS.PATH_CADASTRO_SENHA, {
      dados: { typeUser, documento, nome, apelido },
    });
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titleText}>Cadastre seus dados pessoais</Text>

          <View style={styles.cadSteps}>
            <ProgressBar
              progress={0.01}
              width={'100%'}
              color={STYLES_DEFAULT.c1.color}
            />
          </View>

          <TextInput
            name='nome'
            style={styles.textInput}
            placeholder='Nome Completo'
            value={nome}
            onChangeText={(text) => {
              setMsg('');
              setNome(text);
            }}
          />

          <TextInput
            name='apelido'
            style={styles.textInput}
            placeholder='Apelido'
            value={apelido}
            onChangeText={(text) => setApelido(text)}
          />

          <View style={styles.inputValidacao}>
            <TextInput
              style={{
                ...styles.textInput,
                borderColor: vDocumento
                  ? STYLES_DEFAULT.bc.color
                  : STYLES_DEFAULT.c4.color,
              }}
              name='documento'
              placeholder={`Documento ${EX_CPF_CPNJ}`}
              value={documento}
              onChangeText={(text) => isDocumento(text)}
            />
          </View>

          <Alert show={alert.some((elem) => !!elem)} texts={alert} />
        </View>

        <View style={styles.box}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              underlayColor='#5C73F2'
              onPress={() => nextPage()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Próximo</Text>
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

  inputValidacao: {},
  alert: {},

  titleText: {
    marginBottom: 30,
    fontSize: 20,
    color: '#5B5A5A',
    letterSpacing: 2,
    textAlign: 'left',
  },
});

export default CadDados;
