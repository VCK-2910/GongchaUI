//handle css inputed
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

//handle all inputed
document
    .querySelectorAll('.emailInput, .nameInput, .passwordInput, .rePasswordInput, .inputChecked')
    .forEach((input) => {
        input.addEventListener('input', checkAllInputs);
    });

function checkAllInputs() {
    const submitBtn = document.querySelector('#submitBtn');
    const emailInput = document.querySelector('.emailInput');
    const nameInput = document.querySelector('.nameInput');
    const passwordInput = document.querySelector('.passwordInput');
    const rePasswordInput = document.querySelector('.rePasswordInput');
    const registerChecked = document.querySelector('.inputChecked');

    // Kiểm tra xem các trường đều được nhập và checkbox được chọn
    if (
        !nameInput.value.trim() ||
        !isValidEmail(emailInput.value) || // Kiểm tra email có đúng định dạng không
        !passwordInput.value.trim() ||
        !rePasswordInput.value.trim() ||
        !registerChecked.checked
    ) {
        submitBtn.classList.remove('isSubmit');
    } else {
        submitBtn.classList.add('isSubmit');
    }
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//handle register.
function handleRegister() {
    var emailInput = document.querySelector('.emailInput').value.trim();
    var nameInput = document.querySelector('.nameInput').value.trim();
    var passwordInput = document.querySelector('.passwordInput').value.trim();
    var rePasswordInput = document.querySelector('.rePasswordInput').value.trim();
    var rememberMeChecked = document.getElementById('rememberMe').checked;

    if (
        isValidEmail(emailInput) &&
        nameInput &&
        passwordInput &&
        rePasswordInput &&
        passwordInput === rePasswordInput &&
        rememberMeChecked
    ) {
        var userAccounts = JSON.parse(localStorage.getItem('useraccounts')) || [];
        var existingUser = userAccounts.find(function (user) {
            return user.email === emailInput;
        });
        if (existingUser) {
            alert('email đã tồn tại!');
        } else {
            var newUser = {
                id: userAccounts.length + 1,
                email: emailInput,
                name: nameInput,
                password: passwordInput,
                gender: '',
                birthday: '',
                phoneNumber: '',
                address: '',
                detail: '',
            };
            userAccounts.push(newUser);
            localStorage.setItem('useraccounts', JSON.stringify(userAccounts));

            // Lưu thông tin của người dùng mới vào prevUserAccount
            var prevUserAccount = {
                id: userAccounts.length + 1,
                email: emailInput,
                name: nameInput,
                password: passwordInput,
                gender: '',
                birthday: '',
                phoneNumber: '',
                address: '',
                detail: '',
            };
            localStorage.setItem('prevUserAccount', JSON.stringify(prevUserAccount));

            alert('Đăng kí thành công!');
            window.location.href = '/index.html';
            // Reset form
            document.querySelector('.nameInput').value = '';
            document.querySelector('.passwordInput').value = '';
            document.querySelector('.rePasswordInput').value = '';
            document.getElementById('rememberMe').checked = false;
            document.getElementById('submitBtn').classList.remove('isSubmit');
        }
    } else {
        alert('Vui lòng điền đầy đủ thông tin, đảm bảo mật khẩu khớp nhau và đồng ý với điều khoản của chúng tôi!');
    }
}
