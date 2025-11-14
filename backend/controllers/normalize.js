function normalize(input) {
    if (!input) return "";

    let decoded = "";
    try { decoded = decodeURIComponent(input); }
    catch { decoded = input; }

    return decoded
        .toLowerCase()
        .trim()
        .replace(/&/g, "")         // optional: remove &
        .replace(/[-_]+/g, " ")    // convert - or _ → space
        .replace(/\s+/g, " ");     // collapse spaces
}

module.exports = { normalize };