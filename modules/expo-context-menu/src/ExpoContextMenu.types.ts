import {
  ImageSourcePropType,
  NativeSyntheticEvent,
  ViewProps,
} from "react-native";

export interface MenuItem {
  title: string;
  action: string;
  icon?: string | ImageSourcePropType | undefined;
  destructive?: boolean;
}

export interface MenuConfig {
  items: MenuItem[];
}

export type MenuItemSelectedEvent = NativeSyntheticEvent<{ action: string }>;

export interface ExpoContextMenuViewProps extends ViewProps {
  menuConfig: MenuConfig;
  preview?: React.ReactNode; // iOS only
  triggerOnLongPress?: boolean;
  children: React.ReactNode;
  onPressMenuItem?: (event: MenuItemSelectedEvent) => void;
}
