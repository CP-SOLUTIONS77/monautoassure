const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

type LeadContact = {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  message: string;
  source: string;
};

function toE164France(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+33${digits.slice(1)}`;
  return `+33${digits}`;
}

export async function createBrevoLead(lead: LeadContact) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    throw new Error("Brevo n'est pas configuré (BREVO_API_KEY / BREVO_LIST_ID manquants).");
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email: lead.email,
      attributes: {
        PRENOM: lead.firstname,
        NOM: lead.lastname,
        SMS: toE164France(lead.phone),
        MESSAGE: lead.message,
        SOURCE: lead.source,
      },
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo a refusé la requête (${response.status}): ${body}`);
  }
}
