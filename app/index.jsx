import { Text, View } from "react-native";
import { Redirect, useRootNavigationState } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function Index() {
    const { user, isLoaded } = useUser();
    const navigationState = useRootNavigationState();

    // Ensure navigation state and user data are loaded
    if (!navigationState?.key || !isLoaded) {
        return null; // Render nothing until ready
    }

    // Redirect based on authentication status
    if (user) {
        return <Redirect href="/(tabs)/home" />;
    } else {
        return <Redirect href="/login" />;
    }
}
