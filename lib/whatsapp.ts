/*
  WhatsApp lead alerts via the official Meta WhatsApp Cloud API.

  When a stall/sponsor booking comes in, the server sends a template
  message from the business number to the primary admin number, carrying
  the lead details — same moment the admin email goes out.

  Env (all server-side, never NEXT_PUBLIC_):
    WHATSAPP_TOKEN            permanent System User access token from the Meta app
    WHATSAPP_PHONE_NUMBER_ID  the sending business number's Phone Number ID
    WHATSAPP_TO               destination admin number, digits with country code (e.g. 919888078580)
    WHATSAPP_TEMPLATE_NAME    approved template name (default "stall_lead_alert")
    WHATSAPP_TEMPLATE_LANG    template locale (default "en")

  The template must be approved in the Meta dashboard BEFORE alerts can
  deliver, with one {{n}} variable per parameter passed in, in order.
  Suggested template body (language en, name stall_lead_alert):

    New stall booking! Company: {{1}} | Contact: {{2}} | Phone: {{3}} | Stall: {{4}} | City: {{5}}. Full details on email.

  Fail-safe by design: missing env or an API error only logs. The form
  submission itself never breaks because of WhatsApp.
*/

export async function sendWhatsAppLeadAlert(params: string[]): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN ?? "";
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";
  const to = (process.env.WHATSAPP_TO ?? "").replace(/\D/g, "");

  if (!token || !phoneNumberId || !to) {
    console.log(
      "WhatsApp alert skipped: set WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_TO to enable it."
    );
    return;
  }

  const template = process.env.WHATSAPP_TEMPLATE_NAME || "stall_lead_alert";
  const lang = process.env.WHATSAPP_TEMPLATE_LANG || "en";

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: lang },
          components: [
            {
              type: "body",
              parameters: params.map((text) => ({
                type: "text",
                // Keep each variable short: templates reject oversized params.
                text: text.slice(0, 200),
              })),
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`WhatsApp API ${res.status}: ${errText.slice(0, 300)}`);
  }
}
