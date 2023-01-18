import Navbar from "../navbar";
import Returnbar from "../returnbar";
import Searchbar from "../searchbar";
import styles from "./styles.module.css"
import {useState} from "react";
import axios from "axios";

function ToolAdd() {
    const [tool, setTool] = useState({
        "toolName": "",
        "toolDescription": "",
        "toolPrice": 0,
        "imageUrl": "",
        "toolCategory": ""
    });

    const [data, setData] = useState({stateType: "", stateDescription: ""});

    const handleChange = ({currentTarget: input}) => {
        setTool({...tool, [input.name]: input.value});
    }

    const handleDataChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/tool/add", {
            "description": tool.toolDescription,
            "imageUrl": tool.imageUrl,
            "name": tool.toolName,
            "price": tool.toolPrice,
            "toolCategory": tool.toolCategory,
            "toolState": {
                "description": data.stateDescription,
                "stateType": data.stateType
            }
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(() => {
            window.location = "/";
        }).catch((error) => {
            console.log(tool.toolCategory);
            setError(error.response.data.message);
        })
    }

    const [error, setError] = useState("");

    return (
        <div>
            <Navbar/>
            <Searchbar/>
            <Returnbar/>

            <div className={styles.addToolModuleWrapper}>
                {error && <div className={styles.addToolResultErrorMsg}>{error}</div>}

                <div className={styles.addToolFormWrapper}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="toolName">Nazwa narzędzia:</label>
                        <div className={styles.addToolInputWrapper}>
                            <input
                                id="toolName"
                                type="text"
                                name="toolName"
                                onChange={handleChange}
                                value={tool.toolName || ""}
                                required
                                className={styles.addToolInput}
                            />
                        </div>

                        <label htmlFor="toolDescription">Opis:</label>
                        <div className={styles.addToolInputWrapper}>
                            <input
                                id="toolDescription"
                                type="text"
                                name="toolDescription"
                                onChange={handleChange}
                                value={tool.toolDescription || ""}
                                className={styles.addToolInput}
                            />
                        </div>

                        <label htmlFor="toolPrice">Cena:</label>
                        <div className={styles.addToolInputWrapper}>
                            <input
                                id="toolPrice"
                                type="number"
                                name="toolPrice"
                                min="0"
                                step="0.01"
                                onChange={handleChange}
                                value={tool.toolPrice || 0}
                                className={styles.addToolInput}
                            />
                        </div>

                        <label htmlFor="imageUrl">Link do zdjęcia:</label>
                        <div className={styles.addToolInputWrapper}>
                            <input
                                id="imageUrl"
                                type="text"
                                name="imageUrl"
                                onChange={handleChange}
                                value={tool.imageUrl || ""}
                                required
                                className={styles.addToolInput}
                            />
                        </div>

                        <label htmlFor="toolCategory">Kategoria narzędzia:</label>
                        <div className={styles.addToolInputWrapper}>
                            <select id="toolCategory" name="toolCategory" onChange={handleChange}
                                    value={tool.toolCategory || "LIGHT"} required className={styles.addToolInput}>
                                <option value="LIGHT">Narzędzia lekkie</option>
                                <option value="HEAVY">Narzędzia ciężkie</option>
                            </select>
                        </div>

                        <label htmlFor="stateType">Kategoria stanu narzędzia:</label>
                        <div className={styles.addToolInputWrapper}>
                            <select id="stateType" name="stateType" onChange={handleDataChange}
                                    value={data.stateType || "NEW"} required className={styles.addToolInput}>
                                <option value="NEW">Nowe</option>
                                <option value="MINIMAL_WEAR">Lekko używane</option>
                                <option value="WELL_WORN">Ciężkie zużycie</option>
                            </select>
                        </div>

                        <label htmlFor="stateDescription">Opis stanu narzędzia:</label>
                        <div className={styles.addToolInputWrapper}>
                            <input
                                id="stateDescription"
                                type="text"
                                name="stateDescription"
                                onChange={handleDataChange}
                                value={data.stateDescription || ""}
                                className={styles.addToolInput}
                            />
                        </div>

                        <button type="submit" className={styles.addToolButton}>Dodaj narzędzie</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ToolAdd;