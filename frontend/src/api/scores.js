const BASE_URL = 'http://localhost:3000'

export async function getScoresByGameId(id) {
    const res = await fetch(`${BASE_URL}/scores/${id}`);
    if (!res.ok) throw new Error("Failed to fetch scores");
    return res.json()
}