export default function ProductCard(props) {
    console.log(props)

    return (
        <>
            <div className="w-28 text-sm p-2 border border-gray-500">
                <img src={props.data?.imageURL} alt={"not found"} />
                <div className="pt-2"> {props.data?.name}</div>
                <div className="pt-2"> {`Rp. ${props.data?.price.toLocaleString()}`}</div>
            </div>
        </>
    )
}
