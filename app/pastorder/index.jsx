import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Optional: Use Material Icons for extra visual appeal

const mockOrders = [
    { id: "1", item: "Coffee", price: "$3", date: "2024-11-25" },
    { id: "2", item: "Sandwich", price: "$5", date: "2024-11-26" },
    { id: "3", item: "Smoothie", price: "$4", date: "2024-11-27" },
];

export default function PastOrders() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Past Orders</Text>
            <FlatList
                data={mockOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <View style={styles.orderInfo}>
                            <Text style={styles.itemText}>Item: <Text style={styles.boldText}>{item.item}</Text></Text>
                            <Text style={styles.itemText}>Price: <Text style={styles.boldText}>{item.price}</Text></Text>
                            <Text style={styles.itemText}>Date: <Text style={styles.boldText}>{item.date}</Text></Text>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <MaterialIcons name="info" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f8fa",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    orderItem: {
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },
    orderInfo: {
        flex: 1,
        paddingRight: 10,
    },
    itemText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    boldText: {
        fontWeight: "600",
        color: "#333",
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: "#6200ea",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
});
