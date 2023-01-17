import Navbar from "../navbar";
import Searchbar from "../searchbar";
import Returnbar from "../returnbar";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "./styles.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function Category() {
    const [data, setData] = useState([])
    const category = window.location.pathname.split('/')[3];

    const getData = async () => {
        const url = "http://localhost:8080/api/public/tool/get/category/" + category;
        await axios.get(url).then((response) => {
            setData(response.data.tools);
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Navbar/>
            <Searchbar/>
            <Returnbar/>

            <div className={styles.wrapper}>
                {data.map(tool => {
                    return (
                        <div className={styles.cell}>
                            <div className={styles.cellProperty}>
                                <img src={tool.imageUrl} alt={tool.name} className={styles.tableDataPhoto}/>
                            </div>

                            <div className={styles.cellProperty}>
                                {tool.name}
                            </div>

                            <div className={styles.cellProperty}>
                                {tool.price} PLN
                            </div>

                            <div className={styles.cellProperty}>
                                <Link to={"/tool/" + tool.toolId}>
                                    <button className={styles.checkToolButton}>Sprawdź! <FontAwesomeIcon
                                        icon={faSearch}/></button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Category;