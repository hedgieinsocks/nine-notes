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
	browser.storage.local.get([info.menuItemId, "sendToTop"], items => {
		let noteName = info.menuItemId
		let oldNote = items[info.menuItemId]

		if (oldNote) {
			if (items.sendToTop) {
				newNote = info.selectionText + "\n" + oldNote;
			} else {
				newNote = oldNote + "\n" + info.selectionText;
			};
		} else {
			newNote = info.selectionText;
		};
		browser.storage.local.set({ [noteName]: newNote });
		browser.runtime.sendMessage({ [noteName]: newNote });
	});
});