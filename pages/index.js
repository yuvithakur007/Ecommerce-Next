import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ProductList from "../components/ProductList"
import SideBar from "../components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <>
      {/* <Head>
        <title>Eco-Next</title>
      </Head> */}

      <div className="product-sidebar">
      <div className="poductsSide">
        <ProductList
          search={props.search}
          category={props.category}
          sort={props.sort}
        />
      </div>
      <div className="productsSidebar">
        <SideBar
          handleSearch={props.handleSearch}
          handleSortBy={props.handleSortBy}
          handleFilterByCategory={props.handleFilterByCategory}
        />
      </div>{" "}
    </div>
    </>
  );
}
