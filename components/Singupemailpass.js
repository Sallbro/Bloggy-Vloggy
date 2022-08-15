import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './Firebaseconfig'
import { useState } from "react";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { db } from './Firebaseconfig';
import styles from "../styles/Login.module.scss";
import Googlelogin from './Googlelogin';
import { useRouter } from 'next/router';
import { async } from '@firebase/util';

export async function Creatuser(data) {
    // Add a new document in collection "Users"
    await setDoc(doc(db, "Users", data.uid), {
        email: data?.email,
        name: data?.name,
        prf_img_name: "",
        prf_img_url: ""
    }).then((res) => {
        router.push("/");
        console.log("create user res ", res);

    }).catch((e) => {
        console.log("create user err ", e);
    })
}

export default function Singupemailpass() {
    const router = useRouter();
    const [useremail, setUseremail] = useState({
        email: "",
        password: ""
    });
    const { email, password } = useremail
    const Change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log("name: ", name);
        setUseremail({ ...useremail, [name]: value });
    }

    const create_userlike = async (id) => {
        const collref = doc(db, "User_like", id);
        const docref = await setDoc(collref, {
            Follower: []
        }).then((res) => {
            console.log("create_userlike ", res);
        }).catch((e) => {
            console.log("create_userlike error ", e);
        })
    }
    const Regis = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("singup res ", userCredential);

            // add new user 
            const new_usr_obj = {
                uid: userCredential.user.uid,
                email: userCredential?.user?.email,
                name: userCredential?.user?.displayName,
            }
            Creatuser(new_usr_obj);
            create_userlike(userCredential.user.uid);
            setUseremail({ email: "", password: "" });
            alert("Singup Success...");
            router.push("/");
        }).catch((e) => {
            console.log("singup err ", e);
            alert("Singup Error...");

        })
    }
    return (
        <>

            <div className={styles.wrapper}>
                <div className={styles.title}>Singup Form</div>
                <form>
                    <div className={styles.field}>
                        <input type="text" value={email} name="email"
                            onChange={(e) => {
                                Change(e);
                            }}
                            placeholder="email" />
                        <label>Email Address</label>
                    </div>
                    <div className={styles.field}>
                        <input type="password" value={password} name="password"
                            onChange={(e) => {
                                Change(e);
                            }}
                            placeholder="password" />
                        <label>Password</label>
                    </div>
                    <div className={styles.field}>
                        <input type="submit" value="Login"
                            onClick={(e) => {
                                Regis(e);
                            }} />
                    </div>
                    <span>or</span>
                    <Googlelogin />
                    <div className={styles.signup_link}>Already a member?
                        <span onClick={() => {
                            router.push("/login");
                        }} style={{"cursor":"pointer"}}>
                            Login now
                        </span>
                    </div>
                </form>
            </div>

        </>
    )
}