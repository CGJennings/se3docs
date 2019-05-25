useLibrary("diy");
useLibrary("ui");
useLibrary("markup");

try {
	importClass(gamedata.AHData);
} catch(ex) {
	// If the import failed, the AHData class doesn't exist and therefore
	// Arkham Horror is not installed.
	alert("Servitors require the Arkham Horror plug-in", true);
	throw new Error();
}

function create(diy) {
	diy.version = 2;
	diy.extensionName = "ArkhamHorrorRiseOfTheServitors.seext";
	diy.faceStyle = FaceStyle.PLAIN_BACK;
	diy.frontTemplateKey = "servitor-front-sheet";
	diy.backTemplateKey = "servitor-back-sheet";
	diy.portraitKey = "servitor";
	
	// If we hadn't loaded card-layout.settings as defaults
	// for the game, we could set them manually here (or add
	// them using diy.settings.addSettingsFrom).

	diy.name = "Deputy Coroner Waite";
	$Home = "$GRAVEYARD";
	$HorrorCheck = "-1";
	$HorrorDamage = "1";
	$CombatCheck = "-3 (<u+d7>2)";
	$CombatDamage = "2";
	$Toughness = "3";
	$Special = "";
	$Benefit = "At the start of each combat round against the Ancient One, "
		+ "each investigator must discard 3 Toughness worth of trophies or "
		+ "1 Stamina.";
}

function onClear() {
	$Home = "$ARKHAMASYLUM";
	$HorrorCheck = "+0";
	$HorrorDamage = "1";
	$CombatCheck = "+0";
	$CombatDamage = "1";
	$Toughness = "1";
	$Special = "";
	$Benefit = "";
}

function createInterface(diy, editor) {
	let panelStack = new Stack();
	let panel = new Grid("fillx");
	let bindings = new Bindings(editor, diy);
	
	let nameField = textField();
	diy.setNameField(nameField);
	let nameLabel = label("&Name", nameField);
	panel.place(nameLabel, "split", nameField, "growx, wrap");
	
	let homeCombo = new arkham.LocationCombo();
	let model = homeCombo.model;
	for(let i=model.size - 1; i >= 0; --i) {
		let loc = model.getElementAt(i);
		if(!loc || !AHData.getSymbolFromLocation(loc)) {
			model.removeElementAt(i);
		}
	}
	bindings.add("Home", homeCombo, [0]);
	let homeLabel = label("Ho&me", homeCombo);
	panel.place(homeLabel, "split", homeCombo, "growx, wrap");
	
	panel.setTitle("Servitor");
	panelStack.add(panel);
	
	panel = new Grid("fillx");
	let benefitField = textArea("", 5, 0, true);
	bindings.add("Benefit", benefitField, [0]);
	let specialField = textArea("", 3, 0, true);
	bindings.add("Special", specialField, [0]);
	let benefitLabel = label("&Benefit", benefitField);
	let specialLabel = label("&Special", specialField);
	panel.place(
		benefitLabel, "wrap", benefitField, "growx, wrap",
		specialLabel, "wrap", specialField, "growx, wrap"
	);
	panel.setTitle("Effects");
	panelStack.add(panel);
	
	panel = new Grid("fillx");
	let combatField = textField("", 12);
	bindings.add("CombatCheck", combatField, [0]);
	let combatSpinner = spinner(1, 5);
	bindings.add("CombatDamage", combatSpinner, [0]);
	let horrorField = textField("", 12);
	bindings.add("HorrorCheck", horrorField, [0]);
	let horrorSpinner = spinner(1, 5);
	bindings.add("HorrorDamage", horrorSpinner, [0]);
	let toughnessSpinner = spinner(1, 8);
	bindings.add("Toughness", toughnessSpinner, [0]);
	let horrorLabel = label("&Horror", horrorField);
	let toughnessLabel = label("&Toughness", toughnessSpinner);
	let combatLabel = label("&Combat", combatField);
	panel.place(
		horrorLabel,   "gap unrel",  "",               "gap unrel",  combatLabel,   "wrap",
		horrorField,   "gap unrel",  toughnessLabel,   "gap unrel",  combatField,   "wrap", 
		horrorSpinner, "gap unrel",  toughnessSpinner, "gap unrel",  combatSpinner, "wrap"
	);
	panel.setTitle("Statistics");
	panelStack.add(panel);
	
	panelStack.addToEditor(editor, "Content", null, null, 0);
	bindings.bind();
}

let titleBox, textBox;

function createFrontPainter(diy, sheet) {
	titleBox = markupBox(sheet);
	titleBox.setAlignment(MarkupBox.LAYOUT_CENTER | MarkupBox.LAYOUT_MIDDLE);
	let defaultStyle = titleBox.getDefaultStyle();
	defaultStyle.add(FAMILY, AHData.cardFamily);
	defaultStyle.add(SIZE, 11);
	titleBox.setTextFitting(MarkupBox.FIT_BOTH);
	
	textBox = markupBox(sheet);
	textBox.setAlignment(MarkupBox.LAYOUT_CENTER | MarkupBox.LAYOUT_BOTTOM);
	textBox.setTextFitting(MarkupBox.FIT_BOTH);

	defaultStyle = textBox.getDefaultStyle();
	defaultStyle.add(FAMILY, AHData.bodyFamily);
	defaultStyle.add(SIZE, 8);

	let h1 = new TextStyle(WEIGHT, WEIGHT_BOLD, SIZE, 9);
	textBox.setStyleForTag("h1", h1);
}

function createBackPainter(diy, sheet) {}

function paintFront(g, diy, sheet) {
	sheet.paintPortrait(g);
	sheet.paintTemplateImage(g);

	g.setPaint(Color.BLACK);
	titleBox.markupText = diy.name + "<size 8>\nServitor";
	titleBox.draw(g, $$servitor_title_region.region);
	let location = AHData.getLocationFromSymbol($Home);
	let home, article;
	if(location != null) {
		home = location.name;
		article = AHData.getArticleForLocation(home);
		// Since it was returned from SE rather than a script,
		// article is a Java string; hence it has a length() method,
		// not a length property.
		// TIP: if you want to be sure that a string is a JS string,
		// just concatenate it with an empty string: s = "" + s;
		if(article.length() > 0) {
			// Compose the home name as (e.g.) "T" + "he" + " " + "Location"
			home = article.substring(0,1).toUpperCase() + article.substring(1)
				+ " " + home;
		}
	} else {
		home = "";
		article = "";
	}

	let text = "<size 9.5><b>Home:</b> " + home + "</size><size 2>\n\n</size>";
	let benefit = $Benefit.trim();
	if(benefit.length > 0) {
		text += "<b>Benefit:</b> " + benefit + "\n";
	}

	// Instead of drawing images with calls to g.drawImage, this example
	// uses markup. This is less efficient than drawing the images directly,
	// but it can also be much less work for the plug-in developer than
	// creating a pixel-perfect layout "by hand".
	text += "<left><tabwidth 0.97in>\n    <b>Horror:</b> " + $HorrorCheck
		+ "\t<b>Combat:</b> " + $CombatCheck
		+ "\n<center><image res://monstertokens/hd0" + $HorrorDamage + ".png 20pt>"
        + "   <image res://monstertokens/tg0" + $Toughness + ".png 20pt>"
		+ "   <image res://monstertokens/cd0" + $CombatDamage + ".png 20pt>\n";
	
	let special = $Special.trim();
	if(special.length > 0) {
		text += "<size 8><b>Special:</b> " + special;
	}

	textBox.markupText = text;
	textBox.draw(g, $$servitor_text_region.region);
}

function paintBack(g, diy, sheet) {}


function onRead() {}
function onWrite() {}

// This doesn't do anything unless the script is run
// directly from a code editor.
//
// By providing a game code, we will be linked to
// Arkham Horror's master settings and we can set
// expansion symbols on the component.
if(sourcefile == "Quickscript") {
	testDIYScript("AH");
}