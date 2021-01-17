const opponent = document.querySelector('#opponent');
const opponentImg = opponent.querySelector('img');
const player = document.querySelector('#player');
const playerImg = player.querySelector('img');

let opponentImgState = 1;
let playerImgState = 1;

let queuedPresses = 0;

let opponentPosiiton = 0;
let playerPosition = 0;

let defaultMovement = 5;
let basePlayerMovement = defaultMovement * 0.9

document.addEventListener('keyup', (event) => {
  if (event.keyCode == 32) {
    queuedPresses++;
  }
});

// handleFrameUpdate = () => {
  
//   if (isKeyPressed) {
//     const playerMovement = Math.random() * 21;
//     playerPosition += playerMovement;
//     player.style.left = `${Math.min(100, playerPosition)}%`
//     isKeyPressed = false;
//   }

//   opponentPosiiton += defaultMovement
//   opponent.style.right = `${Math.min(100, opponentPosiiton)}%`
//   requestAnimationFrame(handleFrameUpdate);
// }

// requestAnimationFrame(handleFrameUpdate);

const handleMovement = () => {
  
  if (queuedPresses) {
    debugger;
    const boostScaleFactor = 1 + (queuedPresses / 10); 
    const basePlayerMovementRand = (Math.random() * basePlayerMovement * 2)
    const playerMovement = basePlayerMovementRand * boostScaleFactor;
    playerPosition += playerMovement;
    player.style.left = `${Math.min(100, playerPosition)}%`

    playerImgState = playerImgState === 1 ? 2 : 1;
    if (playerImgState === 2 ) {
      player.classList.toggle('up')
    }
    playerImg.src = playerImgState === 1 
      ? playerImg.dataset['phase-1']
      : playerImg.dataset['phase-2'];

    if (checkWinCondition(player, playerPosition)) { 
      document.querySelector('.player__condition--win').classList.toggle('hide');
      return;
    }
    queuedPresses = 0;
  }

  opponentPosiiton += defaultMovement
  opponent.style.right = `${Math.min(100, opponentPosiiton)}%`

  opponentImgState = opponentImgState === 1 ? 2 : 1;
  opponentImg.src = opponentImgState === 1 
    ? opponentImg.dataset['phase-1']
    : opponentImg.dataset['phase-2'];

  if (opponentImgState === 2 ) {
    opponent.classList.toggle('up')
  }

  if (checkWinCondition(opponent, opponentPosiiton)) {
    document.querySelector('.player__condition--lose').classList.toggle('hide');
    return;
  }
    
};

const checkWinCondition = (character, position) => {
  if (position >= 100) {
    clearInterval(movementInterval);
    return true;
  }
}
const movementInterval = setInterval(handleMovement, 500);

