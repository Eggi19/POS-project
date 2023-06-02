import ProductCard from "../../Components/ProductCard/ProductCard"

export default function ProductList() {
    const arr = [
        {
            name: "nasi 1",
            imageURL: "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230209083509073564/detail/menueditor_item_d66bd304cb75454496e9c050bf60552c_1675939095467014639.webp",
            price: 11000
        },
        {
            name: "nasi 2",
            imageURL: "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230209083509073564/detail/menueditor_item_d66bd304cb75454496e9c050bf60552c_1675939095467014639.webp",
            price: 12000
        },
        {
            name: "nasi 3",
            imageURL: "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230209083509073564/detail/menueditor_item_d66bd304cb75454496e9c050bf60552c_1675939095467014639.webp",
            price: 13000
        },
        {
            name: "nasi 4",
            imageURL: "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230209083509073564/detail/menueditor_item_d66bd304cb75454496e9c050bf60552c_1675939095467014639.webp",
            price: 14000
        },
        {
            name: "nasi 5",
            imageURL: "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/IDITE20230209083509073564/detail/menueditor_item_d66bd304cb75454496e9c050bf60552c_1675939095467014639.webp",
            price: 15000
        }
    ]

    return (
        <>
            <div className="grid grid-cols-2 p-2 justify-items-center">
                {arr.map((value, index) => {
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
