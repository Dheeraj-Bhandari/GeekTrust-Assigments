
// Cart Reducer to Manage the Cart Items


const cartReducer = (state, action) => {

    // -----------Add To Cart Reducer Start-----------
    if(action.type==='ADD_TO_CART'){
        let {id, color, price, ele} = action.payload;
        let cartProduct;
  
        // If Product Already exsist update Qty only Function Start
        let alreadyExistProduct = state.cart.find((ele)=>ele.id == id + color)
        
    // If Product is Already in Cart we will update only qty of That Product 
    if(alreadyExistProduct){
            let updatedProduct = state.cart.map((Curele)=>{
                // Checking Product with ID
                if(Curele.id=== id+color){
                    let newQty = Curele.qty + 1
                   
                    if(newQty>=Curele.quantity){
                        newQty = Curele.quantity
                        // Checking if Qty of Product is More the Available Quantity Then Showing Alert to User
                        if(Curele.quantity == Curele.qty){
                            
                            alert("Item Qty Reached")
                        }
                    }
                    return {
                        ...Curele,
                        qty:newQty
                    }
                }
                else{
                    return Curele;
                }
            
            })

            return {
                ...state, 
                cart:updatedProduct,
    }}
    //  If Product is Not already present in Cart then Adding it as New Obj
    else if(ele.quantity>0) { cartProduct ={
                    id : id + color,
                    name : ele.name,
                    color,
                    price,
                    image : ele.imageURL,
                    quantity : ele.quantity,
                    qty:1
        
        
                }
                return {
                    ...state, 
                    cart:[...state.cart, cartProduct],
                }}
            }
    // ----------Add To Cart Reducer Start End-------------


   //  -------Increase Product Quantity Reducer Start----------
    if(action.type==="INCREASE_QTY"){
        let updatedProduct = state.cart.map((ele)=>{
            if(ele.id===action.payload){
                let incQty = ele.qty + 1;

                // If Qty of Product Reach to Maximum Available Quantity Then Showing Alert to User
                if(incQty>ele.quantity){
                    incQty=ele.quantity;
                    alert("Qty Limit Reached")
                }
                return {
                    ...ele,
                    qty : incQty
                }
            }
            else{
                return ele;
            }
        })

        return {
            ...state, 
            cart: updatedProduct
        }
    }
    // ------Increase Product Quantity Reducer End-----------

    //  ---------Decrease Product Quantity Reducer Start--------
    if(action.type==="DECREASE_QTY"){
        let updatedProduct = state.cart.map((ele)=>{
            if(ele.id===action.payload){
                let decQty = ele.qty - 1;

                // Checking if User trying to reduce Qty of Product less then 1 
                if(decQty<=1)decQty=1;
                return {
                    ...ele,
                    qty : decQty
                }
            }
            else{
                return ele;
            }
        })

        return {
            ...state, 
            cart: updatedProduct
        }
    }
    //  ----------Decrease Product Quantity Reducer End----------


    //  ---------------Cart-SubTotal and Total Qty of Item Reducer Start-------------
    if(action.type==="CART_SUBTOTAL_AND_ITEM_QTY"){
        // Passing two paramerter in Reducer Function to follow DRY principal
      
        let {total_amount , total_item} = state.cart.reduce((accu, ele)=>{
            let {qty, price} = ele;

            accu.total_amount += price * qty;
            accu.total_item += qty;

            return accu;
        }, {total_amount : 0, total_item:0})

        return{
            ...state,
            total_amount,
            total_item
        }
    }
    // ---------------Cart-SubTotal and Total Qty of Item Reducer End-------------

    //  --------Remove Item From Cart Reducer Start----------
    if(action.type==="REMOVE_CART_ITEM"){
        let UpdatedCartItem = state.cart.filter((ele)=>
        ele.id!==action.payload
        )
       
        return {
            ...state,
            cart:UpdatedCartItem,
        }
    }
    //  --------Remove  Item From Cart Reducer End----------

    
    //  --------Remove  All Item From Cart Reducer Start----------
    if(action.type==="CLEAR_ALL_CART"){
        
        return {
            ...state,
            cart:[],
        }
    }
    //  --------Remove All  Item From Cart Reducer End----------
    


  return state
}

export default cartReducer