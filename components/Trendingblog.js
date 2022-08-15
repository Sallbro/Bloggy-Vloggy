import { async } from "@firebase/util";

export default function Trendingblg({ Trend_blg }) {

    return (
        <>
            {Trend_blg.map((dt) => {
                return (
                    <>
                        <h1>{dt.title}</h1>
                    </>
                )
            })}
        </>
    )
}
