"use strict";

function toggleClass(element, className) {
  if (element) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
}
function isViewPortMaxWidth(width) {
  var viewportWidth;
  if (document.compatMode === 'BackCompat') {
    viewportWidth = document.body.clientWidth;
  } else {
    viewportWidth = document.documentElement.clientWidth;
  }
  return viewportWidth <= width;
}
function hamburgerButtonClick() {
  var body = document.getElementById('body');
  var menuContainer = this.parentElement;
  var openedMenuClassName = 'menu-opened';
  var disableScrollClassName = 'disabled-scroll';
  toggleClass(menuContainer, openedMenuClassName);
  toggleClass(body, disableScrollClassName);
}
function correctImageSectionPaddings() {
  var imageTextSections = document.getElementsByClassName('image-text-section');
  if (imageTextSections.length > 0) {
    if (isViewPortMaxWidth(1269)) {
      for (var $i = 0; $i < imageTextSections.length; $i++) {
        var $titleElems = imageTextSections[$i].getElementsByClassName('title');
        if ($titleElems.length > 0) {
          var $titleHeight = $titleElems[0].offsetHeight;
          imageTextSections[$i].style.paddingTop = $titleHeight + 'px';
        }
      }
    } else {
      for (var _$i = 0; _$i < imageTextSections.length; _$i++) {
        imageTextSections[_$i].style.paddingTop = '';
      }
    }
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var hamburgerButton = document.getElementById('hamburger-button');
  if (hamburgerButton) {
    hamburgerButton.addEventListener("click", hamburgerButtonClick, false);
  }
  correctImageSectionPaddings();
});
window.addEventListener('resize', function (event) {
  correctImageSectionPaddings();
});