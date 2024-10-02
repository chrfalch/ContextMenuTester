package expo.modules.contextmenu

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoContextMenuModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoContextMenu")

    View(ContextMenuView::class) {
      Events("onPressMenuItem")

      Prop("menuConfig") { view: ContextMenuView, menuConfig: Map<String, Any> ->
        view.menuConfig = menuConfig
      }

      Prop("triggerOnLongPress") { view: ContextMenuView, triggerOnLongPress: Boolean ->
        view.triggerOnLongPress = triggerOnLongPress
      }
    }
  }
}
