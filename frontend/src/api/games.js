const BASE_URL = 'http://localhost:3000'

export async function getGame(id) {
    const res = await fetch(`${BASE_URL}/games/${id}`);
    if (!res.ok) throw new Error("Failed to fetch game");
    return res.json()
}

export async function getGames() {
    const res = await fetch(`${BASE_URL}/games`);
    if (!res.ok) throw new Error("Failed to fetch games");
    return res.json()
}

