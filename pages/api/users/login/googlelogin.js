import { signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../components/Firebaseconfig';
import { provider } from '../../../../components/Firebaseconfig';

export default async function handler(req, res) {
    if (req.method === "GET") {

        await signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isauth", true);
            console.log("result ", result);
            localStorage.setItem("isauth", "true");
            // setLogin(true);
            alert("Google Login Success...");
            
        }).catch((e) => {
            console.log("google error ", e);
            // alert("Google Login Error...");
        })
        

    }
}