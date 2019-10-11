(function() {

    const topQuoteTa = document.getElementsByClassName('input-quote')[0];
    autosize(topQuoteTa);

    const playAudio = audio => {
        audio.play();
    };

    const audioBeautiful = document.getElementsByClassName("audio-beautiful")[0];
    const nextButton = document.getElementsByClassName('nextButton')[0];
    nextButton.addEventListener('click', e => {
        playAudio(audioBeautiful);
    });
    nextButton.addEventListener('keydown', e => {
        const key = e.which || e.keyCode;
         // 13 is enter
        if (key !== 13) {
            return;
        }
        playAudio(audioBeautiful);
    });
})();

