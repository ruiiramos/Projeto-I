document.addEventListener('DOMContentLoaded', function() {
    var registerForm = document.getElementById('register-form');
    var loginForm = document.getElementById('login-form');
    var registerUsernameInput = document.getElementById('register-username');
    var registerPasswordInput = document.getElementById('register-password');
    var loginUsernameInput = document.getElementById('login-username');
    var loginPasswordInput = document.getElementById('login-password');
    var rememberCheckbox = document.querySelector('input[name="remember"]');
    var eyeIcon = document.getElementById('eye-icon');
    var isPasswordVisible = false;
  
    // Restore values from localStorage
    loginUsernameInput.value = localStorage.getItem('username') || '';
    loginPasswordInput.value = localStorage.getItem('password') || '';
    rememberCheckbox.checked = localStorage.getItem('remember') === 'true';
  
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      var username = registerUsernameInput.value;
      var password = registerPasswordInput.value;
  
      if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields.');
        return;
      }
  
      var users = JSON.parse(localStorage.getItem('users')) || [];
  
      var matchingUser = users.find(function(user) {
        return user.username === username;
      });
  
      if (matchingUser) {
        alert('Username already exists. Please choose a different username.');
        return;
      }
  
      users.push({ username: username, password: password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful! You can now login.');
      registerForm.reset();
    });
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      var username = loginUsernameInput.value;
      var password = loginPasswordInput.value;
  
      if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields.');
        return;
      }
  
      var users = JSON.parse(localStorage.getItem('users')) || [];
  
      var loggedInUser = users.find(function(user) {
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
        loginPasswordInput.type = 'text';
        eyeIcon.src = '/img/olho-aberto.svg';
      } else {
        loginPasswordInput.type = 'password';
        eyeIcon.src = '/img/olho-fechado.svg';
      }
    });
  }); 