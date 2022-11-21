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

function roundTo(n, x) {
    return Math.ceil(x / n) * n;
};

function toTop() {
    let textArea = document.getElementById("content");
    browser.storage.local.get("sendTop", (items) => {
        if (items.sendTop) {
            textArea.scrollTop = 0;
        };
    });
};

function showNote(arg) {
    let textArea = document.getElementById("content")
    document.getElementById(arg).checked = true;
    browser.storage.local.get(arg, (items) => {
        textArea.value = items[arg] || "";
    });
    textArea.focus();
    toTop();
};

function copyNote() {
    noteContent = document.getElementById("content").value;
    navigator.clipboard.writeText(noteContent).then();
};

function saveNote() {
    let activeNote = document.querySelector(".tab:checked")
    let d = new Date();
    let month = d.getMonth() + 1
    let filename = activeNote.id + "_" + d.getFullYear() + "-" + month +
        "-" + d.getDate() + "_" + d.getHours() + "-" + d.getMinutes() + ".txt"
    let text = document.getElementById("content").value
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

function eraseNote() {
    document.getElementById("content").value = "";
    let objectName = document.querySelector(".tab:checked").id
    browser.storage.local.set({
        [objectName]: document.getElementById("content").value
    });
};

function changeCopyButton(arg) {
    let button = document.getElementById("copy-btn");
    if (arg) {
        button.style.display = "none";
    } else {
        button.style.display = "block";
    };
};

function changeSaveButton(arg) {
    let button = document.getElementById("save-btn");
    if (arg) {
        button.style.display = "none";
    } else {
        button.style.display = "block";
    };
};

function changeEraseButton(arg) {
    let button = document.getElementById("erase-btn");
    if (arg) {
        button.style.display = "none";
    } else {
        button.style.display = "block";
    };
};

function changeFontSize(arg) {
    document.getElementById("content").style.fontSize = arg + "px";
};

function changeFont(arg) {
    document.getElementById("content").style.fontFamily = arg;
};

function changeNotesNum(arg) {
    showNote("note1");
    document.querySelectorAll(".title").forEach((i, n) => {
        if (n < arg) {
            i.style.display = "block";
        } else {
            i.style.display = "none";
        };
    });
    resizeTabs();
    recreateSubMenus();
};

function changeSoftWrap(arg) {
    let textArea = document.getElementById("content");
    if (arg) {
        textArea.style.whiteSpace = "pre-wrap";
    } else {
        textArea.style.whiteSpace = "pre";
    };
};

function changeTheme(arg) {
    if (arg) {
        document.getElementById("theme").href = "sidebar_dark.css";
    } else {
        document.getElementById("theme").href = "sidebar.css";
    };
};

function resizeTabs() {
    document.querySelectorAll(".title").forEach(i => {
        document.getElementById(i.id).style.minWidth = "auto";
        let width = document.getElementById(i.id).offsetWidth;
        document.getElementById(i.id).style.minWidth = roundTo(36, width) + "px";
    });
};

function recreateSubMenus() {
    browser.storage.local.get(defaults, (items) => {
        let menuNum = Number(items.notesNum) + 1;
        for (let i = 1; i < menuNum; i++) {
            browser.menus.remove("note" + i).then();
            let name = "name" + i;
            browser.menus.create({
                parentId: "main",
                id: "note" + i,
                title: i + " | " + items[name],
                contexts: ["selection"],
                documentUrlPatterns: ['<all_urls>']
            });
        };

        for (let i = menuNum; i < 10; i++) {
            browser.menus.remove("note" + i).then();
        };
    });
};

browser.storage.local.get(defaults, (items) => {
    document.getElementById("name1").innerText = items.name1;
    document.getElementById("name2").innerText = items.name2;
    document.getElementById("name3").innerText = items.name3;
    document.getElementById("name4").innerText = items.name4;
    document.getElementById("name5").innerText = items.name5;
    document.getElementById("name6").innerText = items.name6;
    document.getElementById("name7").innerText = items.name7;
    document.getElementById("name8").innerText = items.name8;
    document.getElementById("name9").innerText = items.name9;

    changeTheme(items.darkTheme);
    changeNotesNum(items.notesNum);
    changeCopyButton(items.copyButton)
    changeSaveButton(items.saveButton)
    changeEraseButton(items.eraseButton)
    changeSoftWrap(items.softWrap);
    changeFontSize(items.fontSize);
    changeFont(items.font);
});

browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.close();
});

document.querySelectorAll(".tab").forEach((i) => {
    document.getElementById(i.id).addEventListener('click', function() {
        showNote(i.id);
    });
});

document.getElementById("content").addEventListener("input", function() {
    let objectName = document.querySelector(".tab:checked").id
    browser.storage.local.set({
        [objectName]: document.getElementById("content").value
    });
});

document.getElementById("save-btn").addEventListener('click', function() {
    saveNote();
});

document.getElementById("erase-btn").addEventListener('click', function() {
    eraseNote();
});

document.getElementById("copy-btn").addEventListener('click', function() {
    copyNote();
});

document.querySelectorAll(".title").forEach(i => i.addEventListener("auxclick", event => {
    event.preventDefault();
    document.getElementById(event.target.id).contentEditable = true;
    setTimeout(function() {
        if (document.activeElement !== event) {
            event.contentEditable = false;
        };
    }, 300);
}));

document.querySelectorAll(".title").forEach(i => i.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === "Tab" || event.key === " ") {
        event.preventDefault();
    };
}));

document.querySelectorAll(".title").forEach(i => i.addEventListener("blur", event => {
    document.getElementById(event.target.id).contentEditable = false;
    let newTitle = event.target.innerText || event.target.getAttribute('name')
    document.getElementById(event.target.id).innerText = newTitle
    browser.storage.local.set({
        [event.target.id]: [newTitle]
    });
    resizeTabs()
    recreateSubMenus();
}));

browser.runtime.onMessage.addListener((message) => {
    if (message.refresh) {
        let activeNote = document.querySelector(".tab:checked").id
        if (activeNote == message.refresh.toString()) {
            showNote(activeNote);
        };
    } else if (message.softWrap != null) {
        changeSoftWrap(message.softWrap);
    } else if (message.darkTheme != null) {
        changeTheme(message.darkTheme);
    } else if (message.copyButton != null) {
        changeCopyButton(message.copyButton);
    } else if (message.saveButton != null) {
        changeSaveButton(message.saveButton);
    } else if (message.eraseButton != null) {
        changeEraseButton(message.eraseButton);
    } else if (message.fontSize) {
        changeFontSize(message.fontSize);
    } else if (message.font) {
        changeFont(message.font);
    } else if (message.notesNum) {
        changeNotesNum(message.notesNum);
    };
});