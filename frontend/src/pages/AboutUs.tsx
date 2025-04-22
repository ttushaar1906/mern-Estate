import { AboutConfig, LeaderShipTeamConfig, MissionConfig, StoryConfig } from "../config/AboutConfig";
import AboutUsImage from "../images/AboutUs.jpg";

export default function AboutUs() {
    return (
        <div className="container customeContainer">
            <div className="block text-center sm:flex items-center justify-center p-4">
                <div className="mt-8 sm:mt-0 sm:w-1/2">
                    <h1 className="lgHeading py-2 ">
                        About FindStay
                    </h1>
                    <p className="py-2">Your trusted partner in finding the perfect place to call home.</p>
                </div>
                <div className=" w-1/2 block m-auto">
                    <img src={AboutUsImage} alt="About Us" className="mix-blend-multiply w-full object-cover sm:h-[400px] sm:w-[400px] block m-auto" />
                </div>
            </div>


            <div className="mt-8">
                <h1 className="lgHeading">
                    Our Mission
                </h1>
                {MissionConfig.map((mission) => (
                    <p className="paraStyle"> {mission.desc} </p>
                ))}
            </div>

            <div className="block mt-8">
                <h1 className="lgHeading">Our Story</h1>
                {StoryConfig.map((story) => (
                    <p className="paraStyle">{story.desc}</p>
                ))}

                <div className="block sm:flex justify-evenly items-center p-4 rounded-lg ">
                    {AboutConfig.map((about) => (
                        <div className="">
                            <img src={about.img} alt={about.img} className="smallImg" />
                            <h2 className="mdHead">{about.heading}</h2>
                            <p className="paraStyle">{about.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="">
                <h1 className="lgHeading mt-8 p-2">
                    Meet Our Leadership Team
                </h1>
                <p className="smStyle">
                    The passionate individuals who drive our mission forward.
                </p>

                <div className="block mt-4 sm:flex justify-evenly">
                    {LeaderShipTeamConfig.map((leader) => (
                        <div className="flex flex-col justify-between items-center mt-2">
                            <img src={leader.img} alt={leader.img} className="sm:w-56 sm:h-56 w-34 h-34 flex items-center justify-center rounded-full " />                            {/* </div> */}
                            <p className="mdHead">{leader.name}</p>
                            <p className="text-center darkColor">{leader.position}</p>
                            <p className="paraStyle">{leader.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
