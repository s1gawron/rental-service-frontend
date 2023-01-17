import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import Navbar from "../navbar";
import Returnbar from "../returnbar";

function Login() {
    const [data, setData] = useState({email: "", password: ""});

    const [error, setError] = useState("");

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/public/user/login", {
            "email": data.email,
            "password": data.password
        }).then((response) => {
            localStorage.setItem("token", response.headers.authorization);
            window.location = "/";
        }).catch(() => {
            setError('Wrong email or password provided!');
        })
    };

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.wrapper}>
                <div className={styles.login_form}>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <h1>Zaloguj się</h1>
                        <label htmlFor="email">Email:</label>
                        <div className={styles.inputWrapper}>
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

                        <label htmlFor="password">Hasło:</label>
                        <div className={styles.inputWrapper}>
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

                        <button type="submit" className={styles.login_button}>Zaloguj się!</button>
                    </form>
                </div>

                <div className={styles.register_link_wrapper}>
                    <h4 className={styles.register_link_header}>Nie masz konta?</h4>
                    <Link to="/register">
                        <button type="button" className={styles.register_button}>Zarejestruj się!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;