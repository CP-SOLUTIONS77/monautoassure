const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

/** Nom du site, repris dans l'objet de l'e-mail de notification. */
const SITE_NAME = "Mon Auto Assuré";

/**
 * Adresse qui reçoit les demandes, et adresse d'expédition. L'expéditeur doit
 * être validé dans Brevo (Expéditeurs, domaines et IP dédiées).
 */
const NOTIFY_TO = process.env.LEAD_NOTIFY_EMAIL || "contact@cpsolutions77.com";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "contact@cpsolutions77.com";

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
        // Un rappel rapide n'a pas de nom : on n'écrase pas celui d'un contact existant.
        ...(lead.lastname ? { NOM: lead.lastname } : {}),
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

  // La demande est enregistrée : un échec de la notification ne doit pas la faire échouer.
  try {
    await sendLeadNotification(lead, apiKey);
  } catch (error) {
    console.error("Erreur envoi e-mail de notification", error);
  }
}

async function sendLeadNotification(lead: LeadContact, apiKey: string) {
  const name = [lead.firstname, lead.lastname].filter(Boolean).join(" ");
  const rows: [string, string][] = [
    ["Nom", name],
    ["Téléphone", lead.phone],
    ["E-mail", lead.email],
    ["Formulaire", lead.source],
  ];
  const htmlContent = `
    <p>Nouvelle demande reçue sur <strong>${escapeHtml(SITE_NAME)}</strong>.</p>
    <table cellpadding="4">
      ${rows
        .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
        .join("")}
    </table>
    ${lead.message ? `<p><strong>Détails</strong><br>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>` : ""}
  `;

  const response = await fetch(BREVO_EMAIL_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: SITE_NAME, email: SENDER_EMAIL },
      to: [{ email: NOTIFY_TO, name: "CP Solutions" }],
      replyTo: { email: lead.email, name: name || lead.email },
      subject: `Nouvelle demande ${SITE_NAME} : ${name || lead.email}`,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo a refusé l'e-mail de notification (${response.status}): ${body}`);
  }
}
