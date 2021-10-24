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
    softWrap: true,
    sendToTop: false,
    appendUrl: false,
    emptyLine: false,
    darkTheme: false,
    fontSize: "14",
    font: "",
    notesNum: 5
}

names = {
    note1Name: "#1",
    note2Name: "#2",
    note3Name: "#3",
    note4Name: "#4",
    note5Name: "#5",
    note6Name: "#6",
    note7Name: "#7",
    note8Name: "#8",
    note9Name: "#9"
}

function roundTo(n, x) {
    return Math.ceil(x / n) * n;
};

function toTop(id) {
    browser.storage.local.get("sendToTop", option => {
        let textArea = document.getElementById(id);
        if (option.sendToTop) {
            textArea.scrollTop = 0;
        };
    });
};

function showNote(id) {
    document.querySelectorAll(".notes").forEach(i => {
        if (i.id != id) {
            i.style.display = "none";
        } else {
            i.style.display = "block";
            i.focus();
            toTop(i.id);
        };
    });
};

function saveNote() {
    document.querySelectorAll(".notes").forEach(i => {
        if (i.style.display == "block") {
            let d = new Date();
            let month = d.getMonth() + 1
            let filename = i.id + '_' + d.getFullYear() + '-' + month +
                '-' + d.getDate() + '_' + d.getHours() + '-' + d.getMinutes() + ".txt"
            let text = i.value
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        };
    });
};


function changeFontSize(fontSize) {
    document.querySelectorAll(".notes").forEach(i => {
        i.style.fontSize = fontSize + "px";
    });
};

function changeFont(font) {
    document.querySelectorAll(".notes").forEach(i => {
        i.style.fontFamily = font;
    });
};

function changeNotesNum(notesNum) {
    document.querySelectorAll(".title").forEach((i, n) => {
        i.style.display = "block";
    });
    document.querySelectorAll(".title").forEach((i, n) => {
        if (n >= notesNum) {
            i.style.display = "none";
        };
    });
    recreateSubMenus();
};

function changeSoftWrap(softWrap) {
    if (softWrap) {
        document.querySelectorAll(".notes").forEach(i => {
            i.style.whiteSpace = "pre-wrap";
        });
    } else {
        document.querySelectorAll(".notes").forEach(i => {
            i.style.whiteSpace = "pre";
        });
    };
};

function changeTheme(darkTheme) {
    if (darkTheme) {
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
    browser.storage.local.get(defaults, (options) => {
        let menuNum = Number(options.notesNum) + 1;
        for (let i = 1; i < menuNum; i++) {
            browser.menus.remove("note" + i).then();
            let name = "note" + i + "Name";
            browser.menus.create({
                parentId: "main",
                id: "note" + i,
                title: options[name].toString(),
                contexts: ["selection"],
                documentUrlPatterns: ['<all_urls>']
            });
        };

        for (let i = menuNum; i < 10; i++) {
            browser.menus.remove("note" + i).then();
        };
    });
};

browser.storage.local.get(defaults, (options) => {
    document.getElementById("note1Name").innerText = options.note1Name;
    document.getElementById("note2Name").innerText = options.note2Name;
    document.getElementById("note3Name").innerText = options.note3Name;
    document.getElementById("note4Name").innerText = options.note4Name;
    document.getElementById("note5Name").innerText = options.note5Name;
    document.getElementById("note6Name").innerText = options.note6Name;
    document.getElementById("note7Name").innerText = options.note7Name;
    document.getElementById("note8Name").innerText = options.note8Name;
    document.getElementById("note9Name").innerText = options.note9Name;
    document.getElementById("note1").value = options.note1;
    document.getElementById("note2").value = options.note2;
    document.getElementById("note3").value = options.note3;
    document.getElementById("note4").value = options.note4;
    document.getElementById("note5").value = options.note5;
    document.getElementById("note6").value = options.note6;
    document.getElementById("note7").value = options.note7;
    document.getElementById("note8").value = options.note8;
    document.getElementById("note9").value = options.note9;

    changeNotesNum(options.notesNum);
    resizeTabs();
    changeTheme(options.darkTheme);
    changeSoftWrap(options.softWrap);
    changeFontSize(options.fontSize);
    changeFont(options.font);
});

browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.close();
});

document.getElementById("btn").addEventListener('click', function() {
    saveNote();
});

document.querySelectorAll(".notes").forEach((i, n) => {
    let tab = "tab" + (n + 1);
    document.getElementById(tab).addEventListener('click', function() {
        showNote(i.id);
    });
    document.getElementById(i.id).addEventListener("input", function() {
        browser.storage.local.set({
            [i.id]: document.getElementById(i.id).value
        });
    });
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
    let newTitle = event.target.innerText || ":-("
    document.getElementById(event.target.id).innerText = newTitle
    browser.storage.local.set({
        [event.target.id]: newTitle
    });
    recreateSubMenus();
    document.getElementById(event.target.id).style.minWidth = "auto";
    let width = document.getElementById(event.target.id).offsetWidth;
    document.getElementById(event.target.id).style.minWidth = roundTo(36, width) + "px";
}));

browser.runtime.onMessage.addListener((message) => {
    if (message.note1 != null) {
        document.getElementById("note1").value = message.note1;
        toTop("note1");
    } else if (message.note2 != null) {
        document.getElementById("note2").value = message.note2;
        toTop("note2");
    } else if (message.note3 != null) {
        document.getElementById("note3").value = message.note3;
        toTop("note3");
    } else if (message.note4 != null) {
        document.getElementById("note4").value = message.note4;
        toTop("note4");
    } else if (message.note5 != null) {
        document.getElementById("note5").value = message.note5;
        toTop("note5");
    } else if (message.note6 != null) {
        document.getElementById("note6").value = message.note6;
        toTop("note6");
    } else if (message.note7 != null) {
        document.getElementById("note7").value = message.note7;
        toTop("note7");
    } else if (message.note8 != null) {
        document.getElementById("note8").value = message.note8;
        toTop("note8");
    } else if (message.note9 != null) {
        document.getElementById("note9").value = message.note9;
        toTop("note9");
    } else if (message.softWrap != null) {
        changeSoftWrap(message.softWrap);
    } else if (message.darkTheme != null) {
        changeTheme(message.darkTheme);
    } else if (message.fontSize != null) {
        changeFontSize(message.fontSize);
    } else if (message.font != null) {
        changeFont(message.font);
    } else if (message.notesNum != null) {
        document.getElementById("tab1").checked = true;
        showNote("note1");
        changeNotesNum(message.notesNum);
        resizeTabs();
    };
});