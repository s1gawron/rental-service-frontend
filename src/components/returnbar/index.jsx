import styles from "./styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom";

function Returnbar() {
    return (
        <div className={styles.returnBar}>
            <Link to="/">
                <button className={styles.returnButton} title="Powrót na stronę glówną">
                    <FontAwesomeIcon icon={faArrowLeft} className={styles.faArrowIcon}/>
                </button>
            </Link>
        </div>
    );
}

export default Returnbar;