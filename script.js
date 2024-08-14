window.addEventListener('scroll', function() {
    const elementos = document.querySelectorAll('.elemento-animado');
    elementos.forEach(el => {
        const posicao = el.getBoundingClientRect().top;
        const tela = window.innerHeight;

        if (posicao < tela - 100) {
            el.classList.add('animado');
        } else {
            el.classList.remove('animado');
        }
    });
});
const player = document.getElementById('player');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');

playPauseButton.addEventListener('click', () => {
    if (player.paused) {
        player.play();
        playPauseButton.textContent = 'Pause';
    } else {
        player.pause();
        playPauseButton.textContent = 'Play';
    }
});

player.addEventListener('timeupdate', () => {
    const currentTime = player.currentTime;
    const duration = player.duration;
    
    seekBar.value = (currentTime / duration) * 100;
    
    currentTimeSpan.textContent = formatTime(currentTime);
    durationSpan.textContent = formatTime(duration);
});

seekBar.addEventListener('input', () => {
    const seekTime = (seekBar.value / 100) * player.duration;
    player.currentTime = seekTime;
});

volumeBar.addEventListener('input', () => {
    player.volume = volumeBar.value;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Carrega a duração do áudio quando os metadados estiverem prontos
player.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(player.duration);
});
