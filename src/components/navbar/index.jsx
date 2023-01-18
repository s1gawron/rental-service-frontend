import styles from "./styles.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faSignOut, faSignIn, faPlus} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Navbar() {
    let currentPage;

    switch (window.location.pathname) {
        case "/tools/category/light":
            currentPage = "SPRZĘT LEKKI";
            break;
        case "/tools/category/heavy":
            currentPage = "SPRZĘT CIĘŻKI";
            break;
        case "/tool/rent":
            currentPage = "REZERWACJA NARZĘDZI";
            break;
        default:
            currentPage = "WYPOŻYCZALNIA NARZĘDZI";
            break;
    }

    const userToken = localStorage.getItem("token")

    const [userData, setUserData] = useState({
        "email": "",
        "firstName": "",
        "lastName": "",
        "userRole": "",
        "customerAddress": {
            "country": "",
            "city": "",
            "street": "",
            "postCode": ""
        },
    });

    const getUserData = async () => {
        const url = "http://localhost:8080/api/user/details"
        await axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setUserData(response.data);
        })
    }

    useEffect(() => {
        getUserData();
    }, []);

    if (userToken) {
        return getNavbarForLoggedUser(currentPage, userData);
    }

    return getNavbarForNotLoggedUser(currentPage);
}

function getNavbarForLoggedUser(currentPage, userData) {
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
                <div className={styles.buttonsWrapper}>
                    {
                        userData.userRole === "WORKER" &&
                        <div className={styles.toolAddLinkWrapper}>
                            <Link to="/tool/add">
                                <button type="button" className={styles.toolAddButton} title="Dodaj narzędzia">
                                    <FontAwesomeIcon icon={faPlus} className={styles.faUserIcon}/>
                                </button>
                            </Link>
                        </div>
                    }

                    <div className={styles.userAccountLinkWrapper}>
                        <Link to="/account">
                            <button type="button" className={styles.userAccountButton} title="Moje konto">
                                <FontAwesomeIcon icon={faUser} className={styles.faUserIcon}/>
                            </button>
                        </Link>
                    </div>

                    <div className={styles.logoutButtonWrapper}>
                        <button type="button" className={styles.logOutButton} onClick={handleLogout}
                                title="Wyloguj się">
                            <FontAwesomeIcon icon={faSignOut}/>
                        </button>
                    </div>

                    <div style={{clear: "both"}}/>
                </div>
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