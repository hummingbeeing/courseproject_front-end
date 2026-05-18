console.log("singlecard.js running");

function shuffle78() {
    const arr = Array.from({ length: 78 }, (_, i) =>
        i.toString().padStart(2, "0")
    );

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function singleCardApp() {
    return {
        tiles: [],
        selected: [],

        init() {
            this.tiles = shuffle78().map(id => ({ id }));
        },

        toggle(card) {
            this.selected = [{ id: card.id }];
        },

        isSelected(card) {
            return this.selected.length === 1 && this.selected[0].id === card.id;
        },

        reveal() {
            if (this.selected.length !== 1) {
                alert("Please select exactly 1 card.");
                return;
            }

            localStorage.setItem("selected", JSON.stringify(this.selected));
            localStorage.setItem("type", "Single Card");

            window.location.href = "reveal.html";
        }
    };
}

