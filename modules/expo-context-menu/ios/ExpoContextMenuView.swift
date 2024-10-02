import ExpoModulesCore
import UIKit

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ExpoContextMenuView: ExpoView, UIContextMenuInteractionDelegate {
  let onPressMenuItem = EventDispatcher()

  private var interaction: UIContextMenuInteraction?
  private var button: UIButton?

  // Use the required initializer for ExpoView
  required init(appContext: AppContext? = nil) {
    self.triggerOnLongPress = false
    super.init(appContext: appContext)
    setupInteraction()
  }
  
  var triggerOnLongPress: Bool {
    didSet {
      setupInteraction()
    }
  }
  
  var menuConfig: [String: Any]? {
    didSet {
      setupInteraction()
    }
  }
  
  // This function sets up the interaction based on long press or tap
  private func setupInteraction() {
    if (interaction != nil) {
      self.removeInteraction(interaction!)
    }
    
    if (self.button != nil) {
      self.button?.removeFromSuperview()
      self.button = nil
    }
    
    if triggerOnLongPress {
      interaction = UIContextMenuInteraction(delegate: self)
      self.addInteraction(interaction!)
    } else {
      // Use UIButton for single tap context menu
      let button = UIButton(type: .system)
      
      // We're testing for iOS 14, but our target in SDK 52 will be 15 so this can be removed
      if #available(iOS 14.0, *) {
        button.showsMenuAsPrimaryAction = true
        button.menu = createMenu()
      } else {
        // Fallback on earlier versions
      }
      self.addSubview(button)
      button.translatesAutoresizingMaskIntoConstraints = false
      NSLayoutConstraint.activate([
        button.topAnchor.constraint(equalTo: self.topAnchor),
        button.bottomAnchor.constraint(equalTo: self.bottomAnchor),
        button.leadingAnchor.constraint(equalTo: self.leadingAnchor),
        button.trailingAnchor.constraint(equalTo: self.trailingAnchor)
      ])
      self.button = button
    }
  }

  // Delegate method for long-press context menu
  func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
    return UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
      return self.createMenu()
    }
  }

  // Helper function to create the UIMenu based on the menuConfig
  private func createMenu() -> UIMenu? {
    guard let items = menuConfig?["items"] as? [[String: Any]] else {
      return nil
    }

    var actions: [UIMenuElement] = []

    for item in items {
      guard let title = item["title"] as? String,
            let actionId = item["action"] as? String else { continue }

      let isDestructive = item["destructive"] as? Bool ?? false
      let attributes: UIMenuElement.Attributes = isDestructive ? [.destructive] : []

      var iconImage: UIImage? = nil
      if let iconName = item["icon"] as? String {
        // TODO: Add support for loading icons - should support ImageSource datatype :) 
      }

      let action = UIAction(title: title, image: iconImage, attributes: attributes) { [weak self] _ in
        self?.onPressMenuItem(["action": actionId])
      }
      actions.append(action)
    }

    return UIMenu(title: "", children: actions)
  }
}
