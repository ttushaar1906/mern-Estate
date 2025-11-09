import Unavailable from "../images/notFound1.png"

export default function ViewOnMap() {
    return (
        <div className="">
            <img src={Unavailable} alt="currently_not_available" className="w-[400px] h-[400px] block mx-auto" />
            <h1 className="text-center text-xl font-bold">This Feature is under develop</h1>
        </div>
    )
}
