import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabNavigation } from '../styles/styles-screens';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../styles/styles-colors';

// components
import SettingsScreen from '../screens/Settings-screen';
import QRCodeScreen from '../screens/QRCode-screen';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = ({ }) => {

    return (
        <Tab.Navigator
            style={tabNavigation.container}
            initialRouteName="qrcode"
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
            let iconName;
                if (route.name === 'qrcode') {
                    iconName = 'qrcode';
                } else {
                    iconName = 'cogs';
                }
                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={21} color={color} />;
                },
                tabBarActiveTintColor: Colors.accent,
                tabBarInactiveTintColor: Colors.darkLight,
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
        <Tab.Screen name="qrcode" component={QRCodeScreen} options={{ tabBarLabel: 'QR Code' }} />
        <Tab.Screen name="settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
    );
};

export default TabNavigator;
