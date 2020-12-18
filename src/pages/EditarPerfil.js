import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { STYLES_DEFAULT } from '../styles/';
import { mapInsGen } from '../util/mapInsGen';
import { getUser, putUser } from '../services/UserService';

import CheckInsGen from '../component/CheckInsGen';
import Alert from '../component/Alert';
import PickerImage from '../component/PickerImage';

function EditarPerfil() {
  const [dadosStotage, setDadosStotage] = useState('');
  const [loading, setLoading] = useState(true);

  const [img, setImg] = useState('');
  const [username, setUsername] = useState('');
  const [apelido, setApelido] = useState('');
  const [descricao, setDescricao] = useState('');
  const [bio, setBio] = useState('');

  const [generos, setGeneros] = useState([]);
  const [genSelected, setGenSelected] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [insSelected, setInsSelected] = useState([]);

  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [typeUser, setTypeUser] = useState('');

  const [msg, setMsg] = useState('');
  const alert = [msg];

  useFocusEffect(
    useCallback(() => {
      getInsGenLocal();
      getDadosUser();
    }, [])
  );

  async function getInsGenLocal() {
    try {
      const localDataIns = await AsyncStorage.getItem('@ins');
      const itemsIns = localDataIns ? JSON.parse(localDataIns) : [];
      if (itemsIns.length > 0) {
        setInstrumentos(itemsIns);
      }

      const localDataGen = await AsyncStorage.getItem('@gen');
      const itemsGen = localDataGen ? JSON.parse(localDataGen) : [];
      if (itemsGen.length > 0) {
        setGeneros(itemsGen);
      }

      const hasItems = itemsGen.length === 0 || itemsIns.length === 0;
      if (hasItems) {
        const { ins, gen } = await mapInsGen();
        setInstrumentos(ins);
        setGeneros(gen);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados');
    }
  }

  async function getDadosUser() {
    const dataUser = await AsyncStorage.getItem('@user');
    const dadosUser = dataUser ? JSON.parse(dataUser) : {};
    setDadosStotage(dadosUser);

    if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO

    const { _id } = dadosUser;
    const { data } = await getUser(_id);

    if (data) {
      const {
        img,
        username,
        apelido,
        descricao,
        bio,
        endereco,
        cidade,
        uf,
        generos: dataGen,
        instrumentos: dataInst,
        typeUser
      } = data;

      setImg(img);
      setApelido(apelido);
      setUsername(username);
      setDescricao(descricao);
      setBio(bio);
      setEndereco(endereco);
      setCidade(cidade);
      setUf(uf);
      setTypeUser(typeUser);

      setGenSelected(dataGen);
      setInsSelected(dataInst);

      setLoading(false);
    }
  }

  async function handleSalvarEdicao() {
    const { _id } = dadosStotage;

    const { data } = await putUser({
      _id,
      img,
      apelido,
      username,
      descricao,
      bio,
      endereco,
      cidade,
      uf,
      generos: genSelected,
      instrumentos: insSelected,
    });

    setMsg(data ? 'Salvo com sucesso!' : 'Erro ao salvar, tente novamente!');
  }
  function verifica(user){
    if (user=="USER_MUSICO")
      return true;

    else 
      return false;
  }
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
    

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Editar Perfil</Text>

          <PickerImage onPicker={setImg} img={img} />

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Username</Text>
            <TextInput
              name='username'
              style={styles.textInput}
              placeholder='Username'
              value={username}
              onChangeText={(text) => setUsername(text)}
            />

            <Text style={styles.boxTitle}>Apelido</Text>
            <TextInput
              name='apelido'
              style={styles.textInput}
              placeholder='Apelido'
              value={apelido}
              onChangeText={(text) => setApelido(text)}
            />

            <Text style={styles.boxTitle}>Bio</Text>
            <TextInput
              name='bio'
              style={styles.textInput}
              placeholder='Bio'
              onChangeText={(text) => setBio(text)}
              value={bio}
              multiline={true}
              numberOfLines={3}
            />

            <Text style={styles.boxTitle}>Descrição</Text>
            <TextInput
              name='Descricao'
              style={styles.textInput}
              placeholder='Descricao'
              onChangeText={(text) => setDescricao(text)}
              value={descricao}
              multiline={true}
              numberOfLines={10}
            />
          </View>

          {verifica(typeUser) ?  
            <View >

            <View style={styles.box}>
            <Text style={styles.boxTitle}>Instrumentos</Text>

            <CheckInsGen
              name='ins'
              items={instrumentos}
              selecteds={insSelected}
              onChangeItems={setInsSelected}
            />
            </View>
            </View>     
          : null}
              <View style={styles.box}>
              <Text style={styles.boxTitle}>Generos</Text>
              <CheckInsGen
              name='gen'
              items={generos}
              selecteds={genSelected}
              onChangeItems={setGenSelected}
              />
              </View>
          

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Endereço</Text>

            <TextInput
              style={styles.textInput}
              name='endereco'
              placeholder='Endereço'
              value={endereco}
              onChangeText={(text) => setEndereco(text)}
            />

            <View style={styles.inputGroup}>
              <TextInput
                style={{ ...styles.textInput, flex: 0.7 }}
                name='cidade'
                placeholder='Cidade'
                value={cidade}
                onChangeText={(text) => setCidade(text)}
              />

              <TextInput
                style={{ ...styles.textInput, flex: 0.2 }}
                name='uf'
                placeholder='Estado'
                value={uf}
                onChangeText={(text) => setUf(text)}
              />
            </View>

            <Alert show={alert.some((elem) => !!elem)} texts={alert} />

            <TouchableOpacity
              onPress={() => handleSalvarEdicao()}
              style={styles.viewButton}
            >
              <Text style={styles.viewButtonText}>Salvar Edição</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  titleText: {
    color: '#35AAFF',
    fontSize: 26,
    paddingTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
  },

  container: {
    margin: 10,
    marginHorizontal: 15,
  },

  box: {
    marginBottom: 20,
  },

  viewButton: {
    backgroundColor: '#4682B4',
    flex: 1,
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    marginRight: 12,
  },

  viewButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default EditarPerfil;
