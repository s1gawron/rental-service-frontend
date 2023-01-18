import styles from "./styles.module.css";
import Navbar from "../navbar";
import Returnbar from "../returnbar";
import {useEffect, useState} from "react";
import axios from "axios";

function UserReservation() {
    const userToken = localStorage.getItem("token");
    const [userReservations, setUserReservations] = useState([]);
    const [userReservationsCount, setUserReservationsCount] = useState(0);
    const [error, setError] = useState("");

    const getData = async () => {
        const url = "http://localhost:8080/api/customer/reservation/get/all"
        await axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setUserReservations(response.data.reservations)
            setUserReservationsCount(response.data.count)
        })
    }

    useEffect(() => {
        getData();
    }, []);

    if (userToken) {
        return getUserReservationPageForLoggedUser(userReservations, userReservationsCount, error, setError);
    }

    return getUserReservationPageForNotLoggedUser();
}

function getUserReservationPageForLoggedUser(userReservations, userReservationsCount, error, setError) {
    const handleReservationCancel = (e) => {
        const reservationId = e.target.getAttribute('data-reservationid');
        const url = "http://localhost:8080/api/customer/reservation/cancel/" + reservationId;

        axios.post(url, {}, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).catch((error) => {
            setError(error.response.data.message);
        })

        window.location.reload();
    };

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.userReservationsCountWrapper}>
                <h3>Liczba złożonych przez Ciebie rezerwacji: {userReservationsCount}</h3>
            </div>

            {error && <div className={styles.reservationCancelErrorMsg}>{error}</div>}

            <div className={styles.userReservationsDataWrapper}>
                <div className={styles.userReservationsTableWrapper}>
                    <table>
                        <thead>
                        <tr className={styles.reservationTableHeaders}>
                            <th className={styles.reservationTableHeader}>Wypożyczone narzędzia</th>
                            <th className={styles.reservationTableHeader}>Cena</th>
                            <th className={styles.reservationTableHeader}>Dodatkowe informacje</th>
                            <th className={styles.reservationTableHeader}>Data wypożyczenia</th>
                            <th className={styles.reservationTableHeader}>Data zwrotu</th>
                            <th className={styles.reservationTableHeader}>Stan rezerwacji</th>
                            <th className={styles.reservationTableHeader}>Anulowana</th>
                            <th className={styles.reservationTableHeader}>Anuluj</th>
                        </tr>
                        </thead>

                        <tbody>
                        {userReservations.map(reservation => {
                            return (

                                <tr key={reservation.reservationId}>
                                    <td className={styles.reservationTableData}>
                                        {reservation.tools.map(tool => {
                                            return (<div>{tool.name}</div>);
                                        })}
                                    </td>
                                    <td className={styles.reservationTableData}>{reservation.reservationFinalPrice} PLN</td>
                                    <td className={styles.reservationTableData}>{reservation.additionalComment}</td>
                                    <td className={styles.reservationTableData}>{reservation.dateFrom}</td>
                                    <td className={styles.reservationTableData}>{reservation.dateTo}</td>
                                    <td className={styles.reservationTableData}>{reservation.expired ? "Rezerwacja minęła" : "Rezerwacja aktywna"}</td>
                                    <td className={styles.reservationTableData}>{reservation.canceled ? "TAK" : "NIE"}</td>
                                    <td className={styles.reservationTableData}>
                                        <button type="button" className={styles.reservationCancelButton}
                                                onClick={handleReservationCancel}
                                                data-reservationid={reservation.reservationId}>
                                            Anuluj
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function getUserReservationPageForNotLoggedUser() {
    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.userNotLoggedForUserReservationErrorMsg}>
                Zaloguj się aby móc zobaczyć swoje zamówienia!
            </div>
        </div>
    );
}

export default UserReservation;