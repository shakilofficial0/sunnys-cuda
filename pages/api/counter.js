import { get, set } from "@vercel/edge-config";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const value = await get("sunny_cdi_counter");
    return res.status(200).json({ value });
  }

  if (req.method === "POST") {
    const oldValue = (await get("sunny_cdi_counter")) ?? 0;
    const newValue = oldValue + 1;

    await set("sunny_cdi_counter", newValue);

    return res.status(200).json({ value: newValue });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
