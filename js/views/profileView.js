// JavaScript code in profileView.js

// Get the elements
const changeInfoButton = document.getElementById('change-info');
const achieveButton = document.getElementById('achieve');
const leaderButton = document.getElementById('leader');
const logOutButton = document.getElementById('log-out');

const changeInfoSection = document.getElementById('change-info-section');
const achieveSection = document.getElementById('achieve-section');
const leaderSection = document.getElementById('leader-section');

// Add event listeners
changeInfoButton.addEventListener('click', function () {
  // Show the change-info section
  changeInfoSection.style.display = 'block';
  changeInfoButton.style.backgroundColor = '#7754F6';
  changeInfoButton.style.color = '#fff';

  // Hide other sections
  achieveSection.style.display = 'none';
  achieveButton.style.backgroundColor = '#fff';
  achieveButton.style.color = '#7754F6';

  leaderSection.style.display = 'none';
  leaderButton.style.backgroundColor = '#fff';
  leaderButton.style.color = '#7754F6';
});

achieveButton.addEventListener('click', function () {
  // Show the achievements section
  achieveSection.style.display = 'block';
  achieveButton.style.backgroundColor = '#7754F6';
  achieveButton.style.color = '#fff';

  // Hide other sections
  changeInfoSection.style.display = 'none';
  changeInfoButton.style.backgroundColor = '#fff';
  changeInfoButton.style.color = '#7754F6';

  leaderSection.style.display = 'none';
  leaderButton.style.backgroundColor = '#fff';
  leaderButton.style.color = '#7754F6';
});

leaderButton.addEventListener('click', function () {
  // Show the leaderboard section
  leaderSection.style.display = 'block';
  leaderButton.style.backgroundColor = '#7754F6';
  leaderButton.style.color = '#fff';

  // Hide other sections
  changeInfoSection.style.display = 'none';
  changeInfoButton.style.backgroundColor = '#fff';
  changeInfoButton.style.color = '#7754F6';

  achieveSection.style.display = 'none';
  achieveButton.style.backgroundColor = '#fff';
  achieveButton.style.color = '#7754F6';
});

logOutButton.addEventListener('click', function () {
  // Redirect to index.html
  window.location.href = '/index.html';
});

// Get the change avatar element
var changeAvatarElement = document.querySelector('.change-avatar');

// Add event listener for click
changeAvatarElement.addEventListener('click', function() {
  // Create an input element of type "file"
  var fileInput = document.createElement('input');
  fileInput.type = 'file';

  // Add event listener for file selection
  fileInput.addEventListener('change', function(event) {
    // Get the selected file
    var selectedFile = event.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Create a FileReader object
      var reader = new FileReader();

      // Add event listener for file reading
      reader.addEventListener('load', function() {
        // Get the loaded image data (base64 encoded)
        var imageData = reader.result;

        // Update the avatar image in the upper container
        var avatarImageUpper = document.querySelector('.avatar-grande');
        avatarImageUpper.src = imageData;

        // Update the avatar image in the navbar
        var avatarImageNavbar = document.querySelector('.avatar-image');
        avatarImageNavbar.src = imageData;
      });

      // Read the selected file as Data URL
      reader.readAsDataURL(selectedFile);
    }
  });

  // Trigger click event on the file input element
  fileInput.click();
});