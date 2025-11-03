export async function POST(req) {
  const { idToken } = await req.json().catch(() => ({}));
  if (!idToken) {
    return new Response(JSON.stringify({ error: "Missing idToken" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Firebase ID tokens expire ~1 hour; align cookie with that.
  const maxAge = 60 * 60;

  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": [
        `session=${idToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
      ],
    },
  });
}