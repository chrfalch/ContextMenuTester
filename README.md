# expo-context-menu

This repo contains a simple demo implementation of context menus on iOS/Android for Expo using Expo modules with the correct Platform usage for each.

The context menu is a native feature that allows users to interact with the app by long pressing on a component. This is a common pattern in mobile apps and can be used to show additional options or actions that can be performed on the component. This implementation also supports handling taps instead of long presses.

## Example:

```tsx
// Create menu with options
const contextMenu = {
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
};
```

Usage of the context menu is as follows - the `ContextMenuView` will render as a regular view containing the child components, and the context menu will be shown when the user long-presses or taps on the view.

```tsx
<ContextMenuView
  style={{
    marginVertical: 50,
    backgroundColor: "lightgray",
  }}
  menuConfig={contextMenu}
  triggerOnLongPress
  onPressMenuItem={(event) => {
    const action = event.nativeEvent.action;
    Alert.alert(`${action} pressed`, `Do you really want to ${action}?`);
  }}
>
  <Text>Long-press me to see the context menu</Text>
</ContextMenuView>
```

## Further work

It would be super nice to support different icon types such as Expo Vector Icons on menus. This could be solved by adding support for `ImageSource` generation in Expo Vector Icons through the `getImageSource` / `getImageSourceSync` methods.
