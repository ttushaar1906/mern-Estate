import { Link } from "react-router-dom";

export default function ListProp() {
    return (
        <div className=" p-4 mt-12 rounded-lg">
            <h1 className="lgHeading">
                Have a property to sell or rent?
            </h1>
            <p className="paraStyle text-center">
                List your property on PropertyPulse and reach thousands of potential buyers and tenants.
            </p>
            <div className="flex items-center justify-center">
                <Link to="">
                    <button className="buttonStyle">
                        List Your Property
                    </button>
                </Link>
                <Link to="/notAvailable">
                    <button className="buttonStyle3 darkColor">
                        Learn More
                    </button>
                </Link>
            </div>
        </div>
    )
}
