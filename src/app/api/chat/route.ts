import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, ruleBasedReply, type ChatMessage } from "@/lib/chatbot";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  if (!lastUserMessage.trim()) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // No key configured yet — use the crude keyword-based FAQ responder so
  // the widget is still useful. Drop a real key into .env.local's
  // ANTHROPIC_API_KEY to switch this on automatically.
  if (!apiKey) {
    const reply = ruleBasedReply(lastUserMessage);
    return NextResponse.json({ reply, mode: "fallback" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      system: buildSystemPrompt(),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({
        reply:
          "I'm not able to help with that one — please call our office and an attorney can assist you directly.",
        mode: "refusal",
      });
    }

    const text = response.content.find((b) => b.type === "text")?.text ?? "";
    return NextResponse.json({ reply: text || ruleBasedReply(lastUserMessage), mode: "ai" });
  } catch (err) {
    console.error("Chat API error:", err);
    // Fail soft to the rule-based responder rather than breaking the widget.
    return NextResponse.json({
      reply: ruleBasedReply(lastUserMessage),
      mode: "fallback-error",
    });
  }
}
