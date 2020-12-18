import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
       backgroundColor: '#FFF',
       borderWidth: 1,
       borderColor: '#e6e6f0',
       borderRadius: 8,
       marginBottom: 16,
       overflow: 'hidden' 
    },

    profile:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },

    avatar:{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee'
    },

    profileInfo:{
        marginLeft:16,
    },

    name:{
        color: '#32264d',
        fontSize: 20,
    },

    subject: {
        color: '#6a6180',
        fontSize: 12,
        marginTop: 4,
    },

    bio:{
        marginHorizontal: 24,
        fontSize: 14,
        lineHeight: 24,
        color: '#6a6180',
    },

    footer:{
        backgroundColor: '#fafafc',
        padding: 24,
        alignItems: 'center',
        marginTop: 24,
    },

    price: {
        color: '#6a6180',
        fontSize: 14,
    },

    priceValue:{
        color: '#6a6180',
        fontSize: 16,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },

    favoriteButton: {
        backgroundColor: '#e33d3d',
        width: 180,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },

    favoriteButtonText: {
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contactButton: {
        backgroundColor: '#04d361',
        flex: 1,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },

    contactButtonText:{
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    },

});

export default styles;

