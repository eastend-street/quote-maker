//function for create new elemnt and return it.

function addElement_img(){
    //first create var for new elemnt.
    var newElement = document.createElement("div");
    //second create to give it some content.           need change
    var newContent = document.createTextNode("test here should be show img");
    //add the img(now use text) to the newly created element.
    newElement.appendChild(newContent);

    //add the new element and its content into DOM.
    var innerDiv = document.getElementById("inner");
    document.body.insertBefore(newElement, innerDiv)
}
