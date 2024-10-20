// Views for the Contact page
import { useState } from 'react';
import { CONTACT_EMAIL, LINKEDIN_URL, FACEBOOK_URL } from '../config';
import { ContactForm } from '../components/ContactForm'


// Contact page with form
function Contact() {
  return (
    <div className="bg-white -mx-20 pb-12 pt-8">
      <div>
        <h3 className="text-7xl my-12 font-semibold text-gray-800 text-center">Let's Get in touch</h3>
        <p className="text-center text-gray-800">If you'd like to get in touch, I'd love to hear from you.</p>

        {/* Contact form */}
        <div>
        <ContactForm />
        </div>

        {/* Social media */}
        <div className="contact-methods mt-20">
          <div className="flex gap-16 justify-center">
          <p>
            <span className="contact-method-item text-center">
              <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            </span>
          </p>
          <p>
            <span className="contact-method-item text-center">
              <a href={FACEBOOK_URL}>Facebook</a>
            </span>
          </p>
          <p>
            <span className="contact-method-item text-center">
              <a href={LINKEDIN_URL}>LinkedIn</a>
            </span>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;