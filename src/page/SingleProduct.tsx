import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  if (!product) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={product.thumbnail} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>{product.description}</p>
        <p>Price : {product.price} $</p>
        <p>Category : {product.category} </p>
        <div className="card-actions justify-end">
          <div>
            <div className="flex gap-7 items-center text-white">
              <button onClick={decrement} className="text-red-500 text-4xl">
                -
              </button>
              <span className="text-3xl text-black">{count}</span>
              <button onClick={increment} className="text-green-500 text-3xl">
                +
              </button>
            </div>
          </div>
          <Link to={"/"} className="btn btn-primary">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
