export async function POST() {
  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": `session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}