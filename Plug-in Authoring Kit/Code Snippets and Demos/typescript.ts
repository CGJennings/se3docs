/**
 * typescript.ts - version 1
 *
 * TypeScript is a typed superset of JavaScript that compiles
 * to regular JavaScript code. Strange Eons has basic experimental
 * support for TypeScript. Saving a TypeScript file, like this one,
 * will compile the file to a JavaScript with the same name but
 * with the ".js" extension, which you can then use as usual from
 * a project or plug-in.
 */
 
import { circle as areaOfCircle } from "./modules/area.js";
 
function getDiameter(   ): number {
	return Number(prompt("Circle diameter?"));
}
 
println(`area of circle: ${areaOfCircle(1)}`); 