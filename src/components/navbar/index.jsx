import styles from "./styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faSignOut, faSignIn} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom";

function Navbar() {
    let currentPage = "";
    switch (window.location.pathname) {
        case "/tools/category/light":
            currentPage = "SPRZĘT LEKKI"
            break;
        case "/tools/category/heavy":
            currentPage = "SPRZĘT CIĘŻKI"
            break;
        case "/tool/rent":
            currentPage = "REZERWACJA NARZĘDZI"
            break;
        default:
            currentPage = "WYPOŻYCZALNIA NARZĘDZI"
            break;
    }

    const userToken = localStorage.getItem("token")

    if (userToken) {
        return getNavbarForLoggedUser(currentPage);
    }

    return getNavbarForNotLoggedUser(currentPage);
}

function getNavbarForLoggedUser(currentPage) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.leftColumn}>
                <h1>{currentPage}</h1>
            </div>

            <div className={styles.rightColumn}>
                <div className={styles.userAccountLinkWrapper}>
                    <Link to="/account">
                        <button type="button" className={styles.userAccountButton} title="Moje konto">
                            <FontAwesomeIcon icon={faUser} className={styles.faUserIcon}/>
                        </button>
                    </Link>
                </div>

                <div className={styles.logoutButtonWrapper}>
                    <button type="button" className={styles.logOutButton} onClick={handleLogout} title="Wyloguj się">
                        <FontAwesomeIcon icon={faSignOut}/>
                    </button>
                </div>

                <div style={{clear: "both"}}/>
            </div>

            <div style={{clear: "both"}}/>
        </div>
    );
}

function getNavbarForNotLoggedUser(currentPage) {
    return (<div className={styles.navbar}>
        <div className={styles.leftColumn}>
            <h1>{currentPage}</h1>
        </div>

        <div className={styles.loginButtonWrapper}>
            <Link to="/login">
                <button type="button" className={styles.loginButton} title="Zaloguj się">
                    <FontAwesomeIcon icon={faSignIn}/>
                </button>
            </Link>
        </div>

        <div style={{clear: "both"}}/>
    </div>);
}


export default Navbar;