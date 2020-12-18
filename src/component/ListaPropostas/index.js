import React, {useState, useEffect} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function ListaPropostas ({estabelecimento, pagamento, descricao , proposta, setRefresh, imagem}) {  
    const [urlImage, setUrlImage] = useState('');
    
    useEffect(() => {
        setUrlImage(`http://192.168.15.12:3333/files/${imagem}`);
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
                    <Text style={styles.subject}>Campinas-SP</Text>
                </View>
            </View>

            <Text style={styles.bio}>{descricao}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R${pagamento}</Text>
                </Text>
               
            </View>
    </View>
    )
}

export default ListaPropostas;
