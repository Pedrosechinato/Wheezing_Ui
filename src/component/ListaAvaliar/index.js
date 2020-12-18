import React, {useState, useEffect} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as PATHS from '../../util/paths';

import styles from './styles';

function ListaAvaliar ({estabelecimento, pagamento, descricao , proposta, setRefresh, imagem, avaliacaoId}) { 
    const navigation = useNavigation(); 
    const [urlImage, setUrlImage] = useState('');

    const goPage = (page, params) => {
        navigation.navigate(page, params);
      }; 
    
    useEffect(() => {
        setUrlImage(imagem);
    },[imagem]);

    
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
                    <Text style={styles.subject}></Text>
                </View>
            </View>
            <Text style={styles.bio}>                                                                                </Text>
            <Text style={styles.bio}>{descricao}</Text>

            <View style={styles.footer}>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                     onPress={() => goPage(PATHS.PATH_AVALIAR, {dados: avaliacaoId})}
                     style={styles.favoriteButton}
                    >    
                        <Text style={styles.favoriteButtonText}>Avaliar</Text>                                     
                    </TouchableOpacity>

                </View>
               
            </View>
    </View>
    )
}

export default ListaAvaliar;
