/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor()  {
        // When this class is instantiated, the `constructor()` method is executed.
        // This code creates the HTML elements as attributes that we will manipulate in the DOM.

        // 'this.imagepreview' is related to the html image-preview element.
        this.imagePreview = document.querySelector('#image-preview');

        // This creates a new <p> HTML element
        this.topText = document.createElement('p');
        // Create a a `class` attribute to `this.topText` that contains the classname "top-text" for later selection.
        this.topText.setAttribute('class', 'top-text');
        // Appends `this.topText` as a child element to `this.imagePreview` to display meme top text element.
        this.imagePreview.appendChild(this.topText);

        // this code repeats the same function and format at the this.topText code above does, but for bottomText.
        this.bottomText = document.createElement('p');
        this.bottomText.setAttribute('class', 'bottom-text');
        this.imagePreview.appendChild(this.bottomText);

        // allow form fields to read user input, and assigns them to relevant values in JS (background and textual)
        this.backgroundInput = document.forms[0].querySelector('select[name="backgroundImage"]');
        this.topTextInput = document.forms[0].querySelector('input[name="topText"]');
        this.bottomTextInput = document.forms[0].querySelector('input[name="bottomText"]');


    }
    drawPreview() {
        // This function is called whenever a user changes one of the form fields
        // and whenever an image is generated for download. This function
        // updates the style attributes and innerHTML content of the HTML
        // elements selected in the `constructor()` of this class in order to
        // update `this.imagePreview`.

        // This updates the `background-image` CSS property for `this.imagePreview`
        this.imagePreview.style.backgroundImage = `url("images/${this.backgroundInput.value}")`;
        // Updates the `innerHTML` of `this.topText`.
        this.topText.innerHTML = this.topTextInput.value;
        // Update the `innerHTML` of `this.bottomText`
        this.bottomText.innerHTML = this.bottomTextInput.value;

    }
    // Calls a minified funciton in another .js file in root that handles the exportation of the completed meme.
    downloadImage() {
        this.drawPreview();
        generateImage();
    }
}

// assigns value of ImageMaker object to name imageMaker
let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID = "image-preview", height = "800px", width = "1280px") {
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, {
            quality: 0.95
        })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners() {
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs) {
        input.addEventListener("change", function (event) {
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();