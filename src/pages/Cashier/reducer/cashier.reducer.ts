import type {CashierActionType, stateType} from "../actions/cashier.actions";

const cashierInitialState: stateType = {
  products: [],
  cart: []
}

const cashierReducer = (state: typeof cashierInitialState, action: CashierActionType) => { //El state es del mismo tipo que initial state
  switch (action.type) {
    case 'LIST_PRODUCT_MENU':
      return {
        ...state,
        products: [...action.payload],
      }
    case 'ADD_TO_CART':
      let itemInCart = state.cart.find((item) => item.product.id === action.payload.id);
      //Si el producto ya se encuentra en cart, simplemente suma una unidad, en el caso de que no exista lo agregaga al carro
      return itemInCart ?
        {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        } : {
          ...state,
          cart: [...state.cart, { product: action.payload, quantity: 1 }]
        }
    case 'REMOVE_ONE_FROM_CART':
      let itemToDelete = state.cart.find((item) => item.product.id === action.payload.id);
      return itemToDelete && itemToDelete.quantity > 1
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }
        : {
          ...state,
          cart: state.cart.filter((item) => item.product.id !== action.payload.id),
        };
    case 'REMOVE_ALL_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload.id),
      };
    case 'ADD_ONE_TO_CART':
      let itemToAdd = state.cart.find((item) => item.product.id === action.payload.id);

      return itemToAdd
        ? {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
        : {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: cashierInitialState.cart
      }
    default:
      return state;
  }
  //siempre retorna un nuevo estado
}

export {cashierReducer, cashierInitialState};
