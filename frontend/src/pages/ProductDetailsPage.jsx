import React, { useEffect, useState } from 'react';
import ProductDetails from '../components/Products/ProductDetails';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import useGetAllProducts from '../hooks/getAllProducts';


const ProductDetailsPage = () => {
  const [data, setData] = useState("");
  const { name } = useParams();
  const {products} = useGetAllProducts();
  const productName = name.replace(/-/g, " ");
  console.log(productName);
  console.log(products);

  useEffect(() => {
    const data = products && products.find((i) => i.name === productName);
    setData(data);
  }, [productName, products])
  console.log(data);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {
        data && <SuggestedProduct data={data} />
      }
      <Footer />
    </div>
  )
}

export default ProductDetailsPage