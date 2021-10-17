browser.menus.create({
	id: "main",
	title: 'Send to Nine Notes',
	contexts: ["selection"],
	documentUrlPatterns: ['<all_urls>'],
	icons: {
		"16": "icon.svg",
		"32": "icon.svg"
	}
});

for (let i = 1; i < 10; i++) {
	browser.menus.create({
		parentId: "main",
		id: "note" + i,
		title: "Note #" + i,
		contexts: ["selection"],
		documentUrlPatterns: ['<all_urls>']
	});
};

browser.browserAction.onClicked.addListener(() => {
	browser.sidebarAction.open();
});


browser.menus.onClicked.addListener((info) => {
	browser.storage.local.get([info.menuItemId, "sendToTop", "appendUrl", "emptyLine"], items => {
		let noteName = info.menuItemId;
		let oldNote = items[info.menuItemId];
		let newText = info.selectionText;
		let newNote;

		if (items.emptyLine) {
			separator = "\n\n";
		} else {
			separator = "\n";
		};

		browser.tabs.query({currentWindow: true, active: true}, tabs => {
			let url = tabs[0].url;

			if (items.appendUrl) {
                newText = info.selectionText + " ( " + url + " )";
			};

			if (oldNote) {
				if (items.sendToTop) {
					newNote = newText + separator + oldNote;
				} else {
					newNote = oldNote + separator + newText;
				};
			} else {
				newNote = newText;
			};
			browser.storage.local.set({ [noteName]: newNote });
			browser.runtime.sendMessage({ [noteName]: newNote });
		});
	});
});