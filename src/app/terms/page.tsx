import type { Metadata } from "next";
import Link from "next/link";
import { PublicInfoPage } from "@/components/PublicInfoPage";

export const metadata: Metadata = {
  title: "Terms of Service | Intania 888",
  description: "Participation rules for Intania 888 and the connected Group War game.",
};

export default function TermsPage() {
  return (
    <PublicInfoPage
      title="Terms of service"
      description="Participation rules for Intania 888 and Group War, operated for the event by the Intania Games organizing team. Last updated: 13 October 2026."
    >
      <section>
        <h2>Event participation</h2>
        <p>
          These services support the Intania Games student event at the Faculty
          of Engineering, Chulalongkorn University. Participation is subject to
          the organizers&apos; eligibility rules. Use your own eligible account,
          provide accurate registration information, and follow announced event
          and group assignment rules.
        </p>
      </section>
      <section>
        <h2>Virtual coins and gameplay</h2>
        <p>
          Coins in these services are virtual event points, not real money.
          Sports predictions and game actions can change your virtual balance
          and team scores. Group War can spend coins from your connected
          Intania 888 account. Check the action and displayed cost before
          submitting it. The services do not offer real-money wagering.
        </p>
      </section>
      <section>
        <h2>Fair use</h2>
        <p>
          Do not impersonate other participants, share account access, manipulate
          scores, exploit bugs, bypass cooldowns or eligibility checks, or use
          automation to gain an unfair advantage or disrupt the services. Report
          suspected bugs to the organizers. Accounts or activity may be
          restricted, and affected scores corrected, when event rules are
          violated or a technical error needs correction.
        </p>
      </section>
      <section>
        <h2>Availability and event results</h2>
        <p>
          The services may be interrupted for maintenance, provider outages,
          or technical problems. Features and event rules may be updated during
          the event. Follow official organizer announcements for schedules,
          scoring decisions, and dispute procedures. If a balance or result
          looks incorrect, contact support with the relevant action and time.
        </p>
      </section>
      <section>
        <h2>Privacy and event closure</h2>
        <p>
          The <Link href="/privacy">privacy policy</Link> explains account data,
          public/shared event information, cookies, and deletion requests.
          The services are intended for the event; continued access after the
          event is not guaranteed. The operational database is planned for
          removal after event administration is complete, with no fixed date yet.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          For participation, account, scoring, or privacy questions, contact the
          Intania Games organizing team at
          {" "}<a href="mailto:tech@intania.org">tech@intania.org</a>.
        </p>
      </section>
    </PublicInfoPage>
  );
}
