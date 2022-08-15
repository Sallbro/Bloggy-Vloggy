import styles from '../styles/Profile.module.scss'
import img from '../public/intimg/lg_bg.jpeg'
import Image from 'next/image';

export default function About() {
    return (
        <>
            <div className={styles.wrapper}>

                <div className={styles.profile_card}>
                    <div className={styles.profile_card__img}>
                        <Image src={img} placeholder="blur" layout="responsive" alt="blg_img" />
                    </div>

                    <div className={styles.profile_card__cnt}>
                        <h1>About</h1>
                        <p>
                            The word blog is a combined version of the words “web” and “log”.
                            At their inception, blogs were essentially an online diary where people could keep a log about their daily lives, on the web. They have since morphed into an essential place for information and updates and have become a forum for not only individuals, but also businesses.
                            In fact, some people even make money blogging and become professional, full-time bloggers.
                        </p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}