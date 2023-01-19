import Navbar from "../navbar";
import Searchbar from "../searchbar";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScrewdriverWrench, faTruck, faSearch} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";

function Main() {
    const [data, setData] = useState([])

    const getData = async () => {
        const url = "http://localhost:8080/api/public/tool/get/new"
        await axios.get(url).then((response) => {
            setData(response.data)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Navbar/>
            <Searchbar/>

            <div className={styles.categoryPicker}>
                <div className={styles.categoryWrapper}>
                    <div className={styles.categoryButtonWrapper}>
                        <Link to="/tools/category/light">
                            <button type="button" className={styles.categoryButton} title="Sprzęt lekki">
                                <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.faIcon}/>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={styles.categoryWrapper}>
                    <div className={styles.categoryButtonWrapper}>
                        <Link to="/tools/category/heavy">
                            <button type="button" className={styles.categoryButton} title="Sprzęt ciężki">
                                <FontAwesomeIcon icon={faTruck} className={styles.faIcon}/>
                            </button>
                        </Link>
                    </div>
                </div>

                <div style={{clear: "both"}}/>
            </div>

            <div className={styles.newToolsWrapper}>
                <h1>Ostatnio dodane narzędzia:</h1>

                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                        <tr className={styles.tableHeaders}>
                            <th className={styles.tableHeader}/>
                            <th className={styles.tableHeader}/>
                            <th className={styles.tableHeader}/>
                            <th className={styles.tableHeader}/>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map(tool => {
                            return (
                                <tr key={tool.toolId} className={styles.tableRowWrapper}>
                                    <td className={styles.firstTableData}>
                                        <div>
                                            <img src={tool.imageUrl} alt={tool.name} className={styles.tableDataPhoto}/>
                                        </div>
                                        <div>{tool.name}</div>
                                    </td>
                                    <td className={styles.secondTableData}>{tool.description || "---"}</td>
                                    <td className={styles.thirdTableData}>{tool.toolState.description || "---"}</td>
                                    <td className={styles.fourthTableData}>
                                        <Link to={"/tool/get/" + tool.toolId}>
                                            <button className={styles.checkToolButton}>Sprawdź! <FontAwesomeIcon
                                                icon={faSearch}/></button>
                                        </Link>
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

export default Main;