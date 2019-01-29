# Class map resources

**File extension:** `.classmap`

A class map file is used to register new kinds of game components with Strange Eons. It links the category, component name, and graphic that appears in the [**New Game Component**](um-gc-intro.md) dialog with the code that actually creates the component.

> The name “class map” alludes to the fact that, historically, only compiled classes were used to create new components. Now, though, components can also be defined using scripts.

To *register the contents of a class map file with Strange Eons*, call `gamedata.ClassMap.add(path)` using the resource path of the class map file. This can only be done in extension plug-ins.

## File format

The format of class map files is a variant of the format used for [settings files](dm-res-settings.md). They can be edited with the [code editor](dm-code-editor.md). Lines starting with `#` are comments that are ignored by Strange Eons. Other (non-blank) lines define either a category listing or a component listing. A component listing includes a `=` to separate the component name from its data. Categories do not include a `=`.

### Category definitions

**Syntax:** `[@]name [| category-icon[;banner-image]]`

A category entry consists of a category name and, optionally, a `|` followed by an icon and/or category banner image resource.

If the name starts with `@`, it will be treated as key to be translated using the interface language (more details below).

To specify a non-default icon for the category, add a `|` after the name and give the path to an [image resource](dm-res-image.md) to use for the icon. To use a custom banner image for the category, add a `;` after the icon image path and append the path to the banner image.

After declaring a category, any components that you list will be included in that category (until you declare a different category). Categories can be repeated by declaring them multiple times.

**Examples:**

```properties
# a category named Enemies that uses the default banner 
Enemies
# a category named Category Name that uses a custom banner
# stored in the plug-in bundle at resources/path/banner.jpg
Category Name | ;path/banner.jpg
# a category whose name is localized by looking up the key string-key
# and that uses a custom category icon
@string-key | path/category-icon.png
```

#### Standard categories

Where possible, it is recommended that you organize your components using one of these predefined categories:

`@cat-decks-and-boards`  
Card Decks and Game Boards

`@cat-markers`  
Tokens, Markers, and Resources

`@cat-rules`  
Rules, Scenarios, and Adventures

`@cat-characters`  
Characters, Henchmen, and Allies

`@cat-enemies`  
Enemies and Minions

`@cat-effects`  
Effects, Events, and Environments

`@cat-inventory`  
Items, Abilities, and Knowledge

`@cat-misc`  
Miscellaneous

`@cat-example`  
Examples and Demonstrations

### Component definitions

**Syntax:** `[@]name = class-or-script [| icon image [| game]]`

#### Component name

A component entry consists of a name, a class or script file, and optionally an icon image resource and/or game code. If the component name begins with `@`, then the actual name is looked up using the rest of the name using `Language.string(name)`.

#### Class or script

Each component *must* declare a class or script file that can be used to create a new editor for the component type. The following forms can be used:

**Fully qualified class name**  
New instances of the component will be created by invoking this class’s no-argument constructor. The class must be a subclass of `GameComponent`. An editor for the new component is then created by calling its `createDefaultEditor()` method. As a convenience, if the class name does not specify a package it will default to `ca.cgjennings.apps.arkham.component`.

**DIY component script**  
A script implementing the DIY component functions is listed using `diy:` followed by the resource path to the DIY script. A new DIY component will be created using the script, and a matching `DIYEditor` created for the component.

**Generic script**  
A generic script is listed by writing `script:` followed by the resource path to the script. Unlike other entry types, this script is responsible for creating the component, creating and editor for the component, and adding the editor to the application. This gives generic scripts a lot of flexibility. For example, they can “hack” existing component types by modifying the base component’s private settings.

#### Component icon

To specify an image resource to use as the component’s icon in its dialog listing, add a `|` followed by the path to the icon image resource. If no icon is specified, or the path is empty, an icon is looked for in `resources/editors` using the key name (less any `@`) and the `.png` extension. If this does not exist, a default icon is used.

> The plug-in authoring kit includes graphics templates that can help you make suitable icons and banners.

#### Game code

You specify the game that a component belongs to by adding a second `|` after the icon resource and the appending the game’s unique code. A single `*` can be used to indicate that the component can be used with any game. If no game is specified, the component is associated with the “unknown” game (for compatibility with old class map files).

**Examples:**

```properties
# by convention, component entries are indented to make it clear
# which category they belong to
My Category | custom/mycat.png
    My Editor = script:/custom/myed.js | custom/myed.png
    My Editor = diy:/custom/mydiy.js | | AH
    @grue = com.info.Grue | info/darkness.png | *
```

