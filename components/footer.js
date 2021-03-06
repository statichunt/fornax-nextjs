import styles from '../styles/footer.module.css';
import socialIcons from '../config/config.json';
import footerData from "../config/config.json";
import { marked } from "marked";
import Link from 'next/link';

const Footer = () => {

  const { footer } = footerData;

  return (
    <div className={`border-t-2 md:py-16 py-10`}>
      <div className="text-center">
      </div>
      <ul className={`${styles.icons} mb-4 sm:mb-8 flex items-center justify-center`}>
        {
          socialIcons.socialMedia.map(s => (
            <li  key={s.name}>
              <a className="p-0 mx-4 social-icon " href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
            </li>
          ))
        }
      </ul>
      <div className="text-center">
        <div className="markdown mb-2" dangerouslySetInnerHTML={{ __html: marked(footer.copyright) }}>

        </div>
        {footer.theme_copyright && (
          <>
            &nbsp; Theme by&nbsp;
            <Link href="https://statichunt.com/">
              <a
                className="transition  duration-300 ease-in-out text-primaryColor hover:opacity-80"
                target="_blank"
                rel="noflow"
              >
                Statichunt
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Footer;