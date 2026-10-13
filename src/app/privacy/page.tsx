import type { Metadata } from "next";
import Link from "next/link";
import { PublicInfoPage } from "@/components/PublicInfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Intania 888",
  description: "How Intania 888 and Group War use account information and event activity data.",
};

export default function PrivacyPage() {
  return (
    <PublicInfoPage
      title="Privacy policy"
      description="This policy covers Intania 888 and its connected Group War game, operated for the event by the Intania Games organizing team. Last updated: 13 October 2026."
    >
      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            When you sign in with Google, we receive your Google account
            identifier, email address and verification status, and basic profile
            information, including your name. Google may also return a profile
            picture URL. The 888 account stores your identifier, email and name.
          </li>
          <li>
            We store the nickname and group you provide, your account role,
            virtual coin balance, predictions, and event/game activity needed
            to maintain scores and game results.
          </li>
          <li>
            Session cookies, temporary authorization records, and server logs
            support sign-in, security, troubleshooting, and reliable operation.
            Technical logs may contain request details and identifiers.
          </li>
        </ul>
      </section>
      <section>
        <h2>How we use information</h2>
        <p>
          We use account information to authenticate you, apply event eligibility
          rules, maintain your profile, assign your group, record virtual coin
          activity, and run event features and standings. We also use relevant
          records to investigate errors, abuse, and scoring disputes and respond
          to support requests. Google account access is limited to email and
          basic profile scopes; we do not request Gmail, Drive, or Calendar access.
        </p>
      </section>
      <section>
        <h2>Sharing and visibility</h2>
        <p>
          Intania 888 provides Group War with your account identifier, name,
          nickname, group, and virtual coin balance when you authorize the
          connected game. The services exchange account and coin activity to
          support gameplay. Participant names, nicknames, groups, scores, and
          standings can appear in shared event views. The 888 participant-profile
          API also makes registered participant profiles, including email
          addresses, available to signed-in participants.
        </p>
        <p className="mt-3">
          Authorized event administrators can access information needed to
          operate the event and handle support. Google provides sign-in and
          Google Cloud hosts the services and data. These providers process
          information as part of providing their services under their respective
          policies.
        </p>
      </section>
      <section>
        <h2>Cookies and security</h2>
        <p>
          The applications use essential session and authorization cookies so
          that you can sign in and perform authenticated actions. Session
          cookies have browser security protections, network connections are
          encrypted, and database access and service credentials are restricted.
          These measures reduce risk but cannot guarantee absolute security.
          Signing out ends your session; it does not delete your account or
          event records.
        </p>
      </section>
      <section>
        <h2>Retention after the event</h2>
        <p>
          The organizers plan to remove the operational database after the event,
          once event results, support requests, and necessary dispute resolution
          are complete. An exact removal date has not yet been set. Backup copies
          and technical logs may remain until their configured retention periods
          expire. Removing the live database does not immediately erase these
          copies.
        </p>
      </section>
      <section>
        <h2>Questions, corrections, and deletion requests</h2>
        <p>
          Email <a href="mailto:tech@intania.org">tech@intania.org</a> to ask about
          your data, request a correction, or request account/data deletion.
          Include enough information to identify your account, but never send
          your password or session credentials. The team will verify the request
          and explain any records that need to be retained for event integrity,
          dispute resolution, or applicable obligations. You can also revoke
          Google access in your Google Account settings; this does not itself
          delete data already stored by the event services.
        </p>
      </section>
      <section>
        <h2>Policy updates</h2>
        <p>
          Updates will be published on this page with a revised date. See
          {" "}<Link href="/about">About</Link> for the services covered and
          {" "}<Link href="/terms">Terms</Link> for participation rules.
        </p>
      </section>
    </PublicInfoPage>
  );
}
