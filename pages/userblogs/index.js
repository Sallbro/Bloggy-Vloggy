import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Follow_blg() {
    const router = useRouter();
    useEffect(() => {
        router.push("/404");
    })

    return (
        <>
        </>
    )
}