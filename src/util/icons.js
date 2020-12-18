import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as PATHS from './paths';

function getIcon({ name, size = 30, color }) {
  const nameIcon = (name) => {
    switch (name) {
      case PATHS.PATH_HOME:
        return 'home';
      case PATHS.PATH_BUSCA:
        return 'search';
      case PATHS.PATH_MENU:
        return 'bars';
      case PATHS.PATH_PROPOSTA:
        return 'comment';
      case PATHS.PATH_PERFIL_EDITAR:
        return 'user-tie';
      case PATHS.PATH_EVENTOS:
        return 'book';
      case PATHS.PATH_AVATAR:
          return 'camera';
     case PATHS.PATH_AVALIAR:
          return 'star';
     case PATHS.PATH_LOGIN:
            return 'power-off';
    }
  };

  return <Icon name={nameIcon(name)} size={size} color={color} />;
}

export default getIcon;
