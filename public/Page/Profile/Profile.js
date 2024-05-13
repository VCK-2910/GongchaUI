const logoutBtn = document.querySelector('.logout-btn');

function handleLogOut() {
    window.location.href = '../Login/Login.html';
    localStorage.removeItem('prevUserAccount');
}

logoutBtn.addEventListener('click', handleLogOut);

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
        userNamePara.textContent = prevUserAccount.name;

        actionContainer.appendChild(userIcon);
        actionContainer.appendChild(userNamePara);

        document.querySelector('.action').appendChild(actionContainer);
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
