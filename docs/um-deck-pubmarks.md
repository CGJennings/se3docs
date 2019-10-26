# Publisher's marks and bleed margins

The deck editor includes features designed to make it easier to cut and assemble your published projects on the your projects. These features can managed from the **Publisher's Marks** tab.

![the Publisher's Marks tab](images/deck-pubmarks.png)

## Crop and fold marks

Strange Eons will automatically add solid crop marks (cut lines) and dashed fold marks. Crop marks let you line up your scissors correctly when cutting out a component face. Fold marks show which edges should be folded rather than cut.

To *hide crop and fold marks*, uncheck the **Draw crop and fold marks on pages** option.

To *change the appearance of the marks*, adjust the following numeric settings:

**Weight**  
Sets the thickness of the marks, in points. There is a second field to set the thickness when the line is printed. Printed marks are typically very thin and would be hard to see on screen.

**Distance**  
Sets the distance of the mark from the edge it is marking, in points.

**Length**  
Sets the length of the line that is drawn, in points.

### Magic fold marks

Game component designs can include permanent fold marks that are always drawn at certain points on a card face, but this is rare. Usually, fold marks are added automatically when the front and back faces of a design are snapped together in such a way that they can be cut out as a single piece and folded to produce a proper two-sided card. For example, if you align the two faces so that the bottom of one face touches the top of the other face, then one of the faces must be rotated 180° for them to fold together correctly. Otherwise, the flip side of the card would be upside-down when turned over. When matching front and back faces are aligned correctly, the solid crop mark that would normally appear will change into a dashed fold mark.

![matching up front and back faces of a card](images/deck-magic-fold.gif)

> The deck editor does not consider the visual appearance of the components, only if they are paired front and back faces from the same file. So even if two cards have backs that *look* the same, you can't mix and match the backs and fronts and get a fold line.

## Bleed margins

Bleed margins are an extra margin added around the outside of a card face or other printed material. Graphics on the edge of the design are continued into the bleed margin. This allows for the imprecision of machine cutting during the publishing process. When a card is miscut, it will be slightly off center but will still look acceptable because the graphics in the bleed margin avoid an obvious hard edge.

![a bleed margin prevents a miscut card from having hard white edges](images/bleed-margin.png)

### Faking bleed margins

Most components do not include a bleed margin in their design since they are meant for home use. However, when required Strange Eons can synthesize a bleed margin for opaque card designs. The result is usually good enough. It does this by first extending the card size by 9 points (about 3&nbsp;mm). It then samples the existing outside edge and extends the design. If it detects a solid border, it will extend the border; otherwise it will use mirrored copies of the card design.

To *add fake bleed margins* to components that don't have real ones, check **Simulate bleed margins on components without one** on the **Publisher's Marks** tab.

### Designs with bleed margins

While most designs do not include a true bleed margin, plug-in developers do have the option of [including a bleed margin](dm-diy-bleed-margins.md) in the design. When a component defines a bleed margin, the crop marks in the deck editor are adjusted automatically to account for it.

### Designing for bleed margins

When creating a new card design, keep in mind that content near the edge of the card may also be cut off by a miscut. There is an *unsafe zone* around the *inside* of the design the same size as the exterior bleed margin. No important content (such as rule text) should be placed inside in this zone.

![diagram of the unsafe area on the inside border of a design](images/deck-unsafe-area.png)
