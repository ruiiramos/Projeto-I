const avatar = document.getElementById('logged-avatar');
const button = document.querySelector('.play-button');
const navbarButton = document.querySelector('.navbar-button')

if (sessionStorage.getItem('loggedUser')) {
    avatar.innerHTML = `
      <div class="avatar">
      <img src="../assets/img/elements/avatar-default.png" alt="Avatar" class="avatar-image">
    </div>`
    button.addEventListener('click', function() {
        location.href='../html/landingPage.html'
    })
    navbarButton.addEventListener('click', function() {
        location.href='../html/landingPage.html'
    })
    avatar.addEventListener('click', function() {
        location.href='../html/profile.html'
    })
} else {
    button.addEventListener('click', function() {
        location.href='../html/login.html'
    })
    navbarButton.addEventListener('click', function() {
        location.href='../html/login.html'
    })
}