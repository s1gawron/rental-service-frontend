import styles from './styles.module.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Navbar from "../navbar";
import Returnbar from "../returnbar";


function Register() {
    const [data, setData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        country: "",
        city: "",
        street: "",
        postCode: ""
    })

    const [error, setError] = useState("")

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/public/user/register"
            const json = {
                "email": data.email,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "password": data.password,
                "userRole": "CUSTOMER",
                "address": {
                    "country": data.country,
                    "city": data.city,
                    "street": data.street,
                    "postCode": data.postCode
                }
            }
            const {data: res} = await axios.post(url, json)
            window.location = "/login"
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.wrapper}>
                <div className={styles.registerForm}>
                    {error && <div className={styles.registerErrorMsg}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <h1>Rejestracja</h1>
                        <div className={styles.leftColumn}>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="email">Adres email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="firstName">Imię:</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={data.firstName}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="lastName">Nazwisko:</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={data.lastName}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="password">Hasło:</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.rightColumn}>
                            <div className={styles.inputWrapper}>
                                <label htmlFor="country">Kraj:</label>
                                <input
                                    id="country"
                                    type="text"
                                    name="country"
                                    onChange={handleChange}
                                    value={data.country}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="city">Miasto:</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    value={data.city}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="street">Ulica:</label>
                                <input
                                    id="street"
                                    type="text"
                                    name="street"
                                    onChange={handleChange}
                                    value={data.street}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label htmlFor="postCode">Kod pocztowy:</label>
                                <input
                                    id="postCode"
                                    type="text"
                                    name="postCode"
                                    onChange={handleChange}
                                    value={data.postCode}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div style={{clear: "both"}}/>

                        <button type="submit" className={styles.registerButton}>Zarejestruj się!</button>
                    </form>
                </div>

                <div className={styles.loginLinkWrapper}>
                    <h4 className={styles.loginLinkHeader}>Posiadasz już konto?</h4>
                    <Link to="/login">
                        <button type="button" className={styles.loginButton}>Zaloguj się!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
