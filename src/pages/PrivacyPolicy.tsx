import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-[800px] px-6 pt-16 pb-32 sm:px-10 sm:pt-24 lg:px-16 text-left">
      {/* Back to Home Link */}
      <div className="mb-10">
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          Back to home
        </a>
      </div>

      <header className="border-b border-border/40 pb-6 mb-12">
        <h1 className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm font-normal">Last updated: June 3, 2026</p>
      </header>

      <div className="space-y-10 font-sans leading-relaxed text-muted-foreground">
        
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">1. Introduction</h2>
          <p>
            Welcome to Jam ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered marketing platform at spreadjam.com (the "Service").
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">2. Information We Collect</h2>
          
          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">2.1 Information You Provide</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
              <li>Account information (name, email address, password)</li>
              <li>Profile information</li>
              <li>Marketing campaign content and preferences</li>
              <li>Communications with us</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">2.2 Information from Third-Party Services</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              When you connect third-party accounts to Jam, we may receive information from those services:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground/90">
              <li><span className="font-medium text-foreground">Social Media Platforms (Twitter/X, Reddit, LinkedIn, etc.):</span> Account identifiers, profile information, and permissions necessary to post content on your behalf</li>
              <li><span className="font-medium text-foreground">Google Services:</span> When you authenticate with Google, we may access your basic profile information (name, email) and any Google services you explicitly authorize</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">2.3 Automatically Collected Information</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">3. Google API Services User Data Policy</h2>
          <p className="text-muted-foreground/90 leading-relaxed">
            Jam's use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google API Services User Data Policy</a>, including the Limited Use requirements.
          </p>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">3.1 Google User Data We Access</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              When you connect your Google account, we may request access to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
              <li>Basic profile information (name, email address, profile picture)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">3.2 How We Use Google User Data</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              We use Google user data solely to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
              <li>Authenticate your identity and create/manage your Jam account</li>
              <li>Provide, maintain, and improve our Service</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">3.3 Limited Use Disclosure</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              We do not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
              <li>Transfer Google user data to third parties unless necessary to provide the Service, required by law, or with your explicit consent</li>
              <li>Use Google user data for serving advertisements</li>
              <li>Allow humans to read your Google data unless you provide affirmative consent, it's necessary for security purposes, to comply with law, or the data is aggregated and anonymized</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">4. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain the Service</li>
            <li>Create and manage marketing campaigns on your behalf</li>
            <li>Post content to connected social media platforms when you authorize such actions</li>
            <li>Send emails on your behalf through connected email services</li>
            <li>Communicate with you about your account and the Service</li>
            <li>Analyze usage to improve our Service</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">5. Data Sharing and Disclosure</h2>
          <p>
            We may share your information with:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium text-foreground">Service Providers:</span> Third-party vendors who help us operate the Service (hosting, analytics, etc.)</li>
            <li><span className="font-medium text-foreground">Connected Platforms:</span> When you authorize us to post content or send communications on your behalf</li>
            <li><span className="font-medium text-foreground">Legal Requirements:</span> When required by law, legal process, or government request</li>
            <li><span className="font-medium text-foreground">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets</li>
            <li><span className="font-medium text-foreground">With Your Consent:</span> When you explicitly authorize disclosure</li>
          </ul>
          <p className="pt-2 font-medium text-foreground">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">6. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide the Service. We will retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <p>
            Google user data is retained only as long as necessary to provide the features you have requested. You can revoke access at any time through your Google Account settings or by contacting us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication mechanisms</li>
            <li>Regular security assessments</li>
            <li>Access controls and monitoring</li>
          </ul>
          <p className="pt-2">
            However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">8. Your Rights and Choices</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium text-foreground">Access:</span> Request a copy of your personal information</li>
            <li><span className="font-medium text-foreground">Correction:</span> Request correction of inaccurate information</li>
            <li><span className="font-medium text-foreground">Deletion:</span> Request deletion of your personal information</li>
            <li><span className="font-medium text-foreground">Portability:</span> Request a portable copy of your data</li>
            <li><span className="font-medium text-foreground">Revoke Access:</span> Disconnect third-party accounts at any time</li>
            <li><span className="font-medium text-foreground">Opt-Out:</span> Unsubscribe from marketing communications</li>
          </ul>
          <p className="pt-2">
            To exercise these rights, please contact us at privacy@spreadjam.com.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">9. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">10. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">13. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="space-y-2 pt-2 text-muted-foreground/90">
            <p>
              <span className="font-medium text-foreground">Email:</span>{' '}
              <a href="mailto:privacy@spreadjam.com" className="text-primary hover:underline inline-flex items-center gap-0.5">
                privacy@spreadjam.com
                <span className="text-xs">↗</span>
              </a>
            </p>
            <p>
              <span className="font-medium text-foreground">Website:</span>{' '}
              <a href="https://spreadjam.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                https://spreadjam.com
                <span className="text-xs">↗</span>
              </a>
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
