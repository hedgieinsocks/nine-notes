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
    note1Name: "#1",
    note2Name: "#2",
    note3Name: "#3",
    note4Name: "#4",
    note5Name: "#5",
    note6Name: "#6",
    note7Name: "#7",
    note8Name: "#8",
    note9Name: "#9",
    sendToTop: false,
    appendUrl: false,
    emptyLine: false,
}

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

browser.storage.local.get(defaults, (options) => {
    let menuNum = Number(options.notesNum) + 1;
    for (let i = 1; i < menuNum; i++) {
        let name = "note" + i + "Name";
        browser.menus.create({
            parentId: "main",
            id: "note" + i,
            title: options[name].toString(),
            contexts: ["selection"],
            documentUrlPatterns: ['<all_urls>']
        });
    };
});

browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.open();
});

browser.menus.onClicked.addListener((info) => {
    browser.storage.local.get(defaults, options => {
        let noteName = info.menuItemId;
        let oldNote = options[info.menuItemId];
        let newText = info.selectionText;
        let newNote;

        if (options.emptyLine) {
            separator = "\n\n";
        } else {
            separator = "\n";
        };

        browser.tabs.query({ currentWindow: true, active: true }, tabs => {
            let url = tabs[0].url;

            if (options.appendUrl) {
                newText = info.selectionText + " ( " + url + " )";
            };

            if (oldNote) {
                if (options.sendToTop) {
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
                [noteName]: newNote
            });
        });
    });
});