import { collection, doc, getDocs, getDoc, query, where, documentId } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../../../components/Firebaseconfig";
import styles from '../../../styles/index.module.scss'
import Userblock from "../../../components/Userblock";
export default function Blog_id({ Blg }) {
    console.log("Blg ", Blg);
    const router = useRouter();

    return (
        <>

            <div className={styles.int_hd}>
                <h1>{Blg?.name} Follow</h1>
                <span></span>
            </div>
            {Blg.fw_dt.length == 0 ?
                (
                    <>
                        <button style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "height": "65vh", "fontFamily": "cursive" }}>no data yet</button>
                    </>
                )
                : (
                    <>
                        <Userblock block_data={Blg.fw_dt} />
                    </>
                )
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const fw_dt = [];
    const { params } = context;
    // console.log("params ", params);
    const blg_id_ref = doc(db, "Users", params.user_id);
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

    const { Follow } = prdt.data();
    // console.log("follow ", Follow);

    const user_id_ref = collection(db, "Users");

    const q = query(user_id_ref, where(documentId(), "in", Follow == [] || Follow == undefined ? ['AYXHBmH6FpIINbDpFmg1'] : Follow));
    const usrdt = await getDocs(q).then((res) => {
        res.docs.map((doc) => {
            fw_dt.push({ ...doc.data(), id: doc.id });
            // console.log("doc data ", doc.data());
        });
    }).catch((e) => {
        // console.log("e ", e);
    })

    return {
        props: {
            Blg: { fw_dt, name: prdt.data()?.name }
        }
    }
}