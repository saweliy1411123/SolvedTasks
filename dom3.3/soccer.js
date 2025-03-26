let draggableItems = document.querySelectorAll(".draggable");

function makeDraggable(element) {
  element.onmousedown = function (event) {
    event.preventDefault();

    let rect = element.getBoundingClientRect();
    let shiftX = event.clientX - rect.left;
    let shiftY = event.clientY - rect.top;

    element.style.position = "absolute";
    element.style.zIndex = 1000;
    document.body.append(element);

    function moveAt(pageX, pageY) {
      let left = pageX - shiftX;
      let top = pageY - shiftY;

      let maxLeft = document.documentElement.scrollWidth - element.offsetWidth;
      let maxTop = document.documentElement.scrollHeight - element.offsetHeight;

      if (left < 0) left = 0;
      if (left > maxLeft) left = maxLeft;

      if (top < 0) top = 0;
      if (top > maxTop) top = maxTop;

      element.style.left = left + "px";
      element.style.top = top + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    });
  };

  element.ondragstart = function () {
    return false;
  };
}

for (let draggable of draggableItems) {
  makeDraggable(draggable);
}
