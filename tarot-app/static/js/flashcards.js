function flashCardApp() {
    return {
        tarot: [],
        card: null,
        flipped: false,
        loading: false,

        async init() {
            this.loading = true;

            try {
                // load fully normalized tarot data (includes images)
                this.tarot = await loadTarotData();

                this.nextCard();

            } catch (err) {
                console.error("Failed to load tarot data:", err);
            } finally {
                this.loading = false;
            }
        },

        nextCard() {
            if (!this.tarot.length) return;

            const randomIndex = Math.floor(Math.random() * this.tarot.length);

            this.card = this.tarot[randomIndex];
            this.flipped = false;
        }
    };
}

