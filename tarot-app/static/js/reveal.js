console.log("reveal.js running");

function revealApp() {
    return {
        cards: [],
        prompt: "",

        async init() {
            try {
                const selected = JSON.parse(localStorage.getItem("selected") || "[]");
                const type = localStorage.getItem("type") || "Reading";

                if (!selected.length) {
                    window.location.href = "reading.html";
                    return;
                }

                const tarot = await loadTarotData();

                this.cards = selected
                    .map(sel => {
                        return tarot.find(c => c.id === sel.id);
                    })
                    .filter(Boolean);

                this.prompt = this.buildPrompt(type);

            } catch (err) {
                console.error("Reveal error:", err);
            }
        },

        buildPrompt(type) {
            return `
Tarot Reading Type: ${type}

Cards Drawn:
${this.cards.map(c => c.name).join(", ")}

Interpret:
- What could this mean?

            `.trim();
        }
    };
}


