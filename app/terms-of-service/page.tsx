import Link from "next/link"

export const metadata = {
  title: "Terms of Service | MealShare",
  description: "MealShare Terms of Service",
}

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

      <div className="space-y-6 text-muted-foreground">
        <p>Last Updated: May 18, 2025</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MealShare, you agree to be bound by these Terms of Service and all applicable laws and
            regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this
            platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
          <p>
            MealShare is a platform that connects restaurants with surplus food to individuals and organizations in
            need. We facilitate the reservation and pickup of food items that would otherwise go to waste.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
          <p>
            To use certain features of our platform, you must register for an account. You agree to provide accurate,
            current, and complete information during the registration process and to update such information to keep it
            accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your account. You
            agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">4. Restaurant Responsibilities</h2>
          <p>Restaurants using our platform agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information about food items</li>
            <li>Ensure food safety and quality standards are met</li>
            <li>Honor reservations made through the platform</li>
            <li>Comply with all applicable food safety regulations</li>
            <li>Maintain accurate availability information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">5. User Responsibilities</h2>
          <p>Users of our platform agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate personal information</li>
            <li>Honor pickup reservations or cancel with reasonable notice</li>
            <li>Treat restaurant staff with respect</li>
            <li>Use the platform for its intended purpose</li>
            <li>Not engage in fraudulent or deceptive practices</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">6. Food Safety Disclaimer</h2>
          <p>
            While we strive to ensure food safety, MealShare is not responsible for the quality, safety, or condition of
            food items provided by restaurants. Users acknowledge that they are accepting food items at their own risk.
          </p>
          <p>
            Restaurants are solely responsible for ensuring that all food items meet applicable safety standards and
            regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
          <p>
            The MealShare platform, including its content, features, and functionality, is owned by MealShare and is
            protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
          <p>
            MealShare shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your access to or use of, or inability to access or use, the platform or any content provided
            by or through the platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">9. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the platform immediately, without prior notice or
            liability, for any reason, including if you breach these Terms of Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms of Service at any time. It is your responsibility to
            review these Terms periodically for changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
            MealShare operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">12. Contact</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            <Link href="/contact" className="text-green-600 hover:underline">
              Contact Page
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}
