console.log("flashcards.js running");


let currentCard = null;
let tarotData = [];


async function initFlashcards() {
    console.log("Flashcards init running...");

    try {
        tarotData = await loadTarotData();

        if (!tarotData || tarotData.length === 0) {
            console.log("No tarot data loaded");
            return;
        }

        pickRandomCard();
        renderCard();

    } catch (err) {
        console.log("Error loading tarot:", err);
    }
}


function pickRandomCard() {
    const index = Math.floor(Math.random() * tarotData.length);
    currentCard = tarotData[index];
}


function renderCard() {
    const img = document.querySelector("#card_image");

    if (!img || !currentCard) return;

    img.src = currentCard.image;
    img.alt = currentCard.name;

    document.querySelector("#card_name").textContent = "";
    document.querySelector("#card_meaning").textContent = "";
}


function showMeaning() {
    if (!currentCard) return;

    document.querySelector("#card_name").textContent = currentCard.name;

    document.querySelector("#card_meaning").innerHTML =
        `<p><strong>Upright:</strong> ${currentCard.meaning_up}</p>
         <p><strong>Reversed:</strong> ${currentCard.meaning_rev}</p>`;
}


function nextCard() {
    location.reload();
}