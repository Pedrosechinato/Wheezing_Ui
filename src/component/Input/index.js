import React from 'react';
import { View, TextInput, Text } from 'react-native';

import styles from './styles';

function Input() {
    return(
    
    <View style={styles.container}>
        <Text style={styles.label}>Testando</Text>
            <TextInput 
            style={styles.input}
            placeholder='titulo' 
            />             
    </View>
    )
}

export default Input;
