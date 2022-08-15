import { useEffect } from "react";
import styles from "../styles/Fronted.module.scss";

function Fronted() {
    const name = "VLOGY BLOGY";

    return (
        <>

            <h3 className={[styles.span, styles.loader].join(" ")}>

                <span className={styles.m}>B</span>
                <span className={styles.m}>L</span>
                <span className={styles.m}>O</span>
                <span className={styles.m}>G</span>
                <span className={styles.m}>G</span>
                <span className={styles.m}>Y</span>
                <span className={styles.m}>&nbsp;</span>

                <span className={styles.m}>V</span>
                <span className={styles.m}>L</span>
                <span className={styles.m}>O</span>
                <span className={styles.m}>G</span>
                <span className={styles.m}>G</span>
                <span className={styles.m}>Y</span>
                <span className={styles.m}>&nbsp;</span>
            </h3>

        </>
    )
}

export default Fronted;