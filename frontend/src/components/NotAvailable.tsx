import { Link } from "react-router-dom"
import PageNotFound from "../images/notFound1.png"

export default function NotAvailable() {
    return (
        <div>
            <Link to="/">
                <button className="buttonStyle3 darkColor">Back</button>
            </Link>
            <div className="mt-[35%] sm:mt-8 block m-auto sm:w-[500px] sm:h-[500px]">
                <img src={PageNotFound} alt="" className="" />
            </div>
        </div>

    )
}
