### Java 9+ compatibility

Officially, Strange Eons currently requires Java 8, but work is underway to support Java 9 and later. This page summarizes the current status of this process. Note that some of the information here is technical in nature; if you are simply trying to get Strange Eons to start on a different Java version, [you might find this page more helpful](um-install-other.md).

- SE can be built under Java 9 and Java 11.
- A separate development branch, `java-9+` is being used for changes that *require* Java 9. This branch will be merged into main once the Strange Eons installers start including an embedded JRE of version 9 or later.
- The major obstacles have been solved and SE can be started under Java 9 starting with build 3970. However:
  - build 4163 will refuse to start in newer versions except in development mode;
  - subsequent versions (3.2+) will allow running under Java 9 through 11; this check can be bypassed by starting Strange Eons with `--xDisableJreCheck`.
- When starting SE from the command line, the option <code>-javaagent:<em>path/to/strange-eons.jar</em></code> must be added. The launcher executables for Windows and macOS have been modified to include this option.
- Plug-ins are no longer compressed with Pack200 when preparing a catalogue bundle. Trying to decompress a bundle that uses Pack200 will fail with a suitable error message. Bundles in the standard catalogue have been republished without Pack200.
- Under Java 16, the JavaScript engine fails to call into Java code when it calls a public interface method but the actual runtime class of an object is a private JRE class. A workaround is to invoke Java with the `--illegal-access=permit` option.