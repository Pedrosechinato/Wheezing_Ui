import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Button,
  Picker,
  TextInput,
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import CheckInsGen from './CheckInsGen';

import { STYLES_DEFAULT } from '../styles';

import { getAllUsers } from '../services/BuscaService';
import { getInsGen } from '../services/StorageService';
import * as TYPE_USER from '../util/typesUser';

function BuscaInputs({ setResults, typeUser }) {
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');
  const [small, setSmall] = useState(true);

  const [generos, setGeneros] = useState([]);
  const [genSelected, setGenSelected] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [insSelected, setInsSelected] = useState([]);

  const hasMusico = typeUser === TYPE_USER.USER_MUSICO;

  useFocusEffect(
    useCallback(() => {
      fetchInsGen();
    }, [])
  );

  async function fetchInsGen() {
    const { instrumentos: ins, generos: gen } = await getInsGen();
    setInstrumentos(ins);
    setGeneros(gen);
  }

  async function getUsers() {
    const params = {
      typeUser: hasMusico
        ? TYPE_USER.USER_ESTABELECIMENTO
        : TYPE_USER.USER_MUSICO,
      cidade,
      uf,
      instrumentos: insSelected.map((item) => item.name),
      generos: genSelected.map((item) => item.name),
    };

    const { data, status } = await getAllUsers(params);

    if (status == 200) {
      setResults(data);
    }
  }

  async function handleClick() {
    setSmall(true);
    getUsers();
  }

  const txtGen = genSelected.map((item) => item.name);
  const txtIns = insSelected.map((item) => item.name);
  const hasGen = txtGen.length > 0;
  const hasIns = txtIns.length > 0;
  const titleFilter = hasMusico ? 'Estabelecimentos' : 'Musicos';

  function handleFilters() {
    return (
      <View style={styles.boxFilters}>
        <View style={styles.boxEnd}>
          <View style={styles.boxCard}>
            <Text style={styles.boxCardTitle}>Local</Text>

            <View style={styles.inputGroup}>
              <TextInput
                style={{ ...styles.textInput, flex: 0.7 }}
                name='cidade'
                placeholder='Cidade'
                placeholderTextColor='#000'
                value={cidade}
                onChangeText={(text) => setCidade(text)}
              />

              <TextInput
                style={{ ...styles.textInput, flex: 0.3 }}
                name='uf'
                placeholder='Estado'
                placeholderTextColor='#000'
                value={uf}
                onChangeText={(text) => setUF(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.boxInsGen}>
          <View style={styles.boxCard}>
            <Text style={styles.boxCardTitle}>Generos</Text>
            <CheckInsGen
              style={styles.checks}
              name='gen'
              items={generos}
              selecteds={genSelected}
              onChangeItems={setGenSelected}
            />
          </View>

          {!hasMusico && (
            <View style={styles.boxCard}>
              <Text style={styles.boxCardTitle}>Instrumentos</Text>
              <CheckInsGen
                style={styles.checks}
                name='ins'
                items={instrumentos}
                selecteds={insSelected}
                onChangeItems={setInsSelected}
              />
            </View>
          )}
        </View>

        <View style={styles.boxButton}>
          <TouchableHighlight
            onPress={() => handleClick()}
            style={styles.buttonOut}
            underlayColor='none'
          >
            <View style={styles.contentButton}>
              <Icon name='search' size={20} color={STYLES_DEFAULT.c3.color} />
              <Text style={styles.txtButton}> Buscar</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function handleSmall() {
    return (
      <View style={styles.boxFilters}>
        <View style={styles.smallFilters}>
          {(!!cidade || !!uf) && (
            <View style={styles.smallCard}>
              <Text style={styles.smallTitle}>Local: </Text>
              <Text style={styles.smallText}>
                {`${cidade ? `${cidade}` : ''}${!!cidade && !!uf ? ' - ' : ''}${
                  uf && `${uf}`
                }`}
              </Text>
            </View>
          )}

          {hasGen && (
            <View style={styles.smallCard}>
              <Text style={styles.smallTitle}>Generos: </Text>
              <Text style={styles.smallText}>{`${txtGen.join(', ')}`}</Text>
            </View>
          )}
          {hasIns && (
            <View style={styles.smallCard}>
              <Text style={styles.smallTitle}>Instrumentos: </Text>
              <Text style={styles.smallText}>{`${txtIns.join(', ')}`}</Text>
            </View>
          )}
        </View>

        <View style={styles.smallButtons}>
          <TouchableHighlight
            onPress={() => setSmall(false)}
            style={styles.smallButton}
          >
            <Text>
              <Icon name='arrow-down' size={14} /> Expandir{' '}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function handleBusca() {
    return small ? handleSmall() : handleFilters();
  }

  return (
    <View style={styles.boxBusca}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Buscando: </Text>
        <Text style={styles.subTitle}>{titleFilter}</Text>
      </View>
      {handleBusca()}
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  boxBusca: {
    flexDirection: 'column',
    borderRadius: 4,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },

  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  title: {
    fontSize: 18,
    color: STYLES_DEFAULT.c1.color,
  },

  subTitle: {
    fontSize: 16,
    color: STYLES_DEFAULT.c2.color,
  },

  boxFilters: {},

  smallCard: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  smallTitle: {
    fontWeight: '700',
    color: STYLES_DEFAULT.c1.color,
  },

  smallButtons: {
    alignItems: 'center',
    marginHorizontal: 40,
    paddingBottom: 5,
    borderBottomWidth: 1,
    marginBottom: 5,
  },

  boxButton: {
    paddingVertical: 10,
  },

  buttonOut: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: STYLES_DEFAULT.c3.color,
  },

  contentButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  txtButton: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    color: STYLES_DEFAULT.c3.color,
  },

  boxType: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  boxEnd: {},

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textInput: {
    padding: 6,
    height: 30,
    borderWidth: 0,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#F5F6F7',
  },

  boxInsGen: {},

  boxCard: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },

  boxCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: STYLES_DEFAULT.c2.color,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderColor: STYLES_DEFAULT.c2.color,
  },

  checks: {
    marginVertical: 10,
  },
});

export default BuscaInputs;
