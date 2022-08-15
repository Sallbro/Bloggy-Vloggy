import { auth, db } from '../components/Firebaseconfig';
import { storage } from '../components/Firebaseconfig';
import { useState, useEffect } from "react";
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import styles from '../styles/Edit_prf.module.scss';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';

export default function Edit_profile() {
    const router = useRouter();
    const [editprf, setEditprf] = useState({
        prf_img: "",
        prf_img_url: "",
        names: "",
        country: "India",
        dob: ""
    });
    const { prf_img_name, prf_img_url, names, country, dob } = editprf;
    const Changess = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditprf({ ...editprf, [name]: value });
    }
    const Updateuser = async (prf_name, url) => {

        const authuid = await auth.currentUser.uid;
        if (authuid) {
            const updateuserdoc = await updateDoc(doc(db, "Users", authuid), {
                prf_img_name: prf_name,
                prf_img_url: url,
                name: names,
                country,
                dob
            });
            router.push('/');

        } else {
            console.log("login please");
        }

    }
    const Uplode_prf = async (e) => {
        e.preventDefault();
        console.log("editprf ", editprf);
        if (prf_img_name == "") {
            return;
        }
        const metadata = {
            contentType: 'image/png',
        };
        const imageref = ref(storage, `user_profile_images/${prf_img_name.name + v4()}`);
        const uploadbytes = await uploadBytes(imageref, prf_img_name, metadata);
        // console.log("uploadbytes ", uploadbytes.metadata.name);
        const url = await getDownloadURL(imageref);
        // console.log("url ", url);
        Updateuser(uploadbytes.metadata.name, url);
    }
    const Remove_prf = async (e) => {
        e.preventDefault();
        const imageref = ref(storage, "user_profile_images/images.png1466f0c9-179a-4e45-9156-95f57db9af4f");
        deleteObject(imageref).then(() => {
        }).catch((e) => {
            // console.log("Remove_prf ", e);
        })

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log("user ", user);
            }
            else {
                router.push("/login");
                console.log("not user login ");
            }
        });
    }, []);
    return (
        <>
            {/* edit profile  */}
            <div className={styles.form_wrap}>
                <div className={styles.profile}>
                    <img src={"https://html5book.ru/wp-content/uploads/2016/10/profile-image.png"} />
                    <h1>Profile...</h1>
                </div>
                <form className={styles.form}>
                    <div>
                        <input type="file" onChange={(e) => {
                            setEditprf({ ...editprf, prf_img_name: e.target.files[0] });
                        }} />
                        <input type="text" placeholder="name" value={names} name="names" onChange={(e) => {
                            Changess(e);
                        }} />
                        <input type="Date" placeholder="DOB" value={dob} name="dob" onChange={(e) => {
                            Changess(e);
                        }} />
                        <label htmlFor="country">Choose a country:</label>
                        <select name="country" id="country" value={country} onChange={(e) => {
                            Changess(e);
                        }}>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="Japan">Japan</option>
                            <option value="China">China</option>
                        </select>
                        <button onClick={(e) => {
                            Uplode_prf(e);
                        }}>upload</button>
                        <button onClick={(e) => {
                            Remove_prf(e);
                        }}>Remove</button>
                    </div>

                </form>
            </div>

        </>
    )
}

Edit_profile.getLayout = function pageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

