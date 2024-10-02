import ExpoModulesCore

public class ExpoContextMenuModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoContextMenu")

    View(ExpoContextMenuView.self) {
      Events("onPressMenuItem")

      Prop("menuConfig") { (view: ExpoContextMenuView, menuConfig: [String: Any]) in
        view.menuConfig = menuConfig
      }

      Prop("triggerOnLongPress") { (view: ExpoContextMenuView, triggerOnLongPress: Bool) in
        view.triggerOnLongPress = triggerOnLongPress
      }      
    }
  }
}
