import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Follow() {
    const router = useRouter();
    useEffect(() => {
        router.push("/404");
    })

    return (
        <>
        </>
    )
}