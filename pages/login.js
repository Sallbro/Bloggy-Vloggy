import { useEffect, useState } from "react";
import Loginemailpass from "../components/Loginemailpass";
import { auth } from "../components/Firebaseconfig";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Navbar from "../components/Navbar";
import styles from '../styles/Button.module.scss';

export default function Login() {
    const [userlog, setUserlog] = useState(false);
    const singout = async () => {
        await signOut(auth);
    }
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                setUserlog(true);
            } else {
                setUserlog(false);
            }
        })
    })
    return (
        <>
            {!userlog ? (
                <>
                    <Loginemailpass />

                </>) :
                (
                    <>
                        <Navbar />
                        <div className={styles.container}>
                            <div className={styles.article}>
                                <h1>You are Already login</h1>
                                <button onClick={singout} >Singout</button>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

Login.getLayout = function pageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}
