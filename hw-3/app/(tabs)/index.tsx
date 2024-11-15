import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Button, View, Text} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeScreen = () => {
    return (
        <View>
            <Text>Добро пожаловать на Главную страницу!</Text>
        </View>
    );
};

const HomeAboutScreen = () => {
    return (
        <View>
            <Text>Добро пожаловать на страницу "О приложении"!</Text>
        </View>
    );
};

const NewsScreen = () => {
    return (
        <View>
            <Text>Добро пожаловать на страницу новостей!</Text>
        </View>
    );
};

const ChatScreen = () => {
    return (
        <View>
            <Text>Добро пожаловать на страницу чата!</Text>
        </View>
    );
};

const SettingsScreen = () => {
    return (
        <View>
            <Text>Добро пожаловать на страницу настроек!</Text>
        </View>
    );
};

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'HomeStack') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'News') {
                    iconName = focused ? 'newspaper' : 'newspaper-outline';
                } else if (route.name === 'Chat') {
                    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
            >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="News" component={NewsScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerTitle: () => <Ionicons name="home" size={24} color="black" />,
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('HomeAbout')}
                            title="О приложении"
                            color="#000"
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="HomeAbout"
                component={HomeAboutScreen}
                options={{ title: 'О приложении' }}
            />
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Tab'} component={TabNavigation} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}