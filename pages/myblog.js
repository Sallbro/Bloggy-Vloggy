import { auth, db, storage } from '../components/Firebaseconfig';
import { collection, doc, getDoc, getDocs, orderBy, query, where, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Blog.module.scss';


export default function Myblog() {
    const router = useRouter();
    const [ath, setAth] = useState(false);
    const [prf, setPrf] = useState([]);
    const get_array_post_data = async ( uid) => {
        const user_ref = collection(db, "Blogs");
        // const user_ref2 = doc(db, "Blogs");
        // console.log("user_ref ", user_ref);
        const q = query(user_ref, where("auther_id", "==", uid), orderBy("Date", "desc"));
        const data = await getDocs(q);
        setPrf(data.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
        setAth(true);
        // console.log("data ", data);
    }
    const remove_blog_img = async (data) => {
        await deleteObject(ref(storage, `blog_images/${data.blog_img_name}`)).then(() => {
            // console.log("remove blog image ");
        }).catch((error) => {
            // console.log("error array remove ", error);

        });
    }
    const remove_array_post_data = async (data) => {
        await updateDoc(doc(db, "Users", data.auther_id), {
            create_post: arrayRemove(data.id)
        }).catch((e) => {
            // console.log("error array remove ", e);
        });
    }
    const get_post_ref = async (ath_id) => {
        const user_id_ref = doc(db, "Users", String(ath_id));
        const usrdt = await (await getDoc(user_id_ref));
        // console.log("user data ", usrdt.data());
        const { create_post } = usrdt.data();
        // console.log("create_post ", create_post);
        get_array_post_data(ath_id);
    }
    const del_blg = async (data) => {
        const dt = await deleteDoc(doc(db, "Blogs", data.id)).then(async (res) => {
            setPrf(prf.filter(item => item.id !== data.id));
            alert("deleted");
            remove_array_post_data(data);
            remove_blog_img(data);
        }).catch((e) => {
            // console.log("error del ", e);
        })

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log("user ", user);
                get_post_ref(user.uid);
            }
            else {
                router.push("/login");
                console.log("not user ");
            }
        });
    }, []);

    return (
        <>
            {prf.length > 0 ? (
                <>
                    <div className={styles.main_blog_card}>
                        {prf.map((data) => {
                            // console.log("blfdt ", data);
                            return (
                                <>
                                    <div className={styles.blog_card} key={data.id}>
                                        <div className={styles.meta}>
                                            <div className={styles.photo} style={{ "backgroundImage": `url(${data.blog_img_url})` }}>

                                            </div>
                                            <ul className={styles.details}>
                                                <li className={styles.author}><a>Creaed on:</a></li>
                                                <li className={styles.date}>Aug. 24, 2015</li>
                                            </ul>
                                        </div>
                                        <div className={styles.description}>
                                            <h1>{data.title}</h1>
                                            <h2>{data.desc}</h2>
                                            <p>{data.detail}</p>

                                            <p className={styles.read_more}>
                                                <Link href={`/blog/${data.id}`} passHref>
                                                    <a href="#">Read More</a>
                                                </Link>
                                            </p>
                                            <p className={styles.read_more}>
                                                <a onClick={() => {
                                                    del_blg(data)
                                                }}>Delete</a>
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </>
            ) : (
                <>
                    <h1>not yet...</h1>
                    <button onClick={()=>{
                        router.push("/blog/createblog");
                    }}>createblg</button>
                </>
            )
            }
        </>
    )

}

