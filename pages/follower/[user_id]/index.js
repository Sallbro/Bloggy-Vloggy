import { collection, doc, getDocs, getDoc, query, where, documentId } from "firebase/firestore";
import { db } from "../../../components/Firebaseconfig";
import Userblock from "../../../components/Userblock";
import styles from '../../../styles/index.module.scss';

export default function Blog_id({ Blg }) {

    console.log("Blg ", Blg);
    return (
        <>
            <div className={styles.int_hd}>
                <h1>{Blg?.name} Follower</h1>
                <span></span>
            </div>
            {Blg.fw_dt.length == 0 ?
                (
                    <>
                        <button style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"65vh","fontFamily":"cursive"}}>no data yet</button>
                    </>
                ) :
                <Userblock block_data={Blg.fw_dt} />
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const fw_dt = [];
    const { params } = context;
    // console.log("params ", params);
    const blg_id_ref = doc(db, "User_like", params.user_id);
    const prdt = await getDoc(blg_id_ref);
    if (!prdt.exists()) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            },
        }
    }
    // console.log("prdt.data() ", prdt.data());

    const { Follower } = prdt.data();
    // console.log("Follower ", Follower);

    if (Follower.length == 0 || Follower == "undefined") {
        console.log("no data");
    } else {
        const user_id_ref = collection(db, "Users");
        const q = query(user_id_ref, where(documentId(), "in", Follower));

        const usrdt = await getDocs(q).then((res) => {
            res.docs.map((doc) => {
                fw_dt.push({ ...doc.data(), id: doc.id });
                // console.log("doc data ", doc.data());
            });
        }).catch((e) => {
            // console.log("e ", e);
        })
    }

    return {
        props: {
            Blg: { fw_dt, name: prdt.data()?.name || "" }
        }
    }
}