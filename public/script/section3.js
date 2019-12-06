//Query gallery
const gallery = document.getElementById('gallery');

//Query buttons
const love_btn = document.getElementById('Love');
const life_btn = document.getElementById('Life');
const friendship_btn = document.getElementById('Friendship');
const motivation_btn = document.getElementById('Motivation');
const prank_btn = document.getElementById('Prank');
const travel_btn = document.getElementById('Travel');

love_btn.addEventListener('click', function(){
    makeGallery(love_btn);
})
life_btn.addEventListener('click', function(){
    makeGallery(life_btn);
})
friendship_btn.addEventListener('click', function(){
    makeGallery(friendship_btn);
})
motivation_btn.addEventListener('click', function(){
    makeGallery(motivation_btn);
})
prank_btn.addEventListener('click', function(){
    makeGallery(prank_btn);
})
travel_btn.addEventListener('click', function(){
    makeGallery(travel_btn);
})

//Added temp_value for checking if the button is clicked
let temp_value = '';


function makeGallery(btn) {
    if (btn.value === temp_value) {

    } else {
        temp_value = btn.value;

        //Clean the gallery
        Array.from(gallery.childNodes).forEach(function (img) {
            gallery.removeChild(img)
        })

        //btn.value = API
        fetch(btn.value, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function (res) {
                
                return res.json();
            }).then(function (data) {
                for (let i = 0; i < data.length; i++) {
                    let url = data[i].canvas_url;

                    let image_container = document.createElement('div');
                    let image = document.createElement('div');
                    
                    image_container.appendChild(image);
                    document.getElementById('gallery').appendChild(image_container);

                    image_container.className = 'image-container';
                    image_container.style.flex = '1 0 200px';
                    image_container.style.opacity = '0';
                    image.className = "image";
                    image.style.backgroundImage = `url(${url})`;
                }
            })
            .then(showGallery)
            .catch(function (error) {
                console.log(error);
            })
    }
}

function showGallery(){
    setTimeout(function () {
        let image_container = document.getElementsByClassName('image-container');
        Array.from(image_container).forEach(function (pic) {
            pic.style.opacity = '1';
        })
    }, 1);
}