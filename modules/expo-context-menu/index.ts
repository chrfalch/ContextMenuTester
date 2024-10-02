// Import the native module. On web, it will be resolved to ExpoContextMenu.web.ts
// and on native platforms to ExpoContextMenu.ts
import ExpoContextMenuView from "./src/ExpoContextMenuView";
import {
  ExpoContextMenuViewProps,
  MenuItemSelectedEvent,
} from "./src/ExpoContextMenu.types";

export {
  ExpoContextMenuView as ContextMenuView,
  MenuItemSelectedEvent,
  ExpoContextMenuViewProps,
};
