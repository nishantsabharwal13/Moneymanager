import React from 'react';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation';
import paidBills from '../screens/paidBills';
import unPaidBills from '../screens/unpaidBill';
import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const Unpaid = { screen: unPaidBills };

Unpaid.navigationOptions = {
  tabBarLabel: 'Unpaid',
  labelStyle: {
    margin: 0
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

Unpaid.path = '';

const Paid = { screen: paidBills };

Paid.navigationOptions = {
  tabBarLabel: 'Paid',
  labelStyle: {
    margin: 0
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

Paid.path = '';

const tabNavigator = createBottomTabNavigator({
  Unpaid,
  Paid,
}, {
  lazy: false
});


export default createAppContainer(
  createStackNavigator({
    Main: HomeScreen,
    List: {
      screen: tabNavigator,
      navigationOptions: {
        title: 'Your Bills',
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#e3e3e3',
        },
        headerTintColor: '#606070',
      }
    }
  })
);
