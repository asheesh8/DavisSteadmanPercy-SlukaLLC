import { getSettings, getAttorneys, getStaff } from "./db";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Builds a system prompt grounded in the firm's real, current data. */
export function buildSystemPrompt(): string {
  const settings = getSettings();
  const attorneys = getAttorneys();
  const staff = getStaff().filter((s) => !s.isPet);

  const attorneyLines = attorneys
    .map(
      (a) =>
        `- ${a.name} (${a.title}): ${a.practiceAreas.join(", ")}`,
    )
    .join("\n");

  const staffLines = staff.map((s) => `- ${s.name} (${s.title})`).join("\n");

  const officeLines = settings.offices
    .map((o) => `- ${o.name}: ${o.address}, ${o.cityStateZip} — ${o.phone}`)
    .join("\n");

  return `You are the friendly virtual receptionist for ${settings.firmName}, a law firm serving Vermont and New Hampshire's Upper Valley.

FIRM INFO:
Tagline: "${settings.tagline}"
${settings.introText}
Services: ${settings.servicesText}
Real estate: ${settings.realEstateText}
Main phone: ${settings.phone}

OFFICES:
${officeLines}

ATTORNEYS:
${attorneyLines}

STAFF:
${staffLines}

INSTRUCTIONS:
- Be warm, brief, and professional — a few sentences at most.
- Help visitors find the right attorney, office, or phone number based on what they need.
- You are NOT a lawyer and must NEVER give legal advice, predict case outcomes, or comment on a specific legal situation. If asked, politely say you can't provide legal advice and encourage the visitor to call ${settings.phone} to speak with an attorney directly.
- If you don't know something about the firm, say so plainly and suggest calling ${settings.phone} rather than guessing.
- Keep responses to 2-4 sentences unless a list is genuinely helpful.`;
}

/**
 * Crude rule-based fallback used when no ANTHROPIC_API_KEY is configured.
 * Scans the visitor's message for keywords and answers from the firm's
 * real data so the widget is still useful before the real AI is wired in.
 */
export function ruleBasedReply(message: string): string {
  const m = message.toLowerCase();
  const settings = getSettings();
  const attorneys = getAttorneys();

  if (/\b(hi|hello|hey)\b/.test(m) && m.length < 20) {
    return `Hi there! I'm the ${settings.firmName} assistant. I can help point you to the right attorney, office, or phone number — what can I help with?`;
  }

  if (/(phone|call|number)/.test(m)) {
    return `You can reach our main office at ${settings.phone}. Our Woodstock office direct line is ${settings.woodstockPhone}.`;
  }

  if (/(address|location|office|where)/.test(m)) {
    return settings.offices
      .map((o) => `${o.name}: ${o.address}, ${o.cityStateZip} (${o.phone})`)
      .join(" | ");
  }

  if (/(divorce|custody|family|parent)/.test(m)) {
    const match = attorneys.find((a) =>
      a.practiceAreas.some((p) => /family/i.test(p)),
    );
    return `For family law matters, ${match?.name ?? "our family law team"} can help. Call ${settings.phone} to schedule a consultation — I can't give legal advice myself, but our attorneys can walk you through your options.`;
  }

  if (/(real estate|closing|buy|sell|property|title)/.test(m)) {
    const match = attorneys.find((a) =>
      a.practiceAreas.some((p) => /real estate/i.test(p)),
    );
    return `${match?.name ?? "Our real estate team"} handles residential and commercial real estate, from purchase and sales agreements through closing. Give us a call at ${settings.phone} to get started.`;
  }

  if (/(workers comp|injur|workplace)/.test(m)) {
    const match = attorneys.find((a) =>
      a.practiceAreas.some((p) => /workers/i.test(p)),
    );
    return `${match?.name ?? "Our workers' compensation team"} represents both injured workers and employers. Call ${settings.phone} to discuss your situation with an attorney.`;
  }

  if (/(attorney|lawyer|who)/.test(m)) {
    return (
      "Our attorneys are " +
      attorneys.map((a) => a.name).join(", ") +
      `. Visit our Attorneys page for full bios, or call ${settings.phone} and we'll match you with the right person.`
    );
  }

  return `Thanks for reaching out! I'm a simple assistant for now, but a real attorney can help with just about any question — call us at ${settings.phone} or use the contact form and we'll get back to you.`;
}
