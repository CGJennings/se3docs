// this library has useful functions we will use for
// picking random name fragments
useLibrary( 'random' );

function getName() {
    return 'Barbarian Name Generator';
}

function getDescription() {
    return 'Rename a component, barbarian style';
}

function getVersion() {
    return 1.0;
}

function run() {
	// Get the game component currently being edited (null
	// if the selected tab isn't a game component), then
	// change the component's name and redraw the preview.
	var component = Eons.activeGameComponent;
	if( component != null ) {
		// generate the name and set it on the component
		component.name = generateName();
		// copy the change to the component back to the editor
		var editor = Eons.activeEditor;
		editor.populateFieldsFromComponent();
		// update the editor's preview display
		editor.redrawPreview();
	}
}

// These arrays are lists of name fragments we will assemble
// in various ways to generate our names:
var syllables = [
	'Ack', 'Bar', 'Bog', 'Dak', 'Grak', 'Grug', 'Hurt',
	'Juk', 'Kag', 'Krak', 'Kruk', 'Lak', 'Mug', 'Morg', 'Nok',
	'Pog', 'Pok', 'Rak', 'Sog', 'Sok', 'Targ', 'Zog', 'Zug'
];
 
var optionalSyllables = [
	'-ak', '-awk', '-ek', '-ik', '-ok', '-uk', '-yk', '-yuk'
];
 
var familyNouns = [
	'Bear', 'Blood', 'Cave', 'Chunk', 'Dark', 'Ear', 'Foot',
	'Gob', 'Gorg', 'Grub', 'Gut', 'Head', 'Horse', 'Ik', 'Larg',
	'Moon', 'Nob-', 'Ogre', 'Orc', 'Pole', 'Snake', 'Spear',
	'Sun', 'Tree', 'Troll'
];
 
var familyVerbs = [
	'axe', 'bite', 'burn', 'burst', 'cut', 'fight', 'gash',
	'gorge', 'gore', 'growl', 'gush', 'hit', 'hurt', 'hunt',
	'kill', 'lance', 'punch', 'rend', 'rip', 'smash',
	'snarl', 'spit', 'split', 'stab', 'stomp', 'thump'
];

/*
 * generateName()
 * Returns a randomly generated name.
 */
function generateName() {
	var first, second = '', family = '';
 
	// Choose a first syllable for the name:
	first = syllables.pick();
 
	// 80% of first names have a second syllable:
	if( random.number() < 0.8 ) {
		// 20% of second syllables are from the optional set,
		// the other 80% are from the same set as the first syllable:
		if( random.number() > 0.8 ) {
			second = optionalSyllables.pick();
		} else {
			second = syllables.pickOtherThan( first ).toLowerCase();
		}
	}
 
	// 80% of names include a family name, which consists of a random
	// pairing from the nouns array and the verbs array:
	if( random.number() < 0.8 ) {
		family = ' ' + familyNouns.pick() + familyVerbs.pick();
	}
 
	return first + second + family;
}

// When we are testing the file by running it directly from
// inside a code editor, print some sample names and then
// simulate activating the plug-in.
if( sourcefile == 'Quickscript' ) {
	for( let i=0; i<10; ++i ) {
		println( generateName() );
	}
	run();
}