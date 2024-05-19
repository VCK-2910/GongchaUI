// Function to handle scrolling to the target section
function scrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
        });
    }
}

// Function to handle item click in the taskbar
function handleTaskbarItemClick(event) {
    const targetId = event.currentTarget.getAttribute('data-target');
    if (targetId) {
        scrollToTarget(targetId);
    }
}

//handle add to cart logined
var prevUserAccount = JSON.parse(localStorage.getItem('prevUserAccount'));
const allProduct = document.querySelectorAll('.product-container');
allProduct.forEach((container) => {
    container.addEventListener('click', () => {
        var loginForm = document.querySelector('.login-wrapper');

        if (!prevUserAccount) {
            loginForm.style.display = 'flex';
            window.addEventListener('scroll', function () {
                window.scrollTo(0, 0);
            });
            alert('bạn cần đăng nhập trước khi mua hàng hiểu ko ?');
        } else {
            loginForm.style.display = 'none';
        }
    });
});

var inputs = document.querySelectorAll('.login-input input');
var checkbox = document.querySelector('.login-checked input');
var submitButton = document.querySelector('.login-submit .submit');

var nameInput = document.querySelector('.login-input-name input');
var passwordInput = document.querySelector('.login-input-password input');

var userAccounts = JSON.parse(localStorage.getItem('useraccounts'));

// Sự kiện khi giá trị của các input thay đổi
inputs.forEach(function (input) {
    input.addEventListener('input', function () {
        if (input.value.trim() !== '') {
            input.classList.add('input-valued');
            input.nextElementSibling.classList.add('line-valued');
        } else {
            input.classList.remove('input-valued');
            input.nextElementSibling.classList.remove('line-valued');
        }
        // Kiểm tra điều kiện để thêm class "submitted" cho submitButton
        checkSubmit();
    });
});

// Sự kiện khi trạng thái của checkbox thay đổi
checkbox.addEventListener('change', function () {
    // Kiểm tra điều kiện để thêm class "submitted" cho submitButton
    checkSubmit();
});

// Hàm kiểm tra điều kiện để thêm class "submitted" cho submitButton
function checkSubmit() {
    var allInputsValued = true;
    inputs.forEach(function (input) {
        if (input.value.trim() === '') {
            allInputsValued = false;
        }
    });

    if (allInputsValued && checkbox.checked) {
        submitButton.classList.add('submitted');
    } else {
        submitButton.classList.remove('submitted');
    }
}

submitButton.addEventListener('click', function () {
    var username = nameInput.value.trim();
    var password = passwordInput.value.trim();

    // Kiểm tra xem người dùng đã nhập tên người dùng và mật khẩu chưa
    if (username !== '' && password !== '') {
        // Kiểm tra từng tài khoản trong mảng userAccounts
        for (var i = 0; i < userAccounts.length; i++) {
            var account = userAccounts[i];
            // So sánh tên người dùng và mật khẩu
            if (username === account.name && password === account.password) {
                // Xóa dữ liệu prevUserAccount từ local storage
                localStorage.removeItem('prevUserAccount');
                // Lưu tài khoản đăng nhập vào local storage
                localStorage.setItem('prevUserAccount', JSON.stringify(account));
                // Chuyển hướng về trang chính
                window.location.href = '../Product/Product.html';
                return; // Kết thúc vòng lặp khi tìm thấy tài khoản hợp lệ
            }
        }
        // Hiển thị thông báo nếu không tìm thấy tài khoản hợp lệ
        alert('Tên người dùng hoặc mật khẩu không đúng');
    } else {
        alert('Vui lòng nhập tên người dùng và mật khẩu');
    }
});

// Function to handle product click and save to localStorage
function handleProductClick(event) {
    const productTitle = event.currentTarget.querySelector('.product-title').textContent;
    const productImgSrc = event.currentTarget.querySelector('.product-img-src').getAttribute('src');
    const productPrice = parseFloat(
        event.currentTarget.querySelector('.product-price').textContent.replace('.', '').replace(',', '.'),
    );
    const userProducts = JSON.parse(localStorage.getItem('userProduct')) || [];

    // Check if the product already exists in localStorage
    const existingProductIndex = userProducts.findIndex((product) => product.title === productTitle);

    if (existingProductIndex !== -1) {
        // If product exists, update its quantity and price
        userProducts[existingProductIndex].quantity += 1;
    } else {
        // If product doesn't exist, add it to localStorage
        const productId = userProducts.length;
        const productObj = {
            id: productId,
            title: productTitle,
            imgSrc: productImgSrc,
            price: productPrice,
            quantity: 1,
        };
        userProducts.push(productObj);
    }

    localStorage.setItem('userProduct', JSON.stringify(userProducts));
    // You can do further processing here if needed
}

// Add click event listeners to taskbar items
const taskbarItems = document.querySelectorAll('.taskbar-item');
taskbarItems.forEach((item) => {
    item.addEventListener('click', handleTaskbarItemClick);
});

// Add click event listeners to product items
const productItems = document.querySelectorAll('.product-container');
productItems.forEach((item) => {
    item.addEventListener('click', handleProductClick);
});

// Make taskbar fixed when scrolling past it
window.addEventListener('scroll', function () {
    const taskbar = document.querySelector('.taskbar');
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    const taskbarHeight = taskbar.offsetHeight;
    if (scrollPos > windowHeight - taskbarHeight) {
        taskbar.classList.add('fixed');
    } else {
        taskbar.classList.remove('fixed');
    }
});

function checkLocalStorage() {
    var loginContainer = document.querySelector('.action-container');
    var prevUserAccount = JSON.parse(localStorage.getItem('prevUserAccount'));
    if (prevUserAccount) {
        loginContainer.style.display = 'none';
        var actionContainer = document.createElement('a');
        actionContainer.setAttribute('href', '../Profile/Profile.html');
        actionContainer.setAttribute('class', 'user-action-container');

        var userIcon = document.createElement('img');
        userIcon.setAttribute('src', '../../assets/icons//userIcon.svg');
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
        cartContainer.setAttribute('href', '../Cart/Cart.html');
        cartContainer.setAttribute('class', 'cart-container');

        var cartIcon = document.createElement('img');
        cartIcon.setAttribute('src', '../../assets/icons/cartIcon.svg');

        cartContainer.appendChild(cartIcon);
        document.querySelector('.action').appendChild(cartContainer);
    }
}

checkLocalStorage();

//found search
// Lấy giá trị từ localStorage
var prevSearchProduct = JSON.parse(localStorage.getItem('prevSearchProduct'));
// Biến để kiểm tra xem có sản phẩm khớp với tìm kiếm trước đó hay không
var foundProduct = false;

// Nếu có giá trị từ localStorage và phần tử p.product-title tồn tại
if (prevSearchProduct && document.querySelector('.product-title')) {
    var productTitles = document.querySelectorAll('.product-title');

    // Lặp qua các phần tử p.product-title
    productTitles.forEach(function (title) {
        // So sánh nội dung với giá trị từ localStorage
        if (title.textContent.trim().toLocaleLowerCase() === prevSearchProduct.name) {
            // Tìm thấy sản phẩm, đánh dấu là true
            foundProduct = true;
            console.log(title.textContent.trim());

            // Tìm phần tử div.product-container cha
            var productContainer = title.closest('.product-container');
            // Thêm class .hovered vào div.product-container
            productContainer.classList.add('hovered');
            // Lướt xuống sản phẩm đó
            productContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// Nếu không tìm thấy sản phẩm, và biến foundProduct vẫn là false
if (!foundProduct && prevSearchProduct !== null) {
    alert('Chúng tôi không có sản phẩm này');
}

// Function to remove hovered class and clear localStorage
function clearSearch() {
    // Remove class 'hovered' from any elements that have it
    var hoveredElements = document.querySelectorAll('.product-container.hovered');
    hoveredElements.forEach(function (element) {
        element.classList.remove('hovered');
    });

    // Clear localStorage
}

// Add event listener for touchstart (for touchscreens) and click (for non-touchscreens)
document.addEventListener('touchstart', clearSearch);
document.addEventListener('click', clearSearch);

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
        window.location.href = './Product.html';
        console.log(searchInput.value);
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
        window.location.href = './Product.html';
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
            let search = e.target.value.toLowerCase().trim();
            localStorage.setItem('prevSearchProduct', JSON.stringify({ name: e.target.value.toLowerCase().trim() }));
            window.location.href = './Product.html';
            console.log(search);
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

localStorage.removeItem('prevSearchProduct');

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
            profileIcon.src = '../../assets/icons/userIcon.svg';
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
