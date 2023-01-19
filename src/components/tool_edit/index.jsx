import Navbar from "../navbar";
import Returnbar from "../returnbar";
import Searchbar from "../searchbar";
import styles from "./styles.module.css"
import {useEffect, useState} from "react";
import axios from "axios";

function ToolEdit() {
    const [toolData, setToolData] = useState({
        "available": false,
        "description": "",
        "imageUrl": "",
        "name": "",
        "price": 0,
        "toolCategory": "",
        "toolId": 0,
        "toolState": {
            "description": "",
            "stateType": ""
        }
    });

    const [toolState, setToolState] = useState({
        "description": "",
        "stateType": ""
    })

    const handleChange = ({currentTarget: input}) => {
        setToolData({...toolData, [input.name]: input.value});
    }

    const handleToolStateChange = ({currentTarget: input}) => {
        if (input.name === "stateDescription") {
            setToolState({...toolState, ["description"]: input.value})
        }

        if (input.name === "stateType") {
            setToolState({...toolState, ["stateType"]: input.value})
        }
    }

    const [error, setError] = useState("");

    const getData = () => {
        const currentToolId = window.location.pathname.split('/')[3];
        const url = "http://localhost:8080/api/public/tool/get/id/" + currentToolId;

        axios.get(url).then((response) => {
            setToolData(response.data);
            setToolState(response.data.toolState);
            document.getElementById("available").checked = response.data.available
        }).catch((error) => {
            setError(error.response.data.message);
        })
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8080/api/tool/edit", {
            "available": document.getElementById("available").checked,
            "description": toolData.description,
            "imageUrl": toolData.imageUrl,
            "name": toolData.name,
            "price": toolData.price,
            "toolCategory": toolData.toolCategory,
            "toolId": toolData.toolId,
            "toolState": {
                "description": toolState.description,
                "stateType": toolState.stateType
            }
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(() => {
            window.location = "/tool/get/" + toolData.toolId;
        }).catch((error) => {
            setError(error.response.data.message);
        })
    }

    return (
        <div>
            <Navbar/>
            <Searchbar/>
            <Returnbar/>

            <div className={styles.editToolModuleWrapper}>
                {error && <div className={styles.editToolResultErrorMsg}>{error}</div>}

                <div className={styles.editToolFormWrapper}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="toolName">Nazwa narzędzia:</label>
                        <div className={styles.editToolInputWrapper}>
                            <input
                                id="toolName"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={toolData.name || ""}
                                required
                                className={styles.editToolInput}
                            />
                        </div>

                        <label htmlFor="toolDescription">Opis:</label>
                        <div className={styles.editToolInputWrapper}>
                            <input
                                id="toolDescription"
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={toolData.description || ""}
                                className={styles.editToolInput}
                            />
                        </div>

                        <label htmlFor="toolPrice">Cena:</label>
                        <div className={styles.editToolInputWrapper}>
                            <input
                                id="toolPrice"
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                onChange={handleChange}
                                value={toolData.price || 0}
                                className={styles.editToolInput}
                            />
                        </div>

                        <label htmlFor="imageUrl">Link do zdjęcia:</label>
                        <div className={styles.editToolInputWrapper}>
                            <input
                                id="imageUrl"
                                type="text"
                                name="imageUrl"
                                onChange={handleChange}
                                value={toolData.imageUrl || ""}
                                required
                                className={styles.editToolInput}
                            />
                        </div>

                        <label htmlFor="toolCategory">Kategoria narzędzia:</label>
                        <div className={styles.editToolInputWrapper}>
                            <select id="toolCategory" name="toolCategory" onChange={handleChange}
                                    value={toolData.toolCategory || "LIGHT"} required className={styles.editToolInput}>
                                <option value="LIGHT">Narzędzia lekkie</option>
                                <option value="HEAVY">Narzędzia ciężkie</option>
                            </select>
                        </div>

                        <label htmlFor="stateType">Kategoria stanu narzędzia:</label>
                        <div className={styles.editToolInputWrapper}>
                            <select id="stateType" name="stateType" onChange={handleToolStateChange}
                                    value={toolState.stateType || "NEW"} required className={styles.toolInput}>
                                <option value="NEW">Nowe</option>
                                <option value="MINIMAL_WEAR">Lekko używane</option>
                                <option value="WELL_WORN">Ciężkie zużycie</option>
                            </select>
                        </div>

                        <label htmlFor="stateDescription">Opis stanu narzędzia:</label>
                        <div className={styles.editToolInputWrapper}>
                            <input
                                id="stateDescription"
                                type="text"
                                name="stateDescription"
                                onChange={handleToolStateChange}
                                value={toolState.description || ""}
                                className={styles.editToolInput}
                            />
                        </div>

                        <label htmlFor="available">Dostępność:</label>
                        <div className={styles.editToolInputWrapper}>
                            <input
                                id="available"
                                type="checkbox"
                                name="available"
                                className={styles.editToolInput}
                            />
                        </div>

                        <button type="submit" className={styles.editToolButton}>Edytuj narzędzie</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ToolEdit;