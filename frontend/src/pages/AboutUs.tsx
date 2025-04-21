import { AboutConfig, LeaderShipTeamConfig, MissionConfig, StoryConfig } from "../config/AboutConfig";
import AboutUsImage from "../images/AboutUs.jpg";

export default function AboutUs() {
    return (
        <div className="container customerContainer">
            <div className="block text-center sm:flex items-center justify-center p-4">
                <div className="sm:w-1/3">
                    <h1 className="lgHeading">
                        About Name
                    </h1>
                    <p>Your trusted partner in finding the perfect place to call home.</p>
                </div>
                <div className="w-2/3 block m-auto">
                    <img src={AboutUsImage} alt="About Us" className="mix-blend-multiply w-full object-cover" />
                </div>
            </div>


            <div>
                <h1 className="lgHeading">
                    Our Mission
                </h1>
                {MissionConfig.map((mission) => (
                    <p className="paraStyle"> {mission.desc} </p>
                ))}
            </div>

            <div className="block">
                <h1 className="lgHeading">Our Story</h1>
                {StoryConfig.map((story) => (
                    <p className="paraStyle">{story.desc}</p>
                ))}

                <img src="" alt="" />
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
                <h1 className="lgHeading mt-4 p-2">
                    Meet Our Leadership Team
                </h1>
                <p className="smStyle">
                    The passionate individuals who drive our mission forward.
                </p>

                <div className="block mt-4 sm:flex justify-evenly">
                    {LeaderShipTeamConfig.map((leader) => (
                        <div className="flex flex-col justify-between items-center mt-2">
                            <img src={leader.img} alt={leader.img} className="sm:w-80 sm:h-80 w-38 h-38 flex items-center justify-center rounded-full border-2" />                            {/* </div> */}
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
