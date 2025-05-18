import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | MealShare",
  description: "MealShare Privacy Policy",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

      <div className="space-y-6 text-muted-foreground">
        <p>Last Updated: May 18, 2025</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            Welcome to MealShare. We are committed to protecting your privacy and providing you with a safe experience
            when using our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our service.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using MealShare, you acknowledge that you have
            read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our platform, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, and profile information.
            </li>
            <li>
              <strong>Restaurant Information:</strong> For restaurant partners, we collect business details, location,
              and food listing information.
            </li>
            <li>
              <strong>Location Data:</strong> With your consent, we collect location data to show nearby restaurants and
              food pickups.
            </li>
            <li>
              <strong>Usage Information:</strong> Information about how you use our platform, including pickup history
              and preferences.
            </li>
            <li>
              <strong>Device Information:</strong> Information about your device, IP address, browser type, and
              operating system.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and manage food pickup reservations</li>
            <li>Connect restaurants with individuals seeking food</li>
            <li>Send notifications about pickup status and updates</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Prevent fraudulent activities and enhance security</li>
            <li>Communicate with you about our services</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">4. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Restaurants:</strong> To facilitate food pickups, we share necessary information with
              participating restaurants.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with third-party vendors who provide services
              on our behalf.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our
              rights.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">5. Your Choices</h2>
          <p>You can control your information by:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Updating your account information</li>
            <li>Adjusting notification preferences</li>
            <li>Requesting deletion of your account</li>
            <li>Opting out of location tracking</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">6. Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of
            transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
