const API_BASE = "/api/scores"; // Adjust if the actual endpoint differs

// PUBLIC_INTERFACE
export async function fetchScores(mode) {
  // GET /api/scores?mode=single|two
  try {
    const res = await fetch(`${API_BASE}?mode=${mode}`);
    if (!res.ok) return null;
    return await res.json(); // Expecting {X: n, O: n, ties: n}
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export async function saveScore(mode, scores) {
  // POST /api/scores
  try {
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, scores }),
    });
  } catch {
    // silently fail, could show UI error in future
  }
}
