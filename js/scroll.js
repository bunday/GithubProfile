window.onscroll = function () {
  repositionHeader();
};
const staticHeader = document.getElementById("static-header");
const sticky = staticHeader.offsetTop;
const userDetails = document.getElementById("userDetails");
const smallUserInfo = document.getElementById("smallUserInfo");

function repositionHeader() {
  if (window.pageYOffset > sticky) {
    staticHeader.classList.add("sticky");
  } else {
    staticHeader.classList.remove("sticky");
  }
  if (userDetails.getBoundingClientRect().y < 0) {
    smallUserInfo.classList.add("show");
    smallUserInfo.classList.remove("hide");
  } else {
    smallUserInfo.classList.add("hide");
    smallUserInfo.classList.remove("show");
  }
}
