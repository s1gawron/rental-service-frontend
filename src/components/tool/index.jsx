import Navbar from "../navbar";
import Returnbar from "../returnbar";
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Tool() {
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

    const getData = async () => {
        const currentToolId = window.location.pathname.split('/')[3];
        const url = "http://localhost:8080/api/public/tool/get/id/" + currentToolId;

        await axios.get(url).then((response) => {
            setTool(response.data)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.toolWrapper}>
                <div className={styles.leftToolDataColumn}>
                    <div><img src={tool.imageUrl} alt={tool.name} className={styles.toolDataPhoto}/></div>
                    <h2 className={styles.toolNameProperty}>{tool.name}</h2>
                </div>
                <div className={styles.rightToolDataColumn}>
                    <div className={styles.toolPropertiesWrapper}>
                        <div className={styles.toolPropertyLabel}>Cena:</div>
                        <div className={styles.toolPropertyValue}>{tool.price} PLN</div>

                        <div style={{clear: "both"}}/>

                        <div className={styles.toolPropertyLabel}>Kategoria:</div>
                        <div
                            className={styles.toolPropertyValue}>{tool.toolCategory === "LIGHT" ? "Sprzęt lekki" : "Sprzęt ciężki"}
                        </div>

                        <div style={{clear: "both"}}/>

                        <div className={styles.toolPropertyLabel}>Dostępność:</div>
                        <div className={styles.toolPropertyValue}>{tool.available ? "Dostępny" : "Brak"}</div>

                        <div style={{clear: "both"}}/>

                        <div className={styles.toolPropertyLabel}>Stan:</div>
                        <div className={styles.toolPropertyValue}>{tool.toolState.stateType}</div>

                        <div style={{clear: "both"}}/>

                        <div className={styles.toolPropertyLabel}>Opis stanu:</div>
                        <div className={styles.toolPropertyValue}>{tool.toolState.description}</div>

                        <div style={{clear: "both"}}/>

                        <div className={styles.rentButtonWrapper}>
                            <Link to={"/tool/rent?toolId=" + tool.toolId}>
                                <button className={styles.rentButton}>Wypożycz!</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div style={{clear: "both"}}/>

                <div className={styles.toolDescriptionProperty}>{tool.description}</div>
            </div>
        </div>


    );
}

export default Tool;