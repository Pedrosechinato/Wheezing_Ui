import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Text,
} from 'react-native';

import { ProgressBar } from 'react-native-paper';

import * as PATHS from '../../util/paths';
import Alert from '../../component/Alert';
import { STYLES_DEFAULT } from '../../styles/';
import validaEmail from '../../util/validaEmail';
import allFilled from '../../util/allFilled';
import { hasEmail, hasUsername } from '../../services/ValidaService';
import useDebounce from '../../util/useDebounce';

function CadSenha({ route, navigation }) {
  const [dados, setDados] = useState({});

  const [senha, setSenha] = useState('');
  const [senhaConf, setSenhaConf] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');

  const [vUsername, setVUsername] = useState(true);
  const [vSenhas, setVSenhas] = useState(true);
  const [vEmail, setVEmail] = useState(true);

  const [msgUsername, setMsgUsername] = useState('');
  const [msgSenha, setMsgSenha] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msg, setMsg] = useState('');

  // TODO CRIAR LOADING
  const [isSearching, setIsSearching] = useState(false);

  const alert = [msgEmail, msgSenha, msgUsername, msg];

  useEffect(() => {
    if (route.params?.dados) {
      const { dados } = route.params;
      setDados(dados);
    }
  }, [route.params?.dados]);

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  function validateSenhas(text) {
    setSenhaConf(text);
    let vPass = true;
    if (text.length >= senha.length && senha != text) {
      vPass = false;
    }
    setVSenhas(vPass);
    setMsgSenha(vPass ? '' : 'Senhas não conferem!');
  }

  function nextPage() {
    if (!allFilled([email, senha, username, senhaConf]))
      return setMsg('Por Favor! Preencher todos os campos');

    if (!vSenhas) {
      return setMsgSenha('Senhas não conferem!');
    }

    if (!vUsername) return false;

    goPage(PATHS.PATH_CADASTRO_ENDERECO, {
      dados: { ...dados, senha, email, username },
    });
  }

  function isEmail(email) {
    const vEmail = validaEmail(email);
    setEmail(email);
    setVEmail(vEmail);
    setMsgEmail(vEmail ? '' : 'E-mail inválido.');
  }

  const debouncedSearchEmail = useDebounce(email, 500);
  useEffect(() => {
    if (debouncedSearchEmail) {
      const fetchData = async () => {
        setIsSearching(true);
        const { data } = await hasEmail(email);
        setIsSearching(false);
        setMsgEmail(data.valido && vEmail ? 'E-mail já cadastrado.' : '');
      };
      fetchData();
    } else {
      setMsgEmail('');
    }
  }, [debouncedSearchEmail]);

  const debouncedSearchUserName = useDebounce(username, 500);
  useEffect(() => {
    if (debouncedSearchUserName) {
      const fetchData = async () => {
        setIsSearching(true);
        const { data } = await hasUsername(username);
        setIsSearching(false);

        setVUsername(!data.valido);
        setMsgUsername(data.valido ? 'Username já cadastrado.' : '');
      };
      fetchData();
    } else {
      setVUsername(true);
      setMsgUsername('');
    }
  }, [debouncedSearchUserName]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titleText}>
            Cadastre sua senha e dados para login
          </Text>

          <View style={styles.cadSteps}>
            <ProgressBar
              progress={0.25}
              width={'100%'}
              color={STYLES_DEFAULT.c1.color}
            />
          </View>

          <TextInput
            style={styles.textInput}
            name='email'
            placeholder='E-mail'
            keyboardType='email-address'
            value={email}
            onChangeText={(text) => isEmail(text)}
          />

          <TextInput
            style={styles.textInput}
            name='username'
            placeholder='Username'
            value={username}
            onChangeText={(text) => setUserName(text)}
          />

          <TextInput
            style={styles.textInput}
            name='senha'
            placeholder='Senha'
            value={senha}
            secureTextEntry={true}
            onChangeText={(text) => setSenha(text)}
          />
          <TextInput
            style={{
              ...styles.textInput,
              borderColor: vSenhas
                ? STYLES_DEFAULT.bc.color
                : STYLES_DEFAULT.c4.color,
            }}
            name='senhaConf'
            placeholder='Confirmar Senha'
            value={senhaConf}
            secureTextEntry={true}
            onChangeText={(text) => validateSenhas(text)}
          />

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

  titleText: {
    marginBottom: 30,
    fontSize: 20,
    color: '#5B5A5A',
    letterSpacing: 2,
    textAlign: 'left',
  },
});

export default CadSenha;
