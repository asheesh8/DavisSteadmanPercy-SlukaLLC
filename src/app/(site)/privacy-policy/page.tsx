import type { Metadata } from "next";
import { getSettings } from "@/lib/db";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Davis Steadman Percy & Sluka, LLC.",
};

export default function PrivacyPolicyPage() {
  const settings = getSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <AnimatedSection>
        <p className="text-sm font-semibold uppercase tracking-wide text-brass">Legal</p>
        <h1 className="font-display mt-3 text-4xl font-medium text-ink">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink/50">Last updated: 2026</p>
      </AnimatedSection>

      <AnimatedSection delay={1} className="prose prose-neutral mt-10 max-w-none space-y-6 text-ink/70">
        <p>
          {settings.firmName} (&ldquo;the Firm,&rdquo; &ldquo;we,&rdquo; or
          &ldquo;us&rdquo;) respects your privacy. This policy explains what
          information we collect through this website, how we use it, and
          the choices you have.
        </p>

        <h2 className="font-display text-xl font-medium text-ink">Information We Collect</h2>
        <p>
          When you use our contact form, we collect the name, email address,
          phone number, and message you provide. We do not use tracking
          cookies for advertising purposes, and we do not sell visitor
          information to third parties.
        </p>

        <h2 className="font-display text-xl font-medium text-ink">How We Use Information</h2>
        <p>
          Information submitted through our contact form is used solely to
          respond to your inquiry. Submitting the form does not create an
          attorney-client relationship. Please do not send confidential or
          time-sensitive information through this website &mdash; call our
          office directly for anything urgent.
        </p>

        <h2 className="font-display text-xl font-medium text-ink">Third-Party Links</h2>
        <p>
          Our site may link to third-party websites. We are not responsible
          for the privacy practices or content of those sites.
        </p>

        <h2 className="font-display text-xl font-medium text-ink">Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please call us at{" "}
          {settings.phone}.
        </p>
      </AnimatedSection>
    </div>
  );
}
