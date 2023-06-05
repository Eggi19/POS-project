import { useEffect, useState } from "react"
import { getAllProducts } from "../../API/productAPI"
import FilterBar from "../../Components/FilterBar/FilterBar"
import ProductCard from "../../Components/ProductCard/ProductCard"
import PaginationControlled from "../../Components/Pagination/Pagination"

export default function ProductList() {
    const [products, setProducts] = useState()
    const [page, setPage] = useState(1)

    const data = async () => {
        try {
            console.log('page', page)
            const response = await getAllProducts(page)
            setProducts(response)
            console.log(response)
        } catch (error) {

        }
    }
    const setPagination = (event, value) => {
        setPage(value)
        console.log('page1', value)
    }

    useEffect(() => {
        data()
    }, [page])

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
            <PaginationControlled  handlePagination={setPagination} />
        </>
    )
}
