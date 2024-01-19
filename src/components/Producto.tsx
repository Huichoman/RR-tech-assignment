import { ProductType } from "../App"

export interface ProductProps {
    product: ProductType
    setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType>>
}

export const Producto = ({ product, setSelectedProduct }: ProductProps) => {

    const onEditProduct = () => {
        setSelectedProduct(product)
    }
    return (
        <div onClick={onEditProduct} className="bg-[#FFE4F7] mx-3 p-3 my-3 rounded-md shadow-card cursor-pointer">{product.name}</div>
    )
}
