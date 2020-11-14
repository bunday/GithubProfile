window.onscroll = function() {repositionHeader()};
const staticHeader = document.getElementById("static-header");
const sticky = staticHeader.offsetTop;

function repositionHeader() {
  if (window.pageYOffset > sticky) {
    staticHeader.classList.add("sticky");
  } else {
    staticHeader.classList.remove("sticky");
  }
}