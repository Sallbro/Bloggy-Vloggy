import { auth, provider } from "../components/Firebaseconfig";
import { signInWithPopup } from 'firebase/auth'
import styles from "../styles/Login.module.scss";
import { Creatuser } from "./Singupemailpass";
export default function Googlelogin() {

    const singinwithgoogle = async (e) => {
        e.preventDefault();
        await signInWithPopup(auth, provider).then((userCredential) => {
            const new_usr_obj = {
                uid: userCredential.user.uid,
                email: userCredential?.user?.email,
                name: userCredential?.user?.displayName,
                prf_img_url:userCredential?.user?.photoURL
            }
            console.log("new_usr_obj ",new_usr_obj);
            Creatuser(new_usr_obj);
            localStorage.setItem("isauth", true);
            console.log("userCredential ", userCredential);
            localStorage.setItem("isauth", "true");
            alert("Google Login Success...");

        }).catch((e) => {
            console.log("google error ", e);
            alert("Google Login Error...");
        })
    }

    return (
        <>

            {/* <h1>Login page...</h1>
            <button onClick={singinwithgoogle}>Google login</button> */}

            <div className={styles.field}>
                <input type="submit" value="Google"
                    onClick={(e) => {
                        singinwithgoogle(e);
                    }} />
            </div>
        </>
    )
}