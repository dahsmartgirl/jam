import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
        <h1 className="text-3xl sm:text-4xl font-normal text-foreground tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm font-normal">Last updated: June 3, 2026</p>
      </header>

      <div className="space-y-10 font-sans leading-relaxed text-muted-foreground">
        
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">1. Acceptance of Terms</h2>
          <p>
            Welcome to Jam. By accessing or using our AI-powered marketing platform at spreadjam.com (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
          </p>
          <p>
            "Jam," "we," "our," or "us" refers to the company operating this Service. "You" or "User" refers to any individual or entity using the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">2. Description of Service</h2>
          <p>
            Jam is an AI-powered marketing platform that helps users create, manage, and distribute marketing campaigns. Our Service may include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI-assisted content generation for marketing campaigns</li>
            <li>Integration with third-party platforms (social media, email services, etc.)</li>
            <li>Campaign scheduling and management tools</li>
            <li>Analytics and reporting features</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">3. Account Registration</h2>
          <p>
            To use certain features of our Service, you must create an account. You agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain the security and confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
          </ul>
          <p>
            You must be at least 18 years old or the age of majority in your jurisdiction to create an account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">4. Third-Party Integrations</h2>
          <p>
            Our Service allows you to connect third-party accounts and services, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Social media platforms (Twitter/X, Reddit, LinkedIn, etc.)</li>
            <li>Google services (Google authentication)</li>
            <li>Other marketing and communication tools</li>
          </ul>
          <p className="pt-2 font-medium text-foreground">
            By connecting these services, you:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Authorize Jam to access and use these services on your behalf as permitted by the scope of authorization you grant</li>
            <li>Agree to comply with the terms of service of each connected platform</li>
            <li>Acknowledge that you are responsible for any content posted through our Service to these platforms</li>
            <li>Understand that third-party services are governed by their own terms and privacy policies</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">5. Google Services Integration</h2>
          <p>
            When you connect your Google account to Jam:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You authorize us to access specific Google services based on the permissions you grant</li>
            <li>You may revoke this authorization at any time through your Google Account settings</li>
            <li>Our use of Google APIs complies with the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google API Services User Data Policy</a></li>
            <li>We will only use Google user data for the purposes described in our <a className="text-primary hover:underline font-medium" href="/privacy">Privacy Policy</a></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">6. Acceptable Use</h2>
          <p>
            You agree not to use the Service to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Send spam, unsolicited messages, or engage in any form of harassment</li>
            <li>Create or distribute content that is defamatory, obscene, fraudulent, or harmful</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Interfere with or disrupt the Service or servers connected to the Service</li>
            <li>Attempt to gain unauthorized access to any systems or data</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Violate the terms of any connected third-party platforms</li>
            <li>Generate or distribute misleading, deceptive, or false content</li>
            <li>Use automated means to access the Service beyond what we provide</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">7. Content and Intellectual Property</h2>
          
          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">7.1 Your Content</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              You retain ownership of any content you create or upload to the Service ("User Content"). By using our Service, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process your User Content solely for the purpose of providing the Service.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">7.2 AI-Generated Content</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              Content generated by our AI tools is provided as-is. You are responsible for reviewing, editing, and ensuring the accuracy and appropriateness of any AI-generated content before publishing or distributing it.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">7.3 Our Intellectual Property</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              The Service, including its design, features, and underlying technology, is owned by Jam and protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Service without our written permission.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">8. Payment and Subscriptions</h2>
          <p>
            Certain features of the Service may require payment. By subscribing to a paid plan:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You agree to pay all applicable fees as described at the time of purchase</li>
            <li>Subscriptions will automatically renew unless cancelled before the renewal date</li>
            <li>You may cancel your subscription at any time through your account settings</li>
            <li>Refunds are provided in accordance with our refund policy</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">9. Disclaimer of Warranties</h2>
          <p className="leading-relaxed">
            The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or secure.
          </p>
          <p>
            We do not guarantee the accuracy, completeness, or usefulness of any AI-generated content. You are solely responsible for verifying the accuracy and appropriateness of any content before use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">10. Limitation of Liability</h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, Jam shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of the Service.
          </p>
          <p>
            Our total liability for any claims arising from your use of the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Jam and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Content you create or distribute through the Service</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">12. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your right to use the Service will immediately cease</li>
            <li>We may delete your account and associated data</li>
            <li>Provisions that by their nature should survive termination will remain in effect</li>
          </ul>
          <p>
            You may terminate your account at any time by contacting us or through your account settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">15. Dispute Resolution</h2>
          <p>
            Any disputes arising from these Terms or your use of the Service shall first be attempted to be resolved through good-faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">16. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-medium text-foreground">17. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="space-y-2 pt-2 text-muted-foreground/90">
            <p>
              <span className="font-medium text-foreground">Email:</span>{' '}
              <a href="mailto:legal@spreadjam.com" className="text-primary hover:underline inline-flex items-center gap-0.5">
                legal@spreadjam.com
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
