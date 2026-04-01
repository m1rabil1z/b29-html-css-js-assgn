let audio = new Audio();
let isloopone = false;
let isloopall = false;
let isshuffle = false;
let cur = 0;
let blobArray = [];


const music = document.getElementById("music");
const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const loopone = document.getElementById("loopone");
const loopall = document.getElementById("loopall");
const shuffle = document.getElementById("shuffle");
const songname = document.getElementById("currentsong");
const songlist = document.getElementById("playlist-names")
const progress = document.getElementById("progress")

music.addEventListener('change', (e) => {
    songlist.innerHTML = '';
    blobArray = Array.from(e.target.files);

    blobArray.forEach(element => {
        const song = document.createElement('li');
        song.textContent = element.name;
        songlist.append(song)
    });

})

function playAudio(index){
    if (blobArray.length === 0){
        return
    } else {
        url = URL.createObjectURL(blobArray[index]);
        songname.textContent = blobArray[index].name
        audio.src = url;
        audio.play()
    }
}

play.onclick = function(){
    if (audio.paused){
        play.innerHTML="⏸";
        if (!audio.src){
            playAudio(cur)
        } else {
            audio.play()
        }
    } else {
        play.innerHTML="▶︎";
        audio.pause()
    }
}

next.onclick = function(){
    if (cur < (blobArray.length - 1)){
        cur += 1;
        playAudio(cur);
        play.innerHTML="⏸";
    } else {
        return
    }
}

previous.onclick = function(){
    if (cur > 0){
        cur -= 1;
        playAudio(cur);
        play.innerHTML="⏸";
    } else {
        return
    }
}

audio.ontimeupdate = () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration)* 100;

    }
}

progress.oninput = () => {
    const seekTime = (progress.value / 100) * audio.duration
    audio.currentTime = seekTime
}

audio.onended = () => {
    if (isloopall){
        cur = (cur + 1) % blobArray.length;
        playAudio(cur);
        play.innerHTML = "⏸";
    } else if (isloopone) {
        audio.currentTime = 0;
        audio.play()
    } else if (isshuffle){
        cur = Math.floor(Math.random() * blobArray.length);
        playAudio(cur);
    } else {
        next.onclick()
    }
}

shuffle.onclick = function() {
    isshuffle = !isshuffle;
    this.classList.toggle("active", isshuffle);
    if (isshuffle) {
        isloopone = false;
        isloopall = false;
        loopone.classList.remove("active");
        loopall.classList.remove("active");
    }
}

loopall.onclick = function() {
    isloopall = !isloopall;
    this.classList.toggle("active", isloopall);
    if (isloopall) {
        isloopone = false;
        isshuffle = false;
        loopone.classList.remove("active");
        shuffle.classList.remove("active");
    }
}

loopone.onclick = function() {
    isloopone = !isloopone;
    this.classList.toggle("active", isloopone);
    if (isloopone) {
        isloopall = false;
        isshuffle = false;
        loopall.classList.remove("active");
        shuffle.classList.remove("active");
    }
}