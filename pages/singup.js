import Singupemailpass from "../components/Singupemailpass";
export default function Singup() {

    return (
        <>
            <Singupemailpass />
        </>
    )
}

Singup.getLayout = function pageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}