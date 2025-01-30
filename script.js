console.log("welcome to spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "ishq bulava", filepath: "../songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "salam-e-Ishq", filepath: "../songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "bang bang", filepath: "../songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "channa mereya", filepath: "../songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "soneyo", filepath: "../songs/1.mp3", coverPath: "covers/5.jpg" },
    { songName: "baarish", filepath: "../songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Let me love you", filepath: "../songs/3.mp3", coverPath: "covers/7.jpg" },
    { songName: "gulabo", filepath: "../songs/4.mp3", coverPath: "covers/8.jpg" },
    { songName: "ishq", filepath: "../songs/1.mp3", coverPath: "covers/9.jpg" },
    { songName: "huzoor", filepath: "../songs/2.mp3", coverPath: "covers/10.jpg" },
];
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id); // Correctly get the song index

        if (songIndex === clickedIndex) {
            if (!audioElement.paused) {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            } else {
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }
        } else {
            makeAllPlays();
            songIndex = clickedIndex;  // Directly set the correct index
            audioElement.src = songs[songIndex].filepath; // Use the correct song path
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});



document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Fix: Use `songs.length` (10 songs)
    audioElement.src = songs[songIndex].filepath; // Fix: Use the correct song path
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Fix: Loop properly for all 10 songs
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
document.getElementById('viewMoreBtn').addEventListener('click', () => {
    let extraSongs = document.getElementById('extraSongs');
    if (extraSongs.style.display === "none") {
        extraSongs.style.display = "block";
        document.getElementById('viewMoreBtn').innerText = "View Less";
    } else {
        extraSongs.style.display = "none";
        document.getElementById('viewMoreBtn').innerText = "View More";
    }
});

