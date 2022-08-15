import styles from "../styles/Footer.module.scss";
import { HiLocationMarker } from 'react-icons/hi';
import { MdCall } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsInstagram, BsTelegram } from 'react-icons/bs';
import Link from 'next/link';



function Footer() {
    return (
        <>
            <footer className={styles.footer_section}>
                <div className={styles.container}>
                    <div className={styles.footer_cta}>
                        <div className={styles.row}>
                            <div className={styles.row_sm}>
                                <div className={styles.single_cta}>
                                    <HiLocationMarker />
                                    <div className={styles.cta_text}>
                                        <h4>Find us</h4>
                                        <span>1010 Avenue, sw 54321, chandigarh</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.row_sm}>
                                <div className={styles.single_cta}>
                                    <MdCall />
                                    <div className={styles.cta_text}>
                                        <h4>Call us</h4>
                                        <span>98765432100</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.row_sm}>
                                <div className={styles.single_cta}>
                                    <FiMail />
                                    <div className={styles.cta_text}>
                                        <h4>Mail us</h4>
                                        <span>mail@info.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer_content}>
                        <div className={styles.row}>
                            <div className={styles.row_mid_sm}>
                                <div className={styles.footer_widget}>
                                    <div className={styles.footer_logo}>
                                        <h1 style={{"color":"#ff5e14"}}>BlOgGy VlOgGy</h1>
                                    </div>
                                    <div className={styles.footer_text}>
                                        <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                            elit,Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div className={styles.footer_social_icon}>
                                        <span>Follow us</span>
                                        <a href="#"><BsTelegram /></a>
                                        <a href="#"><FaFacebookSquare /></a>
                                        <a href="#"><BsInstagram /></a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.row_mid_sm}>
                                <div className={styles.footer_widget}>
                                    <div className={styles.footer_widget_heading}>
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <Link href="/" passHref>
                                            <li><a href="#">Home</a></li>
                                        </Link>
                                        <Link href="/blog" passHref>
                                            <li><a href="#">Blog</a></li>
                                        </Link>
                                        <Link href="/contact" passHref>
                                            <li><a href="#">Contact</a></li>
                                        </Link>
                                        <Link href="/about" passHref>
                                            <li><a href="#">About</a></li>
                                        </Link>
                                        <Link href="/profile" passHref>
                                            <li><a href="#">Profile</a></li>
                                        </Link>
                                        <Link href="/myblog" passHref>
                                            <li><a href="#">MyBlog</a></li>
                                        </Link>
                                        <Link href="/login" passHref>
                                            <li><a href="#">Login</a></li>
                                        </Link>
                                        <Link href="/singup" passHref>
                                            <li><a href="#">Singup</a></li>
                                        </Link>
                                        <Link href="/editprofile" passHref>
                                            <li><a href="#">EditProfile</a></li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.row_mid_sm}>
                                <div className={styles.footer_widget}>
                                    <div className="footer-widget-heading">
                                        <h3 style={{"color":"#ff5e14"}}>Subscribe</h3>
                                    </div>
                                    <div className={styles.footer_text}>
                                        <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                    </div>
                                    <div className={styles.subscribe_form}>
                                        <form>
                                            <input type="text" placeholder="Email Address" />
                                            <button><i className="fab fa-telegram-plane"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright_area}>
                    <div className="container">
                        <div className={styles.row}>
                            <div className={styles.row_ls_sm}>
                                <div className={styles.copyright_text}>
                                    <p>Copyright &copy;<span style={{"color":"#ff5e14"}}> 2022</span> , All Right Reserved
                                        <span style={{"color":"#ff5e14"}}> Salman</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                <div className={styles.footer_menu}>
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Terms</a></li>
                                        <li><a href="#">Privacy</a></li>
                                        <li><a href="#">Policy</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;