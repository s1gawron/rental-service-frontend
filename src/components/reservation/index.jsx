import styles from './styles.module.css';
import Navbar from "../navbar";
import Returnbar from "../returnbar";
import {useEffect, useState} from "react";
import axios from "axios";

function Reservation() {
    const userToken = localStorage.getItem("token");
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [tool, setTool] = useState({
        "toolId": 0,
        "name": "",
        "toolCategory": "",
        "description": "",
        "price": 0,
        "imageUrl": "",
        "available": false,
        "toolState": {
            "stateType": "",
            "description": ""
        }
    })
    const [reservationData, setReservationData] = useState({
        "dateFrom": "",
        "dateTo": "",
        "additionalComment": ""
    })
    const [error, setError] = useState("");

    const getData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const url = "http://localhost:8080/api/public/tool/get/id/" + urlParams.get("toolId");

        await axios.get(url).then((response) => {
            setTool(response.data)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    if (userToken) {
        return getReservationPageForLoggedUser(dateFrom, setDateFrom, dateTo, setDateTo, tool, reservationData, setReservationData, error, setError);
    }

    return getReservationPageForNotLoggedUser();
}

function getReservationPageForLoggedUser(dateFrom, setDateFrom, dateTo, setDateTo, tool, reservationData, setReservationData, error, setError) {
    const handleChange = ({currentTarget: input}) => {
        setReservationData({...reservationData, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/customer/reservation/make", {
            "additionalComment": reservationData.additionalComment,
            "dateFrom": reservationData.dateFrom,
            "dateTo": reservationData.dateTo,
            "toolIds": [
                tool.toolId
            ]
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(() => {
            window.location = "/account/reservations";
        }).catch((error) => {
            console.log(error);
            setError(error.response.data.message);
        })
    };

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.reservationFormWrapper}>
                {error && <div className={styles.reservationErrorMessage}>{error}</div>}

                <div className={styles.reservationFormLeftColumn}>
                    <div><img src={tool.imageUrl} alt={tool.name} className={styles.reservationToolPhoto}/></div>
                    <div className={styles.reservationToolProperty}>{tool.name}</div>
                    <div className={styles.reservationToolProperty}>{tool.price}</div>
                    <div className={styles.reservationToolProperty}>{tool.toolState.description}</div>
                </div>

                <div className={styles.reservationFormRightColumn}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="dateFrom">Data od:</label>
                        <div className={styles.inputWrapper}>
                            <input
                                id="dateFrom"
                                type="date"
                                name="dateFrom"
                                onChange={handleChange}
                                value={reservationData.dateFrom}
                                required
                                className={styles.input}
                            />
                        </div>
                        <label htmlFor="dateTo">Data do:</label>
                        <div className={styles.inputWrapper}>
                            <input
                                id="dateTo"
                                type="date"
                                name="dateTo"
                                onChange={handleChange}
                                value={reservationData.dateTo}
                                required
                                className={styles.input}
                            />
                        </div>
                        <label htmlFor="additionalComment">Dodatkowe informacje:</label>
                        <div className={styles.inputWrapper}>
                            <input
                                id="additionalComment"
                                type="text"
                                name="additionalComment"
                                onChange={handleChange}
                                size="40"
                                value={reservationData.additionalComment}
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.reservationButton}>Wypożycz!</button>
                    </form>
                </div>

                <div style={{clear: "both"}}/>
            </div>
        </div>
    );
}

function getReservationPageForNotLoggedUser() {
    return (
        <div>
            <Navbar/>
            <div className={styles.userNotLoggedForReservationErrorMsg}>Zaloguj się aby móc przeprowadzić rezerwację!
            </div>
        </div>
    );
}

export default Reservation;