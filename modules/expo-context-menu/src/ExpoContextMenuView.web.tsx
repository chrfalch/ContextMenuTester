import * as React from "react";

import { ExpoContextMenuViewProps } from "./ExpoContextMenu.types";

export default function ExpoContextMenuView(props: ExpoContextMenuViewProps) {
  return (
    <div>
      <span>{props.children}</span>
    </div>
  );
}
