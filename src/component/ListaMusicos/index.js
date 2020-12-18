import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';
import { rejectProposta, acceptProposta } from '../../services/PropostaService';
import { createAvalicao } from '../../services/AvaliacaoService';
import PropostaDetalhe from '../../pages/PropostaDetalhe';
import * as PATHS from '../../util/paths';
import { useNavigation } from '@react-navigation/native';

function ListaMusicos({
  nome,
  pagamento,
  cidade,
  descricao,
  imagem,
  all,
}) {
  const [urlImage, setUrlImage] = useState('');

  const navigation = useNavigation();

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              imagem ||
              'https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png',
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.subject}>{cidade}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{descricao}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>{pagamento}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => goPage(PATHS.PATH_PROPOSTA_DETALHE, { perfil: {
              _id: all._id,
              contratadoId: all.contratadoId,
              nome,
              pagamento,
              cidade,
              descricao,
              data: all.data,
              contraProposta: all.contraProposta,
              hora: all.hora,
            } })}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>Visualizar Proposta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ListaMusicos;
