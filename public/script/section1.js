(function() {

    const topQuoteTa = document.getElementsByClassName('input-quote')[0];
    autosize(topQuoteTa);

    const playAudio = audio => {
        audio.play();
    };

    const audioBeautiful = document.getElementsByClassName("audio-beautiful")[0];
    const nextButton = document.getElementsByClassName('next-button')[0];
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

    // in scroll event use this function
    // because do some action in every scroll events is too much
    let lastExec = 0;
    function throttle(delay, callback) {
        const elapsed = Date.now() - lastExec;
        if (elapsed >= delay) {
            callback();
            lastExec = Date.now();
        }
    }
    const scrollTarget = {
        nav1: document.getElementById("one"),
        nav2: document.getElementById("two"),
        nav3: document.getElementById("three")
    };
    const navWrapper = document.getElementsByClassName("nav-bar")[0];
    const getClientRect = () => {
        for (const key of Object.keys(scrollTarget)) {
            const y = scrollTarget[key].getBoundingClientRect().top;
            document.getElementsByClassName(key)[0].classList.remove("active");
            if (-616 < y && y <= 300) {
                if (!scrollTarget[key].classList.contains("active")) {
                    document
                        .getElementsByClassName(key)[0]
                        .classList.add("active");
                    if (key === "nav2") {
                        navWrapper.classList.remove("back-white");
                        navWrapper.classList.add("back-black");
                    } else {
                        navWrapper.classList.remove("back-black");
                        navWrapper.classList.add("back-white");
                    }
                }
            }
        }
    };

    document.body.onscroll = () => {
        throttle(100, getClientRect);
    }

    getClientRect();
})();