const defaults = {
	softWrap: true,
	sendToTop: false,
	appendUrl: false,
	emptyLine: false,
	darkTheme: false,
	fontSize: "12",
	font: "",
	notesNum: 5
}

browser.storage.local.get(defaults, (options) => {
	document.getElementById("softWrap").checked = options.softWrap;
	document.getElementById("sendToTop").checked = options.sendToTop;
	document.getElementById("appendUrl").checked = options.appendUrl;
	document.getElementById("emptyLine").checked = options.emptyLine;
	document.getElementById("darkTheme").checked = options.darkTheme;
	document.getElementById("fontSize").value = options.fontSize;
	document.getElementById("font").value = options.font;
	document.getElementById("notesNum").value = options.notesNum;


	document.getElementById("softWrap").addEventListener("change", () => {
		browser.storage.local.set({
			softWrap: document.getElementById("softWrap").checked
		});
		browser.runtime.sendMessage({
			softWrap: document.getElementById("softWrap").checked
		});
	});

	document.getElementById("sendToTop").addEventListener("change", () => {
		browser.storage.local.set({
			sendToTop: document.getElementById("sendToTop").checked
		});
		browser.runtime.sendMessage({
			sendToTop: document.getElementById("sendToTop").checked
		});
	});

	document.getElementById("appendUrl").addEventListener("change", () => {
		browser.storage.local.set({
			appendUrl: document.getElementById("appendUrl").checked
		});
		browser.runtime.sendMessage({
			appendUrl: document.getElementById("appendUrl").checked
		});
	});

	document.getElementById("emptyLine").addEventListener("change", () => {
		browser.storage.local.set({
			emptyLine: document.getElementById("emptyLine").checked
		});
		browser.runtime.sendMessage({
			emptyLine: document.getElementById("emptyLine").checked
		});
	});

	document.getElementById("font").addEventListener("input", () => {
		browser.storage.local.set({
			font: document.getElementById("font").value
		});
		browser.runtime.sendMessage({
			font: document.getElementById("font").value
		});
	});

	document.getElementById("fontSize").addEventListener("change", () => {
		browser.storage.local.set({
			fontSize: document.getElementById("fontSize").value
		});
		browser.runtime.sendMessage({
			fontSize: document.getElementById("fontSize").value
		});
	});

	document.getElementById("darkTheme").addEventListener("change", () => {
		browser.storage.local.set({
			darkTheme: document.getElementById("darkTheme").checked
		});
		browser.runtime.sendMessage({
			darkTheme: document.getElementById("darkTheme").checked
		});
	});

	document.getElementById("notesNum").addEventListener("change", () => {
		browser.storage.local.set({
			notesNum: document.getElementById("notesNum").value
		});
		browser.runtime.sendMessage({
			notesNum: document.getElementById("notesNum").value
		});
	});
});