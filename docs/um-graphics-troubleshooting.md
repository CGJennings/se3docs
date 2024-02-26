# Troubleshooting

## Drawing or graphics issues

### User interface text quality

Text appears smoother when drawn with a technique called [*anti-aliasing*](https://en.wikipedia.org/wiki/Spatial_anti-aliasing). Strange Eons normally tries to use the text anti-aliasing settings of your operating system. However, this is not always reliable on Linux devices, so by default Strange Eons may instead guess. This works on most modern LCD displays, but you can specify a different method using the command line argument `--xAAText` with one of the following values:

| Option                                         | Effect                                                       |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `auto`                                         | Use value read from system settings, if possible. *This is the default on Windows and macOS.* |
| `off`                                          | Disable all text antialiasing.                               |
| `on`                                           | Use greyscale (opacity) antialiasing.                        |
| `gasp`                                         | Use greyscale (opacity) antialiasing as specified by each font (using the font's GASP table, if any). |
| `lcd`                                          | Use the most common LCD subpixel antialiasing (`lcd_hrgb`). *This is the default on Linux.* |
| `lcd_hrgb`, `lcd_hbgr`, `lcd_vrgb`, `lcd_vbgr` | Use the specified type of LCD subpixel antialiasing. Correct subpixel antialiasing depends on the precise arrangement of the red, green, and blue light sources that make up each pixel. The default works for most displays, but if your display uses a different arrangement you can select it with these options. |

## Glitches when drawing/updating windows

Strange Eons generally attempts to use hardware acceleration to improve performance. In some cases this is incompatible with a particular graphics card or driver. This is often indicated by weird glitches when drawing the application window, like bits of the interface not being drawn or being drawn in the wrong place or repeated multiple times. If this happens to you, you can try the following steps:

1. Update your graphics driver to the latest version. Once installed (and the the computer restarts, if necessary), try starting Strange Eons again.
2. If your computer has two graphics chipsets (one power saving and one high performance), try using Strange Eons with each in turn. Usually the high performance graphics option works best.
3. Change the graphics acceleration options used to start Strange Eons. The options to experiment with are: `--xDisableAcceleration`, `--xEnableAcceleration`, and `--xOpenGL`. [See the instructions for supplying command line options for details.](um-install-command-line-options.md)

> **Tip:** On Windows, graphics glitches are so common that hardware acceleration was disabled by default as of version 3.3. On Windows, you can selectively try *enabling* graphics acceleration to see if you encounter drawing glitches on your device. If not, leave it enabled to enjoy improved performance.