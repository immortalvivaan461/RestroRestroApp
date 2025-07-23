const words = ["Friends..", "Jobmates..", "Relatives..", "Partner.."];
let index = 0;
const wordSpan = document.querySelector('.dynamic-word');

function changeWord() {
    // Start fade-out
    wordSpan.classList.add("fade-out");

    // Wait for fade-out to finish before changing text
    setTimeout(() => {
        index = (index + 1) % words.length;
        wordSpan.textContent = words[index];

        // Fade back in
        wordSpan.classList.remove("fade-out");
    }, 300); // match transition time in CSS
}

setInterval(changeWord, 1500); // change every 2.5 seconds