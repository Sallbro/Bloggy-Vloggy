import styles from '../styles/Profile.module.scss'
import { auth, db } from '../components/Firebaseconfig';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { GrLocation } from 'react-icons/gr';
import { useRouter } from 'next/router';

export default function Profile() {
    const router = useRouter();
    const [prf, setPrf] = useState({});
    const ftc_data = async (ath_id) => {
        const user_id_ref = doc(db, "Users", String(ath_id));
        const usrdt = await getDoc(user_id_ref);
        // console.log(usrdt.data());
        const { name, prf_img_url, dob, country } = usrdt.data();
        setPrf({ id: ath_id, name, prf_img_url, dob, country })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                ftc_data(user.uid);
            }
            else {
                console.log("not user ");
            }
        });
    }, []);

    return (
        <>

            <div className={styles.wrapper}>
                <div className={styles.profile_card}>
                    <div className={styles.profile_card__img}>
                        <img src={prf.prf_img_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI_j5uZ54yVRyJpyT_loeFQhZgbQcelZeYSQ&usqp=CAU"}
                            alt="profile card" />
                    </div>

                    <div className={styles.profile_card__cnt}>
                        <button className={styles.edit_btn} onClick={() => {
                            router.push("/editprofile");
                        }}>edit</button>
                        {prf.name ?
                            (
                                <>
                                    <div className={styles.profile_card__name}>{prf.name}</div>
                                    <div className={styles.profile_card__txt}><strong>DOB:</strong> {prf.dob} </div>
                                    <div className={styles.profile_card_loc}>
                                        <GrLocation />
                                        <span className={styles.profile_card_loc__txt}>
                                            {prf.country}
                                        </span>
                                    </div>
                                </>
                            )
                            : <h1>No Data yet Click on edit</h1>
                        }
                        <div className={styles.profile_card_ctr}>
                            <button className="profile-card__button button--blue js-message-btn" onClick={() => {
                                router.push(`follower/${prf.id}`)
                            }}>Follower</button>
                            <button className="profile-card__button button--orange" onClick={() => {
                                router.push(`follow/${prf.id}`)
                            }}>Follow</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 style={{ "display": "flex", "justifyContent": "center" }}>My Blog</h1>
            <div className={styles.mainblock}>
                <div className={styles.block} onClick={() => {
                    router.push("/blog/createblog");
                }}>
                    <h1 className={styles.block_h1}>+</h1>
                </div>
                <div className={styles.block} onClick={() => {
                    router.push("/myblog");
                }}>
                    <h1>Myblg</h1>
                </div>
            </div>
        </>
    )
}
