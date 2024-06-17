import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Privacy Policy</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Welcome to Brickland India</h2>
        <p>Accessible at https://bricklandindia.com/. Your privacy is critically important to us, and we are committed to protecting it through our compliance with this policy. This Privacy Policy document contains types of information that is collected and recorded by Brickland India and how we use it.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
        <p>When you visit our website, we may collect several types of information from and about you, including:</p>
        <ul className="list-disc pl-6">
          <li>Personal Identification Information: This includes, but is not limited to, your name, email address, phone number, and any other details you provide voluntarily by filling out a form or participating in surveys and promotions.</li>
          <li>Non-Personal Identification Information: We automatically collect information about your browsing actions and patterns whenever you interact with our website. This includes details like your IP address, browser type, browser version, our site pages that you visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
        <p>The information we collect is used in the following ways:</p>
        <ul className="list-disc pl-6">
          <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
          <li>To improve our website in order to better serve you.</li>
          <li>To allow us to better service you in responding to your customer service requests.</li>
          <li>To administer a contest, promotion, survey or other site feature.</li>
          <li>To quickly process your transactions.</li>
          <li>To send periodic emails regarding your order or other products and services.</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
      </div>

      {/* Security of Your Information Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Security of Your Information</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
      </div>

      {/* Cookies Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Cookies</h2>
        <p>Our website may use "cookies" to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.</p>
      </div>

      {/* Children's Privacy Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Children's Privacy</h2>
        <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.</p>
      </div>

      {/* Changes to This Privacy Policy Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our website, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
      </div>

      {/* Contacting Us Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Contacting Us</h2>
        <p>If there are any questions regarding this privacy policy, you may contact us using the information below:</p>
        <p><a href="https://bricklandindia.com/">https://bricklandindia.com/</a></p>
        {/* Add contact information specific to the website */}
      </div>

      {/* Add more sections for Sharing Your Information, Security of Your Information, Cookies, Children's Privacy, Changes to This Privacy Policy, Contacting Us */}
    </div>
  );
};
export default Privacy;
