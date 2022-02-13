import React from 'react';
import {
  SafeAreaView,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PersistStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Requests from './screens/Requests';
import Services from './screens/Services';
import Payments from './screens/Payments';
const totalWidth = Dimensions.get("screen").width;
const Tab = createMaterialTopTabNavigator();

const App = () => {

  const { persistor, store } = PersistStore()

  function TopNavigator() {

    return (
    <Tab.Navigator
      initialRouteName="Requests"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarIndicatorContainerStyle: {
        backgroundColor: '#0892d0'
      },
      tabBarLabelStyle: {
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: 15,
        height: "100%",
      },
      style: {
        elevation: 0,
        shadowColor: "#000000",
        shadowOpacity: 0,
        shadowRadius: 0
      },
      tabBarIndicatorStyle: {
        backgroundColor: '#fff',
        height: 3,
        borderRadius: 10,
        marginBottom: 14,
        width: totalWidth / 4,
        left: totalWidth / 22,
        justifyContent: 'center',
      }
    }}>  
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{ tabBarLabel: 'Requests' }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{ tabBarLabel: 'Services' }}
      />
      <Tab.Screen
        name="Payments"
        component={Payments}
        options={{ tabBarLabel: 'Payments' }}
      />
    </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <TopNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
