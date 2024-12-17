import {Pressable, Text, View} from "react-native";
import {Link, Redirect, Tabs, useRootNavigationState} from "expo-router";
import {useUser} from "@clerk/clerk-expo";
import Home from "./home";
import Entypo from '@expo/vector-icons/Entypo';
import Colors from "../../constants/Colors";

export default function TabLayout() {

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.PRIMARY
        }}>
            <Tabs.Screen name="home" options={{
                headerShown: false,
                title: "Home",
                tabBarIcon: ({ color }) => (<Entypo name="home" size={24} color={color} />)
            }}/>
            <Tabs.Screen name="profile" options={{
                headerShown: false,
                title: "Profile",
                tabBarIcon: ({ color }) => (<Entypo name="user" size={24} color={color} />)
            }}/>
        </Tabs>
    );
}
