// мультиязычный сайт
const select = document.querySelector('select');
select.value = localStorage.getItem('current-language');

function changeLanguage() {
    for (const key in textObject) {
        const elem = document.querySelector(`[data-lang=${key}]`);
        if (elem) {
            elem.innerHTML = textObject[key][select.value];
        }
    }
}

select.addEventListener('change', changeSelectOption);
function changeSelectOption() {
    localStorage.setItem('current-language', select.value);
    changeLanguage();
    location.href = window.location.pathname + '#' + select.value;
    switch (select.value) {
        case 'en':
            document.querySelector('form>input').setAttribute("placeholder", "Your email address");
            break;
        case 'ru':
            document.querySelector('form>input').setAttribute("placeholder", "Адрес электронной почты");
            break;
        case 'be':
            document.querySelector('form>input').setAttribute("placeholder", "Адрас электроннай пошты");
            break;
    }
}

function changeURL() {
	let hash = window.location.hash;
	hash = hash.slice(1);
    const allLangs = ['en', 'ru', 'be'];
    if (!allLangs.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    changeLanguage();
    switch (hash) {
        case 'en':
            document.querySelector('form>input').setAttribute("placeholder", "Your email address");
            break;
        case 'ru':
            document.querySelector('form>input').setAttribute("placeholder", "Адрес электронной почты");
            break;
        case 'be':
            document.querySelector('form>input').setAttribute("placeholder", "Адрас электроннай пошты");
            break;
    }
}
changeURL();

// трансформация стрелки при нажатии на "select"
const selectWrapper = document.querySelector('.select-wrapper');
document.addEventListener("click", transformArrow);
function transformArrow(e) {
    if (e.target === select) {
        selectWrapper.classList.toggle('_transform');
    }
    if (e.target !== select) {
        selectWrapper.classList.remove('_transform');
    }
}
select.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        selectWrapper.classList.toggle('_transform');
    }
});

// tabindex для табов
const tabs = document.querySelector('.block3-text__tabs');
const label1 = document.querySelector('.label-1');
const label2 = document.querySelector('.label-2');
const label3 = document.querySelector('.label-3');
const input1 = document.querySelector('#tab-btn-1');
const input2 = document.querySelector('#tab-btn-2');
const input3 = document.querySelector('#tab-btn-3');

tabs.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        if (label1 === e.target) {
            input1.checked = "true";
        }
        if (label2 === e.target) {
            input2.checked = "true";
        }
        if (label3 === e.target) {
            input3.checked = "true";
        }
    }
});

// слайдер
const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    keyboard: true,
    speed: 500,
    loop: true,
    slideToClickedSlide: true,
    effect: "cards",
});

// появление комментариев при скролле
var options = {
    threshold: 0.7
};
var callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('_transform');
        } else {
            entry.target.classList.remove('_transform');
        }
    });
};
var observer = new IntersectionObserver(callback, options);
var animItems = document.querySelectorAll('.anim-item');
animItems.forEach(animItem => {
    observer.observe(animItem);
});

// внешняя обводка для “input” и “select”
document.body.addEventListener('mousedown', function() {
    document.body.classList.add('_using-mouse');
});
document.body.addEventListener('keydown', function(e) {
    if (e.key === "Tab") {
        document.body.classList.remove('_using-mouse');
    }
});

// бургер-меню
const wrapper = document.querySelector('.wrapper');
const menuIcon = document.querySelector('.menu__icon');
const menuNav = document.querySelector('nav');

menuIcon.addEventListener('click', function() {
    wrapper.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
	menuNav.classList.toggle('_active');
});
const menuLinks = document.querySelectorAll('[data-goto]');
menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", clickOnLink);
});
function clickOnLink(e) {
    const menuLink = e.target;
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
    if (menuIcon.classList.contains('_active')) {
        wrapper.classList.remove('_lock');
        menuIcon.classList.remove('_active');
        menuNav.classList.remove('_active');
    }
    window.scrollTo({
		top: gotoBlockValue
	});
    e.preventDefault();
}

// спойлеры
const spButtons = document.querySelectorAll(".sp-button");
    spButtons.forEach(pressedSpButton => {
    pressedSpButton.addEventListener("click", function() {
        this.classList.toggle("_open");
        let spContent = this.nextElementSibling;
        if (this.classList.contains("_open")){
            spContent.style.maxHeight = spContent.scrollHeight + "px";
        } else {
            spContent.style.maxHeight = "";
        }
        spButtons.forEach(anySpButton => {
            let spContent = anySpButton.nextElementSibling;
            if (anySpButton != this) {
                spContent.style.maxHeight = "";
                anySpButton.classList.remove("_open");
            }
        });
    });
});