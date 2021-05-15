# Java API

Strange Eons exposes functionality primarily through its Java API. This API is used by all compiled plug-ins, and is used directly and/or indirectly by scripted plug-ins.

[Java API documentation](assets/javadoc/index.html)

## Overview

As described in more detail below, Java code is organized into *packages*. This section lists some of the more commonly used packages and their purpose.

[`gamedata`](assets/javadoc/gamedata/package-summary.html)  
Classes used to register [new games and extensions](dm-register-game.md), [game components](dm-res-classmap.md), etc.

[`resources`](assets/javadoc/resources/package-summary.html)  
Classes that supporting the loading and management of common [resources](dm-resources.md).

[`ca.cgjennings.apps.arkham.*`](assets/javadoc/ca/cgjennings/apps/arkham/package-summary.html)  
This package and its subpackages contain the main application and related code.

[`ca.cgjennings.apps.arkham.component`](assets/javadoc/ca/cgjennings/apps/arkham/component/package-summary.html)  
Base classes related to defining game components.

[`ca.cgjennings.apps.arkham.sheet`](assets/javadoc/ca/cgjennings/apps/arkham/sheet/package-summary.html)  
Classes related to the *sheets* used to draw faces of game components.

[`ca.cgjennings.apps.arkham.editors`](assets/javadoc/ca/cgjennings/apps/arkham/editors/package-summary.html)  
Classes used to define the various types of editors that make up document tabs, except [decks](assets/javadoc/ca/cgjennings/apps/arkham/deck/package-summary.html).

[`ca.cgjennings.apps.arkham.diy`](assets/javadoc/ca/cgjennings/apps/arkham/diy/package-summary.html)  
Classes that implement the Java side of [scripted components](dm-diy.md).

[`ca.cgjennings.apps.arkham.plugins`](assets/javadoc/ca/cgjennings/apps/arkham/plugins/package-summary.html)  
Classes used to implement the plug-in system.

[`ca.cgjennings.apps.arkham.project`](assets/javadoc/ca/cgjennings/apps/arkham/project/package-summary.html)  
Classes used to implement and extend the [project system](um-proj-intro.md).

[`ca.cgjennings.graphics.*`](assets/javadoc/ca/cgjennings/graphics/package-summary.html)  
Classes that extend Java's graphics capabilities with new features.

[`ca.cgjennings.i18n`](assets/javadoc/ca/cgjennings/i18n/package-summary.html)   
Support classes for translation and localization.

[`ca.cgjennings.layout`](assets/javadoc/ca/cgjennings/layout/package-summary.html)  
Classes related to text layout (markup boxes).

[`ca.cgjennings.ui.*`](assets/javadoc/ca/cgjennings/ui/package-summary.html)   
Classes for custom user interface components and related utilities.

## Developing a compiled plug-in

Develop a plug-in using Java is a matter of setting up your IDE appropriately. The exact steps needed to set up a given IDE vary, but the process is generally straightforward. Here is what's involved:

1. Create a new project in your IDE.
2. Set the source and binary formats to something suitable (e.g., JDK 8).
3. Set the default encoding to UTF-8.
4. Add `strange-eons.jar` (from the Strange Eons install folder) as a JAR library for the project.
5. Set the build options to produce a JAR file of your project. This will be your plug-in bundle. Note the name and location of the file.
6. Set the run options to start `strangeeons` (in the default package) as the main class. In the VM options, enter a suitable memory limit such as `-Xmx2g`.
7. Modify the build script for your project so that it copies the JAR file produced after building to your plug-in folder. For example, for an Ant-based project on Windows you might add something like the following (just before `</project>`):

```xml
<property environment="env"/>
<target name="-post-jar"> 
    <copy file="${dist.dir}/myplugin.jar" tofile="${env.USERPROFILE}/.strange-eons-plugins/myplugin.seext"/>
</target>
```

> For other platforms, replace `USERPROFILE` with `HOME`. Ensure the file extension of the copied file is appropriate for the plug-in type (`.seext`, `.seplugin`, etc.).

8. Create a [root file](dm-eons-plugin.md). One way is to create an empty plug-in in a project and edit the root file there, then copy it to your project folder. (You could also make your development folder double as a project and edit the root file directly.) Enter the intended fully qualified class name for your main plug-in class. Make sure the root file also has a catalogue ID.
9. Set up packages. You will want a unique package name starting in `resources` for your [images and other resources](dm-resources.md). Also add the package for your plug-in class.
10. Add a new source file for your class, and make the resulting class extend `AbstractPlugin`. Using your IDEs autocompletion or import fixing tools should add the correct package import if you have correctly added Strange Eons as a library.
11. Use your IDEs "override method" tool to add skeleton code for the plug-in methods you want to override.
12. Fill in just enough code that you can build the project, then you can test your build and run settings. If the IDE successfully builds the plug-in it should create a JAR of the result, copy that to your plug-in folder (with appropriate extension), and start Strange Eons (which will then load your copied JAR as if it were any other plug-in).

## Accessing the Java API from script code

Despite having similar names and some common syntax, Java and JavaScript are different languages. Calling into the Java API is usually a smooth experience, but when there is friction between the two languages the result can be confusing. This section will help you code more efficiently and solve some of the most common issues you may encounter.

### A note on terminology

When reading about Java, you will often encounter the word *method*, which is not used so much with JavaScript. A method is a particular kind of function, one that is associated with an object. For example, in JavaScript a String is a kind of object. Every string object has some functions tied to it that you can call, and they act specifically on that string. For example, strings have a `toUpperCase` function:

```js
var g = "gold";
// returns a string that is the upper case version of the string it is called on
var G = g.toUpperCase();
// prints the string returned from that function, that is, "GOLD"
println(G);
```

Notice that you do not have to tell `toUpperCase` what string it should affect. Because it is actually part of the string assigned to the variable `g`, it knows that `g` is the string it should convert. It is as if the function `toUpperCase` gets passed `g` as a secret argument. (In fact, that is exactly what happens: the argument is called `this`.) Functions that are bound to a particular object in this way are called *methods*.

The reason you tend to see *method* and not *function* when reading about Java is that in Java every function is part of a class (a kind of template for creating an object). Java *does* have a kind of function that doesn't have a secret `this` parameter, but it is still tied to a specific class; for this reason it is called a *static method*.

### Packages and classes

Java code is organized into a hierarchy (tree) of packages and classes. Every bit of Java code is part of a class, and classes are organized into groups called packages. As a result, every class has a long "full name" that includes all of its packages in order from the top of the hierarchy and ends in the class name.  For example, the class that represents the main application has the full name [`ca.cgjennings.apps.arkham.StrangeEons`](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEons.html). (When you use the `Eons` variable in a script, it is actually a reference to the one and only instance of this class.)

> This works exactly like the full path of a file on your computer. Just like the path `D:\stuff\pictures\vacation07.jpg` tells you that you can find that file by starting on the "D" drive, opening a folder named "stuff", open a folder in that called "pictures", and find a file named "vacation07.jpg", the fully qualified class name above tells you to start in the "ca" package, in which you will find the package "cgjennings", in which you will find package "apps", then package "arkham", and finally, in that package, the class "Strange Eons".

The JavaScript language doesn't know anything about packages. So in order to give you access to Java's class hierarchy, every script includes a special predefined variable named `Packages`. This variable points to the root of the Java package tree. So to refer to the StrangeEons class by its full name, you can write `Packages.ca.cgjennings.apps.arkham.StrangeEons`. Phew! If you had to write the full name of every class that way, you would wear off your fingerprints from all the extra typing! Fortunately, there are a number of shortcuts built in so you don't have to.

> You may wonder *why* everything in Java is contained in packages and classes. Unlike JavaScript, Java has no such thing as a *global scope*. A global scope is convenient for script code, but causes problems as a code base grows. Encapsulating different parts of a project in packages and classes is one of many features of Java designed to support building large, complex software systems.

#### Package shortcuts

The predefined variable `Packages` points to the root of the package hierarchy. Using it, you can always access *any* Java class. But most of the time the classes you want live in certain common parts of the hierarchy. For this reason, the script engine predefines some more variables that add shortcuts to those packages. For example, most of Strange Eons lives somewhere underneath the `ca.cgjennings.apps.arkham` package. So, there is a predefined variable `arkham` that points directly to that package. Using this shortcut, you can shorten the full path `Packages.ca.cgjennings.apps.arkham.StrangeEons` to just `arkham.StrangeEons`. You can also use `ca` instead of `Packages.ca`, `resources` instead of `Packages.resources`, `java` for `Packages.java`, and `swing` instead of `Packages.javax.swing`.

> The package name `arkham` is a historical artifact. The earliest version of Strange Eons was a simple tool for creating custom characters for the board game Arkham Horror.

#### Importing classes and packages

That's a bit more convenient, but it is still a pain to have to write out every class name with its package. If you are going to refer to the same class several times, it would be nice to have a short name for it. Fortunately there is a predefined function that does that for you:

```js
importClass(ca.cgjennings.spelling.SpellingChecker);
// now we can use "SpellingChecker" directly without writing the full name
SpellingChecker.sharedInstance.isCorrect("mispel");
```

Because classes are divided into packages based on functionality, you will often want to import several classes from the same package all at once. Instead of importing each one individually, you can use `importPackage(packageName)` to import all its classes at once.

> After importing a package, when you refer to a variable that you haven't defined in your script, before reporting it as an error the script engine will first check to see the name you used is the name of one of the classes in the imported package. If so, it assumes you are referring to that class.

### Getters and setters

In JavaScript code, the properties of an object are usually accessed directly, like this:

```js
let chest = {
  gold: 50,
  diamonds: 0,
  rubies: 2
};
chest.gold = chest.gold + 10;
println(chest.gold);
```

In Java code, access to these kinds of properties is usually done through special methods called *getters* and *setters*. For example, the last two lines above might look like this:

```js
chest.setGold(chest.getGold() + 10);
println(chest.getGold());
```

As you can see, a *getter* is a method that returns the value of a property, while a *setter* is a method that changes the value of a property to whatever argument you pass to it. Notice that the name of the setter method starts with `set` and then the capitalized name of the property. Likewise, the name of the getter method starts with `get` and then the capitalized property name. The one exception is that a getter than returns a boolean (true/false) value starts with `is`, as in `isVisible()`.

> A getter never takes an argument, but always returns one, the property's current value. A setter always takes exactly one argument, the new value to set.

When you are working with a Java class from script code, the script engine will detect getter and setter methods and create regular JavaScript properties for them if it can. You can choose whether to use the original methods or the property name. For example:

```js
let tf = new swing.JTextField();

// access using getter/setter methods:
tf.setText("She is a ");
tf.setText(tf.getText() + "dragon");

// equivalent using JS-style property name:
tf.text = "She is a ";
tf.text = tf.text + "dragon";
```

Getter and setter methods defined by the Java class will always exist in the matching script object. They are always safe to use. On rare occasions it is not possible to create the matching JS property. For example, the Java class may already use the property name to mean something else, or the method may be named like a setter but take more than one argument. In such cases, you must fall back to calling the method.

### Types and type conversion

Java and JavaScript both let you work with basic types like numbers and strings of letters. However, each one uses its own representations for these types. In fact, Java has several different kinds of numbers. The script engine can generally handle converting between these types automatically, but occasionally you'll bang headfirst into a conflict between the type systems.

#### Issues with numbers

One common source of trouble is that in a script, numbers can have a fractional part. In Java, *some* number types allow fractions (`double`, `float`) but most don't (`int`, `long`, `byte`, `short`, `char`). Also, script numbers can be positive or negative, but a Java `char` is always positive.

If you pass a number to a Java method that expects one of the integer types that don't have fractions, any fraction it may have is just chopped off without rounding.

Each Java number type also covers a different range of numbers. If you try to pass a number that doesn't fit in the range of the target type, you'll get an error:

| Integer type |                    Minimum |                    Maximum |
| ------------ | -------------------------: | -------------------------: |
| `byte`       |                       -128 |                       +127 |
| `short`      |                    -32 768 |                    +32 767 |
| `char`       |                          0 |                    +65 535 |
| `int`        |             -2 147 483 648 |             +2 147 483 647 |
| `long`       | -9 223 372 036 854 775 808 | +9 223 372 036 854 775 807 |

Fortunately, getting an error is very rare in practice. Most Strange Eons methods that take an integer number will take an `int`, or if large numbers are expected (such as file sizes), a `long`. Methods that take one of the other types generally have a very good reason for doing so: if you get a conversion error with them, there is probably a bug in your code.

Of the two floating point types (the ones that accept fractional parts), `double` is essentially the same as a JavaScript number so it converts without issue. Floating point numbers are different from integers in that they can represent very large or small numbers, but they have limited precision. Floating point numbers essentially have a limited number of significant digits: `double` values are reliable to 15 decimal digits, while `float`s are reliable to 7. If you check the range of the `long` type above, you will see that its maximum and minimum values exceed the number of significant digits for a `double`, and therefore also for a JavaScript number. In fact, if you try running `println(9223372036854775807);` you will see that it prints `9223372036854776000`; the last few digits are rounded. In practice, you will probably never have a practical use for numbers this large in Strange Eons, so you can ignore this limitation when working with methods that take or return `long` values.

#### Issues with strings

In both Java and JavaScript, strings are a sequence of 16-bit character values, so conceptually they are very similar although there are some significant differences in the methods they offer. The script engine will convert JavaScript strings to Java strings for you when calling Java methods. Methods that return a string will return a Java string without conversion. However, the engine lets you call JS string methods on Java strings if there isn't already a Java string method with the same name. Still, every so often, though, you will run into a case where you need to explicitly convert a Java string to a JavaScript string or vice-versa.

To create a Java string from a JavaScript (or Java) string:

```js
let javaString = new java.lang.String(jsString);
```

One situation where this can be necessary is when you want to pass a string to a method that takes a Java [Object](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html). For example, a [HashMap](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html) that expects [String](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) keys will fail unexpectedly if passed JS strings.

There are a number of ways to convert a Java string to a JavaScript string, but the easiest way is to append it to an empty JavaScript string:

```js
let jsString = "" + javaString;
```

#### Creating a Java array

Like other types, the script engine makes an effort to convert a script array to a Java array when required. Rarely, though, you may need to create a Java array explicitly. The only way to do it is using a feature of the Java language called reflection. Reflection is a topic beyond the scope of this page, but for this purpose you only need to adapt some boilerplate code:

```js
// Equivalent to Java stringArray = new String[10];
// Works with classes (pass class as the first argument)
let stringArray = java.lang.reflect.Array.newInstance(java.lang.String, 10);

// Equivalent to Java intArray = new int[10];
// Works with primitive types (substitute relevant wrapper class name)
let intArray = java.lang.reflect.Array.newInstance(java.lang.Integer.TYPE, 10);
```

### Overloaded methods

In JavaScript when you define a function you typically state the names of the arguments (also called parameters) that is accepts. However, script code can completely ignore your definition and call your function with any number of arguments. Moreover, in JavaScript you can pass anything you want as an argument, no matter what the function might expect you to pass:

```js
// this function expects two numbers as arguments
function printSum(x, y) {
    println(x + y);
}
// if we call it with the expected arguments, we get the expected result
printSum(2, 2); // prints 4
// but we can pass it three (or more) arguments without any errors;
// the extra arguments are not used, so they are passed in but do nothing
printSum(2, 3, 8); // prints 5
// we can even pass it less arguments than it expects; in this case
// the missing arguments have the special value "undefined", which
// leads to unexpected results
printSum(2);
printSum();
```

Java is much stricter. Each method in Java has a *signature* which states how many arguments it expects and what *type* each of them has to be. If you try to call a Java method with the wrong number of arguments, you'll get an error:

```js
importClass(java.lang.Integer);

// this method takes one integer number and returns a string;
// as the name suggests, it returns the number's equivalent
// hex (hexadecimal) value as a string, but that's not important
// for this example so don't worry about it!
Integer.toHexString(255); // returns string "ff"
// Error: this has too many arguments
Integer.toHexString(255, 511);
// Error: this has too few arguments
Integer.toHexString();
// Error: this is not an integer (and can't be converted to one)
Integer.toHexString("pears");
// this works because the string is first converted to an integer;
// but it is dangerous to rely on this as it often leads to bugs
Integer.toHexString("255"); // also returns "ff"
```

In Java, you can define different versions of the same method. Each has the same name, but a different signature. This is called *overloading* the method. Because Java is so strict, it can figure out which method you meant to call by comparing the arguments you are trying to pass to the method's different signatures. When you call into Java from JavaScript, the scripting engine will try to pick the right method for you using similar rules, but sometimes the right choice isn't clear like it is in Java. In those cases, instead of using the "simple name" of the method, you can look up the overload that you actually want to call by its signature.

For example, `println(java.lang.Math.max);` would print a list of the different signatures of the `java.lang.Math.max()` static method. One of these is `int max(int,int)`. That is, it takes two `int` (integer) parameters and returns an `int` result. This example compares calling the overload that matches by default to explicitly asking for the `int` version:

```js
// We can't importClass Math since JavaScript already
// has a built-in object with the name Math
let jMath = java.lang.Math;

// This will print the different signatures of Java's Math.max:
println(jMath.max);

// JavaScript numbers are very close to the "double"
// type in Java (short for double precision floating point);
// so by default we will get max(double,double):
println(jMath.max(1.0, 1.5));

// If we explicitly request the integer version of the method,
// the value of each number will be converted to an int before
// calling the method, which means the fractions will be dropped.
// So we really end up asking for the maximum of 1 and 1:
println(jMath["max(int,int)"](1.0, 1.5));
```

Note that you don't include the return type when looking up a specific overload. (In the example, you look up `"max(int,int)"` and not `"int max(int,int)"`. In Java you can't overload something by changing the return type alone, so it's irrelevant. (In fact, if you do include it the script engine will get confused and throw an error.)

### Extending Java with script objects

#### Immutable nature of Java fields

In JavaScript, you can extend most objects just by adding or replacing an existing property. In Java, an object's "shape" is required to conform exactly to the class used to create (or *instantiate*) it. (Recall that each class acts as a template for creating objects of a certain type.) If you have a Java object in your script and you try to add or remove a property, or redefine one of its methods, you will get an error. Instead, there are two ways to enhance a Java object: composition and inheritance (subclassing). Composition is simple: create a wrapper object that includes the Java object as one of its properties. You can then add your new properties and methods to the wrapper object, calling into the embedded Java object as needed. Composition does have limits, though, as your wrapper object is not the same type as the Java object and therefore can't be passed to Java methods that expect that type of object as an argument. In such cases, you must use inheritance. There are a few different techniques for this, explained in the following sections.

#### Implementing interfaces

Java has the concept of *interface*. This describes an object that has to implement certain methods (with certain signatures) without saying anything about the guts of how the object works. For example, the interface code in Strange Eons has the concept of an "icon provider". Any kind of object that should be associated with an icon can implement the [IconProvider](assets/javadoc/ca/cgjennings/ui/IconProvider.html) interface. That means that it must include the methods declared by that interface. In this case, there is only one method: `Icon getIcon()`. In other words, any time you have an object that is an IconProvider, you know that you can call its `getIcon()` method to get the specific icon associated with that object. Lots of things in Strange Eons are IconProviders, including plug-ins and project actions.

To implement a Java interface from script code, you can define an object with properties matching the required method names. Each such property should be a function that supplies your *implementation* of that interface method. For example, here is an object that provides a `getIcon` implementation and the code that creates a true IconProvider out of that object:

```js
// define an object that includes a getIcon function	
let myImplementation = {
	getIcon: function getIcon() {
		return ResourceKit.getIcon("icons/application/16.png");
	}
};

// create an instance of IconProvider; when Java code calls its
// getIcon() method, our getIcon() function will be invoked
let myIconProvider = new ca.cgjennings.ui.IconProvider(myImplementation);

// note that myImplementation is a JavaScript object, while
// myIconProvider is a true Java object (and an instance of IconProvider)
println(myImplementation instanceof ca.cgjennings.ui.IconProvider);
println(myIconProvider instanceof ca.cgjennings.ui.IconProvider);

// also, note that this looks like a JavaScript function
println(myImplementation.getIcon);
// while this looks like a Java method (because it is!)
println(myIconProvider.getIcon);

// you can now pass myIconProvider to any Java method
// that takes an IconProvider argument and it will accept it!
```

A lot of Java interfaces, including IconProvider, only declare one method. When that is the case, you can take a shortcut and simply pass a function that implements that method to the `new` operation:

```js
let provider = function getIcon() {
	return ResourceKit.getIcon("icons/application/16.png");
};
let myIconProvider = new ca.cgjennings.ui.IconProvider(provider);
println(myIconProvider.getIcon);
```

> The `new Interface(scriptObject)` syntax used above can't conflict with existing Java code. Interfaces aren't classes: they can't be instantiated, so they don't have constructors.

#### Subclassing Java classes

Implementing a Java interface using `new` and a script object as described above is a special case of a more general problem. A Java class can actually implement any number of interfaces, and it can subclass one other class. To handle more complex cases, you can use the built-in JavaAdapter with syntax like the following:

```js
let javaObject = new JavaAdapter(javaClassOrInterface, javaInterface..., scriptObject);
```

In other words, you pass the JavaAdapter the name of at least one class (to extend) or interface (to implement), followed by any number of other interfaces you also want to implement, followed by the script object that your new Java object will delegate to when its methods are called.

The [ZipTools plug-in](https://github.com/CGJennings/se3docs/blob/03f91c90023a8c99c33df5379cf459613990f93d/Plug-in%20Authoring%20Kit/Project%20Examples/Zip%20Tools/resources/cgj/zip-tools.js#L140-L215) in the [Plug-in Authoring Kit](dm-pak.md) includes an example of extending a Java class using JavaAdapter.

##### Calling other methods in the class

When implementing a method, you may need to call another method in that class. You can do this in the standard JavaScript way, using `this`. Recall that within a method body, `this` is the name of the "secret argument" for the object that the method is being applied to. (Although in JavaScript, the meaning of `this` can get complicated.)

```js
let myImplementation = {
    someMethodOfTheClassWeAreExtending: function() {
        let v = this.someOtherMethodOfTheClass();
        return "I consulted another method and it says the answer is " + v;
    }
};
```

##### Calling methods in the super class

When you subclass an existing class, the class you are extending is called the *super class* or *parent class*. Any methods that you define will override (replace) the original method in the super class. Often you don't want to completely replace that method, but instead want to modify the existing behaviour in some way. To do that, you need a way to call the original version of the method. The script engine lets you do this by making the original versions available with the prefix `super$`. For example:

```js
let myPrettyColourExtension = {
  isAPrettyColour: function(colourName) {
      // our subclass always thinks aquamarine is a pretty colour
      if(colourName === "aquamarine") {
          return true;
      }
      // we don't care about any other colour, so we just return
      // whatever opinion is built into the super class
      return this.super$isAPrettyColour(colourName);
  }
};
```

##### Passing arguments to the superclass constructor

Some Java classes require additional arguments when they are created. (They do not define a no-arg constructor.) To extend such a class with JavaAdapter, you can append the constructor arguments after the script object:

```js
// given a Java class Spider with the following constructor:
//   public Spider(int numberOfEyes)
// we could subclass it using code like the following:
let numEyes = 6;
let classImplementation = {
  hunt: function(prey) {
      if(prey !== null && prey.isAhead()) {
          spitVenom();
      } else {
          findPrey();
      }
  }
};
// note how we pass the Spider constructor's required int argument
// right after the script object:
let spittingSpider = new JavaAdapter(Spider, classImplementation, numEyes);
```