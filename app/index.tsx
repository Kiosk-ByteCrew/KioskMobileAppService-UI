import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Smart Kiosk</Text>
            <Text style={styles.subtitle}>
                Manage your orders, explore features, and stay updated!
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/past-orders")}
            >
                <Text style={styles.buttonText}>View Past Orders</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
