import { createContext, useState } from 'react'
import type { CartItem } from '../types/cart'

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: CartItem['product']) => void
}

export const CartContext = createContext<CartContextType | undefined>(
    undefined
)

type CartProviderProps = {
    children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToCart = (product: CartItem['product']) => {
        setCartItems((currentItems) => [
            ...currentItems,
            {
                product,
                quantity: 1,
            },
        ])
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}