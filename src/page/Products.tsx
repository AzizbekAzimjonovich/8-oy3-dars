import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="flex flex-wrap justify-between mt-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="card bg-base-100 image-full w-96 shadow-xl mb-6"
        >
          <figure>
            <img src={product.thumbnail} alt={product.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p>{product.description}</p>
            <p>Narxi: {product.price} $</p>
            <div className="card-actions justify-end">
              <Link to={`/product/${product.id}`} className="btn btn-primary">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
