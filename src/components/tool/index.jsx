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

    const getToolData = async () => {
        const currentToolId = window.location.pathname.split('/')[3];
        const url = "http://localhost:8080/api/public/tool/get/id/" + currentToolId;

        await axios.get(url).then((response) => {
            setTool(response.data)
        })
    }

    const [userData, setUserData] = useState({
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

    const getUserData = async () => {
        const url = "http://localhost:8080/api/user/details"
        await axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setUserData(response.data);
        })
    }

    useEffect(() => {
        getToolData();
        getUserData();
    }, []);

    const [error, setError] = useState("");

    const handleToolDelete = () => {
        const currentToolId = window.location.pathname.split('/')[3];
        const url = "http://localhost:8080/api/tool/delete/" + currentToolId;
        axios.delete(url, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(() => {
            window.location = "/tools/category/" + tool.toolCategory.toLowerCase();
        }).catch((error) => {
            setError(error.response.data.message);
        })
    }

    return (
        <div>
            <Navbar/>
            <Returnbar/>

            <div className={styles.toolWrapper}>

                {error && <div className={styles.toolDeleteResultErrorMsg}>{error}</div>}
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

                        {
                            userData.userRole === "CUSTOMER" &&
                            <div className={styles.rentButtonWrapper}>
                                <Link to={"/tool/rent?toolId=" + tool.toolId}>
                                    <button className={styles.rentButton}>Wypożycz!</button>
                                </Link>
                            </div>
                        }

                        {
                            userData.userRole === "WORKER" &&
                            <div className={styles.toolManagementButtonWrapper}>
                                <div className={styles.editToolButtonWrapper}>
                                    <Link to={"/tool/edit/" + tool.toolId}>
                                        <button className={styles.editToolButton}>Edytuj!</button>
                                    </Link>
                                </div>

                                <div className={styles.deleteToolButtonWrapper}>
                                    <button className={styles.deleteToolButton} onClick={handleToolDelete}>Usuń!
                                    </button>
                                </div>

                                <div style={{clear: "both"}}/>
                            </div>
                        }
                    </div>
                </div>

                <div style={{clear: "both"}}/>

                <div className={styles.toolDescriptionProperty}>{tool.description}</div>
            </div>
        </div>
    );
}

export default Tool;