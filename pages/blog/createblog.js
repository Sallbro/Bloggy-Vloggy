import { useEffect, useState } from "react";
import { collection, addDoc, doc, arrayUnion, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../../components/Firebaseconfig";
import styles from '../../styles/Edit_prf.module.scss';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useRouter } from "next/router";
import { onAuthStateChanged } from 'firebase/auth';

export default function Createblog() {
    const router = useRouter();
    const blogcollectionref = collection(db, "Blogs");
    const postlikecollectionref = collection(db, "Post_like");

    const [createpost, setCreatepost] = useState({
        blog_img_name: "",
        title: "",
        desc: "",
        detail: ""
    });
    const [likepost, setLikepost] = useState({
        post_id: "",
        arr_user_id: []
    });
    const { blog_img_name, title, desc, detail } = createpost;
    const Change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCreatepost({ ...createpost, [name]: value });
    }

    const Addcreatepost = async (res) => {
        // console.log("addpost res uid ", res.id);
        const authuid = await auth.currentUser.uid;
        const cretepostuid = res.id;
        if (authuid) {
            await setDoc(doc(db, "Users", authuid), {
                create_post: arrayUnion(cretepostuid)
            }, { merge: true });
        }
    }
    const Add_blg = async (e) => {
        e.preventDefault();

        if (blog_img_name == "" || detail.length < 100) {
            alert("please enter details aleast 100 worlds");
            return;
        }
        const metadata = {
            contentType: 'image/png',
        };
        const imageref = ref(storage, `blog_images/${blog_img_name.name + v4()}`);
        const uploadbytes = await uploadBytes(imageref, blog_img_name, metadata);
        // console.log("uploadbytes ", uploadbytes.metadata.name);
        const url = await getDownloadURL(imageref);

        createblg(uploadbytes.metadata.name, url);
    }
    const createblg = async (blg_name, url) => {
        // console.log("auth id ", auth.currentUser.uid);
        const data = await addDoc(blogcollectionref, {
            blog_img_name: blg_name,
            blog_img_url: url,
            title,
            desc,
            detail,
            auther_id: auth.currentUser.uid,
            Date: serverTimestamp()

        }).then(async (res) => {
            // console.log("create res ", res);
            alert("Blog created succ..");
            Addcreatepost(res);
            const data2 = await addDoc(postlikecollectionref, {
                post_id: res.id,
                arr_user_id: []
            }).catch((e) => {
                // console.log("create postlike error ", e);
            })
            router.push("/");
        }).catch((e) => {
            // console.log("create data error ", e);
        })

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log("user ", user);
            }
            else {
                router.push("/login");
            }
        });
    }, []);
    return (
        <>
            <h1>create post...</h1>

            <div className={styles.form_wrap}>
                <div className={styles.profile}>
                    <img src={"https://html5book.ru/wp-content/uploads/2016/10/profile-image.png"} className={styles.blog_img} />
                    <h1>Profile...</h1>
                </div>
                <form className={styles.form}>
                    <div>
                        <input type="file" onChange={(e) => {
                            setCreatepost({ ...createpost, blog_img_name: e.target.files[0] });
                        }} />
                        <input type="text" placeholder="title" value={title} name="title" onChange={(e) => {
                            Change(e);
                        }} />
                        <input type="text" placeholder="desc" value={desc} name="desc" onChange={(e) => {
                            Change(e);
                        }} />
                        <input type="text" placeholder="detail" value={detail} name="detail" onChange={(e) => {
                            Change(e);
                        }} />
                    </div>
                    <button onClick={(e) => {
                        Add_blg(e);
                    }}>submit</button>
                </form>
            </div>
        </>
    )
}

Createblog.getLayout = function pageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}