import { createContext, useState } from 'react'
import type { CartItem } from '../types/cart'

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (product: CartItem['product']) => void
    updateQuantity: (productId: string, quantity: number) => void
    removeFromCart: (productId: string) => void
    cartCount: number
    cartSubtotal: number
}

export const CartContext = createContext<CartContextType | undefined>(
    undefined
)

type CartProviderProps = {
    children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])


    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    )

    const cartSubtotal = cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0,
    )

    const addToCart = (product: CartItem['product']) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id,
            )

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                )
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity: 1,
                },
            ]
        })
    }

    const updateQuantity = (productId: string, quantity: number) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.product.id !== productId) {
                    return item
                }

                const newQuantity = Math.min(
                    quantity,
                    item.product.stockQuantity,
                )

                return {
                    ...item,
                    quantity: newQuantity,
                }
            }),
        )
    }

    const removeFromCart = (productId: string) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId,
            ),
        )
    }


    return (

        <CartContext.Provider value={{ cartItems, addToCart, cartCount, updateQuantity, removeFromCart, cartSubtotal }}>
            {children}
        </CartContext.Provider>
    )
}