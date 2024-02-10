# CommonJS modules
As of Strange Eons 3.4, the script engine has partial support
for CommonJS modules like those used in NodeJS. You can load other
scripts with `require` and a relative path, and get their exported
functions and other objects for use in the calling script.

No support is planned for more advanced features of CommonJS modules,
nor are their plans to port versions of the NodeJS standard modules
(such as `fs`).

The level of support should be sufficient for transpiled `import`
statements from TypeScript code.
