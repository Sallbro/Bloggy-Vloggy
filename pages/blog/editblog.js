import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from "../../components/Firebaseconfig";
import styles from '../../styles/Edit_prf.module.scss';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'
export default function Editblog() {
    const [edit_post, setEdit_post] = useState({
        blog_img: "",
        title: "",
        desc: "",
        detail: ""
    });
    const { blog_img, title, desc, detail } = edit_post;
    const Change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEdit_post({ ...edit_post, [name]: value });
    }
    const Uplode_blg = async (e) => {
        e.preventDefault();
        if (blog_img == "") {
            return;
        }
        const metadata = {
            contentType: 'image/png',
        };
        const imageref = ref(storage, `blog_images/${blog_img.name + v4()}`);
        const uploadbytes = await uploadBytes(imageref, blog_img, metadata);
        // console.log("uploadbytes ", uploadbytes.metadata.name);

        editblg(uploadbytes.metadata.name);
    }
    const editblg = async (name) => {
        const authuid = await auth.currentUser.uid;
        if (authuid) {
            const data = await updateDoc(doc(db, "Blogs", "TGfcyryKlcVKdDXnHNNN"), {
                blog_img: name,
                title,
                desc,
                detail,
                Date: serverTimestamp()
            });
        }
    }
    return (
        <>
            <h1>Edit post...</h1>

            {/* edit blog  */}
            <div className={styles.form_wrap}>
                <div className={styles.profile}>
                    <img src={"https://html5book.ru/wp-content/uploads/2016/10/profile-image.png"} className={styles.blog_img} />
                    <h1>Profile...</h1>
                </div>
                <form className={styles.form}>
                    <div>
                        <input type="file" onChange={(e) => {
                            setEdit_post({ ...edit_post, blog_img: e.target.files[0] });
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
                        Uplode_blg(e);
                    }}>Uplode_blg</button>
                </form>
            </div>
        </>
    )
}