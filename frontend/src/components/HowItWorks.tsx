import { AiOutlineSearch, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
export default function HowItWorks() {
    return (
        <div>
            <section className="py-10 md:py-16 rounded-lg">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">
                        How It Works
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Whether you're buying, selling, or renting, we make it easy to find your perfect place
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-800 darkColor rounded-full flex items-center justify-center mx-auto mb-4">
                                <AiOutlineSearch size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-600">Search Properties</h3>
                            <p className="text-gray-600">
                                Browse thousands of listings with detailed filters to find your ideal home
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-800 darkColor rounded-full flex items-center justify-center mx-auto mb-4">
                                <AiOutlineHome size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-600  mb-2">Tour Homes</h3>
                            <p className="text-gray-600">
                                Schedule viewings online and tour homes in-person or virtually
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-800 darkColor rounded-full flex items-center justify-center mx-auto mb-4">
                                <AiOutlineUser size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-600">Work With Agents</h3>
                            <p className="text-slate-700">
                                Connect with expert agents who will guide you through the entire process
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
