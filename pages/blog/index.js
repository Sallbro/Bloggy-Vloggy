import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/Firebaseconfig";
import Blogblock from '../../components/Blogblock';
export default function blog({ blg }) {

    return (
        <>
           <Blogblock block_data={blg}/>
        </>
    )
}

export async function getServerSideProps() {
    const dt = [];
    const blogcollectionref = collection(db, "Blogs");
    const data = await getDocs(blogcollectionref);
    // console.log("data ",data);
    data.docs.forEach((doc) => {
        dt.push({
            blog_img_name: doc.data()?.blog_img_name || null,
            blog_img_url: doc.data()?.blog_img_url || null,
            title: doc.data()?.title || null,
            desc: doc.data()?.desc || null,
            detail: doc.data()?.detail || null,
            auther_id: doc.data()?.auther_id || null,
            id: doc?.id || null,
            Date: doc.data()?.Date.toDate().toDateString() || null
        })
    });

    return {
        props: {
            blg: dt
        }
    }

}