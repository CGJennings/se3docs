/**
 * ui-hacking.js
 *
 * Functions for hacking the Strange Eons user interface.
 */

/**
 * Low-level utility functions for manipulating the user interface.
 */
const UiHacks = {
    /**
     * Given a component, returns the window that the component is contained in.
     * This may be null if the component has not been added to a window.
     *
     * c : the component to find the window of
     *
     * returns the window that contains the component
     */
    findWindow(c) {
        if (c != null && !(c instanceof java.awt.Component)) {
            throw new Error("not a component");
        }
        do {
            if (c == null) {
                return null;
            } else if (c instanceof java.awt.Window) {
                return c;
            } else {
                c = c.getParent();
            }
        } while (true);
    },

    /**
     * Returns the child component of parent with the specified
     * name (or parent itself if it matches). If no
     * child component matches the name, returns null.
     * 
     * Warning: component names are not guaranteed to remain
     * fixed from version to version. Use at your own risk.
     *
     * Example:
     * 
     * let parent = UIUtils.findComponentByName( Eons.window, "fileMenu" );
     * let menuItem = new swing.JMenuItem( "Now You See Me" );
     * menuItem.toolTipText = "Choose me to remove me from the menu";
     * menuItem.addActionListener( function( event ) {
     *     parent.remove( menuItem );
     * });
     * parent.add( menuItem );
     * 
     *
     * parent : the root of the component tree to search
     * name : the name to search for
     *
     * returns the subcomponent of parent with the specified name, or null
     */
    findComponentByName: (() => {
        function _findComponentByName(parent, name) {
            if (parent.name === name)
                return parent;
            for (let i = 0; i < parent.componentCount; ++i) {
                let res = _findComponentByName(parent.getComponent(i), name);
                if (res != null)
                    return res;
            }
            if (parent instanceof swing.JMenu) {
                for (let i = 0; i < parent.itemCount; ++i) {
                    let item = parent.getItem(i);
                    if (item == null)
                        continue;
                    res = _findComponentByName(item, name);
                    if (res != null)
                        return res;
                }
            }
            return null;
        }
    
        return function findComponentByName(parent, name) {
            if (!parent)
                throw new Error("missing parent");
            if (!name)
                throw new Error("missing name");
            if (!(parent instanceof java.awt.Component))
                throw new Error("parent is not a Component");
            return _findComponentByName(parent, name);
        };
    })(),

    /**
     * Prints the tree of components with the root parent to the console.
     * For each component, the component's name is printed (or <?>
     * if it has no name), followed by a colon and the component's class name.
     * 
     * Warning: component names are not guaranteed to remain
     * fixed from version to version. Use at your own risk.     
     *
     * Example:
     * 
     * UIUtils.printTree( Editor.contentPane );
     *
     * parent : the root of the component tree to print
     * prints a component tree
     */
    printTree: (() => {
        function _printTree(buff, parent, level) {
            for (let i = 0; i < level; ++i)
                buff.append("  ");
            buff.append(parent.name == null ? "<?>" : parent.name);
            let klass = parent.getClass().canonicalName;
            if (klass == null)
                klass = parent.getClass().name;
            if (klass.startsWith("javax.swing."))
                klass = klass.substring(12);
            buff.append(": ").append(klass).append("\n");
            for (let i = 0; i < parent.componentCount; ++i) {
                _printTree(buff, parent.getComponent(i), level + 1);
            }
            if (parent instanceof swing.JMenu) {
                for (let i = 0; i < parent.itemCount; ++i) {
                    let item = parent.getItem(i);
                    if (item == null)
                        continue;
                    _printTree(buff, item, level + 1);
                }
            }
        }
    
        return function printTree(parent) {
            if (!parent)
                throw new Error("missing parent");
            if (!(parent instanceof java.awt.Component))
                throw new Error("parent is not a Component");
            // it is much faster to buffer up long outputs and only call print() once
            let buff = new java.lang.StringBuilder();
            _printTree(buff, parent, 0);
            print(buff.toString());
        };
    })(),
};