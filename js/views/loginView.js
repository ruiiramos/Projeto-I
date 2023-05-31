class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.querySelector('input[name="remember"]');
  const eyeIcon = document.getElementById('eye-icon');
  let isPasswordVisible = false;

  // Restore values from localStorage
  usernameInput.value = localStorage.getItem('username') || '';
  passwordInput.value = localStorage.getItem('password') || '';
  rememberCheckbox.checked = localStorage.getItem('remember') === 'true';

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    const loggedInUser = userList.find(function(user) {
      return user.username === username && user.password === password;
    });

    if (loggedInUser) {
      alert('Login successful!');
    } else {
      alert('Incorrect username or password.');
    }

    // Store values in localStorage based on remember checkbox state
    if (rememberCheckbox.checked) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('remember', true);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('remember');
    }
  });

  eyeIcon.addEventListener('click', function() {
    isPasswordVisible = !isPasswordVisible;
    if (isPasswordVisible) {
      passwordInput.type = 'text';
      eyeIcon.src = '/img/olho-aberto.svg';
    } else {
      passwordInput.type = 'password';
      eyeIcon.src = '/img/olho-fechado.svg';
    }
  });
});
