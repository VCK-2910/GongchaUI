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
        cartContainer.setAttribute('class', 'cart-icon-container');

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

//handle search
const localProducts = JSON.parse(localStorage.getItem('localProducts'));
const totalBill = document.querySelector('.pay-total');

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

//cart Item
const userProducts = JSON.parse(localStorage.getItem('userProduct'));
if (userProducts) {
    const cartItems = document.querySelector('.cart-items');
    userProducts.map((userProduct, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        //item name
        const itemName = document.createElement('div');
        itemName.classList.add('item-name');

        const productImgContainer = document.createElement('div');
        productImgContainer.classList.add('product-img-container');

        const productImg = document.createElement('img');
        productImg.classList.add('product-img');
        productImg.setAttribute('src', userProduct.imgSrc);

        const productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.textContent = userProduct.title;

        productImgContainer.appendChild(productImg);
        itemName.appendChild(productImgContainer);
        itemName.appendChild(productName);

        //item price
        const itemPrice = document.createElement('div');
        itemPrice.classList.add('item-price');
        const formattedPrice = userProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        itemPrice.textContent = formattedPrice;

        const priceSpan = document.createElement('span');
        priceSpan.textContent = 'đ';

        itemPrice.appendChild(priceSpan);

        //item quantity.
        const itemQuantity = document.createElement('div');
        itemQuantity.classList.add('item-quantity');

        const qtyInput = document.createElement('div');
        qtyInput.classList.add('qty-input');

        const minusButton = document.createElement('button');
        minusButton.classList.add('qty-count', 'qty-count--minus');
        minusButton.setAttribute('data-action', 'minus');
        minusButton.setAttribute('type', 'button');
        minusButton.textContent = '-';

        const quantityInput = document.createElement('input');
        quantityInput.classList.add('product-qty');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('name', 'product-qty');
        quantityInput.setAttribute('min', '0');
        quantityInput.setAttribute('max', '10');
        quantityInput.setAttribute('value', `${userProduct.quantity}`);

        const addButton = document.createElement('button');
        addButton.classList.add('qty-count', 'qty-count--add');
        addButton.setAttribute('data-action', 'add');
        addButton.setAttribute('type', 'button');
        addButton.textContent = '+';

        minusButton.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value);

            if (currentValue > 0) {
                let userProducts = JSON.parse(localStorage.getItem('userProduct')) || [];
                let index = userProducts.findIndex((product) => product.id === userProduct.id);

                if (index !== -1) {
                    userProducts[index].quantity = currentValue - 1;
                    localStorage.setItem('userProduct', JSON.stringify(userProducts));
                }

                quantityInput.value = currentValue - 1;

                // Cập nhật giá trị itemTotal
                const totalPrice = userProduct.price * (currentValue - 1);
                const formattedTotal = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                itemTotal.innerHTML = formattedTotal + priceSpan.outerHTML;

                //producs total price
                const vouchers = JSON.parse(localStorage.getItem('localVoucher'));
                const voucherInput = document.querySelector('.voucher-input');
                const voucherApply = document.querySelector('.voucher-apply');
                const voucherPrice = document.querySelector('.pay-voucher');
                const productsPrice = document.querySelectorAll('.item-total');
                const pricesArray = Array.from(productsPrice).map((value) => {
                    const numberPrice = parseInt(value.innerText.replace(/[đ.]/g, ''));
                    return numberPrice;
                });
                const productsTotalPrice = document.querySelector('.pay-products');

                const shipPrice = document.querySelector('.pay-ship');
                const numShipPrice = parseFloat(shipPrice.textContent.replace(/\D/g, ''));

                const payTotal = document.querySelector('.pay-total');

                voucherApply.addEventListener('click', () => {
                    const voucherValue = voucherInput.value.trim();

                    const matchedVoucher = vouchers.find((voucher) => voucher.name.trim() === voucherValue);

                    if (matchedVoucher) {
                        alert('áp mã thành công!');
                        payTotal.textContent = (productsTotal + numShipPrice - matchedVoucher.sellPrice)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        voucherPrice.textContent =
                            '-' + matchedVoucher.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        voucherInput.value = '';
                        return;
                    } else {
                        alert('mã giảm giá không hợp lệ!');
                    }
                });

                let productsTotal = 0;

                for (let i = 0; i < pricesArray.length; i++) {
                    productsTotal += pricesArray[i];
                }

                productsTotalPrice.textContent = productsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                const numProductsTotalPrice = parseFloat(productsTotalPrice.textContent.replace(/\D/g, ''));

                payTotal.textContent = (productsTotal + numShipPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
        });

        addButton.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value);

            if (currentValue < 10) {
                let userProducts = JSON.parse(localStorage.getItem('userProduct')) || [];
                let index = userProducts.findIndex((product) => product.id === userProduct.id);

                if (index !== -1) {
                    userProducts[index].quantity = currentValue + 1;
                    localStorage.setItem('userProduct', JSON.stringify(userProducts));
                }

                quantityInput.value = currentValue + 1;

                // Cập nhật giá trị itemTotal
                const totalPrice = userProduct.price * (currentValue + 1);
                const formattedTotal = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                itemTotal.innerHTML = formattedTotal + priceSpan.outerHTML;

                //producs total price
                const vouchers = JSON.parse(localStorage.getItem('localVoucher'));
                const voucherInput = document.querySelector('.voucher-input');
                const voucherApply = document.querySelector('.voucher-apply');
                const voucherPrice = document.querySelector('.pay-voucher');
                const productsPrice = document.querySelectorAll('.item-total');
                const pricesArray = Array.from(productsPrice).map((value) => {
                    const numberPrice = parseInt(value.innerText.replace(/[đ.]/g, ''));
                    return numberPrice;
                });
                const productsTotalPrice = document.querySelector('.pay-products');

                const shipPrice = document.querySelector('.pay-ship');
                const numShipPrice = parseFloat(shipPrice.textContent.replace(/\D/g, ''));

                const payTotal = document.querySelector('.pay-total');

                voucherApply.addEventListener('click', () => {
                    const voucherValue = voucherInput.value.trim();

                    const matchedVoucher = vouchers.find((voucher) => voucher.name.trim() === voucherValue);

                    if (matchedVoucher) {
                        alert('áp mã thành công!');
                        payTotal.textContent = (productsTotal + numShipPrice - matchedVoucher.sellPrice)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        voucherPrice.textContent =
                            '-' + matchedVoucher.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        voucherInput.value = '';
                        return;
                    } else {
                        alert('mã giảm giá không hợp lệ!');
                    }
                });

                let productsTotal = 0;

                for (let i = 0; i < pricesArray.length; i++) {
                    productsTotal += pricesArray[i];
                }

                productsTotalPrice.textContent = productsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                const numProductsTotalPrice = parseFloat(productsTotalPrice.textContent.replace(/\D/g, ''));

                payTotal.textContent = (productsTotal + numShipPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
        });

        qtyInput.appendChild(minusButton);
        qtyInput.appendChild(quantityInput);
        qtyInput.appendChild(addButton);

        itemQuantity.appendChild(qtyInput);

        //item total
        const itemTotal = document.createElement('div');
        itemTotal.classList.add('item-total');

        const totalPrice = userProduct.price * quantityInput.value;

        const formattedTotal = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        itemTotal.textContent = formattedTotal;

        const totalSpan = document.createElement('span');
        totalSpan.textContent = 'đ';

        itemTotal.appendChild(totalSpan);

        //action
        const itemAction = document.createElement('div');
        itemAction.classList.add('item-action');

        const actionRemove = document.createElement('div');
        actionRemove.classList.add('action-remove');

        const removeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        removeIcon.setAttribute('class', 'svg-icon');
        removeIcon.setAttribute('width', '30');
        removeIcon.setAttribute('height', '30');
        removeIcon.setAttribute('viewBox', '0 0 30 30');

        const removePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        removePath.setAttribute(
            'd',
            'M5.38854 0L0 5.38854L2.75159 8.14013L9.55414 15.0573L2.75159 21.8599L0 24.4968L5.38854 30L8.14013 27.2484L15.0573 20.3312L21.8599 27.2484L24.4968 30L30 24.4968L27.2484 21.8599L20.3312 15.0573L27.2484 8.14013L30 5.38854L24.4968 0L21.8599 2.75159L15.0573 9.55414L8.14013 2.75159L5.38854 0Z',
        );

        actionRemove.addEventListener('click', () => {
            const productIdToRemove = userProduct.id;

            // Tìm index của sản phẩm cần xóa trong mảng
            const indexToRemove = userProducts.findIndex((product) => product.id === productIdToRemove);
            //trả về index đầu tiên thỏa mãn

            // Nếu tìm thấy sản phẩm, xóa nó ra khỏi mảng
            //không bằng âm 1 thì remove
            if (indexToRemove !== -1) {
                userProducts.splice(indexToRemove, 1);

                // Cập nhật lại localStorage
                localStorage.setItem('userProduct', JSON.stringify(userProducts));

                window.location.reload();
                alert('bản đã xóa 1 sản phầm khỏi giỏ hàng');
            } else {
                console.log('Sản phẩm không tồn tại trong localStorage');
            }
        });

        removeIcon.appendChild(removePath);
        actionRemove.appendChild(removeIcon);
        itemAction.appendChild(actionRemove);

        //cart-item
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(itemQuantity);
        cartItem.appendChild(itemTotal);
        cartItem.appendChild(itemAction);

        //cart-tiems
        return cartItems.appendChild(cartItem);
    });
}

// if (userProducts.length === 0) {
//     const cartItems = document.querySelector('.cart-items');

//     const noItem = document.createElement('li');
//     noItem.classList.add('no-cart-item');
//     noItem.textContent = 'mua đồ đi';

//     cartItems.appendChild(noItem);
// }

//handle bill
const vouchers = JSON.parse(localStorage.getItem('localVoucher'));
const voucherInput = document.querySelector('.voucher-input');
const voucherApply = document.querySelector('.voucher-apply');
const voucherPrice = document.querySelector('.pay-voucher');
const productsPrice = document.querySelectorAll('.item-total');
const pricesArray = Array.from(productsPrice).map((value) => {
    const numberPrice = parseInt(value.innerText.replace(/[đ.]/g, ''));
    return numberPrice;
});
const productsTotalPrice = document.querySelector('.pay-products');

const shipPrice = document.querySelector('.pay-ship');
const numShipPrice = parseFloat(shipPrice.textContent.replace(/\D/g, ''));

const payTotal = document.querySelector('.pay-total');

const paySubmit = document.querySelector('.pay-submit');

let matchedVoucher = 0;

voucherApply.addEventListener('click', () => {
    const voucherValue = voucherInput.value.trim();

    const matchedVoucher = vouchers.find((voucher) => voucher.name.trim() === voucherValue);

    if (matchedVoucher) {
        alert('áp mã thành công!');
        payTotal.textContent = (productsTotal + numShipPrice - matchedVoucher.sellPrice)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        voucherPrice.textContent = '-' + matchedVoucher.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        voucherInput.value = '';
    } else {
        alert('mã giảm giá không hợp lệ!');
    }
});

voucherInput.addEventListener('keydown', (e) => {
    const voucherValue = voucherInput.value.trim();

    const matchedVoucher = vouchers.find((voucher) => voucher.name.trim() === voucherValue);

    if (e.key === 'Enter') {
        if (matchedVoucher) {
            alert('áp mã thành công!');
            payTotal.textContent = (productsTotal + numShipPrice - matchedVoucher.sellPrice)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            voucherPrice.textContent = '-' + matchedVoucher.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            voucherInput.value = '';
        } else {
            alert('mã giảm giá không hợp lệ!');
        }
    }
});

let productsTotal = 0;

for (let i = 0; i < pricesArray.length; i++) {
    productsTotal += pricesArray[i];
}

productsTotalPrice.textContent = productsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const numProductsTotalPrice = parseFloat(productsTotalPrice.textContent.replace(/\D/g, ''));

payTotal.textContent = (productsTotal + numShipPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

paySubmit.addEventListener('click', () => {
    alert('bạn đã thanh toán thành công!');
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
