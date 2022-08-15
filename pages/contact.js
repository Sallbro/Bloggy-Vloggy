import { async } from '@firebase/util';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, arrayUnion, updateDoc, query, where, setDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { auth, db } from '../components/Firebaseconfig';
import { useRouter } from 'next/router';

export default function Contact() {
    const router = useRouter();
    var currentDate = new Date();
    let currentDay = currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    let currentMonth = currentDate.getMonth() < 9
        ? '0' + (currentDate.getMonth() + 1)
        : (currentDate.getMonth() + 1);

    const [usermessage, setUsermessage] = useState({
        username: "", email: "", message: "", phoneno: ""
    });

    const Handlechange = async (e) => {
        const Name = e.target.name;
        const Value = e.target.value;

        setUsermessage({ ...usermessage, [Name]: Value });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsermessage({ ...usermessage, email: user?.email });
            } else {
                router.push("/login");
            }
        })
    }, []);

    const Sendmsg = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    message: arrayUnion({
                        date:`${currentDay}/${currentMonth}/${currentDate.getFullYear()}`,
                        cont: usermessage.message
                    })
                },{ merge: true }).then((res) => {
                    alert("respond send succesfully");
                    router.push("/");
                }).catch((e) => {
                    router.push("/contact");
                    alert("try again...");
                })
            } else {
                router.push("/login");
            }
        })
    }
    return (
        <>

            <div className="container d-flex justify-content-center text-center contact_card">
                <div className="card px-5 py-5">
                    <h1>Contact us form</h1> <span>Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible</span>
                    <div className="row mt-3">
                        <div className="col-md-6 mt-3"> <input type="text" className="form-control" placeholder="name" name="username" value={usermessage.username}
                            onChange={Handlechange} /> </div>
                        <div className="col-md-6 mt-3"> <input type="text" className="form-control" placeholder="phone" name="phoneno" value={usermessage.phoneno}
                            onChange={Handlechange} /> </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 mt-3"> <input type="text" className="form-control" placeholder="email" name="email" value={usermessage.email}
                            onChange={Handlechange} /> </div>
                        <div className="col-md-6 mt-3"> <input id="date" type="text" className="form-control" placeholder="When can we call you?" value={`${currentDay}/${currentMonth}/${currentDate.getFullYear()}`} /> </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12"> <textarea rows="6" className="form-control" placeholder="Let us know how can we help you?" name="message" value={usermessage.message}
                            onChange={Handlechange}></textarea> </div>
                    </div> <button className="btn btn-success mt-5" onClick={Sendmsg}>Send Message <i className="fa fa-long-arrow-right ml-2 mt-1"></i></button>
                </div>
            </div>

        </>
    )


}


