import styles from '../styles/Blog.module.scss';
import Link from 'next/link';

export default function Userblock({ block_data }) {

    return (
        <>
            <div className={styles.main_blog_card}>
                {block_data.map((data) => {
                    console.log("blfdt ", data);
                    return (
                        <>
                            <div className={styles.blog_card}>
                                <div className={styles.meta}>
                                    <div className={styles.photo} style={{ "backgroundImage": `url(${data?.prf_img_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5d_y2qQuMOEFY8sS5fGFOfZVb5TNAkwhpg&usqp=CAU"})` }}>

                                    </div>
                                </div>
                                <div className={styles.description}>
                                    <h1>{data?.name || "unkown"}</h1>
                                    <h2>{data?.dob || "00-00-00"}</h2>

                                    <p className={styles.read_more}>
                                        <Link href={`/userblogs/${data.id}`} passHref>
                                            <a>View</a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                })}

            </div>
        </>
    )
}