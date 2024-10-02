package expo.modules.contextmenu

import android.content.Context
import android.graphics.Color
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.view.*
import android.widget.PopupMenu
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class ContextMenuView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    var menuConfig: Map<String, Any>? = null
    private val onPressMenuItem by EventDispatcher()

    init {
        setupGesture()
    }

    var triggerOnLongPress: Boolean = false
        set(value) {
            field = value
            setupGesture()
        }

    private fun setupGesture() {
        this.setOnClickListener(null)
        this.setOnLongClickListener(null)
        if (triggerOnLongPress) {
            this.setOnLongClickListener {
                showMenu()
                true
            }

        } else {
            this.setOnClickListener {
                showMenu()
            }
        }
    }

    private fun showMenu() {
        val popupMenu = PopupMenu(context, this)
        val menu = popupMenu.menu

        val items = menuConfig?.get("items") as? List<Map<String, Any>> ?: return

        for ((index, item) in items.withIndex()) {
            val title = item["title"] as? String ?: continue
            val actionId = item["action"] as? String ?: continue
            val menuItem = menu.add(Menu.NONE, index, index, title)

            val isDestructive = item["destructive"] as? Boolean ?: false
            if (isDestructive) {
                // Set text color to red or apply destructive style
                val spannableTitle = SpannableString(menuItem.title)
                spannableTitle.setSpan(ForegroundColorSpan(Color.RED), 0, spannableTitle.length, 0) // Set text color to red
                menuItem.title = spannableTitle
            }

            val iconName = item["icon"] as? String
            if (iconName != null) {
                // TODO: Add support for loading icons - should support ImageSource datatype :)
            }

            menuItem.setOnMenuItemClickListener {
                onPressMenuItem(mapOf("action" to actionId))
                true
            }
        }

        popupMenu.show()
    }
}