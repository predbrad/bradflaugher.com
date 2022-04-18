function toggleClass (element, className) {
    if (element) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    }
}

function hamburgerButtonClick() {
    const body = document.getElementById('body');
    const menuContainer = this.parentElement;

    const openedMenuClassName = 'menu-opened';
    const disableScrollClassName = 'disabled-scroll';

    toggleClass(menuContainer, openedMenuClassName);
    toggleClass(body, disableScrollClassName);
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-button');

    if (hamburgerButton) {
        hamburgerButton.addEventListener("click", hamburgerButtonClick, false);
    }

});