const pianoKeys = document.querySelectorAll(".piano-keys .key")
const volumeSlider = document.querySelector(".volume-slider input")
const keyCheckbox = document.querySelector(".keys-checkbox input")


let audio = new Audio("tunes/a.mp3")
let allKeys = []

let isPlaying = false;
let playQueue = []; // 재생 대기열

const playTune = (key) => {
    // console.log(key)
    if(!isPlaying) {
        isPlaying = true;
        audio.src = `tunes/${key}.mp3`;
        audio.play();
        console.log(allKeys)

        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        clickedKey.classList.add('active');
    
        setTimeout(()=> {
          clickedKey.classList.remove('active');
          isPlaying = false;
          if(playQueue.length > 0) {
            const nextKey = playQueue.shift();
            playTune(nextKey)
          }
        },150)
    } else {
        playQueue.push(key);
    }
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key)
    // console.log(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
})

const pressedKey = (e) => {
    if(allKeys.includes(e.key)) playTune(e.key);
}

const handleVolume = (e) => {
    audio.volume = e.target.value
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}
keyCheckbox.addEventListener("click", showHideKeys)
volumeSlider.addEventListener("input", handleVolume)
document.addEventListener('keydown', pressedKey)
