function checkInputValue(input) {
    if (input.type === 'checkbox') {
        if (input.checked) {
            input.classList.add('input-valued');
        } else {
            input.classList.remove('input-valued');
        }
    } else {
        if (input.value.trim() !== '') {
            input.classList.add('input-valued');
            input.nextElementSibling.classList.add('line-valued');
            checkAllInputs();
        } else {
            input.classList.remove('input-valued');
            input.nextElementSibling.classList.remove('line-valued');
            document.getElementById('submitBtn').classList.remove('abc');
        }
    }
}

function checkAllInputs() {
    var allInputs = document.querySelectorAll('.login-input input');
    var allFilled = true;
    allInputs.forEach(function (input) {
        if ((input.type !== 'checkbox' && input.value.trim() === '') || (input.type === 'checkbox' && !input.checked)) {
            allFilled = false;
        }
    });
    if (allFilled) {
        document.getElementById('submitBtn').classList.add('abc');
    } else {
        document.getElementById('submitBtn').classList.remove('abc');
    }
}

function handleRegister() {
    var nameInput = document.querySelector('.nameInput').value.trim();
    var passwordInput = document.querySelector('.passwordInput').value.trim();
    var rePasswordInput = document.querySelector('.rePasswordInput').value.trim();
    var rememberMeChecked = document.getElementById('rememberMe').checked;

    if (nameInput && passwordInput && rePasswordInput && passwordInput === rePasswordInput && rememberMeChecked) {
        var userAccounts = JSON.parse(localStorage.getItem('useraccounts')) || [];
        var existingUser = userAccounts.find(function (user) {
            return user.name === nameInput;
        });
        if (existingUser) {
            alert('Tên người dùng đã tồn tại!');
        } else {
            var newUser = {
                id: userAccounts.length + 1,
                name: nameInput,
                password: passwordInput,
            };
            userAccounts.push(newUser);
            localStorage.setItem('useraccounts', JSON.stringify(userAccounts));

            // Lưu thông tin của người dùng mới vào prevUserAccount
            var prevUserAccount = {
                name: nameInput,
                password: passwordInput,
            };
            localStorage.setItem('prevUserAccount', JSON.stringify(prevUserAccount));

            alert('Đăng kí thành công!');
            window.location.href = '/index.html';
            // Reset form
            document.querySelector('.nameInput').value = '';
            document.querySelector('.passwordInput').value = '';
            document.querySelector('.rePasswordInput').value = '';
            document.getElementById('rememberMe').checked = false;
            document.getElementById('submitBtn').classList.remove('abc');
        }
    } else {
        alert("Vui lòng điền đầy đủ thông tin, đảm bảo mật khẩu khớp nhau và check 'LƯU ĐĂNG NHẬP'!");
    }
}
