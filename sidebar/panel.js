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
    softWrap: true,
    sendToTop: false,
    darkTheme: false,
    fontSize: "12",
    font: "",
    notesNum: 5
}

function toTop(id) {
    browser.storage.local.get("sendToTop", item => {
        let textArea = document.getElementById(id);
        if (item.sendToTop) {
            textArea.scrollTop = 0;
        };
    });
};

function showNote(id) {
    let notes = document.getElementsByClassName("notes");
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id != id) {
            notes[i].style.display = "none";
        } else {
            notes[i].style.display = "block";
            notes[i].focus();
            toTop(notes[i].id);
        };
    };
};

function saveNote() {
    let notes = document.getElementsByClassName("notes");
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].style.display == "block") {
            let rawName = i + 1
            let d = new Date();
            let month = d.getMonth() + 1
            let filename = 'note' + rawName + '_' + d.getFullYear() + '-' + month +
                '-' + d.getDate() + '_' + d.getHours() + '-' + d.getMinutes() + ".txt"
            let text = notes[i].value
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            break
        };
    };
};

function changeFontSize(fontSize) {
    let notes = document.getElementsByClassName("notes");
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.fontSize = fontSize + "px";
    };
};

function changeFont(font) {
    let notes = document.getElementsByClassName("notes");
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.fontFamily = font;
    };
};

function changeNotesNum(notesNum) {
    for (let i = 1; i <= notesNum; i++) {
        document.getElementById("t" + i).style.display = "block";
    };
    for (let i = Number(notesNum) + 1; i <= 9; i++) {
        document.getElementById("t" + i).style.display = "none";
    };
};

function changeSoftWrap(softWrap) {
    if (softWrap) {
        let notes = document.getElementsByClassName("notes");
        for (let i = 0; i < notes.length; i++) {
            notes[i].style.whiteSpace = "pre-wrap";
        };
    } else {
        let notes = document.getElementsByClassName("notes");
        for (let i = 0; i < notes.length; i++) {
            notes[i].style.whiteSpace = "pre";
        };
    };
};

function changeDarkTheme(darkTheme) {
    if (darkTheme) {
        document.getElementById("cssTheme").href = "panel_dark.css";
    } else {
        document.getElementById("cssTheme").href = "panel.css";
    };
};

browser.storage.local.get(defaults, (options) => {
    document.getElementById("note1").value = options.note1;
    document.getElementById("note2").value = options.note2;
    document.getElementById("note3").value = options.note3;
    document.getElementById("note4").value = options.note4;
    document.getElementById("note5").value = options.note5;
    document.getElementById("note6").value = options.note6;
    document.getElementById("note7").value = options.note7;
    document.getElementById("note8").value = options.note8;
    document.getElementById("note9").value = options.note9;

    changeSoftWrap(options.softWrap);
    changeDarkTheme(options.darkTheme);
    changeFontSize(options.fontSize);
    changeFont(options.font);
    changeNotesNum(options.notesNum);
});

browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.close();
});

for (let i = 1; i < 10; i++) {
    let note = "note" + i
    let tab = "tab" + i
    document.getElementById(tab).addEventListener('click', function () {
        showNote(note);
    });
    document.getElementById(note).addEventListener("input", () => {
        browser.storage.local.set({ [note]: document.getElementById(note).value });
        browser.runtime.sendMessage({ [note]: document.getElementById(note).value });
    });
};

document.getElementById("btn").addEventListener('click', function () {
    saveNote();
});

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
    } else if (message.fontSize != null) {
        changeFontSize(message.fontSize);
    } else if (message.darkTheme != null) {
        changeDarkTheme(message.darkTheme);
    } else if (message.font != null) {
        changeFont(message.font);
    };
});

browser.runtime.onMessage.addListener((message) => {
    if (message.notesNum != null) {
        document.getElementById('tab1').checked = true;
        showNote('note1');
        changeNotesNum(message.notesNum);
    };
});
