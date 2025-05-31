import { HowItWorksConf } from "../config/HowItWorkConfig";

export default function HowItWorks() {
    return (
        <div>
            <section className="py-4 rounded-lg">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2 text-center">
                        How It Works
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Whether you're buying, selling, or renting, we make it easy to find your perfect place
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">

                        {HowItWorksConf.map((item) => (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    {item.img}
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-slate-600">{item.title}</h3>
                                <p className="text-gray-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    )
}
