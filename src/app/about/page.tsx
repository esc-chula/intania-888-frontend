import type { Metadata } from "next";
import Link from "next/link";
import { PublicInfoPage } from "@/components/PublicInfoPage";

export const metadata: Metadata = {
  title: "About | Intania 888",
  description: "Learn about Intania 888, Group War, and the Intania Games student event.",
};

export default function AboutPage() {
  return (
    <PublicInfoPage
      title="About Intania 888 & Group War"
      description="Student activities for Intania Games, the faculty sports event at the Faculty of Engineering, Chulalongkorn University."
    >
      <section>
        <h2>Intania 888</h2>
        <p>
          Intania 888 lets participants follow sports fixtures and results, make
          predictions using virtual event coins, and view individual and team
          standings. Event coins are game points, not real money.
        </p>
      </section>
      <section>
        <h2>Group War</h2>
        <p>
          <a href="https://groupwar.intania.org">Group War</a> is the connected
          team territory game. Participants use their Intania 888 account to join
          their group, attack or defend territories, and follow team progress.
          Some actions spend virtual coins from the connected 888 account.
        </p>
      </section>
      <section>
        <h2>Signing in with Google</h2>
        <p>
          We request your Google email address and basic profile information to
          identify your account, check participation eligibility, and provide
          your event profile. We do not request access to Gmail messages,
          Google Drive files, or your calendar. Games participation is subject
          to the organizers&apos; account eligibility rules.
        </p>
      </section>
      <section>
        <h2>Policies and support</h2>
        <p>
          Read our <Link href="/privacy">privacy policy</Link> and
          {" "}<Link href="/terms">terms of service</Link> before participating.
          These services are operated for the event by the Intania Games
          organizing team. For support or privacy requests, email
          {" "}<a href="mailto:tech@intania.org">tech@intania.org</a>.
        </p>
      </section>
    </PublicInfoPage>
  );
}
