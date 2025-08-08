const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getScoresByGameId(id) {
    const res = await fetch(`${BASE_URL}/scores/${id}`);
    if (!res.ok) throw new Error("Failed to fetch scores");
    return res.json()
}