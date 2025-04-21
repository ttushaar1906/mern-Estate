import { AboutUsInt, LeaderShipTeam, StoryInt } from "../interfaces/AboutUsInt";
import TrustImg from "../images/Trust.png"

export const AboutConfig: AboutUsInt[] = [
  {
    img: TrustImg,
    heading: "Trust & Transparency",
    desc: "We believe in being completely transparent with our listings and services. Every property on our platform undergoes verification to ensure accuracy.",
  },
  {
    img: "",
    heading: "Innovation",
    desc: "We continuously improve our platform with advanced search tools, virtual tours, and instant communication features that make property hunting efficient.",
  },
  {
    img: "",
    heading: "Customer-First",
    desc: "Our dedicated team of property experts is always available to provide personalized support throughout your property journey.",
  },
];

export const LeaderShipTeamConfig: LeaderShipTeam[] = [
  {
    img: "",
    name: "Lorem",
    position: "CEO & Founder",
    desc: "With 15+ years in real estate, Sarah leads our vision for transforming property experiences.",
  },
  {
    img: "",
    name: "Lorem",
    position: "CTO",
    desc: "Michael brings technical innovation to our platform, leading our development team.",
  },
  {
    img: "",
    name: "Lorem",
    position: "Head of Customer Experience",
    desc: "Amelia ensures every client receives exceptional service throughout their property journey.",
  },
];

export const StoryConfig: StoryInt[] = [
  {
    desc: "Founded in 2018, PropertyFinder began with a simple vision: to transform the traditional real estate experience into something more transparent, efficient, and customer-focused.",
  },
  {
    desc: "What started as a small team of real estate enthusiasts has grown into a nationwide platform connecting thousands of property seekers with their dream homes every month.",
  },
];

export const MissionConfig : StoryInt[]= [
    {
        desc:"At PropertyFinder, we're dedicated to simplifying the process of finding and securing your dream property. Whether you're looking to rent, buy, or sell, we provide a seamless platform that connects property seekers with the perfect spaces."
    }
]