export const metadata = {
  title: 'Terms of Service - AI Tools Directory',
  description: 'Terms and conditions for using AI Tools Directory',
};

export default function TermsOfService() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <section className="mb-8">
        <p className="mb-4">
          Welcome to AI Tools Directory. These Terms of Service ("Terms") govern your access to and use of the AI Tools Directory website 
          (the "Service") operated by AI Tools Directory ("us", "we", or "our").
        </p>
        <p className="mb-4">
          Please read these Terms carefully before using our website. Your access to and use of the Service is conditioned on your acceptance 
          of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. 
          Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <p className="mb-4">
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, 
          whether your password is with our Service or a third-party service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Intellectual Property</h2>
        <p className="mb-4">
          The Service and its original content, features, and functionality are and will remain the exclusive property of AI Tools Directory and its licensors. 
          The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. 
          Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AI Tools Directory.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Links to Other Web Sites</h2>
        <p className="mb-4">
          Our Service may contain links to third-party websites or services that are not owned or controlled by AI Tools Directory.
        </p>
        <p className="mb-4">
          AI Tools Directory has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. 
          You further acknowledge and agree that AI Tools Directory shall not be responsible or liable, directly or indirectly, for any damage or loss caused or 
          alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation 
          if you breach the Terms.
        </p>
        <p className="mb-4">
          All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, 
          ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall AI Tools Directory, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
          incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
          losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; 
          (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, 
          contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Disclaimer</h2>
        <p className="mb-4">
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties 
          of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
          non-infringement, or course of performance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
        </p>
        <p className="mb-4">
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. 
          These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Changes to These Terms</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
          we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mb-2">Email: legal@aitoolsdirectory.com</p>
        <p>Mailing Address: [Your Company Address]</p>
      </section>
    </div>
  );
}
