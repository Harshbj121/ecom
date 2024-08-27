import { useParams } from "react-router-dom"
import { products } from "../utilities/mockData";
import Card from "./Card";

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find(item => item.id == id)

    console.log(product)
    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <>
            <div>ProductDetails</div>
            <Card product={product} />
        </>
    )
}

export default ProductDetails