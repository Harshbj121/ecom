/* eslint-disable react/prop-types */
import Card from './Card';
import "./Body.css"
// import { products } from '../utilities/mockData'
import { useEffect, useState } from 'react';
import axios from "axios"
import { API_BASE_URL } from '../config';

const Body = () => {
    const [searchText, setsearchText] = useState('')
    const [products, setProduct] = useState([])
    const [filterProduct, setFilterProduct] = useState(products);

    function searchProducts(event) {
        event.preventDefault()
        const filteredProduct = products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase()))
        setFilterProduct(filteredProduct)
        console.log(filteredProduct)
    }
    console.log("products",products)
    console.log("filterProduct",filterProduct)

    const fetchPost = () => {
        axios.get(`${API_BASE_URL}/api/allproduct`,)
            .then((result) => {
                if (result && result.data && result.data.product) {
                    setProduct(result.data.product);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilterProduct(filteredProducts);
    }, [products, searchText]);

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <>
            <div className="searchProduct">
                <form id="search-product" style={{ display: 'flex' , flexDirection:'row'}} className='mb-1 mt-1' onSubmit={searchProducts}>
                    <input type="search" className="item-search"
                        placeholder="Product name, Category name , etc"
                        onChange={e => setsearchText(e.target.value)} />
                    <button type="submit" className="item-search-button" >Search</button>
                </form>
            </div>
            <div className="container1">
                <h1 className="text-center">Ecommerce</h1>
                <p className="text-center">Welcome to my Site</p>
            </div>
            <div>
                <h1 className="text-center">Featured Products</h1>
                <div className="home-body">
                    {filterProduct.length > 0 ? (
                        filterProduct.map((item) => (
                            <Card key={item._id} product={item} />
                        ))
                    ) : (
                        <p className="text-center">No products found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Body