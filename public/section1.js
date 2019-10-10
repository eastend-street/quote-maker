(function() {
    // init navigation dot
    let nav1 = document.getElementById("nav1");
    let nav1Dot = nav1.children[0];
    nav1Dot.classList.add("active");

    // click nav -> turn nav white and fo to id
    let nav2 = document.getElementById("nav2");
    let nav2Dot = nav2.children[0];
    let nav3 = document.getElementById("nav3");
    let nav3Dot = nav3.children[0];

    nav1.addEventListener('click', () => {
        console.log('done1');
        if (nav1Dot.className === 'inner-circle') {
            nav1Dot.classList.add("active");
            nav2Dot.classList.remove("active");
            nav3Dot.classList.remove("active");
            window.location.hash='one';
        }
    });
    nav2.addEventListener('click', () => {
        console.log('done2');
        if (nav2Dot.className === 'inner-circle') {
            nav2Dot.classList.add("active");
            nav1Dot.classList.remove("active");
            nav3Dot.classList.remove("active");
            window.location.hash='two';
        }
    });
    nav3.addEventListener('click', () => {
        console.log('done3');
        if (nav3Dot.className === 'inner-circle') {
            nav3Dot.classList.add("active");
            nav1Dot.classList.remove("active");
            nav2Dot.classList.remove("active");
            window.location.hash='three';
        }
    });

    var scrollMenu = function() {
        let navList = {
            '#one': 0,
            '#two': 0,
            '#three': 0,
        };

        let $globalNavi = new Array();

        let i = 0;
        for (let id in navList) {
            i++;
            if ($(id).offset()) {
                navList[id] = $(id).offset().top - 10; // 数値丁度だとずれるので10px余裕を作る
                $globalNavi[id] = $("nav" + i);
            }
        }

        $(window).scroll(function () {
            for (let id in navList) {
                if ($(window).scrollTop() > navList[id] - 50) {
                    $('.inner-circle').each(function() {
                        console.log(this);
                        $(this).removeClass('active');
                    });
                    $globalNavi[id].addClass('active');
                }
            }
        });
    }

    scrollMenu();
})();
