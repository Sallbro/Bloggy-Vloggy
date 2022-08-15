import styles from '../styles/Blog.module.scss';
import Link from 'next/link';

export default function Blogblock({ block_data }) {

    return (
        <>
            <div className={styles.main_blog_card}>
                {block_data.map((data) => {
                    // console.log("blfdt ", data);
                    return (
                        <>
                            <div className={styles.blog_card} key={data.id}>
                                <div className={styles.meta}>
                                    <div className={styles.photo} style={{ "backgroundImage": `url(${data.blog_img_url})` }}>
                                    </div>
                                    <ul className={styles.details} key={data.id}>
                                        <li className={styles.author} key={data.id + 1}>Created on:</li>
                                        <li className={styles.date} key={data.id + 2}>{data.Date}</li>
                                    </ul>
                                </div>
                                <div className={styles.description}>
                                    <h1>{data.title}</h1>
                                    <h2>{data.desc}</h2>
                                    <p>{data.detail.substring(0, 20)}</p>

                                    <p className={styles.read_more}>
                                        <Link href={`/blog/${data.id}`} passHref>
                                            <a>Read More</a>
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