const $audio = document.querySelector('audio')
const $equalizer = document.querySelector('.equalizer')

// PLAY PAUSE FOR THE AUDIO AND ANIMATION
$equalizer.addEventListener('click', () =>
{
    if ($audio.paused)
    {
    $audio.play()
    $equalizer.classList.remove('stop')
    } else 
    {
    $audio.pause()
    $equalizer.classList.add('stop')
    }
})