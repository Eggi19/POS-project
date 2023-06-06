export default function ProductCard(props) {
    // console.log(props)

    return (
        <>
            <div className="relative w-40 h-60 p-2 border-2 rounded-md border-gray-500">
                <img src={props.data?.imageURL} alt={"not found"} />
                <div className="pt-2"> {props.data?.name}</div>
                <div className="pt-2 absolute bottom-2"> {`Rp. ${props.data?.price.toLocaleString()}`}</div>
            </div>
        </>
    )
}
