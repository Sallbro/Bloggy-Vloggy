import Link from "next/link";
import styles from '../styles/Navbar.module.scss'
import Fronted from "./Fronted";
import { AiOutlineUser } from "react-icons/ai";
import { RiProfileLine } from "react-icons/ri";

export function Logo() {
    return (
        <>
            <h1 className={styles.nav_logo}>BloggyVloggy</h1>
        </>
    )
}
export default function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.nav_1}>
                    <Link href="/"><li className={styles.nav_item}>
                        <a className={styles.nav_link}>Home</a></li></Link>
                    <Link href="/blog"><li className={styles.nav_item}>
                        <a className={styles.nav_link}>Blog</a></li></Link>
                    <Link href="/contact"><li className={styles.nav_item}>
                        <a className={styles.nav_link}>Contact</a></li></Link>
                    <Link href="/about"><li className={styles.nav_item}>
                        <a className={styles.nav_link}>About</a></li></Link>
                </ul>
                <div className={styles.nav_logo1}>
                    <Fronted />
                </div>
                <ul className={styles.nav_2}>
                    <Link href="/profile"><li className={[styles.nav_item, styles.like].join(" ")}>
                        <a className={styles.nav_link}><RiProfileLine /></a></li></Link>
                    <Link href="/login"><li className={[styles.nav_item, styles.my_blog].join(" ")}>
                        <a className={styles.nav_link}><AiOutlineUser /></a></li></Link>
                </ul>
            </nav>

            <nav className={styles.navbar_2}>
                <div className={styles.nav_logo2}>
                    <Fronted />
                </div>
                <ul className={styles.nav_2}>
                    <button>
                        <Link href="/profile"><li className={[styles.nav_item, styles.like].join(" ")}>
                            <a className={styles.nav_link}><RiProfileLine /></a></li></Link>
                    </button>
                    <button>
                        <Link href="/login"><li className={[styles.nav_item, styles.my_blog].join(" ")}>
                            <a className={styles.nav_link}><AiOutlineUser /></a></li></Link>
                    </button>
                </ul>
            </nav>

        </>
    )
}
