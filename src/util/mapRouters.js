import * as PATHS from './paths';
const MAP_HOME = [
  { route: PATHS.PATH_BUSCA, title: 'Busca' },
  { route: PATHS.PATH_HOME, title: 'Home' },
  { route: PATHS.PATH_PROPOSTA, title: 'Propostas' },
  { route: PATHS.PATH_PERFIL, title: 'Perfil' },
  { route: PATHS.PATH_EVENTOS, title: 'Eventos' },
];

const MAP_MENU_BAR = [
  { route: PATHS.PATH_BUSCA, title: 'Busca' },
  { route: PATHS.PATH_HOME, title: 'Home' },
  { route: PATHS.PATH_MENU, title: 'Menu' },
];

const MAP_MENU = [
  { route: PATHS.PATH_MINHA_CONTA, title: 'Minha conta' },
  { route: PATHS.PATH_PERFIL_EDITAR, title: 'Editar Perfil' },
  { route: PATHS.PATH_PROPOSTA, title: 'Proposta' },
  { route: PATHS.PATH_ROTA_PROPOSTA, title: 'Rota'},
  { route: PATHS.PATH_HOME, title: 'Home' },
  { route: PATHS.PATH_BUSCA, title: 'Busca' },
  { route: PATHS.PATH_AVATAR, title: 'Editar Avatar'},
  { route: PATHS.PATH_LOGIN, title: 'Sair' },
];

const MAP_PAGES_WITH_BAR = [
  PATHS.PATH_HOME,
  PATHS.PATH_PERFIL,
  PATHS.PATH_PERFIL_EDITAR,
  PATHS.PATH_PROPOSTA,
  PATHS.PATH_EVENTOS,
  PATHS.PATH_BUSCA,
  PATHS.PATH_AVALIAR,
  PATHS.PATH_MENU,
  PATHS.PATH_MINHA_CONTA,
  PATHS.PATH_AVATAR,
  PATHS.PATH_REALIZAR_PROPOSTA,
  PATHS.PATH_ROTA_PROPOSTA,
];

export { MAP_HOME, MAP_MENU_BAR, MAP_MENU, MAP_PAGES_WITH_BAR };
