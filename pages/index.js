import { Inter } from "next/font/google";
import styles from "../styles/sidebar.module.css";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import { useDarkMode } from "@/context/DarkModeContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { state } = useDarkMode(); 
  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.productSidebar}>

        <div className={styles.poductsSide}>
          <ProductList
            search={props.search}
            category={props.category}
            sort={props.sort}
          />
        </div>

        <div className={styles.productsSidebar}>
          <SideBar
            handleSearch={props.handleSearch}
            handleSortBy={props.handleSortBy}
            handleFilterByCategory={props.handleFilterByCategory}
          />
        </div>
      </div>
    </div>
  );
}
