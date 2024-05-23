//handle css logined
function checkLocalStorage() {
    var loginContainer = document.querySelector('.action-container');
    var prevUserAccount = JSON.parse(localStorage.getItem('prevUserAccount'));
    if (prevUserAccount) {
        loginContainer.style.display = 'none';
        var actionContainer = document.createElement('a');
        actionContainer.setAttribute('href', './Profile.html');
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
        window.location.href = '../Product/Product.html';
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
        window.location.href = '../Product/Product.html';
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
            window.location.href = '../Product/Product.html';
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

document.addEventListener('DOMContentLoaded', function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector('.profile-pic').setAttribute('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    document.querySelector('.pic-upload').addEventListener('change', function () {
        readURL(this);
    });

    document.querySelector('.upload-button').addEventListener('click', function () {
        document.querySelector('.pic-upload').click();
    });
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

//handle logout
const logOut = document.querySelector('.logout-btn');

logOut.addEventListener('click', () => {
    localStorage.removeItem('prevUserAccount');
    localStorage.removeItem('userProduct');
    window.location.href = '/Page/Login/Login.html';
});

//handle birth date
document.addEventListener('DOMContentLoaded', function () {
    var birthdateInput = document.querySelector('.birthdate-input');
    var labelLine = document.getElementById('label-line');

    birthdateInput.addEventListener('focus', function () {
        labelLine.style.opacity = 1;
    });

    birthdateInput.addEventListener('input', function () {
        if (birthdateInput.value) {
            labelLine.textContent = 'Sinh nhật';
            birthdateInput.classList.add('input-valued');
            labelLine.classList.add('line-valued');
        } else {
            labelLine.textContent = '';
            birthdateInput.classList.remove('input-valued');
            labelLine.classList.remove('line-valued');
        }
    });

    birthdateInput.addEventListener('blur', function () {
        if (!birthdateInput.value) {
            labelLine.style.opacity = 0;
            birthdateInput.classList.remove('input-valued');
            labelLine.classList.remove('line-valued');
        } else {
            labelLine.style.opacity = 1;
        }
    });
    // Check if there's already a value in the input on page load
    if (birthdateInput.value) {
        labelLine.style.opacity = 1;
        labelLine.value = 'Sinh nhật';
        birthdateInput.classList.add('input-valued');
        labelLine.classList.add('line-valued');
    } else {
        labelLine.textContent = '';
    }
});

//handle drop down.
const genderSelected = document.querySelector('.gender-selected');
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', function () {
        this.setAttribute('tabindex', 1);
        this.focus();
        this.classList.toggle('active');
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
    });

    dropdown.addEventListener('focusout', function () {
        this.classList.remove('active');
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
    });

    const menuItems = dropdown.querySelectorAll('.dropdown-menu li');
    menuItems.forEach((item) => {
        item.addEventListener('click', function () {
            const displaySpan = dropdown.querySelector('.gender-selected');
            const hiddenInput = dropdown.querySelector('.gender-select');
            if (displaySpan) {
                displaySpan.textContent = this.textContent;
                if (['Nữ', 'Nam', 'Khác'].includes(genderSelected.textContent.trim())) {
                    genderSelected.closest('.dropdown').classList.add('input-valued');
                } else {
                    console.log(0);
                }
            }
            if (hiddenInput) {
                hiddenInput.value = this.getAttribute('id');
            }
        });
    });
});

//handle input valued
document.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', function () {
        const labelLine = this.closest('div').querySelector('.label-line');
        if (this.value.trim() !== '') {
            this.classList.add('input-valued');
            if (labelLine) {
                labelLine.classList.add('line-valued');
            }
        } else {
            this.classList.remove('input-valued');
            if (labelLine) {
                labelLine.classList.remove('line-valued');
            }
        }
    });
});

//handle save info
function saveInfo() {
    const userAccounts = JSON.parse(localStorage.getItem('useraccounts')) || [];
    const accountName = document.querySelector('.name-input');
    const genderSelected = document.querySelector('.gender-selected');
    const birthdateInput = document.querySelector('.birthdate-input');
    const detailInput = document.querySelector('.detail-input');
    const phoneInput = document.querySelector('.phone-input');
    const emailInput = document.querySelector('.email-input');
    const addressInput = document.querySelector('.address-input');

    let updateUserInfo = null;

    userAccounts.forEach((value) => {
        if (value.email === emailInput.value) {
            updateUserInfo = {
                id: value.id,
                email: emailInput.value,
                name: accountName.value,
                password: value.password,
                gender: genderSelected.textContent,
                birthday: birthdateInput.value,
                phoneNumber: phoneInput.value,
                address: addressInput.value,
                detail: detailInput.value,
            };
        }
    });

    localStorage.setItem('prevUserAccount', JSON.stringify(updateUserInfo));

    if (updateUserInfo) {
        const index = userAccounts.findIndex((user) => user.id === updateUserInfo.id);
        if (index !== -1) {
            userAccounts[index] = updateUserInfo;
            localStorage.setItem('useraccounts', JSON.stringify(userAccounts));
        }
    }

    window.location.reload();
    alert('lưu thông tin thành công');
}

const saveBtn = document.querySelector('.info-save-btn');
saveBtn.addEventListener('click', saveInfo);

//handle user info.
const prevUserAccount = JSON.parse(localStorage.getItem('prevUserAccount'));

const avtName = document.querySelector('.profile-user-name');
const accoutName = document.querySelector('.name-input');
// const genderSelected = document.querySelector('.gender-selected');
const birthdateInput = document.querySelector('.birthdate-input');
const detailInput = document.querySelector('.detail-input');
const phoneInput = document.querySelector('.phone-input');
const emailInput = document.querySelector('.email-input');
const addressInput = document.querySelector('.address-input');

avtName.textContent = prevUserAccount.name;
accoutName.value = prevUserAccount.name;
genderSelected.textContent = prevUserAccount.gender;
birthdateInput.value = prevUserAccount.birthday;
detailInput.value = prevUserAccount.detail;
phoneInput.value = prevUserAccount.phoneNumber;
emailInput.value = prevUserAccount.email;
addressInput.value = prevUserAccount.address;

const updateInputClasses = (input) => {
    const labelLine = input.closest('div').querySelector('.label-line');
    if (input.value.trim() !== '') {
        input.classList.add('input-valued');
        if (labelLine) {
            labelLine.classList.add('line-valued');
        }
    } else {
        input.classList.remove('input-valued');
        if (labelLine) {
            labelLine.classList.remove('line-valued');
        }
    }
    if (['Nữ', 'Nam', 'Khác'].includes(genderSelected.textContent.trim())) {
        genderSelected.closest('.dropdown').classList.add('input-valued');
    } else {
        return;
    }
};

document.querySelectorAll('input, textarea').forEach((input) => {
    updateInputClasses(input);

    input.addEventListener('input', function () {
        updateInputClasses(this);
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
