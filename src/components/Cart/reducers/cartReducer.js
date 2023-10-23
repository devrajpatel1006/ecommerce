import { ADD_ITEM, DELETE_ITEM ,SEARCH_ITEM} from "../actionTypes/actionTypes";

const initialState = {
  numOfItems: 0,
  product:[],
  search: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
        const isProductExist = state.product.find((item) => item.id === action.payload.id);
        if(isProductExist){
            return {
                ...state,
                numOfItems: state.numOfItems + 1,
                product: state.product.map((item) => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })
            }
        }
        else{
            return {
                ...state,
                numOfItems: state.numOfItems + 1,
                product: [...state.product, {...action.payload,quantity:1}]
            }
        }   
    
      

    case DELETE_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems - action.payload.quantity,
        product: state.product.filter((item) => item.id !== action.payload.id )
    
      };

    case SEARCH_ITEM:
      return {
        ...state,
        search: action.payload,
      };
    
    default:
      return state;
  }
};

export default cartReducer;
