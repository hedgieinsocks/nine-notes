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
    name9: "9"
}

function copyNote() {
    let text = [ document.getElementById("name1").innerHTML,
    document.getElementById("note1").innerHTML,
    document.getElementById("name2").innerHTML,
    document.getElementById("note2").innerHTML,
    document.getElementById("name3").innerHTML,
    document.getElementById("note3").innerHTML,
    document.getElementById("name4").innerHTML,
    document.getElementById("note4").innerHTML,
    document.getElementById("name5").innerHTML,
    document.getElementById("note5").innerHTML,
    document.getElementById("name6").innerHTML,
    document.getElementById("note6").innerHTML,
    document.getElementById("name7").innerHTML,
    document.getElementById("note7").innerHTML,
    document.getElementById("name8").innerHTML,
    document.getElementById("note8").innerHTML,
    document.getElementById("name9").innerHTML,
    document.getElementById("note9").innerHTML ].join("\n");
    navigator.clipboard.writeText(text).then();
};

function saveNote() {
    let d = new Date();
    let month = d.getMonth() + 1
    let filename = "9notes_" + d.getFullYear() + "-" + month +
        "-" + d.getDate() + "_" + d.getHours() + "-" + d.getMinutes() + ".txt"
    let text = [ document.getElementById("name1").innerHTML,
    document.getElementById("note1").innerHTML,
    document.getElementById("name2").innerHTML,
    document.getElementById("note2").innerHTML,
    document.getElementById("name3").innerHTML,
    document.getElementById("note3").innerHTML,
    document.getElementById("name4").innerHTML,
    document.getElementById("note4").innerHTML,
    document.getElementById("name5").innerHTML,
    document.getElementById("note5").innerHTML,
    document.getElementById("name6").innerHTML,
    document.getElementById("note6").innerHTML,
    document.getElementById("name7").innerHTML,
    document.getElementById("note7").innerHTML,
    document.getElementById("name8").innerHTML,
    document.getElementById("note8").innerHTML,
    document.getElementById("name9").innerHTML,
    document.getElementById("note9").innerHTML ].join("\n");
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

browser.storage.local.get(defaults, (items) => {
    document.getElementById("name1").innerHTML = "1 | " + items.name1;
    document.getElementById("note1").innerHTML = items.note1;
    if (items.note1) {
        document.getElementById("n1").setAttribute("open", "");
        document.getElementById("name1").style.color = "#ff0039";
    };
    document.getElementById("name2").innerHTML = "2 | " + items.name2;
    document.getElementById("note2").innerHTML = items.note2;
    if (items.note2) {
        document.getElementById("n2").setAttribute("open", "");
        document.getElementById("name2").style.color = "#ff0039";
    };
    document.getElementById("name3").innerHTML = "3 | " + items.name3;
    document.getElementById("note3").innerHTML = items.note3;
    if (items.note3) {
        document.getElementById("n3").setAttribute("open", "");
        document.getElementById("name3").style.color = "#ff0039";
    };
    document.getElementById("name4").innerHTML = "4 | " + items.name4;
    document.getElementById("note4").innerHTML = items.note4;
    if (items.note4) {
        document.getElementById("n4").setAttribute("open", "");
        document.getElementById("name4").style.color = "#ff0039";
    };
    document.getElementById("name5").innerHTML = "5 | " + items.name5;
    document.getElementById("note5").innerHTML = items.note5;
    if (items.note5) {
        document.getElementById("n5").setAttribute("open", "");
        document.getElementById("name5").style.color = "#ff0039";
    };
    document.getElementById("name6").innerHTML = "6 | " + items.name6;
    document.getElementById("note6").innerHTML = items.note6;
    if (items.note6) {
        document.getElementById("n6").setAttribute("open", "");
        document.getElementById("name6").style.color = "#ff0039";
    };
    document.getElementById("name7").innerHTML = "7 | " + items.name7;
    document.getElementById("note7").innerHTML = items.note7;
    if (items.note7) {
        document.getElementById("n7").setAttribute("open", "");
        document.getElementById("name7").style.color = "#ff0039";
    };
    document.getElementById("name8").innerHTML = "8 | " + items.name8;
    document.getElementById("note8").innerHTML = items.note8;
    if (items.note8) {
        document.getElementById("n8").setAttribute("open", "");
        document.getElementById("name8").style.color = "#ff0039";
    };
    document.getElementById("name9").innerHTML = "9 | " + items.name9;
    document.getElementById("note9").innerHTML = items.note9;
    if (items.note9) {
        document.getElementById("n9").setAttribute("open", "");
        document.getElementById("name9").style.color = "#ff0039";
    };
});

document.getElementById("copy-btn").addEventListener('click', function() {
    copyNote();
});

document.getElementById("save-btn").addEventListener('click', function() {
    saveNote();
});