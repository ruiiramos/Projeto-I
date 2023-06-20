import { EscapeRoom } from "/js/models/escapeRoomModel.js";
import { Challenge } from "/js/models/challenges.js";

const desafio1 = new Challenge('Qual é o tipo de cadeia alimentar do Braquiossauro?', ['Herbívoro', 'Omnívoro', 'Carnívoro', 'Saprófrago'], 1, 1);
const desafio2 = new Challenge('O Pterodáctilo era uma espécie de _____ com capacidade de _____.', ['dinossauro, voar', 'ave, nadar', 'ave, voar', 'dinossauro, nadar'], 1, 2);
const desafio3 = new Challenge('Os dinossauros foram grandes animais que povoaram a Terra na Era _____', ['Paleozóica', 'Cenozóica', 'Mesózoica', 'Pré-Câmbrica'], 3, 3);
const desafio4 = new Challenge('Qual o dinossauro mais rápido de todos?', ['Tricerátops', 'Estegossauro', 'Gobisaurus', 'Velociraptor'], 4, 4);
const desafio5 = new Challenge('Qual dos seguintes dinossauros era conhecido por ter uma crista óssea no topo da cabeça?', ['Brachiosaurus', 'Parasaurolophus', 'Ankylosaurus', 'Tyrannosaurus Rex'], 2, 5);

const room1 = new EscapeRoom('First Room', '../assets/img/elements/sala1.1.png');
room1.addPuzzle(desafio1);
room1.addPuzzle(desafio2);

const room2 = new EscapeRoom('Second Room', '../assets/img/elements/sala1.2.png');
room2.addPuzzle(desafio3);

const room3 = new EscapeRoom('Third Room', '../assets/img/elements/sala1.3.png');
room3.addPuzzle(desafio4);
room3.addPuzzle(desafio5);

const challengeImages = [
  '../assets/img/elements/chave1.png', // Image for Challenge 1
  '../assets/img/elements/chave2.png', // Image for Challenge 2
  '../assets/img/elements/chave3.png', // Image for Challenge 3
  '../assets/img/elements/chave4.png', // Image for Challenge 4
  '../assets/img/elements/chave5.png', // Image for Challenge 5
];

let currentRoom = room1;

let dialogBoxClicked = false;

const failSound = new Audio('../assets/sounds/fail-sound.mp3')
const rightSound = new Audio('../assets/sounds/correct-answer.mp3')
const winSound = new Audio('../assets/sounds/win-sound.mp3')
const loseSound = new Audio('../assets/sounds/lose-sound.mp3')

function openQuestionsModal(challenge) {
  if (!dialogBoxClicked) {
    dialogBoxClicked = true;
    showPointsForCurrentRoom();
  }

  const modal = document.getElementById('modal');
  const closeSpans = modal.getElementsByClassName('close');
  const closeButtons = modal.getElementsByClassName('close-button');

  modal.innerHTML = `<div id="modal" class="modal">
  <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Desafio</h2>
      <p class="question"></p>
      <div class="additional-buttons">
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
      <div class="modal-buttons">
        <button class="submit-button">Submit</button>
        <button class="close-button">Close</button>
      </div>
  </div>
</div>`

  for (let i = 0; i < closeSpans.length; i++) {
    closeSpans[i].addEventListener('click', closeModal);
  }

  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closeModal);
  }

  if (challenge) {
    const modalQuestion = modal.querySelector('.question');
    modalQuestion.textContent = challenge.text;

    const modalButtons = modal.querySelectorAll('.additional-buttons button');
    for (let i = 0; i < modalButtons.length; i++) {
      const button = modalButtons[i];
      button.textContent = challenge.answers[i];

      // Add click event listener to each button
      button.addEventListener('click', function () {
        if (i === challenge.solution - 1) {
          showQuestionsAlert('Resposta correta!', false);
          rightSound.play()
          showPointsForCurrentRoom();
          challenge.solved = true;
          challenge.selectedAnswer = i + 1; // Assign the selected answer
          addToInventory(challenge);
        } else {
          showQuestionsAlert('Resposta errada. Tenta outra vez!', true);
          failSound.play()
          challenge.selectedAnswer = i + 1; // Assign the selected answer even for incorrect answers
        }
      })                             
            
      // Disable the challenge point if already solved
      if (challenge.solved) {
        const point = document.getElementById(`point-${challenge.pointId}`);
        point.style.pointerEvents = 'none';
      }
    }
  }
}

// Update the showPointsForCurrentRoom() function
function showPointsForCurrentRoom() {
  const point1 = document.getElementById('point-1');
  const point2 = document.getElementById('point-2');
  const point3 = document.getElementById('point-3');
  const point4 = document.getElementById('point-4');
  const point5 = document.getElementById('point-5');

  // Hide all points
  point1.style.display = 'none';
  point2.style.display = 'none';
  point3.style.display = 'none';
  point4.style.display = 'none';
  point5.style.display = 'none';

  // Remove the 'clickable-point' class from all points
  point1.classList.remove('clickable-point');
  point2.classList.remove('clickable-point');
  point3.classList.remove('clickable-point');
  point4.classList.remove('clickable-point');
  point5.classList.remove('clickable-point');

  // Show points based on current room
  if (currentRoom === room1) {
    point1.style.display = 'block';
    point2.style.display = 'block';
    
    if (!desafio1.solved) {
      point1.classList.add('clickable-point');
    }

    if (!desafio2.solved) {
      point2.classList.add('clickable-point');
    }
  } else if (currentRoom === room2) {
    point3.style.display = 'block';

    if (!desafio3.solved) {
      point3.classList.add('clickable-point');
    }
  } else if (currentRoom === room3) {
    point4.style.display = 'block';
    point5.style.display = 'block';

    if (!desafio4.solved) {
      point4.classList.add('clickable-point');
    }

    if (!desafio5.solved) {
      point5.classList.add('clickable-point');
    }
  }

  // Check if all challenges are solved
  const allChallengesSolved = desafio1.solved && desafio2.solved && desafio3.solved && desafio4.solved && desafio5.solved;
  if (allChallengesSolved) {
    showAlert();
    clearTimeout(timerId);
  }
  
}

window.addEventListener('load', () => {
  const roomImage = document.getElementById('room-image');
  roomImage.src = currentRoom.image;
  showPointsForCurrentRoom();

  if (currentRoom.challenges) { // Check if currentRoom.challenges exists
    for (let i = 0; i < currentRoom.challenges.length; i++) {
      const challenge = currentRoom.challenges[i];
      const point = document.getElementById(`point-${challenge.pointId}`);

      // Disable the challenge point if already solved
      if (challenge.solved) {
        point.style.pointerEvents = 'none';
      }

      point.addEventListener('click', function () {
        if (challenge.solved) {
          return;
        }

        openQuestionsModal(challenge);
      });
    }
  }
});

const timerElement = document.getElementById('timer');
let remainingTime = 5 * 60;

function startTimer() {
  document.getElementById('dialog-container').removeEventListener('click', startTimer);
  updateTimer();

  // Enable arrow buttons after timer starts
  document.getElementById('arrow-right').addEventListener('click', handleRightArrowClick);
  document.getElementById('arrow-left').addEventListener('click', handleLeftArrowClick);

  // Hide the dialog box
  document.getElementById('dialog-container').style.display = 'none';

  // Show the inventory
  document.getElementById('inventory').style.display = 'flex';

  // Enable points after timer starts
  enablePoints();

  document.querySelector('.dicas-button').addEventListener('click', function() {
    const modal = document.querySelector('.modal-dicas');
    modal.style.display = 'block';
  })

  document.getElementById('point-1').addEventListener('click', function() {
    if (desafio1.solved || currentRoom !== room1) {
      return;
    }
    openQuestionsModal(desafio1);
  });
  document.getElementById('point-2').addEventListener('click', function() {
    if (desafio2.solved || currentRoom !== room1) {
      return;
    }
    openQuestionsModal(desafio2);
  });
  document.getElementById('point-3').addEventListener('click', function() {
    if (desafio3.solved || currentRoom !== room2) {
      return;
    }
    openQuestionsModal(desafio3);
  });
  document.getElementById('point-4').addEventListener('click', function() {
    if (desafio4.solved || currentRoom !== room3) {
      return;
    }
    openQuestionsModal(desafio4);
  });
  document.getElementById('point-5').addEventListener('click', function() {
    if (desafio5.solved || currentRoom !== room3) {
      return;
    }
    openQuestionsModal(desafio5);
  });

  const point1 = document.getElementById('point-1');
  const point2 = document.getElementById('point-2');
  const point3 = document.getElementById('point-3');
  const point4 = document.getElementById('point-4');
  const point5 = document.getElementById('point-5');

  point1.style.cursor = 'pointer';
  point2.style.cursor = 'pointer';
  point3.style.cursor = 'pointer';
  point4.style.cursor = 'pointer';
  point5.style.cursor = 'pointer';
}

document.getElementById('dialog-container').addEventListener('click', startTimer);

function handleRightArrowClick() {
  if (currentRoom === room1) {
    currentRoom = room2;
  } else if (currentRoom === room2) {
    currentRoom = room3;
  }

  const roomImage = document.getElementById('room-image');
  roomImage.src = currentRoom.image;
  showPointsForCurrentRoom();
}

function handleLeftArrowClick() {
  if (currentRoom === room3) {
    currentRoom = room2;
  } else if (currentRoom === room2) {
    currentRoom = room1;
  }

  const roomImage = document.getElementById('room-image');
  roomImage.src = currentRoom.image;
  showPointsForCurrentRoom();
}

let timerId;

function updateTimer() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  remainingTime--;

  if (remainingTime < 0) {
    showAlertTimer('O tempo esgotou-se. Tenta outra vez!');
    loseSound.play();
  } else {
    timerId = setTimeout(updateTimer, 1000); // Update every second
  }
}

function closeModal() {
  const modal = document.getElementById('modal');

  if (modal.innerHTML != '') {
    modal.innerHTML = '';
    const closeSpans = modal.getElementsByClassName('close');
    for (let i = 0; i < closeSpans.length; i++) {
      closeSpans[i].removeEventListener('click', closeModal);
    }

    const closeButtons = modal.getElementsByClassName('close-button');
    for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].removeEventListener('click', closeModal);
    }

    // Disable dialog box flag
    dialogBoxClicked = false;
    showPointsForCurrentRoom();

    // Enable points when the modal is closed
    enablePoints();
  }
}

function enablePoints() {
  const clickablePoints = document.getElementsByClassName('clickable-point');

  // Enable all points
  for (let i = 0; i < clickablePoints.length; i++) {
    clickablePoints[i].style.pointerEvents = 'auto';
    clickablePoints[i].style.cursor = 'pointer';
  }
}

function showQuestionsAlert(message, isError) {
  const alertOverlay = document.getElementById('alert-overlay');
  const alertMessage = document.getElementById('alert-message');
  const alertButton = document.getElementById('alert-button');

  // Set the message
  alertMessage.textContent = message;

  // Add error class if it's an error alert
  if (isError) {
    alertButton.classList.add('error');
  } else {
    alertButton.classList.remove('error');
  }

  // Display the alert overlay
  alertOverlay.classList.add('show');

  // Close the modal when the alert is closed
  alertButton.addEventListener('click', closeModal);
}

document.getElementById('alert-button').addEventListener('click', function() {
  const alertOverlay = document.getElementById('alert-overlay');
  alertOverlay.classList.remove('show');
});

function addToInventory(challenge) {
  const inventorySlots = document.getElementsByClassName('inventory-slot');

  // Check if there are available inventory slots
  const availableSlot = Array.from(inventorySlots).find(slot => !slot.hasChildNodes());
  if (!availableSlot) {
    return;
  }

  // Create an image element and set its source
  const inventoryItem = document.createElement('img');
  inventoryItem.src = challengeImages[challenge.pointId - 1];

  // Add the image to the available inventory slot
  availableSlot.appendChild(inventoryItem);
}

function showAlertTimer(message) {
  const alert2 = document.querySelector('.alert2')
  const messageAlert = document.getElementById('message-alert');

  messageAlert.textContent = message;
  alert2.classList.add('show');

  closeBtn.addEventListener('click', function() {
    alert2.classList.remove('show');
    location.href = "../html/room1.html";
  });
}

function showAlert() {
  const alert3 = document.querySelector('.alert3');
  const messageAlert = document.getElementById('message-alert2');

  messageAlert.textContent = 'Apanhaste todas as peças do puzzle. Parabéns!';
  winSound.play();
  alert3.classList.add('show');

  closeBtn2.addEventListener('click', function() {
    alert3.classList.remove('show');
    location.href = "../html/room2.html"
  });
}

document.querySelector('.close-button').addEventListener('click', function() {
  const modal = document.querySelector('.modal-dicas');
  modal.style.display = 'none';
})

document.querySelector('.close').addEventListener('click', function() {
  const modal = document.querySelector('.modal-dicas');
  modal.style.display = 'none';
})