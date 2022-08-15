import styles from '../../styles/Blog_id.module.scss'
import {  doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db, auth } from "../../components/Firebaseconfig";
import { RiUserFollowLine } from 'react-icons/ri';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Blog_id({ Blg }) {
const router=useRouter();
    const Addfollower = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // console.log("user ", user);
                if (Blg.auther_id == user.uid) {
                    alert("you are the creater...");
                    return;
                }
                const addref = doc(db, "User_like", Blg.auther_id);
                await updateDoc(addref, {
                    Follower: arrayUnion(user.uid)
                });
                await updateDoc(doc(db, "Users", user.uid), {
                    Follow: arrayUnion(Blg.auther_id)
                });
            }
            else {
                router.push("/login");
                
            }
        });

    }

    return (
        <>

            <div className={styles.fond}> <span className={styles.s1}>blog</span><span className={styles.s2}>card</span></div>
            <div className={styles.card}>
                <div className={styles.thumbnail}>
                    <img className={styles.left} src={Blg.blog_img_url || "https://cdn2.hubspot.net/hubfs/322787/Mychefcom/images/BLOG/Header-Blog/photo-culinaire-pexels.jpg"} />
                </div>
                <div className={styles.right}>
                    <h1>{Blg.title} Why you Need More Magnesium in Your Daily Diet</h1>
                    <div className={styles.author} onClick={()=>{
                        router.push(`/userblogs/${Blg.auther_id}`);
                    }}>
                        <img src={Blg.prf_img_url || "https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png" || "https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"} />
                        <h2>{Blg.name || "Unknown"}</h2>
                    </div>
                    <div className={styles.separator}></div>
                    <p>
                        {Blg.detail}
                    </p>
                </div>
                <h5>{Blg.Date}</h5>
                {/* <h6>JANUARY</h6> */}
                <div className={styles.fab} onClick={Addfollower}><RiUserFollowLine /></div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    // console.log("params ", params);
    const blg_id_ref = doc(db, "Blogs", params.blog_id);
    const prdt = await getDoc(blg_id_ref);
    // console.log("prdt.data() ", prdt.data());
    if (!prdt.exists()) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            },
        }
    }
    const { auther_id } = prdt.data();

    const user_id_ref = doc(db, "Users", String(auther_id));
    const usrdt = (await getDoc(user_id_ref));

    const obj = {
        title: prdt.data().title || null,
        desc: prdt.data().desc || null,
        detail: prdt.data().detail || null,
        blog_img_name: prdt.data().blog_img_name || null,
        blog_img_url: prdt.data().blog_img_url,
        auther_id: prdt.data().auther_id || null,
        Date:prdt.data().Date.toDate().toDateString() || null,
        name: usrdt.data().name || null,
        prf_img_url: usrdt.data().prf_img_url || null
    }

    return {
        props: {
            Blg: obj
        }
    }
}