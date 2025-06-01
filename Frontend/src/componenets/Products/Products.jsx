import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Products() {

    const [product, setProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(product ? product.variants[0] : "Black");
    const [selectedSize, setSelectedSize] = useState(product?product.sizes[0] : "6");
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const handleVariantChange = (e) => setSelectedVariant(e.target.value);
    const handleSizeChange = (e) => setSelectedSize(e.target.value);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                console.log("API response:", response.data);
                setProduct(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        console.log('Updated product:', product);
    }, [product]);

    const handleBuyNow = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/product', {
        productId: product._id,
        title: product.title,
        selectedVariant,
        selectedSize,
        quantity,
        price: product.price,
        imageUrl: product.imageUrl,
      });

      console.log("Order placed successfully:", response.data);
      navigate("/checkout", { state: response.data });
      
    } catch (error) {
      console.error("Error while buying:", error);
    }
  };



    if (!product) {
        return <div>Loading product...</div>;
    }

    return (
        <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden align-center rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={product ? product.imageUrl : ''} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
                <p className="text-sm mt-1 mb-3 text-gray-600">{product.description}</p>

                <div className="flex space-x-4 mb-3">
                    <div className="flex-1">
                        <label htmlFor="variant" className="block text-sm font-bold text-gray-900">
                            Variant
                        </label>
                        <select
                            id="variant"
                            value={selectedVariant}
                            onChange={handleVariantChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            {product.variants.map((variant) => (
                                <option key={variant} value={variant}>
                                    {variant}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="size" className="block text-sm font-bold   text-gray-900">
                            Size
                        </label>
                        <select
                            id="size"
                            value={selectedSize}
                            onChange={handleSizeChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex items-center space-x-2">
                    <label className="font-bold"> Select Quantity</label>
                    <button
                        onClick={decrement}
                        className="w-8 h-8 rounded border border-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-200"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>

                    <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="w-12 text-center border border-gray-300 rounded"
                    />

                    <button
                        onClick={increment}
                        className="w-8 h-8 rounded border border-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-200"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">Rs.{product ? product.price : 0}</span>
                        <span class="text-sm text-slate-900 line-through">Rs.{Math.floor(((product ? product.price : 0) * 100) / 61)}</span>
                    </p>

                </div>
                <button 
                    onClick={handleBuyNow}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">

                    Buy Now
                </button>
            </div>
        </div>

    );
}
