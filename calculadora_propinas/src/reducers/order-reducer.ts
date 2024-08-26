import { MenuItem, OrderItem } from "../types"


export type OrderAction = 
    {type: 'add-item', payload: {item: MenuItem}} |
    {type: 'remove-item', payload: {id: MenuItem['id']}} |
    {type: 'place-order'} |
    {type: 'add-tip', payload: {value: number}}

export type OrderState = {
    order: OrderItem[],
    tip: number
}


export const InitialState: OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (state: OrderState = InitialState, action: OrderAction) => {

    if(action.type === 'add-item') {

        const ifItemExist = state.order.find(item => item.id === action.payload.item.id)

        let updatedOrder: OrderItem[] = []

        if(ifItemExist) {
            updatedOrder = state.order.map(item => {
                if(item.id === action.payload.item.id) {
                    if(item.quantity) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: OrderItem = {...action.payload.item, quantity: 1}
            updatedOrder = [...state.order, newItem]
        }

        return {
            ...state,
            order: updatedOrder
        }
    }

    
    if(action.type === 'remove-item') {

        const updatedOrder = state.order.filter(item => item.id !== action.payload.id)

        return {
            ...state,
            order: updatedOrder
        }
    }

    
    if(action.type === 'place-order') {

        return {
            ...state,
            order: [],
            tip: 0
        }
    }

    
    if(action.type === 'add-tip') {

        const tip = action.payload.value

        return {
            ...state,
            tip
        }
    }






    return state
}
