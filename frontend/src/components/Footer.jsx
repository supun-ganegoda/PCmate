import React from "react";
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhone } from "react-icons/fa";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={`mt-5 pt-5 pb-5 ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div className={`col-lg-5 col-xs-12 ${styles.about}`}>
            <h2>PC mate</h2>
            <p className="pr-5 text-white-50">
              Buy your PC requirements at a cheap price here{" "}
            </p>
            <p>
              <a href="/facebook">
                <FaFacebook className={styles.icons} />
              </a>
              <a href="/linkdin">
                <FaLinkedin className={styles.icons} />
              </a>
            </p>
          </div>
          <div className={`col-lg-3 col-xs-12 ${styles.links}`}>
            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
            <ul className="m-0 p-0">
              <li>
                - <a href="/faq">FAQ</a>
              </li>
              <li>
                - <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                - <a href="/terms-conditions">Terms and Conditions</a>
              </li>
            </ul>
          </div>
          <div className={`col-lg-4 col-xs-12 ${styles.location}`}>
            <h4 className="mt-lg-0 mt-sm-4">Location</h4>
            <p>Pahanwatta 2 division, Dodangoda, Kaluthara, Sri Lanka</p>
            <p className="mb-0">
              <FaPhone className={styles.icons} />
              (+94) 34-2281-896
            </p>
            <p>
              <FaEnvelope className={styles.icons} />
              supunsudeepa@gmail.com
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className={`col ${styles.copyright}`}>
            <p className="">
              <small className="text-white-50">
                © 2019. All Rights Reserved.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
