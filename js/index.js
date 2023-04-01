"use strict"

//! POP-UP
const regBtn = document.querySelectorAll('.team-reg');
const popUpWindow = document.querySelector('.pop-up');
const closeBtn = document.querySelector('.close-btn');

if (regBtn.length > 0) {
    regBtn.forEach(eachRegBtn => {
        eachRegBtn.addEventListener("click", showPopUp)
        function showPopUp() {
            popUpWindow.classList.add('_visible');
            document.body.style.overflow = "hidden";
        }
    })
}

if (closeBtn) {
    document.addEventListener("keyup", (event) => {
        if (event.code === 'Escape') { hidePopUp() };
    })

    closeBtn.addEventListener("click", hidePopUp);
    function hidePopUp() {
        popUpWindow.classList.remove('_visible');
        document.body.style.overflow = "auto";
    }
}

//! МЕНЮ-БУРГЕР
const menuBtn = document.querySelector('.menu-btn');
const header = document.querySelector('header');
const headerPhoneNumber = document.querySelector('header #phone-number');
const headerList = document.querySelector('.header-list');
const menuBody = document.querySelector('.menu-body');

if (window.innerWidth <= 1140) {
    menuBtn.classList.add('_visible');
} else {
    menuBtn.classList.remove('_visible');
    headerList.classList.add('_visible');
    headerPhoneNumber.classList.add('_visible');
}

window.addEventListener("resize", () => {
    if (window.innerWidth <= 1140) {
        menuBtn.classList.add('_visible');
        headerList.classList.remove('_visible');
        headerPhoneNumber.classList.remove('_visible');
    } else {
        menuBtn.classList.remove('_visible');
        menuBtn.classList.remove('_active');
        headerList.classList.add('_visible');
        headerPhoneNumber.classList.add('_visible');

        header.classList.remove('_active');
        menuBody.classList.remove('_active');
        document.body.classList.remove('_lock');
    }
})

if (window.scrollY > 0) {
    header.classList.add('_scrolled');
}

document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('_scrolled');
    } else header.classList.remove('_scrolled');
})

//! ==============МЕНЮ-БУРГЕР==============
//! Кнопка
if (menuBtn) {
    document.addEventListener("click", function (event) {
        if (event.target.closest('.menu-btn')) {
            showMenuBody();
        } else if (!event.target.closest('.menu-body') && !event.target.closest('header')) {
            hideMenuBody();
        }
    })

    document.addEventListener("keyup", (event) => {
        if (event.code === 'Escape') { hideMenuBody() };
    })
}

function showMenuBody() {
    menuBtn.classList.toggle('_active');
    menuBody.classList.toggle('_active');
    header.classList.toggle('_active');
    document.body.classList.toggle('_lock');
}

function hideMenuBody() {
    menuBtn.classList.remove('_active');
    menuBody.classList.remove('_active');
    header.classList.remove('_active');
    document.body.classList.remove('_lock');
}
//! ==========

//! Прокрутка при клике
const listLink = document.querySelectorAll('.list__link[data-goto]');
if (listLink.length > 0) {
    listLink.forEach(eachListLink => {
        eachListLink.addEventListener("click", goToBlockFunc)
    });

    function goToBlockFunc(e) {
        const listLink = e.target;
        if (listLink.dataset.goto && document.querySelector(listLink.dataset.goto)) {
            const gotoBlock = document.querySelector(listLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight - 20;

            document.body.classList.remove('_lock');

            if (menuBtn.classList.contains('_active')) {
                menuBtn.classList.remove('_active');
                menuBody.classList.remove('_active');
                header.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            })
            e.preventDefault();
        }
    }
}
