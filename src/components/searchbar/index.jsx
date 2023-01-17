import styles from "./styles.module.css"
import {useState} from "react";
import axios from "axios";

function Searchbar() {
    const [data, setData] = useState({toolName: ""});

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/public/tool/get/name", {
            "toolName": data.toolName
        }).then(() => {
            window.location = "/";
        })
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.labelWrapper}>
                        <label htmlFor="search">Szukaj:</label>
                    </div>

                    <div className={styles.inputWrapper}>
                        <input
                            id="search"
                            type="text"
                            name="toolName"
                            placeholder="Podaj nazwę narzędzia"
                            onChange={handleChange}
                            value={data.toolName}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.searchButtonWrapper}>
                        <button type="submit" className={styles.searchButton}>Szukaj</button>
                    </div>

                    <div style={{clear: "both"}}/>
                </form>
            </div>
        </div>
    );
}

export default Searchbar;