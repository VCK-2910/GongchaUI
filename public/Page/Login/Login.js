document.addEventListener('DOMContentLoaded', function () {
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
});
