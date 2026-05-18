console.log("pastpresentfuture.js running");

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

function pastPresentFutureApp() {
    return {
        tiles: [],
        selected: [],

        init() {
            this.tiles = shuffle78().map(id => ({ id }));
        },

        toggle(card) {
            const exists = this.selected.some(c => c.id === card.id);

            if (exists) {
                this.selected = this.selected.filter(c => c.id !== card.id);
                return;
            }

            if (this.selected.length >= 3) return;

            this.selected.push({ id: card.id });
        },

        isSelected(card) {
            return this.selected.some(c => c.id === card.id);
        },

        reveal() {
            if (this.selected.length !== 3) {
                alert(`Please select exactly 3 cards. (${this.selected.length}/3 selected)`);
                return;
            }

            localStorage.setItem("selected", JSON.stringify(this.selected));
            localStorage.setItem("type", "Past Present Future");

            window.location.href = "reveal.html";
        }
    };
}

