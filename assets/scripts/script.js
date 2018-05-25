const rootConteneur = document.querySelector('.rootConteneur')

var soundsPath = "./assets/audio/";
// var soundsSources = [   soundsPath+"trumpet.mp3",
// 						soundsPath+"trumpet.mp3",
// 						soundsPath+"trumpet.mp3",
// 						soundsPath+"xylo.mp3" ];

var sourcesPack1 = [   soundsPath+"kick1.mp3",
						soundsPath+"kick1.mp3",
						soundsPath+"kick1.mp3",
						soundsPath+"kick1.mp3" ];
						
var sourcesPack2 = [   soundsPath+"guitar.mp3",
						soundsPath+"guitar.mp3",
						soundsPath+"guitar.mp3",
						soundsPath+"guitar.mp3" ];

var sourcesPacks = [ sourcesPack1  , sourcesPack2  ];
						
var soundsSources = sourcesPack1;


function setSourcesPack(sourcePackIndex){
	console.log('SETSOURCES')
	soundsSources = sourcesPacks[ sourcePackIndex ];
	console.log(soundsSources)
}				


const btnPacks = document.querySelectorAll('.btnPack')

for (let i = 0; i < btnPacks.length; i++) 
{
	btnPacks[i].addEventListener('click', () => 
	{
		setSourcesPack(i) 
	})
}

const $btnPlay = document.querySelector('.control-btn')
const $btnReset = document.querySelector('.reset-btn')
const $btnSound4 = document.querySelector('.sound4')

let currentTurnIndex = -1
const timeBetweenTurns = 150
const cellsNumberPerRow = 12

const soundsPlayed = []
let soundsPlayedIncrement = 0

let turnTimeout

const padCells = document.querySelectorAll('.pad-buttons .cell')
for (let i = 0 ; i < padCells.length ; i++){
	padCells[i].onclick = function(){
		toggleActiveClass(this)
	}
}

const toggleActiveClass = (el) =>
{
	if(el.classList.contains('active')){
		el.classList.remove('active')
	}else{
		el.classList.add('active')
	}
	
}

const playSound = (soundIndex) =>
{
	const tempIndex = "soundPlayed"+soundsPlayedIncrement
	soundsPlayed[tempIndex] = document.createElement("audio")
	
	soundsPlayed[tempIndex].addEventListener("loadeddata", () => {
		soundsPlayed[tempIndex].play()
	})
	soundsPlayed[tempIndex].addEventListener("ended", () => {
		//soundsPlayed[tempIndex].remove()
		delete soundsPlayed[tempIndex]
	})
	soundsPlayed[tempIndex].setAttribute("src", soundsSources[soundIndex])
	console.log(soundsPlayed)
	
	console.log("soundsPlayedIncrement : "+soundsPlayedIncrement)
	
	soundsPlayedIncrement++
}

const cells = document.querySelectorAll('.cell')

for (let i = 0; i < cells.length; i++) 
{
	cells[i].addEventListener('click', () => 
	{
		playSound(i) 
	})
}

const majCurrentTurnIndex =() => 
{
	currentTurnIndex = currentTurnIndex + 1 == cellsNumberPerRow ? 0 : currentTurnIndex + 1
}

const majFocusCol = () =>
{
	if(document.querySelector('.focus')){document.querySelector('.focus').classList.remove('focus')}
	document.querySelectorAll('.pad-buttons .col')[currentTurnIndex].classList.add('focus')
};
const newTurn = () => 
{
	majCurrentTurnIndex()
	majFocusCol()
	playSoundsOfFocusCol()
};

const playSoundsOfFocusCol = () =>
{
	const parent = document.querySelectorAll(".pad-buttons .col")[currentTurnIndex]
	const children = parent.querySelectorAll(".cell")
	
	for(let i = 0 ; i < children.length ; i++){
		if(children[i].classList.contains('active')){ playSound(i); }
	}
}

const playMusic = () => 
{
	$btnPlay.innerHTML = "Pause"
	newTurn()
	turnTimeout = setInterval(newTurn, timeBetweenTurns); // launches the turnTimeout (i.e. the music)
}
const stopMusic = () => 
{
	$btnPlay.innerHTML = "Play"
	clearInterval(turnTimeout) // stops the turnTimeout (i.e. the music)
	currentTurnIndex = -1 // resets to first turn => 0
	if(document.querySelector('.focus')){document.querySelector('.focus').classList.remove('focus')} // remove "focus" class on focus col
}


$btnPlay.addEventListener('mousedown', () => {

	if($btnPlay.innerHTML == "Play"){
		playMusic()
	}else{
		stopMusic()
	}

})


$btnReset.addEventListener('mousedown', () => {

	stopMusic()
	const addedSounds = document.querySelectorAll(".cell.active")
	
	for(let i = 0 ; i < addedSounds.length ; i++){
		if(addedSounds[i].classList.contains('active')){ addedSounds[i].classList.remove('active')}
	}

})
