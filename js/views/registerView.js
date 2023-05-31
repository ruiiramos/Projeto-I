class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const eyeIcons = document.querySelectorAll('.password-icon');
  let isPasswordVisible = false;

  eyeIcons.forEach(function(eyeIcon) {
    eyeIcon.addEventListener('click', function() {
      togglePasswordVisibility();
    });
  });

  function togglePasswordVisibility() {
    isPasswordVisible = !isPasswordVisible;
    if (isPasswordVisible) {
      passwordInput.type = 'text';
      confirmPasswordInput.type = 'text';
      eyeIcons.forEach(function(eyeIcon) {
        eyeIcon.src = '/img/olho-aberto.svg';
      });
    } else {
      passwordInput.type = 'password';
      confirmPasswordInput.type = 'password';
      eyeIcons.forEach(function(eyeIcon) {
        eyeIcon.src = '/img/olho-fechado.svg';
      });
    }
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!validateForm(username, email, password, confirmPassword)) {
      return;
    }

    const user = new User(username, email, password);

    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    userList.push(user);
    localStorage.setItem('userList', JSON.stringify(userList));

    alert('Registration successful!');
    form.reset();
  });

  function validateForm(username, email, password, confirmPassword) {
    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      alert('Please fill in all fields.');
      return false;
    }

    const existingUser = userList.find(function(user) {
      return user.username.toLowerCase() === username.toLowerCase();
    });

    if (existingUser) {
      alert('Username already taken. Please choose a different username.');
      return false;
    }

    const existingEmail = userList.find(function(user) {
      return user.email.toLowerCase() === email.toLowerCase();
    });

    if (existingEmail) {
      alert('Email already taken. Please choose a different email.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please enter the same password.');
      return false;
    }

    return true;
  }
});