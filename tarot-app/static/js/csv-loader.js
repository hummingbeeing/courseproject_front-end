console.log("csv-loader.js loaded");

/**
 * Robust CSV parser
 */
function parseCSV(text) {
    const rows = [];
    let current = "";
    let row = [];
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"' && insideQuotes && next === '"') {
            current += '"';
            i++;
        } else if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
            row.push(current.trim());
            current = "";
        } else if ((char === "\n" || char === "\r") && !insideQuotes) {
            if (current.length > 0 || row.length > 0) {
                row.push(current.trim());
                rows.push(row);
                row = [];
                current = "";
            }
        } else {
            current += char;
        }
    }

    if (current.length > 0 || row.length > 0) {
        row.push(current.trim());
        rows.push(row);
    }

    if (!rows.length) return [];

    const headers = rows[0].map(h => h.trim());

    return rows.slice(1).map(r => {
        const obj = {};
        headers.forEach((h, i) => {
            obj[h] = (r[i] || "").replace(/^"|"$/g, "").trim();
        });
        return obj;
    });
}

/**
 * Generic CSV loader
 */
async function loadCSV(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load CSV: " + path);

    const text = await res.text();
    return parseCSV(text);
}

/**
 * Tarot loader (FINAL CONSISTENT VERSION)
 */
async function loadTarotData() {
    const tarot = await loadCSV("static/data/tarot_cards.csv");
    const images = await loadCSV("static/data/card_images.csv");

    const imageMap = {};
    images.forEach(img => {
        imageMap[img.name_short] = img.image;
    });

    return tarot.map(card => ({
        ...card,

        // ✅ KEEP ID AS STRING ("00"–"77") everywhere
        id: card.id,

        // image mapping
        image: imageMap[card.name_short]
            ? `static/images/${imageMap[card.name_short]}`
            : `static/images/tarot-back.jpg`
    }));
}

