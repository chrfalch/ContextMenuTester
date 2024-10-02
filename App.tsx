import React, { useMemo } from "react";
import { View, Text, Alert } from "react-native";
import { ContextMenuView } from "./modules/expo-context-menu/";
import { Ionicons } from "expo-vector-icons/";
import { MenuItemSelectedEvent } from "./modules/expo-context-menu";

function App() {
  const contextMenu = useMemo(
    () => ({
      items: [
        { title: "Edit", action: "edit", icon: "edit_icon" },
        {
          title: "Delete",
          action: "delete",
          // This is where we could use images loaded from vector icons or
          // use images like this:
          // icon: require("./path/to/image.png"),
          // icon: FontAwesome.getImageSourceSync("trash", 24),
          icon: "delete_icon",
          destructive: true,
        },
      ],
    }),
    []
  );

  const handleMenuItemPress = (event: MenuItemSelectedEvent) => {
    const action = event.nativeEvent.action;
    Alert.alert(`${action} pressed`, `Do you really want to ${action}?`);
  };

  return (
    <View style={{ padding: 14, marginTop: 60 }}>
      <Text>
        <Ionicons name="md-checkmark-circle" size={32} color="green" /> Context
        menu demo
      </Text>

      <ContextMenuView
        style={{
          marginVertical: 50,
          backgroundColor: "lightgray",
        }}
        menuConfig={contextMenu}
        triggerOnLongPress
        onPressMenuItem={handleMenuItemPress}
      >
        <Text>Long-press me to see the context menu</Text>
      </ContextMenuView>

      <ContextMenuView
        style={{ marginVertical: 50 }}
        menuConfig={contextMenu}
        onPressMenuItem={handleMenuItemPress}
      >
        <Text>Tap me to see the context menu</Text>
      </ContextMenuView>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ContextMenuView
          menuConfig={contextMenu}
          onPressMenuItem={handleMenuItemPress}
        >
          <Ionicons name="md-eye" size={32} color="blue" />
        </ContextMenuView>

        <ContextMenuView
          menuConfig={contextMenu}
          onPressMenuItem={handleMenuItemPress}
        >
          <Ionicons name="md-alert" size={32} color="blue" />
        </ContextMenuView>
      </View>
      <View
        style={{
          marginTop: 50,
          width: 100,
          height: 100,
          backgroundColor: "red",
        }}
      />
      <Text>Some text</Text>
    </View>
  );
}

export default App;
