console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false

// Function to change the turn
const changeTurn = () =>{
    return turn === "X"? "0": "X"
}

// Function to check for a win 
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext')
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ]
    wins.forEach(e => {
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = `Hurry!! ${boxtext[e[0]].innerText} Won`
            music.play()
            Confetti()
            isgameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px'
            document.querySelector('.line').style.width = '20vw'
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
        }
    })

     // Check for tie
    if (!isgameover) {
        let filled = Array.from(boxtext).every(element => element.innerText !== "");
        if (filled) {
            document.querySelector('.info').innerText = "Oh-uh!! Game is a Tie!";
            document.querySelector('.imgbox-two').getElementsByTagName('img')[0].style.width = '200px'
            isgameover = true;
            gameover.play();
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext')
    element.addEventListener('click', ()=> {
        if(boxtext.innerText === ''){
            boxtext.innerText = turn
            turn = changeTurn()
            audioTurn.play()
            checkWin()
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`   
            }
        }
    })
})

const Confetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtext = document.querySelectorAll('.boxtext')
    Array.from(boxtext).forEach(element => {
        element.innerText = ''
    })
    turn = "X"
    music.pause();
    music.currentTime = 0;
    isgameover = false
    document.querySelector('.line').style.width = '0vw'
    document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}` 
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px' 
    document.querySelector('.imgbox-two').getElementsByTagName('img')[0].style.width = '0px' 
})

