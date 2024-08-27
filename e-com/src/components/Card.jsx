/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItem } from "../utilities/cartSlice"


const Card = (props) => {

    const dispatch = useDispatch()

    const handleAddItem = (item)=>{
        dispatch(addItem(item))
        console.log(item)
    }

    return (
        <div className="card m-2">
            <img className="card-img-top" src={`http://localhost:5000/uploads/${props.product.image}`} alt="Card image cap" />
            <div className="card-body d-flex flex-column">
                <Link to={`/product/${props.product.id}`}>
                    <h5 className="card-title">{props.product.name}</h5>
                </Link>
                <h6 className="card-title">Price: {props.product.price}</h6>
                <h6 className="card-title">Ratings: {props.product.avgRating}</h6>
                <p className="card-text">{props.product.description}</p>
                <button className="btn btn-primary mt-auto" onClick={()=>handleAddItem(props.product)}><i className="fa-solid fa-cart-shopping"
                    style={{ color: "white" }}>Add To Cart</i></button>
            </div>
        </div>
    )
}

export default Card