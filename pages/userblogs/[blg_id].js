import { collection, doc, getDocs, getDoc, query, where, documentId } from "firebase/firestore";
import { db } from "../../components/Firebaseconfig";
import Blogblock from "../../components/Blogblock";
import styles from '../../styles/index.module.scss';

export default function Blg_id({ Blg }) {
    console.log("Blg ", Blg);
    return (
        <>
            <div className={styles.int_hd}>
                <h1>{Blg.name} Blogs</h1>
                <span></span>
            </div>
            {Blg.blg_dt.length == 0 ?
                (
                    <>
                        <h1 style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"65vh","fontFamily":"cursive"}}>No Blog created yet</h1>
                    </>
                ) :
            <Blogblock block_data={Blg.blg_dt} />
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const blg_dt = [];
    const { params } = context;
    // console.log("params ", params);
    const user_id_ref = doc(db, "Users", params.blg_id);
    const prdt = await getDoc(user_id_ref);
    if (!prdt.exists()) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            },
        }
    }
    // console.log("prdt.data() ", prdt.data());

    const { create_post } = prdt.data();
    // console.log("create_post ", create_post);

    if (create_post == undefined || create_post.length == 0 ) {
        console.log("no data");
    } else {
        const blg_id_ref = collection(db, "Blogs");
        const q = query(blg_id_ref, where(documentId(), "in", create_post));
        const usrdt = await getDocs(q).then((res) => {
            res.docs.map((doc) => {
                // console.log("date ", doc.data().Date.toDate())
                blg_dt.push({
                    blog_img_name: doc.data()?.blog_img_name || null,
                    blog_img_url: doc.data()?.blog_img_url || null,
                    title: doc.data()?.title || null,
                    desc: doc.data()?.desc || null,
                    detail: doc.data()?.detail || null,
                    auther_id: doc.data()?.auther_id || null,
                    id: doc?.id || null,
                    Date: doc.data().Date.toDate().toDateString() || null
                });
                // console.log("doc blg_dt ", blg_dt);

            });
        }).catch((e) => {
            // console.log("e ", e);
        })
    }
    return {
        props: {
            Blg: { blg_dt, name: prdt.data()?.name || "" }
        }
    }
}