function toggleClass (element, className) {
    if (element) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    }
}

function isViewPortMaxWidth(width) {
    let viewportWidth;
    if (document.compatMode === 'BackCompat') {
        viewportWidth = document.body.clientWidth;
    } else {
        viewportWidth = document.documentElement.clientWidth;
    }

    return viewportWidth <= width;
}

function hamburgerButtonClick() {
    const body = document.getElementById('body');
    const menuContainer = this.parentElement;

    const openedMenuClassName = 'menu-opened';
    const disableScrollClassName = 'disabled-scroll';

    toggleClass(menuContainer, openedMenuClassName);
    toggleClass(body, disableScrollClassName);
}

function correctImageSectionPaddings() {
    const imageTextSections = document.getElementsByClassName('image-text-section');

    if (imageTextSections.length > 0) {
        if (isViewPortMaxWidth(1269)) {
            for (let $i = 0; $i < imageTextSections.length; $i++) {
                let $titleElems = imageTextSections[$i].getElementsByClassName('title');

                if ($titleElems.length > 0) {
                    let $titleHeight = $titleElems[0].offsetHeight;

                    imageTextSections[$i].style.paddingTop = $titleHeight + 'px';
                }
            }
        } else {
            for (let $i = 0; $i < imageTextSections.length; $i++) {
                imageTextSections[$i].style.paddingTop = '';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-button');

    if (hamburgerButton) {
        hamburgerButton.addEventListener("click", hamburgerButtonClick, false);
    }

    correctImageSectionPaddings();
});

window.addEventListener('resize',function(event) {
    correctImageSectionPaddings();
});