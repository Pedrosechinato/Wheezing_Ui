import React, {useState, useEffect} from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';
import { rejectProposta, acceptProposta } from '../../services/PropostaService';

function ListaMusicosAceitas ({estabelecimento, pagamento, descricao , proposta, setRefresh, imagem}) {
    const [urlImage, setUrlImage] = useState('');
    
    useEffect(() => {
        setUrlImage(`http://192.168.15.12:3333/files/${imagem}`);
    },[imagem]);
   
    async function handleRejectProposta(){
        Alert.alert(
            'Recusar Proposta',
            'Você realmente deseja recusar essa Proposta?',
            [
              {text: 'Não', onPress: () => {}, style: 'cancel'},
              {text: 'Sim', onPress: () => rejectProposta(proposta)},
            ]
          );
        
        setRefresh(proposta);
    }

    async function handleAcceptProposta(){
        Alert.alert(
            'Aceitar Proposta',
            'Você realmente deseja aceitar essa Proposta?',
            [
              {text: 'Não', onPress: () => {}, style: 'cancel'},
              {text: 'Sim', onPress: () => acceptProposta(proposta)},
            ]
          );
        
        setRefresh(proposta);
    }
    
    return(
    <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: urlImage || 'https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png',
                      }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{estabelecimento}</Text>
                    <Text style={styles.subject}>Campinas-SP</Text>
                </View>
            </View>

            <Text style={styles.bio}>{descricao}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R${pagamento}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                     onPress={() => handleRejectProposta()}
                     style={styles.favoriteButton}
                    >    
                        <Text style={styles.favoriteButtonText}>X</Text>                                     
                    </TouchableOpacity>

                </View>
               
            </View>
    </View>
    )
}

export default ListaMusicosAceitas;
