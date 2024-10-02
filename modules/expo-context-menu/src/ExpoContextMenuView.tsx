import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import { ExpoContextMenuViewProps } from "./ExpoContextMenu.types";
import { View } from "react-native";

const NativeView: React.ComponentType<ExpoContextMenuViewProps> =
  requireNativeViewManager("ExpoContextMenu");

export default function ContextMenuView(props: ExpoContextMenuViewProps) {
  return (
    <NativeView {...props}>
      <View pointerEvents="none">{props.children}</View>
    </NativeView>
  );
}
