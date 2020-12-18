import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './component/Main';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import CadDados from './pages/CadastroUsuario/CadDados';
import CadSenha from './pages/CadastroUsuario/CadSenha';
import CadEndereco from './pages/CadastroUsuario/CadEndereco';
import RotaPropostas from './pages/TabNavigator';
import Home from './pages/Home';
import Busca from './pages/Busca';
import Perfil from './pages/Perfil';
import RealizarProposta from './pages/NovaProposta';
import Avatar from './pages/UpdateAvatar';
import EditarPerfil from './pages/EditarPerfil';
import Avaliacao from './pages/Avaliacao';
import AvaliacaoHome from './pages/AvaliacaoHome';
import PropostaDetalhe from './pages/PropostaDetalhe';
import Eventos from './pages/Eventos';
import PropostaContraproposta from './pages/PropostaContraproposta';
import HistoricoProposta from './pages/HistoricoProposta';
import AvaliacaoDetalhe from './pages/AvaliacaoDetalhes';

import CadInstrumGenero from './pages/CadastroUsuario/CadInstrumGenero';
import * as PATHS from './util/paths';
import { MAP_PAGES_WITH_BAR } from './util/mapRouters';
import AvaliacaoDetalhes from './pages/AvaliacaoDetalhes';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={PATHS.PATH_LOGIN}
          component={Login}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_CADASTRO}
          component={CadastroUsuario}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name={PATHS.PATH_CADASTRO_DADOS}
          component={CadDados}
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name={PATHS.PATH_CADASTRO_SENHA}
          component={CadSenha}
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name={PATHS.PATH_CADASTRO_ENDERECO}
          component={CadEndereco}
          options={{ title: 'Cadastro' }}
        />

        <Stack.Screen
          name={PATHS.PATH_CADASTRO_INSTRU_GEN}
          component={CadInstrumGenero}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_HOME}
          component={Home}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_ROTA_PROPOSTA}
          component={RotaPropostas}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_BUSCA}
          component={Busca}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_PERFIL}
          component={Perfil}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_REALIZAR_PROPOSTA}
          component={RealizarProposta}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_AVATAR}
          component={Avatar}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_PERFIL_EDITAR}
          component={EditarPerfil}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_AVALIAR}
          component={Avaliacao}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_AVALIAR_HOME}
          component={AvaliacaoHome}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name={PATHS.PATH_PROPOSTA_DETALHE}
          component={PropostaDetalhe}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_EVENTOS}
          component={Eventos}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_PROPOSTA_CONTRAPROPOSTA}
          component={PropostaContraproposta}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_PROPOSTA_HISTORICO}
          component={HistoricoProposta}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name={PATHS.PATH_AVALIAR_DETALHE}
          component={AvaliacaoDetalhes}
          options={{ header: () => null }}
        />

        {/* {MAP_PAGES_WITH_BAR.map((PAGE) => (
          <Stack.Screen
            key={`ROUTE_${PAGE}`}
            name={PAGE}
            component={Main}
            options={{ header: () => null }}
          />
        ))} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
