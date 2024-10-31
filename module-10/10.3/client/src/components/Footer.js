import { CONTACT_EMAIL, CONTACT_PHONE, COPYRIGHT_INFO } from '../config.js';

function Footer() {
  return (
    <footer id="footer" className="bg-violet-950 flex justify-between items-center gap-10 pt-5 pl-16 pb-5 pr-16  text-white">
        <span>Copyright: {COPYRIGHT_INFO}</span>
        <span className="footer-contact flex gap-4 text-white">
          <span className="footer-email">
            email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
          </span>
          <span className="footer-phone"> ph: {CONTACT_PHONE}</span>
        </span>
    </footer>
  );
}

export default Footer;