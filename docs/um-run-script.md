# Running a script from the command line

> **Note:** This feature is available starting in version 3.2. It is currently considered experimental.

Strange Eons can be started in a *non-interactive script runner mode*, meaning that it can be used to run a script without displaying an interface. To do this, start the app from the command line with the `-run` (or `--run`) argument and the name of the script file. For example, under Windows you might use:

```bash
"c:\program files\strangeeons\bin\eons" -run script-to-run.js
```

[How to specify command line options on different platforms](um-install-command-line-options.md#setting-command-line-options)

The app will start without showing a splash screen or main application window. It will load extensions and plug-ins normally. Once the app is ready, it will load and run the specified script file, then exit. (The script runs at about the same point as the application window would normally be shown.)

## Detecting script runner mode

The main `StrangeEons` class has a method `getScriptRunner()` that returns `null` if the app is **not** in script runner mode. If the app is in script runner mode, it returns an object that can be used to get information about the mode and modify its default behaviour.

The following code could be used in a plug-in or other script to detect if the app is in script runner mode:

```js
if (Eons.scriptRunner != null) {
    // script runner mode is active
}
```

The returned `ScriptRunnerState` object has the following informational properties:

`file`  
Returns a `File` object for the script file that was specified on the command line.

`started`  
Returns `true` if the app has at least started to load and run the script file. This is `false` until the app has started up and is ready to run the script. (So, for example, it is `false` while extensions are loaded.) Once `true`, it does not change again.

`finished`  
Returns `true` if the app has finished running the script file. That is, if it started running the script *and* the script returned. Note that if the script starts other threads or installs event handlers, these will not prevent the script from finishing. Immediately after this becomes `true`, the app will start to exit unless prevented from doing so.

### Preventing app exit

Normally, as soon as the main script file finishes, the app will exit. If your script starts new threads or is waiting for an event listener to fire, you can prevent the app from exiting with:

```js
Eons.scriptRunner.keepAlive = true;
```

If used, this flag must be set before reaching the end of the script. You must ensure that you stop the app at a later time by calling:

```js
Eons.window.exitApplication(false);
```

### Making the app interactive

The app can be made interactive by making the main window visible. For example, from a script:

```js
Eons.window.visible = true;
```

## Caveats

Because the app window is not normally made visible, your script can be blocked if you perform an action that opens a *modal dialog*. (A modal dialog is one that prevents you from using the rest of the app until the dialog closes.)

If your script throws an uncaught exception (uncaught error in JavaScript parlance), the app will exit regardless of the value of `keepAlive` property. This is intentional. This applies only to errors thrown when the main script is run. For example, if you attach an event listener that throws an exception when the event is fired, the app will continue to run.
