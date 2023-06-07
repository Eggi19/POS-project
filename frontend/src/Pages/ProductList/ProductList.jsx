import { useEffect, useState } from "react"
import { getAllProducts } from "../../API/productAPI"
import FilterBar from "../../Components/FilterBar/FilterBar"
import ProductCard from "../../Components/ProductCard/ProductCard"
import PaginationControlled from "../../Components/Pagination/Pagination"

export default function ProductList() {
    const [products, setProducts] = useState()
    const [page, setPage] = useState(1)
    const [category, setCategoryValue] = useState(0)
    const [search, setSearchValue] = useState("")
    const [sort, setSortValue] = useState(null)
    const [nameSort, setNameSort] = useState(0)

    const data = async () => {
        try {
            console.log('page', page)
            const response = await getAllProducts(page, category, search, sort, nameSort)
            setProducts(response)
            console.log(response)
        } catch (error) {

        }
    }
    const setPagination = (event, value) => {
        setPage(value)
        console.log('page1', value)
    }
    const setCategory = (data) => {
        if (typeof (data) === "number") {
            setCategoryValue(data)
            console.log(typeof (data))
        }
    }
    const setSearch = (data) => {
        setSearchValue(data)
        console.log(data)
    }
    const setSort = (data, nameSort) => {
        setSortValue(data)
        setNameSort(nameSort)
    }

    useEffect(() => {
        data()
    }, [page, category, search, sort])

    return (
        <>
            <div className=" relative h-full justify-items-center ">
                <FilterBar setCategory={setCategory} setSearch={setSearch} setSort={setSort} />
                <div className="grid grid-cols-2 md:grid-cols-4 landscape:md:grid-cols-5 p-2 justify-items-center">
                    {products?.data?.data?.map((value, index) => {
                        return (
                            <div className="p-3" key={`p${index}`}>
                                <ProductCard data={value} />
                            </div>
                        )
                    })}
                </div>
                <div className="p-5">
                    <PaginationControlled handlePagination={setPagination} />
                </div>
            </div>
        </>
    )
}
