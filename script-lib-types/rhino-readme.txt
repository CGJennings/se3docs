Files that match rhino-*.d.ts are derived from Microsoft's TypeScript
definitions for es6 in order to include information on core JS objects
to script developers (who often are not familiar with JS).

The TypeScript definitions for JS build on each other in order to
support multiple editions of the ECMAScript standard.
Rhino 1.7.9 has partial es6 support. The files here were selected
based on what TypeScript includes as part of its "es6" level of support,
excluding the "Web stuff".

The definitions for es6 build directly on es5 by adding additional
functionality. The original "include" references from the TS file
are listed below along with some notes:

See https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es2015.d.ts

/// <reference lib="es5" />


/// <reference lib="es2015.core" />


/// <reference lib="es2015.collection" />


/// <reference lib="es2015.generator" />


/// <reference lib="es2015.promise" />
Not part of Rhino.

/// <reference lib="es2015.iterable" />


/// <reference lib="es2015.proxy" />
Haven't investigated level of support.

/// <reference lib="es2015.reflect" />
Not part of Rhino.

/// <reference lib="es2015.symbol" />
/// <reference lib="es2015.symbol.wellknown" />
Symbols are supposedly included, haven't tested level of support.