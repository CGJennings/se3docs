# Register an export container

When the user chooses **File/Export** to [export a game component as images](um-gc-export.md), the dialog includes a dropdown list of destinations, such as *files in a folder* or *ZIP archive*. Plug-ins can add new destinations; for example, a plug-in could upload the images to a cloud-based image hosting service.

## Export containers

Each possible export destination is an implementation of the [ExportContainer](assets/javadoc/ca/cgjennings/apps/arkham/ExportContainer.html) interface. To register a new type, pass it to [`Eons.registerExportContainer(container)`](assets/javadoc/ca/cgjennings/apps/arkham/StrangeEons.html#registerExportContainer-ca.cgjennings.apps.arkham.ExportContainer-).

### Basic data

`getIdentifier()`  
This should return a string that uniquely identifies the container. It is used to track the user's preferred default destination.

`toString()`  
This should return a human-friendly description of how the container stores the files, ideally localized for the interface language.

`isFileFormatSupported(extension)`  
Returns a hint as to whether a given file format is supported. The format is described by file extension, such as `"png"`. For example, an online image hosting service might accept only PNG and JPEG (`"jpg"`) images. The export system might modify the offers it options to the user accordingly, or might choose to skip certain files. This is only a hint: the container is required to accept any kind of content offered to it, although it may choose to convert or simply discard data it does not support.

### Starting an export

`selectLocation(baseName, locationHint)`  
Once the user begins an export with a chosen export container, the export begins by calling this method. The `baseName` is a suggested base name based on the component name. For example, the container might use this as a folder name or album name that is used to store the result. If the `locationHint` is non-`null`, it is an interface control that the dialog should ideally be centered over.

`createContainer()`  
Once a location has been set, this is called to create a new container and begin a new export.

### Exporting files

`addEntry(name)`  
This called to begin exporting a new file. The supplied `name` is a suggested file name, including an extension indicating the type. It must return an [OutputStream](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html). The file data will be written to this stream, and then the stream will be closed. Exports are performed one file at a time, in sequence, and the previous stream is always closed before either adding another entry of finishing the export.

### Finishing an export

Once `createContainer` has been called, the export process will end one of two ways:

`closeContainer(displayHint)`  
If the export has finished normally, this is called to finish the job normally. If `displayHint` is `true` then the user has hinted that the finished product should be opened if possible. For example, an export to a file folder might display it by opening the folder in the platform's file system explorer. An export to an image hosting service might open the relevant page in the user's browser.

`destroyContainer()`  
If an error occurs or the user cancels the operation, this is called instead. The container should make a best effort attempt to delete or otherwise destroy any files written up to this point, as well as any other content such as a containing folder.

### Configurable containers

`isConfigurable()`  
If the ExportContainer has configuration options that user can modify, this should return `true`; otherwise `false`.

`configure(locationHint)`  
This is called when the user wants to change the options of a configurable container. It is expected to display a modal dialog of the available options. If the `locationHint` is non-`null`, it is an interface control that the dialog should ideally be centered over.

Configuration is optional and is a separate process from exporting; the user initiates it by choosing **Destination Options** when a configuration container is selected.

## Sharing of containers

There is typically only one ExportContainer instance of each registered type; they are shared by every export job. For this reason, they should only be used from the main interface thread to avoid ensure that two separate threads do not try to export through the same container at the same time. Likewise, you must ensure that if you begin an export task yourself by calling `createContainer` you ensure that you also either close or destroy the container when finished.