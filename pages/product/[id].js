import ProductDetails from '@/components/ProductDetails';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function ProductDetailsPage({product}){
    return <ProductDetails  product={product}/>;
}

export async function getStaticPaths() {
    // Fetch all product IDs from your API
    const response = await axios.get(`https://ecommerce-knol.onrender.com/api/products/prodIds`);
    console.log(response.data);
    const products = response.data;
  
    // Generate paths for all products
    const paths = products.map((product) => ({
      params: { id: product.toString() },
    }));
  
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    // Fetch product details based on the ID
    const response = await axios.get(`https://ecommerce-knol.onrender.com/api/products/${params.id}`);
    const product = response.data;
  
    return {
      props: {
        product,
      },
    };
  }