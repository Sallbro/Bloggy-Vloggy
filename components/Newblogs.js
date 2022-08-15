import { async } from "@firebase/util";
import Link from "next/link";
import Blogblock from "./Blogblock";
export default function Newblg({ data }) {

    return (
        <>
            <Blogblock block_data={data} />
            <Link href="/blog">
                <h1 style={{"display":"grid","justifyContent":"center","fontSize":"medium","cursor":"pointer"}}>More...</h1>
            </Link>
        </>
    )
}