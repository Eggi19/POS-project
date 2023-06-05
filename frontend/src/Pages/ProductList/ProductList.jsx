import { useEffect, useState } from "react"
import { getAllProducts } from "../../API/productAPI"
import FilterBar from "../../Components/FilterBar/FilterBar"
import ProductCard from "../../Components/ProductCard/ProductCard"


export default function ProductList() {
    const [products, setProducts] = useState()
    const data = async () => {
        try {
            const response = await getAllProducts()
            setProducts(response)
            console.log(response)

        } catch (error) {

        }
    }


    useEffect(() => {
        data()
    }, [])
    return (
        <>
            <FilterBar />
            <div className="grid grid-cols-2 md:grid-cols-4 landscape:md:grid-cols-6 p-2 justify-items-center">
                {products?.data?.data?.map((value, index) => {
                    return (
                        <div className="p-2" key={`p${index}`}>
                            <ProductCard data={value} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
