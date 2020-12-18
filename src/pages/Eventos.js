import {
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useIsFocused } from '@react-navigation/native';
import { getAll, getById, getByIdEst } from '../services/PropostaService';
import { getUser, putUser } from '../services/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import * as PATHS from '../util/paths';
import { useNavigation } from '@react-navigation/native';

function Eventos() {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const status = 'accepted';
  const status2 = 'false';
  const [filtro, setFiltro] = useState();
  const [propostasEst, setPropostasEst] = useState([]);
  const [propostas, setPropostas] = useState([]);
  const [propostas2, setPropostas2] = useState([]);
  const [imagem, setImagem] = useState();
  const [dadosStorage, setDadosStorage] = useState('');
  const [apelido, setApelido] = useState('');
  const [refresh, setRefresh] = useState();
  let customDatesStyles = [];
  
  const navigation = useNavigation();

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, [])
  );

  async function getDados() {
    const dataUser = await AsyncStorage.getItem('@user');
    const dadosUser = dataUser ? JSON.parse(dataUser) : {};
    setDadosStorage(dadosUser);

    if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO

    const { _id } = dadosUser;

    const { data } = await getUser(_id);

    const { apelido, img, typeUser } = data;

    setImagem(img);
    setApelido(apelido);

    if (typeUser === 'USER_ESTABELECIMENTO') {
      const response = await getByIdEst(_id, status);
      const response2 = await getByIdEst(_id, status2);
      console.log(_id)
      setPropostas(response.data);
      setPropostas2(response2.data);
      setFiltro(true);
    } else {

      const response = await getById(_id, status);
      const response2 = await getById(_id, status2);

      setPropostas(response.data);
      setPropostas2(response2.data);
      setFiltro(true);
    }
    setLoading(false);
  }

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  let datas = [];
  let datas2 = [];
  let i = 0;
  propostas.forEach((proposta) => datas.push(proposta.dataInicio));
  propostas2.forEach((proposta2) => datas2.push(proposta2.dataInicio));  
  //var diaShow = datas[0].split("/");
  //var diaAtual = new Date().getDate();

  while ((i < datas.length) || (i < datas2.length) ) {
    if (datas[i]) {
      customDatesStyles.push({
        date: datas[i],
        style: { backgroundColor: '#78E183' },
        textStyle: { color: 'black' }, // sets the font color
        containerStyle: [], // extra styling for day container
      });
    }
    if (datas2[i]) {
      customDatesStyles.push({
        date: datas2[i],
        style: { backgroundColor: '#DCE6FA' },
        textStyle: { color: 'black' }, // sets the font color
        containerStyle: [], // extra styling for day container
      });
    }
    i++;
  }


  function renderizar(date) {


  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={require('../images/calendar4.png')}
      >
        <CalendarPicker
          customDatesStyles={customDatesStyles}
          todayBackgroundColor={'transparent'}
          textStyle={styles.calendar}
          weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
          months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
          previousTitle="Anterior"
          nextTitle="Próximo"
        />

        <ScrollView style={styles.scroolStyle}>
          {filtro
            ? propostas.map((proposta) => {
              const dados = {
                _id:proposta._id,
                nome:proposta.estabelecimento.nome,
                contratadoId:proposta.contratadoId,   
              } 
                return (
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                    onPress={() => goPage(PATHS.PATH_PROPOSTA_DETALHE, { perfil: dados })}
                    style={styles.viewButton}
                    >
                      <Text style={styles.texto}>
                        Contratante: {proposta.estabelecimento.apelido} Data:{' '}
                        {proposta.data} {'\n'}
                        Horario: {proposta.hora} {' '}
                      </Text>
                  </TouchableOpacity>
                  </View>
                );
              })
            : null}
            {filtro
            ? propostas2.map((proposta2) => {
              const dados = {
                _id:proposta2._id,
                nome:proposta2.estabelecimento.nome,
                contratadoId:proposta2.contratadoId,   
              } 
                return (
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                    onPress={() => goPage(PATHS.PATH_PROPOSTA_DETALHE, { perfil: dados })}
                    style={styles.viewButton}
                    >
                      <Text style={styles.texto2}>
                        Contratante: {proposta2.estabelecimento.apelido} Data:{' '}
                        {proposta2.data} {'\n'}
                        Horario: {proposta2.hora} {' '}
                      </Text>
                  </TouchableOpacity>
                  </View>
                );
              })
            : null}
            
            
        </ScrollView> 
        <ImageBackground style={styles.legendaImage}
          source={require('../images/Legenda.png')} />
          <ImageBackground
          style={styles.ballImage}
          source={require('../images/grenBal.png')}
          ></ImageBackground>
          <ImageBackground
          style={styles.ballImage2}
          source={require('../images/whiteBall.png')}
          ></ImageBackground>
        
      <Text style={styles.balltext}>Porpostas Aceitas</Text>
      <Text style={styles.balltext2}>Porpostas Em Aberto</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 180
},
  scroolStyle: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    marginBottom: 47,
    marginLeft: 24,
  },
  MusicList: {
    marginTop: 30,
  },
  container2: {
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 390,
    height: 22,
    resizeMode: 'cover',
    marginLeft: 19,
  },
  backImage: {
    width: 410,
    height: 685,
    resizeMode: 'cover',
    marginTop: 1,
    borderColor: '#5B5A5A',
  },
  ballImage: {
    flex: 3,
    position: 'absolute', top:360,
    width: 30,
    height: 30,
    marginLeft: 315,
    marginBottom:150,
    resizeMode: 'cover',
    borderColor: '#5B5A5A',
  },
  ballImage2: {
    flex: 3,
    position: 'absolute', top:415,
    width: 30,
    height: 30,
    marginLeft: 315,
    marginBottom:150,
    resizeMode: 'cover',
    borderColor: '#5B5A5A',
  },
  legendaImage: {
    flex: 3,
    position: 'absolute', top:351,
    width: 136,
    height: 115,
    marginLeft: 261,
    marginBottom: 250,
    resizeMode: 'cover',
    borderColor: '#5B5A5A',
  },
  balltext: {
    flex: 1,
    fontWeight:'bold',
    color: 'white',
    fontSize: 13,
    position: 'absolute', top:390,
    marginLeft: 275,
    marginBottom: 150,
  },
  balltext2: {
    flex: 1,
    fontWeight:'bold',
    color: 'white',
    fontSize: 13,
    position: 'absolute', top:445,
    marginLeft: 265,
    marginBottom: 150,
  },
  calendar: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  texto: {
    opacity: 0.92,
    backgroundColor: '#51CA67',
    color: 'black',
    borderRadius: 3,
    fontSize: 16,
    fontWeight: 'bold',
    fontWeight: '900',
    marginBottom: 7,
  },
  texto2: {
    opacity: 0.92,
    backgroundColor: '#E1E8A6',
    color: 'black',
    fontWeight: '900',
    borderRadius: 3,
    fontSize: 16,
    fontWeight: 'bold',
    fontWeight: '900',
    marginBottom: 7,
  },
  textoChange: {
    opacity: 0.5,
  },
});

export default Eventos;
