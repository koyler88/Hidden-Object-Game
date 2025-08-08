const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchGameById(id) {
    const res = await fetch(`${BASE_URL}/games/${id}`);
    if (!res.ok) throw new Error("Failed to fetch game");
    return res.json()
}

export async function fetchGames() {
    const res = await fetch(`${BASE_URL}/games`);
    if (!res.ok) throw new Error("Failed to fetch games");
    return res.json()
}

