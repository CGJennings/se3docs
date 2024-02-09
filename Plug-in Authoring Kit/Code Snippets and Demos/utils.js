/**
 * utils.js
 *
 * Miscellaneous utility functions.
 */

/**
 * Low-level utility functions for manipulating the user interface.
 */
const UIUtils = {};

/**
 * Returns the child component of parent with the specified
 * name (or parent itself if it matches). If no
 * child component matches the name, returns null.
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
UIUtils.findComponentByName = (function() {
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
})();





/**
 * Prints the tree of components with the root parent to the console.
 * For each component, the component's name is printed (or <?>
 * if it has no name), followed by a colon and the component's class name.
 *
 * Example:
 * 
 * UIUtils.printTree( Editor.contentPane );
 *
 * parent : the root of the component tree to print
 * prints a component tree
 */
UIUtils.printTree = (function() {
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
})();





/**
 * Given a component, returns the window that the component is contained in.
 * This may be null if the component has not been added to a window.
 *
 * c : the component to find the window of
 *
 * returns the window that contains the component
 */
UIUtils.findWindow = function findWindow(c) {
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
};

/**
 * Before and After Functions
 * Before and after functions are functions that can be wrapped around an existing
 * function and will be called before or after the function that they wrap.
 * A before function is passed a copy of the original arguments and it returns
 * the actual arguments to be passed to the wrapped function.
 * An after function is passed the return value from the wrapped function and
 * it returns the apparent return value that will be returned to the caller.
 * 
 * To write a before or after function, define a function with the appropriate
 * signature, and install it using the appropriate AOP function:
 *
 * beforeFunction(args, callee, calleeThis, functionName)
 * args : the arguments passed to the function
 * callee : the wrapped function, which will be called when this function returns
 * calleeThis : the this object for the wrapped function
 * functionName : the name of the member function
 *
 * returns the arguments to be passed to the callee when it is called\
 *
 * afterFunction(returnValue, args, callee, calleeThis, functionName)
 * returnValue : the return value from the wrapped function (which was just called)
 * args : the arguments passed to the function
 * callee : the wrapped function
 * calleeThis : the this object for the wrapped function
 * functionName : the name of the member function
 *
 * returns the return value for the member function call
 */
const AOP = {};

/**
 * AOP.addBefore( [object], functionName, beforeFunction )
 * Add a before function to a member function, which will be called just
 * before the affected function whenever that function is called.
 *
 * object : the object that contains the function (default is the global object)
 * functionName : the name of the member function
 * beforeFunction : the function to be called before the affected function
 */
AOP.addBefore = function addBefore(object, functionName, beforeFunction) {
    if (arguments.length == 2) {
        AOP.addBefore(null, arguments[0], arguments[1]);
        return;
    }
    if (typeof functionName == "function")
        throw new Error("pass the function's name, not the function itself");
    if (!object) object = self;
    let innerFunc = object[functionName];
    if (innerFunc === undefined)
        throw new Error("no function with this name in object: " + functionName);
    let outerFunc = function before_function() {
        return innerFunc.apply(this, beforeFunction(arguments, innerFunc, this, functionName));
    };
    outerFunc._innerFunction = innerFunc;
    object[functionName] = outerFunc;
};

/**
 * AOP.addAfter( [object], functionName, afterFunction ) [static]
 * Add an after function to a member function, which will be called just
 * after the affected function whenever that function is called.
 *
 * object : the object that contains the function (default is the global object)
 * functionName : the name of the member function
 * afterFunction : the function to be called after the affected function
 */
AOP.addAfter = function addAfter(object, functionName, afterFunction) {
    if (arguments.length == 2) {
        AOP.addAfter(null, arguments[0], arguments[1]);
        return;
    }
    if (typeof functionName == "function")
        throw new Error("pass the function's name, not the function itself");
    if (!object) object = self;
    let innerFunc = object[functionName];
    if (innerFunc === undefined)
        throw new Error("no function with this name in object: " + functionName);
    let outerFunc = function after_function() {
        let retVal = innerFunc.apply(this, arguments);
        return afterFunction(retVal, arguments, innerFunc, this, functionName);
    };
    outerFunc._innerFunction = innerFunc;
    object[functionName] = outerFunc;
};

/**
 * AOP.removeAll( object, functionName ) [static]
 * Remove all before and after functions that have been added to a member function.
 *
 * object : the object that contains the function (default is the global object)
 * functionName : the name of the member function
 */
AOP.removeAll = function removeAll(object, functionName) {
    if (arguments.length == 1) {
        AOP.removeBeforeAfter(null, arguments[0]);
        return;
    }
    if (typeof functionName == "function")
        throw new Error("pass the function's name, not the function itself");
    if (!object) object = self;
    let outerFunc = object[functionName];
    if (outerFunc === undefined)
        throw new Error("no function with this name in object: " + functionName);
    let innerFunc = outerFunc["_innerFunction"];

    // there are no more before or afters set on the function
    if (!innerFunc)
        return;

    object[functionName] = innerFunc;

    // recursively check the restored function to remove all levels of before/after
    AOP.removeBeforeAfter(object, functionName, remove);
};