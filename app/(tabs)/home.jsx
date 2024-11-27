import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Alert,
} from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { useCameraPermissions } from "expo-camera";

export default function Home() {
    const { signOut } = useClerk();
    const { user } = useUser();
    const router = useRouter();

    const [permission, requestPermission] = useCameraPermissions();
    const isPermissionGranted = Boolean(permission?.granted);

    useEffect(() => {
        if (permission?.status === "denied") {
            Alert.alert(
                "Permission denied",
                "Camera permissions are required to scan QR codes. Please enable them in settings."
            );
        }
    }, [permission]);

    const handleScanQR = async () => {
        router.push("/camera");
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace("/login");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    return (
        <ImageBackground
            source={require("./../../assets/images/background_mobile.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
            imageStyle={{ opacity: 0.2 }}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>
                    Welcome {user?.firstName || "User"}!
                </Text>
                <Text style={styles.headerText}>
                    Home screen for Mobile app for smart kiosk.
                </Text>
                <Pressable onPress={handleScanQR} style={styles.scanButton}>
                    <Text style={styles.scanButtonText}>Scan QR</Text>
                </Pressable>
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#000000",
    },
    headerText: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: "center",
        color: "#000000",
    },
    scanButton: {
        padding: 12,
        backgroundColor: "#007AFF",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        width: 200,
    },
    scanButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    logoutButton: {
        padding: 12,
        backgroundColor: "#FF3B30",
        borderRadius: 8,
        alignItems: "center",
        width: 200,
    },
    logoutButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});
