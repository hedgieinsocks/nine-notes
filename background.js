const defaults = {
    note1: "",
    note2: "",
    note3: "",
    note4: "",
    note5: "",
    note6: "",
    note7: "",
    note8: "",
    note9: "",
    name1: "1",
    name2: "2",
    name3: "3",
    name4: "4",
    name5: "5",
    name6: "6",
    name7: "7",
    name8: "8",
    name9: "9",
    sendTop: false,
    appendUrl: false,
    emptyLine: false,
    notesNum: 5
}

browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.open();
});


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

browser.storage.local.get(defaults, (items) => {
    let menuNum = Number(items.notesNum) + 1;
    for (let i = 1; i < menuNum; i++) {
        let name = "name" + i;
        browser.menus.create({
            parentId: "main",
            id: "note" + i,
            title: i + " | " + items[name],
            contexts: ["selection"],
            documentUrlPatterns: ['<all_urls>']
        });
    };
});

browser.menus.onClicked.addListener((data) => {
    browser.storage.local.get(defaults, (items) => {
        let noteName = data.menuItemId;
        let oldNote = items[data.menuItemId];
        let newText;
        let newNote;

        if (items.emptyLine) {
            separator = "\n\n";
        } else {
            separator = "\n";
        };

        browser.tabs.query({ currentWindow: true, active: true }, tabs => {
            let url = tabs[0].url;

            if (items.appendUrl) {
                newText = data.selectionText + " ( " + url + " )";
            } else {
                newText = data.selectionText;
            };

            if (oldNote) {
                if (items.sendTop) {
                    newNote = newText + separator + oldNote;
                } else {
                    newNote = oldNote + separator + newText;
                };
            } else {
                newNote = newText;
            };

            browser.storage.local.set({
                [noteName]: newNote
            });
            browser.runtime.sendMessage({
                refresh: [noteName]
            });
        });
    });
});