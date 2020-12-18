import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { getByMusicoId } from '../services/AvaliacaoService';

import * as PATHS from '../util/paths';
import Cards from '../component/Cards';
import Avatar from '../component/Avatar';
import { STYLES_DEFAULT } from '../styles/';

function Perfil({ route, navigation }) {
  const { perfil } = route.params;
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [filtro, setFiltro] = useState(true);

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  const {
    _id,
    apelido,
    username,
    img,
    cidade,
    uf,
    descricao,
    bio,
    instrumentos,
    generos,
    typeUser,
  } = perfil;

  useEffect(() => {
    async function getDados() {
      console.log('teste');
      const response = await getByMusicoId(_id);
      setAvaliacoes(response.data);
    }

    getDados();
  }, []);

  

  if (!_id)
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.perfil}>
          <Text>Loading...</Text>
        </View>
      </ScrollView>
    );
  function verifica(user) {
    if (user == 'USER_MUSICO') return true;
    else return false;
  }

  return (
    <ScrollView style={styles.cont} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.perfil}>
        <View style={{ ...styles.box, ...styles.perfilAvatar }}>
          <Avatar style={styles.avatar} img={img} />
          <View>
            <Text style={styles.perfilSmallTitle}>{`${apelido}`}</Text>
            <Text style={styles.blue}>{`@${username}`}</Text>
            <Text>{`${cidade} - ${uf}`}</Text>
          </View>
        </View>

        {bio && bio.length > 0 && (
          <View style={styles.box}>
            <Text>{bio}</Text>
          </View>
        )}

        {((instrumentos && instrumentos.length > 0) ||
          (generos && generos.length > 0)) && (
          <View style={styles.box}>
            {instrumentos.length > 0 && (
              <View>
                <Text style={styles.smallTitle}>Instrumentos</Text>
                <Cards itens={instrumentos} />
              </View>
            )}

            {generos.length > 0 && (
              <View>
                <Text style={styles.smallTitle}>Generos</Text>
                <Cards itens={generos} type='2' />
              </View>
            )}
          </View>
        )}

        {descricao && descricao.length > 0 && (
          <View style={styles.box}>
            <Text>{descricao}</Text>
          </View>
        )}

        {verifica(typeUser) && (
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              underlayColor='#5C73F2'
              onPress={() =>
                goPage(PATHS.PATH_REALIZAR_PROPOSTA, { perfil: perfil })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Realizar Proposta</Text>
            </TouchableHighlight>
          </View>
        )}

          <Text style={styles.avaliacaoTitle}>Avaliações Anteriores</Text>
          {filtro && avaliacoes.map(avaliacao =>{
              return (
                <TouchableOpacity
                style={styles.avalicaoButton}
                onPress={() => goPage(PATHS.PATH_AVALIAR_DETALHE, { dados: avaliacao })}
                >
                  <Text style={styles.avaliacaoText}>Avaliador: {avaliacao.contratanteNome}</Text>
                </TouchableOpacity>
              )
            })}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  perfil: {
    marginTop: 20,
    padding: 10,
    flex: 1,
    backgroundColor: '#E6E4D8',
  },

  box: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    marginVertical: 4,
    borderRadius: 4,
  },

  smallTitle: {
    fontWeight: '700',
    color: STYLES_DEFAULT.c1.color,
  },

  blue: {
    color: STYLES_DEFAULT.c1.color,
  },

  perfilAvatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    marginRight: 20,
  },

  button: {
    ...STYLES_DEFAULT.button,
    backgroundColor: STYLES_DEFAULT.c1.color,
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

  avaliacaoTitle: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
  },

  avaliacaoText: {
    opacity: 0.92,
    color: 'black',
    borderRadius: 3,
    fontSize: 16,
    fontWeight: 'bold',
    fontWeight: '900',
    marginBottom: 7,
  },

  avalicaoButton: {
    marginBottom:10,
    marginTop: 6,
    backgroundColor: '#51CA67',
    paddingLeft: 10,
  }

});

export default Perfil;
