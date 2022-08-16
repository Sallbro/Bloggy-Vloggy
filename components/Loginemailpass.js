import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './Firebaseconfig'
import { useState } from "react";
import styles from "../styles/Login.module.scss";
import Googlelogin from './Googlelogin';
import {  useRouter } from 'next/router';
export default function Loginemailpass() {
    const router=useRouter();
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
    const Login = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log("login emailpass res ", user);
            setUseremail({ email: "", password: "" });
            localStorage.setItem("isauth", "true");
            alert("Login Success...");

        }).catch((e) => {
            console.log("login emailpass err ", e);
            setUseremail({ email: "", password: "" });
            alert("Login Error...");

        })
    }
    return (
        <>

            <div className={styles.wrapper}>
                <div className={styles.title}>Login Form</div>
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
                                Login(e);
                            }} />
                    </div>
                    <span>or</span>
                    <Googlelogin />
                    <div className={styles.signup_link}>Not a member?

                        <span onClick={()=>{
                            router.push("/singup");
                        }} style={{"cursor":"pointer"}}>
                            Register now
                        </span>
                    </div>
                </form>
                {/* <LoginOrNot /> */}
            </div>


        </>
    )
}