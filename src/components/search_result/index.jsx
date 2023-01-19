import axios from "axios";
import Navbar from "../navbar";
import Searchbar from "../searchbar";
import Returnbar from "../returnbar";
import {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function SearchResult() {
    const [tools, setTools] = useState([]);
    const [error, setError] = useState("");

    const getData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const toolName = urlParams.get("toolName");

        axios.post("http://localhost:8080/api/public/tool/get/name", {
            "toolName": toolName
        }).then((response) => {
            setTools(response.data);
        }).catch((error) => {
            setError(error.response.data.message);
        })
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Navbar/>
            <Searchbar/>
            <Returnbar/>

            <div className={styles.searchResultWrapper}>
                {error && <div className={styles.searchResultErrorMsg}>{error}</div>}

                <div className={styles.searchResultTableWrapper}>
                    <table>
                        <thead>
                        <tr className={styles.searchResultTableHeaders}>
                            <th className={styles.searchResultTableHeader}/>
                            <th className={styles.searchResultTableHeader}/>
                            <th className={styles.searchResultTableHeader}/>
                            <th className={styles.searchResultTableHeader}/>
                        </tr>
                        </thead>

                        <tbody>
                        {tools.map(tool => {
                            return (
                                <tr key={tool.toolId}>
                                    <td className={styles.searchResultTableData}>
                                        <div>
                                            <img src={tool.imageUrl} alt={tool.name}
                                                 className={styles.searchResultTableDataPhoto}/>
                                        </div>

                                        <div>
                                            {tool.name}
                                        </div>

                                    </td>
                                    <td className={styles.searchResultTableDataName}>{tool.description || "---"}</td>
                                    <td className={styles.searchResultTableDataDescription}>{tool.toolState.description || "---"}</td>
                                    <td className={styles.searchResultTableData}>
                                        <Link to={"/tool/get/" + tool.toolId}>
                                            <button
                                                className={styles.searchResultCheckToolButton}>Sprawdź! <FontAwesomeIcon
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

export default SearchResult;