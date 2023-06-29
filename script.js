window.addEventListener("DOMContentLoaded", function() {
  var dragItems = document.querySelectorAll(".gallery-image");
  var textBox = document.querySelector(".text-box");
  var selectedImage = null;

  dragItems.forEach(function(item) {
    item.addEventListener("dragstart", function(event) {
      event.dataTransfer.setData("text/plain", event.target.src);
    });
  });

  textBox.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  textBox.addEventListener("drop", function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var offsetX = event.clientX - textBox.getBoundingClientRect().left;
    var offsetY = event.clientY - textBox.getBoundingClientRect().top;

    var resizableWrapper = document.createElement("div");
    resizableWrapper.classList.add("resizable-wrapper");
    resizableWrapper.style.left = offsetX + "px";
    resizableWrapper.style.top = offsetY + "px";

    var image = document.createElement("img");
    image.setAttribute("src", data);
    image.setAttribute("alt", "Dragged Image");
    image.classList.add("resizable-image");

    resizableWrapper.appendChild(image);

    textBox.appendChild(resizableWrapper);

    image.addEventListener("mousedown", function(event) {
      selectedImage = event.target;
      var prevX = event.clientX;
      var prevY = event.clientY;
      var prevWidth = selectedImage.offsetWidth;
      var prevHeight = selectedImage.offsetHeight;

      function resizeImage(event) {
        var widthDiff = event.clientX - prevX;
        var heightDiff = event.clientY - prevY;

        var newWidth = prevWidth + widthDiff;
        var newHeight = prevHeight + heightDiff;

        selectedImage.style.width = newWidth + "px";
        selectedImage.style.height = newHeight + "px";
      }

      function stopResize() {
        window.removeEventListener("mousemove", resizeImage);
        window.removeEventListener("mouseup", stopResize);
      }

      window.addEventListener("mousemove", resizeImage);
      window.addEventListener("mouseup", stopResize);
    });
  });

  textBox.addEventListener("dblclick", function(event) {
    var target = event.target;
    if (target.classList.contains("resizable-image")) {
      target.parentNode.parentNode.removeChild(target.parentNode);
    }
  });

  var sendButton = document.querySelector(".send-button");
  sendButton.addEventListener("click", function() {
    var messageContent = textBox.innerHTML;
    localStorage.setItem("messageContent", messageContent);
    var width = textBox.offsetWidth;
    var height = textBox.offsetHeight;
    localStorage.setItem("messageWidth", width);
    localStorage.setItem("messageHeight", height);
    window.open("message.html", "_blank");
  });
});
function sendMessage() {
  var message = document.getElementById("textBox").innerHTML;
  var images = document.getElementById("textBox").getElementsByTagName("img");
  var imageTags = "";
  for (var i = 0; i < images.length; i++) {
    var src = images[i].src;
    var alt = images[i].alt;
    imageTags += '<img src="' + src + '" alt="' + alt + '" class="resizable-image">';
  }
  var messageContent = '<p>' + message + '</p>' + imageTags;
  localStorage.setItem("messageContent", messageContent);
  window.open("message.html", "_blank");
}


