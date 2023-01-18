import styles from "./styles.module.css"
import {useState} from "react";

function Searchbar() {
    const [data, setData] = useState({toolName: ""});

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSearch = (e) => {
        window.location.href = window.location.origin + "/search/result" + "?toolName=" + e.target.getAttribute('data-toolname');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
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
                    <button type="submit" className={styles.searchButton} onClick={handleSearch}
                            data-toolname={data.toolName}>Szukaj
                    </button>
                </div>

                <div style={{clear: "both"}}/>
            </div>
        </div>
    );
}

export default Searchbar;