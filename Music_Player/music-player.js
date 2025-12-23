const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevsongButton = document.getElementById("prev-song");
const nextsongButton = document.getElementById("next-song");
const shuffleButton = document.getElementById("shuffle-song");
const repeatButton = document.getElementById("repeat-song");

const songs = [
    {
        image: "./album-art1.jpg",
        name: "Deck the Halls",
        artist: "John Perry",
        audio: "./deck-the-halls.mp3"
    },
    {
        image: "./album-art2.jpg",
        name: "Jingle Bells",
        artist: "James Lord Pierpont",
        audio: "./jingle-bells.mp3"
    },
    {
        image: "./album-art3.jpg",
        name: "Joy to the World",
        artist: "Isaac Watts",
        audio: "./joy-to-the-world.mp3"
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
updateSong();

prevsongButton.addEventListener("click", function() {
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
});

nextsongButton.addEventListener("click", function(){
    if (currentSongIndex == songs.length - 1) {
        return
    }
    currentSongIndex++;
    updateSong();
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
    }
    else {
        audio.play();
    }
});

function updateSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    }
}

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;

});

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);

// 🔹 Auto-play next song when current song ends
audio.addEventListener("ended", function() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        updateSong();
        audio.play();
    } else {
        // Optional: reset to first song or stop
        currentSongIndex = 0;
        updateSong();
        audio.pause();
    }
});

updateSong();