export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD ?? "noureSSence2026";
    if (password === expected) {
      return Response.json({ ok: true, token: "ne-admin-ok" });
    }
    return Response.json({ ok: false, error: "Invalid password" }, { status: 401 });
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
