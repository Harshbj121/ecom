import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [] };
};

const cartSlice = createSlice({
    name:"cart",
    initialState:getInitialState(),
    reducers:{
        addItem :(state , action)=>{
            const item = action.payload;
            // Check if item already exists in cart
            // const data = {...action.payload , quantity:0}
            const existingItem = state.items.find(i => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1; // Adjust as needed
            } else {
                state.items.push({ ...item, quantity: 1 }); // Adjust as needed
            }
            // Save updated state to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItem :(state , action )=>{
            const updatedItems = state.items.filter(item => item._id !== action.payload._id);
            state.items = updatedItems;
            // Save updated state to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart :(state)=>{
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
    }
})

export const {addItem , removeItem ,clearCart} = cartSlice.actions;
export default cartSlice.reducer