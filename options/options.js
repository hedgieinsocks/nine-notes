const defaults = {
    softWrap: true,
    sendTop: false,
    appendUrl: false,
    emptyLine: false,
    darkTheme: false,
    copyButton: false,
    saveButton: false,
    eraseButton: false,
    fontSize: "14",
    font: "",
    notesNum: 5
}

browser.storage.local.get(defaults, (items) => {
    document.getElementById("softWrap").checked = items.softWrap;
    document.getElementById("sendTop").checked = items.sendTop;
    document.getElementById("appendUrl").checked = items.appendUrl;
    document.getElementById("emptyLine").checked = items.emptyLine;
    document.getElementById("darkTheme").checked = items.darkTheme;
    document.getElementById("copyButton").checked = items.copyButton;
    document.getElementById("saveButton").checked = items.saveButton;
    document.getElementById("eraseButton").checked = items.eraseButton;
    document.getElementById("fontSize").value = items.fontSize;
    document.getElementById("font").value = items.font;
    document.getElementById("notesNum").value = items.notesNum;
});

document.getElementById("softWrap").addEventListener("change", () => {
    browser.storage.local.set({
        softWrap: document.getElementById("softWrap").checked
    });
    browser.runtime.sendMessage({
        softWrap: document.getElementById("softWrap").checked
    });
});

document.getElementById("sendTop").addEventListener("change", () => {
    browser.storage.local.set({
        sendTop: document.getElementById("sendTop").checked
    });
});

document.getElementById("appendUrl").addEventListener("change", () => {
    browser.storage.local.set({
        appendUrl: document.getElementById("appendUrl").checked
    });
});

document.getElementById("emptyLine").addEventListener("change", () => {
    browser.storage.local.set({
        emptyLine: document.getElementById("emptyLine").checked
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

document.getElementById("copyButton").addEventListener("change", () => {
    browser.storage.local.set({
        copyButton: document.getElementById("copyButton").checked
    });
    browser.runtime.sendMessage({
        copyButton: document.getElementById("copyButton").checked
    });
});

document.getElementById("saveButton").addEventListener("change", () => {
    browser.storage.local.set({
        saveButton: document.getElementById("saveButton").checked
    });
    browser.runtime.sendMessage({
        saveButton: document.getElementById("saveButton").checked
    });
});

document.getElementById("eraseButton").addEventListener("change", () => {
    browser.storage.local.set({
        eraseButton: document.getElementById("eraseButton").checked
    });
    browser.runtime.sendMessage({
        eraseButton: document.getElementById("eraseButton").checked
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

document.getElementById("notesNum").addEventListener("change", () => {
    browser.storage.local.set({
        notesNum: document.getElementById("notesNum").value
    });
    browser.runtime.sendMessage({
        notesNum: document.getElementById("notesNum").value
    });
});
