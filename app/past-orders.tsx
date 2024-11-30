import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

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
                        <Text style={styles.itemText}>Item: {item.item}</Text>
                        <Text style={styles.itemText}>Price: {item.price}</Text>
                        <Text style={styles.itemText}>Date: {item.date}</Text>
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
        backgroundColor: "#f9f9f9",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    orderItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
    },
});
