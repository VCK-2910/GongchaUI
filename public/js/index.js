//set voucher
const voucher = JSON.parse(localStorage.getItem('localVoucher'));

//handle slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
}

//handle logined
function checkLocalStorage() {
    var loginContainer = document.querySelector('.action-container');
    var prevUserAccount = JSON.parse(localStorage.getItem('prevUserAccount'));
    if (prevUserAccount) {
        loginContainer.style.display = 'none';
        var actionContainer = document.createElement('a');
        actionContainer.setAttribute('href', 'Page/Profile/Profile.html');
        actionContainer.setAttribute('class', 'user-action-container');

        var userIcon = document.createElement('img');
        userIcon.setAttribute('src', './assets/icons//userIcon.svg');
        userIcon.setAttribute('class', 'user-icon');

        var userNamePara = document.createElement('p');
        userNamePara.setAttribute('class', 'navbar-container');
        // Lấy phần tên đầu tiên của người dùng
        var firstName = prevUserAccount.name.split(' ')[0];
        userNamePara.textContent = firstName;

        actionContainer.appendChild(userIcon);
        actionContainer.appendChild(userNamePara);

        document.querySelector('.action').appendChild(actionContainer);

        var cartContainer = document.createElement('a');
        cartContainer.setAttribute('href', 'Page/Cart/Cart.html');
        cartContainer.setAttribute('class', 'cart-container');

        var cartIcon = document.createElement('img');
        cartIcon.setAttribute('src', './assets/icons//cartIcon.svg');

        cartContainer.appendChild(cartIcon);
        document.querySelector('.action').appendChild(cartContainer);
    }
}
checkLocalStorage();

//handle search
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search input');
const searchContainer = document.querySelector('.search');

const searchResultContainer = document.createElement('div');
searchResultContainer.classList.add('search-result-container');
searchContainer.appendChild(searchResultContainer);

const searchResultItems = document.createElement('ul');
searchResultItems.classList.add('search-result-items');
searchResultContainer.appendChild(searchResultItems);

const localProducts = JSON.parse(localStorage.getItem('localProducts'));

searchBtn.addEventListener('click', () => {
    if (searchInput.value) {
        // Lưu giá trị của searchInput vào localStorage dưới dạng một đối tượng có key là 'prevSearchProduct'
        localStorage.setItem('prevSearchProduct', JSON.stringify({ name: searchInput.value.toLowerCase().trim() }));
        // Chuyển hướng đến trang sản phẩm
        window.location.href = './Page/Product/Product.html';
    } else {
        alert('Vui lòng nhập sản phẩm');
    }
});

function createProductElement(product) {
    const li = document.createElement('li');
    li.classList.add('search-result-item');
    const p = document.createElement('p');
    p.classList.add('search-result-name');
    p.textContent = product.name;
    li.appendChild(p);
    li.addEventListener('click', function () {
        localStorage.setItem('prevSearchProduct', JSON.stringify({ name: product.name.toLowerCase().trim() })); // Lưu sản phẩm được chọn vào localStorage
        window.location.href = './Page/Product/Product.html';
    });
    return li;
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        searchResultContainer.style.display = 'none';
        return;
    }
    const filteredProducts = localProducts.filter((product) => product.name.toLowerCase().includes(searchTerm));
    renderSearchResults(filteredProducts);
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (e.target.value.trim() === '') {
            e.preventDefault();
        } else {
            localStorage.setItem('prevSearchProduct', JSON.stringify({ name: e.target.value.toLowerCase().trim() }));
            window.location.href = './Page/Product/Product.html';
        }
    }
});

function renderSearchResults(products) {
    searchResultItems.innerHTML = '';
    if (products.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Không có sản phẩm phù hợp';
        searchResultItems.appendChild(li);
    } else {
        products.forEach((product) => {
            const li = createProductElement(product);
            searchResultItems.appendChild(li);
        });
    }
    searchResultContainer.style.display = 'block';
}

document.addEventListener('click', function (e) {
    if (!searchResultContainer.contains(e.target)) {
        searchResultContainer.style.display = 'none';
    }
});

//handle more
const moreBtn = document.querySelector('.more-btn');
moreBtn.addEventListener('click', () => {
    window.location.href = '../../Page/About/About.html';
});

//handle go up.
const goUpBtn = document.querySelector('.goUp-btn');

function scrollFunction() {
    if (window.scrollY > 400) {
        goUpBtn.style.display = 'block';
    } else {
        goUpBtn.style.display = 'none';
    }
}

scrollFunction();

window.addEventListener('scroll', scrollFunction);

goUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

//handle mobile header
const menuBtn = document.querySelector('.menu-btn');
const mobileNavbarItems = document.querySelector('.mobile-navbar-items');
const mobileLoginContainer = document.querySelector('.mobile-login-container');

menuBtn.addEventListener('click', () => {
    if (mobileNavbarItems.style.display === 'none' || mobileNavbarItems.style.display === '') {
        mobileNavbarItems.style.display = 'block';
    } else {
        mobileNavbarItems.style.display = 'none';
    }
});

//handle mobile logined
function mobileLogined() {
    var prevUserAccount = JSON.parse(localStorage.getItem('prevUserAccount'));
    if (prevUserAccount) {
        mobileLoginContainer.closest('li').style.display = 'none';
        // Function to create the first li element
        function createFirstLiElement() {
            const profileNav = document.createElement('li');
            profileNav.classList.add('mobile-navbar-item');

            const profileContainer = document.createElement('div');
            profileContainer.classList.add('mobile-action-container');

            const profilePageLink = document.createElement('a');
            profilePageLink.href = '/Page/Profile/Profile.html';
            profilePageLink.classList.add('mobile-user-icon-container');

            const profileIcon = document.createElement('img');
            profileIcon.src = './assets/icons/userIcon.svg';
            profileIcon.classList.add('mobile-user-icon');

            const profiledesc = document.createElement('p');
            profiledesc.classList.add('mobile-user-name');
            profiledesc.textContent = 'huy';

            profilePageLink.appendChild(profileIcon);
            profilePageLink.appendChild(profiledesc);
            profileContainer.appendChild(profilePageLink);
            profileNav.appendChild(profileContainer);

            return profileNav;
        }

        // Function to create the second li element
        function createSecondLiElement() {
            const cartNav = document.createElement('li');
            cartNav.classList.add('mobile-navbar-item');

            const cartContainer = document.createElement('div');
            cartContainer.classList.add('mobile-action-container');

            const cartPageLink = document.createElement('a');
            cartPageLink.href = '/Page/Cart/Cart.html';
            cartPageLink.classList.add('mobile-cart-container');

            const cartDesc = document.createElement('p');
            cartDesc.classList.add('mobile-navbar-content');
            cartDesc.textContent = 'Giỏ hàng';

            cartPageLink.appendChild(cartDesc);
            cartContainer.appendChild(cartPageLink);
            cartNav.appendChild(cartContainer);

            return cartNav;
        }

        // Create the li elements
        const profileNav = createFirstLiElement();
        const cartNav = createSecondLiElement();

        // Insert the li elements at the top of the mobile-navbar-items element
        mobileNavbarItems.insertBefore(cartNav, mobileNavbarItems.firstChild);
        mobileNavbarItems.insertBefore(profileNav, mobileNavbarItems.firstChild);
    }
}
mobileLogined();
