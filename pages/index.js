import '../components/Firebaseconfig'
import { db } from '../components/Firebaseconfig';
import Newblg from '../components/Newblogs';
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import Image from 'next/image';
import img from '../public/intimg/blog_int.jpg';
import styles from '../styles/index.module.scss'

export default function Home({ Trend_blg }) {

  return (
    <>
      <div className={styles.int_img}>
        <Image src={img} placeholder="blur" layout="responsive" alt="blg_img" />
      </div>

      <div className={styles.int_hd}>
        <h1>New Blog</h1>
        <span></span>
      </div>
     <Newblg data={Trend_blg} />
    </>
  )
}

export async function getServerSideProps() {
  const arr_trd_dt = [];
  const trend_ref = collection(db, "Blogs");
  const trend_query = query(trend_ref, orderBy("Date", "desc"), limit(10));
  const trend_data = await getDocs(trend_query);

  trend_data.docs.forEach((doc) => {
    arr_trd_dt.push({
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
      Trend_blg: arr_trd_dt
    }
  }
}
