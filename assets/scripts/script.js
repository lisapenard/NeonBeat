const rootConteneur = document.querySelector('.rootConteneur')
const soundsPath = "./assets/audio/";

//******** SOUNDS ********\\

let sourcesRock = [soundsPath + "rockDrum5.mp3",
soundsPath + "rockDrum6.mp3",
soundsPath + "rockDrum7.mp3",
soundsPath + "rockDrum.mp3",
soundsPath + "rockGuitar.mp3",
soundsPath + "cymbal.mp3",
soundsPath + "cymbal2.mp3",
soundsPath + "cymbal6.mp3",
soundsPath + "rockBass.mp3",
soundsPath + "rockBass2.mp3"

];

let sourcesAfrica = [soundsPath + "aficanShake.mp3",
soundsPath + "africanConga.mp3",
soundsPath + "africanPercu.mp3",
soundsPath + "africanPercu2.mp3",
soundsPath + "africanPercu3.mp3",
soundsPath + "africanPercu4.mp3",
soundsPath + "africanTambour.mp3",
soundsPath + "africanShaker.mp3",
soundsPath + "africanVoice.mp3",
soundsPath + "africanConga.mp3"
];

let sourcesLatino = [soundsPath + "latin4.mp3",
soundsPath + "latin5.mp3",
soundsPath + "latin6.mp3",
soundsPath + "latin7.mp3",
soundsPath + "latinGuitarOld1.mp3",
soundsPath + "latinGuitarOld2.mp3",
soundsPath + "latinShake.mp3",
soundsPath + "latin.mp3",
soundsPath + "latinBass1.mp3",
soundsPath + "latinBass2.mp3"
];

let sourcesRNB = [soundsPath + "hipBeat.mp3",
soundsPath + "hipBeat2.mp3",
soundsPath + "hipBreath.mp3",
soundsPath + "hipClap.mp3",
soundsPath + "hipClick.mp3",
soundsPath + "hipCymbal.mp3",
soundsPath + "hype.mp3",
soundsPath + "kick1.mp3",
soundsPath + "quickdrum.mp3",
soundsPath + "quickkick.mp3"
];

let sourcesTechno = [soundsPath + "technoBass.mp3",
soundsPath + "technoBeat.mp3",
soundsPath + "technoBeat2.mp3",
soundsPath + "technoBeat6.mp3",
soundsPath + "technoBubble.mp3",
soundsPath + "technoClick.mp3",
soundsPath + "technoKick.mp3",
soundsPath + "technoSynth.mp3",
soundsPath + "technoSynth2.mp3",
soundsPath + "technoSynth3.mp3"


];

let sourcesOrchestra = [soundsPath + "beat4.mp3",
soundsPath + "chanDrum.mp3",
soundsPath + "clap.mp3",
soundsPath + "cymbal.mp3",
soundsPath + "cymbal2.mp3",
soundsPath + "hipBeat2.mp3",
soundsPath + "jazzydrum.mp3",
soundsPath + "latin7.mp3",
soundsPath + "strings1.mp3",
soundsPath + "africanShaker.mp3"
];

let sourcesPacks = [sourcesRock, sourcesAfrica, sourcesLatino, sourcesRNB, sourcesTechno, sourcesOrchestra];

let soundsSources = sourcesRock;


function setSourcesPack(sourcePackIndex) {

	soundsSources = sourcesPacks[sourcePackIndex];

}


const btnPacks = document.querySelectorAll('.btnPack')

for (let i = 0; i < btnPacks.length; i++) {
	btnPacks[i].addEventListener('click', () => {
		setSourcesPack(i)
	})
}

const $btnPlay = document.querySelector('.controlBtn')
const $btnReset = document.querySelector('.resetBtn')
const $btnSound4 = document.querySelector('.sound4')

let currentTurnIndex = -1 // column on which we are -1
let timeBetweenTurns = 130 // duration of sound
const cellsNumberPerRow = 12 // number of columns

const soundsPlayed = [] // sounds that will be played
let soundsPlayedIncrement = 0 // associative array to play the sounds

let turnTimeout

// BPM buttons
const $bpm100 = document.querySelector('.bpm100')
const $bpm120 = document.querySelector('.bpm120')
const $bpm130 = document.querySelector('.bpm130')
const $bpm140 = document.querySelector('.bpm140')
const $bpm160 = document.querySelector('.bpm160')

// Current bpm display
const currentBpm = document.querySelector('.currentBpm')

// Click events to chose bpm in list
$bpm100.addEventListener('click', () => {
	timeBetweenTurns = 500;
	stopMusic()
	playMusic()
	currentBpm.innerHTML = '100 BPM'
})

$bpm120.addEventListener('click', () => {
	timeBetweenTurns = 200;
	stopMusic()
	playMusic()
	currentBpm.innerHTML = '120 BPM'
})

$bpm130.addEventListener('click', () => {
	timeBetweenTurns = 130;
	stopMusic()
	playMusic()
	currentBpm.innerHTML = '130 BPM'
})


$bpm140.addEventListener('click', () => {
	timeBetweenTurns = 100;
	stopMusic()
	playMusic()
	currentBpm.innerHTML = '140 BPM'
})

$bpm160.addEventListener('click', () => {
	timeBetweenTurns = 50;
	stopMusic()
	playMusic()
	currentBpm.innerHTML = '160 BPM'
})


//******** PAD ********\\

const padCells = document.querySelectorAll('.padButtons .cell')
for (let i = 0; i < padCells.length; i++) {
	padCells[i].onclick = function () {
		toggleActiveClass(this)
	}
} // attached a click event to each cell = for each html element .cell = we will snatch the event click 

const toggleActiveClass = (el) => {
	if (el.classList.contains('active')) {
		el.classList.remove('active')
	} else {
		el.classList.add('active')
	} // if the element already has the active class, delete it, otherwise add it

}

const playSound = (soundIndex) => {
	const tempIndex = "soundPlayed" + soundsPlayedIncrement
	soundsPlayed[tempIndex] = document.createElement("audio")

	soundsPlayed[tempIndex].addEventListener("loadeddata", () => { // when the music is loaded = event pending download
		soundsPlayed[tempIndex].play()
	})
	soundsPlayed[tempIndex].addEventListener("ended", () => { // at the end of the audio playback = delete in the sound play the position of the music I just created
		//soundsPlayed[tempIndex].remove()
		delete soundsPlayed[tempIndex]
	})
	soundsPlayed[tempIndex].setAttribute("src", soundsSources[soundIndex])
	console.log(soundsPlayed)

	console.log("soundsPlayedIncrement : " + soundsPlayedIncrement)

	soundsPlayedIncrement++ // We increment the index that allows us to add a new position for the next audio track creation
}

const cells = document.querySelectorAll('.cell')

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', () => {
		playSound(i)
	})
}

const majCurrentTurnIndex = () => {
	if (currentTurnIndex + 1 == cellsNumberPerRow) {
		currentTurnIndex = 0
	}
	else {
		currentTurnIndex = currentTurnIndex + 1
	}
} // updating the current time index: ternary write to quickly increment a variable

const majFocusCol = () => // will generate all the color changes
{
	if (document.querySelector('.focus')) { document.querySelector('.focus').classList.remove('focus') }
	document.querySelectorAll('.padButtons .col')[currentTurnIndex].classList.add('focus')
};

const newTurn = () => {
	majCurrentTurnIndex()
	majFocusCol()
	playSoundsOfFocusCol()
};

const playSoundsOfFocusCol = () => {
	const parent = document.querySelectorAll(".padButtons .col")[currentTurnIndex]
	const children = parent.querySelectorAll(".cell")

	for (let i = 0; i < children.length; i++) {
		if (children[i].classList.contains('active')) { playSound(i); }
	}
}

const playMusic = () => {
	$btnPlay.innerHTML = "Pause"
	newTurn()
	turnTimeout = setInterval(newTurn, timeBetweenTurns);
}

const stopMusic = () => {
	$btnPlay.innerHTML = "Play"
	clearInterval(turnTimeout) // stops the turnTimeout
	currentTurnIndex = -1 // resets to first turn => 0
	if (document.querySelector('.focus')) { document.querySelector('.focus').classList.remove('focus') } // remove "focus" class on focus col
}


$btnPlay.addEventListener('mousedown', () => {

	if ($btnPlay.innerHTML == "Play") {
		playMusic()
	} else {
		stopMusic()
	}

})


$btnReset.addEventListener('mousedown', () => {

	stopMusic()
	const addedSounds = document.querySelectorAll(".cell.active")

	for (let i = 0; i < addedSounds.length; i++) {
		if (addedSounds[i].classList.contains('active')) { addedSounds[i].classList.remove('active') }
	}

})


const tempIndex = "soundPlayed" + soundsPlayedIncrement
soundsPlayed[tempIndex] = document.createElement("audio")


//******** BUTTONS ********\\

const $inputRock = document.querySelector('.inputRock')
const $inputAfrica = document.querySelector('.inputAfrica')
const $btnRock = document.querySelector('.btnRock')
const $btnAfrica = document.querySelector('.btnAfrica')
const $btnLatino = document.querySelector('.btnLatino')
const $btnRNB = document.querySelector('.btnRNB')
const $btnTechno = document.querySelector('.btnTechno')
const $btnOrchestra = document.querySelector('.btnOrchestra')

$btnRock.addEventListener('mousedown', () => {
	selectTheme()
})

$btnAfrica.addEventListener('mousedown', () => {
	selectTheme2()
})

$btnLatino.addEventListener('mousedown', () => {
	selectTheme4()
})

$btnRNB.addEventListener('mousedown', () => {
	selectTheme3()
})

$btnTechno.addEventListener('mousedown', () => {
	selectTheme5()
})

$btnOrchestra.addEventListener('mousedown', () => {
	selectTheme6()
})



const selectTheme = () => {

	if ($inputRock.checked === true) {
		$btnRock.style.fill = '#ff5d80'
		$btnAfrica.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'

	}
	else if ($inputAfrica.checked === true) {
		$btnAfrica.style.fill = '#ffffff'
		$btnRock.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}
}

const selectTheme2 = () => {

	if ($inputRock.checked === true) {
		$btnRock.style.fill = '#ffffff'
		$btnAfrica.style.fill = '#ff5d80'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}
	else if ($inputAfrica.checked === true) {
		$btnAfrica.style.fill = '#ffffff'
		$btnRock.style.fill = '#ff5d80'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}

}

const selectTheme3 = () => {

	if ($inputRock.checked === true) {
		$btnRock.style.fill = '#ffffff'
		$btnAfrica.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ff5d80'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}
	else if ($inputAfrica.checked === true) {
		$btnAfrica.style.fill = '#ffffff'
		$btnRock.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ff5d80'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}

}

const selectTheme4 = () => {

	if ($inputRock.checked === true) {
		$btnRock.style.fill = '#ffffff'
		$btnAfrica.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ff5d80'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}
	else if ($inputAfrica.checked === true) {
		$btnAfrica.style.fill = '#ffffff'
		$btnRock.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ff5d80'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ffffff'
	}

}

const selectTheme5 = () => {

	if ($inputRock.checked === true) {
		$btnRock.style.fill = '#ffffff'
		$btnAfrica.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ff5d80'
		$btnOrchestra.style.fill = '#ffffff'
	}
	else if ($inputAfrica.checked === true) {
		$btnAfrica.style.fill = '#ffffff'
		$btnRock.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ff5d80'
		$btnOrchestra.style.fill = '#ffffff'
	}

}

const selectTheme6 = () => {

	if ($inputRock.checked === true) {
		$btnRock.style.fill = '#ffffff'
		$btnAfrica.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ff5d80'
	}
	else if ($inputAfrica.checked === true) {
		$btnAfrica.style.fill = '#ffffff'
		$btnRock.style.fill = '#ffffff'
		$btnLatino.style.fill = '#ffffff'
		$btnRNB.style.fill = '#ffffff'
		$btnTechno.style.fill = '#ffffff'
		$btnOrchestra.style.fill = '#ff5d80'
	}

}

selectTheme()


