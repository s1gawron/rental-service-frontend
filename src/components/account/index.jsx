import Navbar from "../navbar";
import Returnbar from "../returnbar";
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Account() {
    const [data, setData] = useState({
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

    const getData = async () => {
        const url = "http://localhost:8080/api/user/details"
        await axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setData(response.data);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.accountDataWrapper}>
                <div className={styles.userDataWrapper}>
                    <h1>Dane użytkownika</h1>
                    <div className={styles.userDataLeftColumn}>
                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Adres email:</div>
                            <div className={styles.userDataValue}>{data.email}</div>
                        </div>

                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Imię:</div>
                            <div className={styles.userDataValue}>{data.firstName}</div>
                        </div>

                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Nazwisko:</div>
                            <div className={styles.userDataValue}>{data.lastName}</div>
                        </div>

                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Rola użytkownika:</div>
                            <div className={styles.userDataValue}>{data.userRole}</div>
                        </div>
                    </div>

                    <div className={styles.userDataLeftColumn}>
                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Kraj:</div>
                            <div className={styles.userDataValue}>{data.customerAddress.country}</div>
                        </div>

                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Miasto:</div>
                            <div className={styles.userDataValue}>{data.customerAddress.city}</div>
                        </div>

                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Ulica:</div>
                            <div className={styles.userDataValue}>{data.customerAddress.street}</div>
                        </div>

                        <div className={styles.userDataPropertyWrapper}>
                            <div className={styles.userDataLabel}>Kod pocztowy:</div>
                            <div className={styles.userDataValue}>{data.customerAddress.postCode}</div>
                        </div>
                    </div>

                    <div style={{clear: "both"}}/>

                    <Link to="/account/reservations">
                        <button className={styles.userReservationButton}>Moje zamówienia</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Account;