import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from './TopTabBar';
import OuterTab from './OuterTab';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import StreamScreen from '../screens/StreamScreen';
import EditScreen from '../screens/EditScreen';
import { Text } from 'react-native';

const INITIAL_ROUTE_NAME = 'Home';

const TopTabNav = createMaterialTopTabNavigator();

export default function TopTabNavigation({ navigation, route }) {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    navigation.setOptions({ headerShown: false });

    return (
        <TopTabNav.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                style: { height: 70, paddingTop: 16 }
            }}
            // style={{ marginTop: 50}}
            swipeEnabled={false}
        >
            <TopTabNav.Screen
                name="Edit"
                component={EditScreen}
                options={{
                    headerShown: false,
                    title: "Edit",
                    tabBarIcon: ({ focused }) => <OuterTab focused={focused} name="md-person" />,
                }}
            />
            <TopTabNav.Screen
                name="Stream"
                component={StreamScreen}
                options={{
                    headerShown: false,
                    title: 'Stream',
                    tabBarIcon: ({ focused }) => <OuterTab focused={focused} name="md-search" />,
                }}
            />
            <TopTabNav.Screen
                name="Discover"
                component={HomeScreen}
                options={{
                    title: "Discover",
                    tabBarIcon: ({ focused }) => <OuterTab focused={focused} name="md-heart" />,
                }}
            />
            <TopTabNav.Screen
                name="Chat"
                component={LinksScreen}
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ focused }) => <OuterTab focused={focused} name="ios-chatbubbles"/>,
                }}
            />
        </TopTabNav.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'How to get started';
        case 'Links':
            return 'Links to learn more';
        case 'Stream':
            return 'Stream';
    }
}
