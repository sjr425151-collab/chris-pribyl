import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/sections/sections";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Dynamic Construction MI handles information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero compact eyebrow="Privacy" title="Privacy notice" breadcrumbs={<Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />} />
      <section className="theme-paper py-16 md:py-24">
        <div className="container-x max-w-3xl space-y-8 text-[1.05rem] leading-relaxed text-slate [&_h2]:mb-3 [&_h2]:text-title [&_h2]:font-[680] [&_h2]:text-charcoal">
          <div>
            <h2>What we collect</h2>
            <p>
              When you request an estimate, we collect the details you enter: your name, phone number and/or email, the type of project, the project location, an optional
              description and any photos you choose to attach, and your preferred contact method.
            </p>
          </div>
          <div>
            <h2>How we use it</h2>
            <p>
              We use this information only to respond to your request, prepare an estimate, and communicate with you about your project. We do not sell your information.
            </p>
          </div>
          <div>
            <h2>Analytics and cookies</h2>
            <p>
              If analytics are enabled on this site, they load only after you accept cookies. Analytics record page visits and general interactions (for example, that a form
              was submitted), never the contents of form fields.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              Questions or requests to update or delete your information: call {business.phone.display} or write to {business.name}, {business.address.street},{" "}
              {business.address.city}, {business.address.region} {business.address.postalCode}.
            </p>
          </div>
          <p className="text-sm">This notice should be reviewed by the business before launch.</p>
        </div>
      </section>
    </>
  );
}
