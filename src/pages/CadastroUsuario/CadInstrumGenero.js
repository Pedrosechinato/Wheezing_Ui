import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  CheckBox,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import * as PATHS from '../../util/paths';
import { USER_MUSICO } from '../../util/typesUser';
import { setStyle } from '../../styles';
import { getGeneros, getIntru } from '../../services/BuscaService';
import { putUser } from '../../services/UserService';

import { isItemBy_id, toogleListBy_id } from '../../util/toogleList';

function CadInstrumGenero({ route, navigation }) {
  const [idUser, setIdUser] = useState('');
  const [typeUser, setTypeUser] = useState({});

  const [instru, setInstru] = useState([]);
  const [instruSelects, setInstruSelects] = useState([]);

  const [generos, setGeneros] = useState([]);
  const [generosSelects, setGenerosSelects] = useState([]);

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  useEffect(() => {
    if (route.params?.typeUser) {
      const { typeUser } = route.params;
      setTypeUser(typeUser);
    }
  }, [route.params?.typeUser]);

  useEffect(() => {
    if (route.params?.id) {
      setIdUser(route.params.id);
    }
  }, [route.params?.id]);

  useEffect(() => {
    const fetchDados = async () => {
      const { data: dataIns } = await getIntru();
      const { data: dataGen } = await getGeneros();

      setInstru(dataIns);
      setGeneros(dataGen);
    };
    fetchDados();
  }, []);

  async function cadastrarInstru() {
    const { data } = await putUser({
      _id: idUser,
      generos: generosSelects,
      instrumentos: instruSelects,
    });

    if (data) goPage(PATHS.PATH_HOME);
  }

  const isInstruLoading = instru.length > 0;
  const isGeneroLoading = generos.length > 0;

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titleText}>
            {`Selecione os ${
              typeUser === USER_MUSICO ? 'Instrumentos e Generos' : 'Generos'
            }`}
          </Text>

          <View style={styles.cadSteps}>
            <ProgressBar
              progress={0.95}
              width={'100%'}
              color={STYLES_DEFAULT.c1.color}
            />
          </View>

          {isInstruLoading && typeUser === USER_MUSICO && (
            <View style={styles.boxChecks}>
              <Text style={styles.subTitle}>Instrumentos:</Text>
              <View style={styles.containerChecks}>
                {instru.map((item) => (
                  <View style={styles.checkBox} key={item._id}>
                    <CheckBox
                      value={isItemBy_id(instruSelects, item)}
                      onValueChange={() =>
                        setInstruSelects(toogleListBy_id(instruSelects, item))
                      }
                    />
                    <Text
                      style={styles.checkText}
                      onPress={() =>
                        setInstruSelects(toogleListBy_id(instruSelects, item))
                      }
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {isGeneroLoading && (
            <View style={styles.boxChecks}>
              <Text style={styles.subTitle}>Generos:</Text>
              <View style={styles.containerChecks}>
                {generos.map((item) => (
                  <View style={styles.checkBox} key={item._id}>
                    <CheckBox
                      value={isItemBy_id(generosSelects, item)}
                      onValueChange={() =>
                        setGenerosSelects(toogleListBy_id(generosSelects, item))
                      }
                    />
                    <Text
                      style={styles.checkText}
                      onPress={() =>
                        setGenerosSelects(toogleListBy_id(generosSelects, item))
                      }
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.box}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              underlayColor='#5C73F2'
              onPress={() => cadastrarInstru()}
              style={{ ...styles.button }}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  main: {
    ...STYLES_DEFAULT.main,
    flexGrow: 1,
    alignItems: 'stretch',
    paddingTop: 80,
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

  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },

  boxChecks: {
    marginBottom: 20,
  },

  containerChecks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  checkBox: {
    flexDirection: 'row',
    flexGrow: 1,
  },
});

export default CadInstrumGenero;
