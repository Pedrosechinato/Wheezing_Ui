import colors from './colors';
import { lighten } from 'polished';

function setStyle() {
  return {
    ...colors,

    main: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    container: {
      flexDirection: 'row',
    },

    main2: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#E6E4D8',
      padding: 20,
    },

    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    button: {
      paddingHorizontal: 0,
      marginVertical: 20,
      shadowColor: colors.c1.color,
      borderRadius: 4,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: 40,
    },

    buttonText: {
      color: '#fff',
      textTransform: 'uppercase',
    },

    welcome: {
      fontSize: 25,
      color: '#5B5A5A',
      letterSpacing: 6,
      textAlign: 'center',
    },

    inputGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    textInput: {
      flex: 1,
      padding: 10,
      borderColor: colors.bc.color,
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: 4,
      backgroundColor: '#F5F6F7',
    },
    backImage: {
      width: 600,
      height: 800,
      resizeMode: 'cover',
      marginTop: 1,
      borderColor: '#5B5A5A',
    },

    containerCard: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },

    card: {
      backgroundColor: lighten(0.4, colors.c2.color),
      borderWidth: 2,
      marginRight: 4,
      marginVertical: 4,
      padding: 4,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderColor: colors.c3.color,
      color: colors.c3.color,
    },

    card2: {
      backgroundColor: lighten(0.4, colors.c3.color),
    },

    checkBox: { flexDirection: 'row' },
    checkText: { marginTop: 5 },

    cadSteps: {
      alignItems: 'center',
      marginBottom: 20,
    },
  };
}

export default setStyle;
