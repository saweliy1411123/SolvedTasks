let table = document.getElementById("bagua-table");
let isEditing = false;

table.addEventListener("click", function (e) {
    let target = e.target;
    if (target.tagName != "TD") return;

    if (isEditing) return; 

    let textarea = document.createElement("textarea");
    textarea.value = target.innerHTML;
    textarea.style.width = target.clientWidth + "px";
    textarea.style.height = target.clientHeight + "px";
    textarea.style.position = "absolute";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.padding = "0";
    textarea.style.resize = "none";

    target.style.position = "relative";
    target.append(textarea);
    textarea.focus();

    let buttonWrapper = document.createElement("div");
    buttonWrapper.style.position = "absolute";
    buttonWrapper.style.top = target.clientHeight + "px";
    buttonWrapper.style.left = "0";

    let buttonOk = document.createElement("button");
    buttonOk.textContent = "OK";
    let buttonCancel = document.createElement("button");
    buttonCancel.textContent = "Cancel";

    buttonWrapper.append(buttonOk, buttonCancel);
    target.append(buttonWrapper);

    buttonOk.addEventListener("click", function () {
        target.innerHTML = textarea.value;
        isEditing = false;
    });

    buttonCancel.addEventListener("click", function () {
        textarea.remove();
        buttonWrapper.remove();
        isEditing = false;
    });

    isEditing = true;
});