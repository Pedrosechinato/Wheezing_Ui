import React, {useEffect ,useState} from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { getById, getByIdEst } from '../services/PropostaService';
import { getUser } from '../services/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native'

import ListaMusicos from '../component/ListaMusicos';

function PropostasAceitas() {
  const status = 'accepted';
  const [filtro, setFiltro] = useState(true);
  const [propostasEst, setPropostasEst] = useState([]);
  const [propostas, setPropostas] = useState([]);
  const [imagem, setImagem] = useState();
  const [dadosStorage, setDadosStorage] = useState('');
  const [apelido, setApelido] = useState(''); 
  const [refresh, setRefresh] = useState();
  const isFocused = useIsFocused();

  useEffect(()=>{
    async function getDados () {
      const dataUser = await AsyncStorage.getItem('@user');
      const dadosUser = dataUser ? JSON.parse(dataUser) : {};
      setDadosStorage(dadosUser);
  
      if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO
  
      const { _id } = dadosUser;
  
      const {data} = await getUser(_id);
  
      const { apelido, img, typeUser } = data; 
  
      setImagem(img);
      setApelido(apelido);

      if(typeUser === 'USER_ESTABELECIMENTO'){
        const response = await getByIdEst(_id,status);
  
        setPropostasEst(response.data);
        setFiltro(false);
      } else {
        const response = await getById(_id,status);
  
        setPropostas(response.data);
        setFiltro(true);
      } 
        
    }
    
    getDados();

  },[refresh,isFocused]);

  
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.HeaderTitle}>
          Bem vindo,{'\n'}
          <Text style={styles.Username}>{apelido}</Text>
          </Text>
          <TouchableOpacity  style = {styles.ProfileButton} onPress={() =>{}}>
            <Image 
            style = {styles.UserAvatar}
            source= {{uri: imagem}}/>
          </TouchableOpacity>
      </View>

        <ScrollView
          style={styles.MusicList} 
          contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16,
          }}
        >
        
        {filtro
          ? propostas.map((proposta) => {
              return (
                <ListaMusicos
                  key={proposta._id}
                  descricao={proposta.descricao}
                  pagamento={proposta.pagamento}
                  nome={proposta.estabelecimento.apelido}
                  cidade={proposta.estabelecimento.cidade}
                  imagem={proposta.estabelecimento.img}
                  all={proposta}
                />
              );
            })
          : propostasEst.map((propostaEst) => {
              return (
                <ListaMusicos
                  key={propostaEst._id}
                  descricao={propostaEst.descricao}
                  pagamento={propostaEst.pagamento}
                  nome={propostaEst.musico.apelido}
                  cidade={propostaEst.estabelecimento.cidade}
                  imagem={propostaEst.musico.img}
                  all={propostaEst}
                />
              );
            })}
      
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width: 400,
        flex:1,
        backgroundColor: '#f0f0f7',
        marginTop: 10,
    },
    MusicList:{
        marginTop: 30,
        },

    Header:{
      padding: 24,
      paddingTop: 24,
      backgroundColor: '#4682B4',

      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    HeaderTitle:{
      fontSize: 20,
      lineHeight: 28,
      color: "#f4ede8",
    },

    Username:{
      color: "#000000",
    },

    ProfileButton:{},

    UserAvatar:{
      width: 56,
      height: 56,
      borderRadius: 28,
    },

    MinhasPropostasText: {
      color: '#f0f0f7'
    },

    MensagemErro: {
      marginTop: 30,
      color:'#e33d3d',
      fontSize: 20,
      
    }


});

export default PropostasAceitas;