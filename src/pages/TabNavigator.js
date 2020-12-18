import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Propostas from '../pages/Proposta';
import PropostasAceitas from '../pages/PropostasAceitas';
import PropostasRejeitadas from '../pages/PropostasRejeitadas';

const { Navigator, Screen} = createBottomTabNavigator();

function TabNavigator(){
    return(
        <Navigator
        tabBarOptions={{
            style:{
                elevation:0,
                shadowOpacity:0,
                height: 64,
            },
            tabStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            iconStyle: {
                flex:0,
                width:20,
                height:20,
            },
            labelStyle:{
                fontSize: 13,
                marginLeft: 16
            },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1bccc',
            activeTintColor: '#32264d'

        }}
        >
            <Screen 
                name="Propostas" 
                component={Propostas}
                options= {{
                    tabBarLabel:'Pendentes',
                    tabBarIcon: ({ color, size, focused}) => {
                        return(
                            <AntDesign name="notification" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }} 
            />

            <Screen 
                name="PropostasAceitas" 
                component={PropostasAceitas} 
                options= {{
                    tabBarLabel:'Aceitas',
                    tabBarIcon: ({ color, size, focused}) => {
                        return(
                            <Ionicons name="ios-checkmark-circle" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />
            <Screen 
                name="PropostasRejeitadas" 
                component={PropostasRejeitadas}
                options= {{
                    tabBarLabel:'Historicos',
                    tabBarIcon: ({ color, size, focused}) => {
                        return(
                            <Ionicons name="ios-close-circle" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default TabNavigator;