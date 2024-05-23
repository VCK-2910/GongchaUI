//handle login
const inputs = document.querySelectorAll('.login-input input');
const checkbox = document.querySelector('.login-checked input');
const submitButton = document.querySelector('.login-submit .submit');

const emailInput = document.querySelector('.login-input-email input');
const passwordInput = document.querySelector('.login-input-password input');

const userAccounts = JSON.parse(localStorage.getItem('useraccounts'));

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
    var useremail = emailInput.value.trim();
    var password = passwordInput.value.trim();

    // Kiểm tra xem người dùng đã nhập tên người dùng và mật khẩu chưa
    if (useremail !== '' && password !== '') {
        // Kiểm tra từng tài khoản trong mảng userAccounts
        for (var i = 0; i < userAccounts.length; i++) {
            var account = userAccounts[i];
            // So sánh tên người dùng và mật khẩu
            if (useremail === account.email && password === account.password) {
                // Xóa dữ liệu prevUserAccount từ local storage
                localStorage.removeItem('prevUserAccount');
                // Lưu tài khoản đăng nhập vào local storage
                localStorage.setItem('prevUserAccount', JSON.stringify(account));
                // Chuyển hướng về trang chính
                window.location.href = '../../index.html';
                return; // Kết thúc vòng lặp khi tìm thấy tài khoản hợp lệ
            }
        }
        // Hiển thị thông báo nếu không tìm thấy tài khoản hợp lệ
        alert('Tên người dùng hoặc mật khẩu không đúng');
    } else {
        alert('Vui lòng nhập tên người dùng và mật khẩu');
    }
});
