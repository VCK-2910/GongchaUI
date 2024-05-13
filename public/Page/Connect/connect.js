document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const labelLines = document.querySelectorAll('.label-line');

    function handleInputChange(event) {
        const input = event.target;
        const labelLine = input.nextElementSibling;

        if (input.value.trim() !== '') {
            input.classList.add('input-valued');
            labelLine.classList.add('line-valued');
        } else {
            input.classList.remove('input-valued');
            labelLine.classList.remove('line-valued');
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('change', handleInputChange);
        const feedbackData = JSON.parse(localStorage.getItem('feedbacks')) || {};
        input.value = feedbackData[input.name] || '';
        if (input.value.trim() !== '') {
            input.classList.add('input-valued');
            input.nextElementSibling.classList.add('line-valued');
        }
    });

    function handleFormSubmit(event) {
        event.preventDefault();

        // Thêm dữ liệu vào localStorage chỉ khi người dùng nhấn nút gửi phản hồi
        updateLocalStorage();

        alert('Phản hồi đã được gửi thành công!');
        form.reset(); // Reset the form after successful submission
    }

    form.addEventListener('submit', handleFormSubmit);

    function updateLocalStorage() {
        const feedbackData = {
            id: Date.now(), // Generate unique ID for each feedback
            name: document.querySelector('.nameInput').value,
            email: document.querySelector('.emailInput').value,
            phoneNumber: document.querySelector('.phonenumberInput').value,
            feedback: document.querySelector('.feedbackInput').value,
        };

        // Get existing feedbacks from localStorage
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

        // Add new feedback to the array
        feedbacks.push(feedbackData);

        // Save the updated array back to localStorage
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
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
        userNamePara.textContent = prevUserAccount.name;

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
