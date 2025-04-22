import { AboutUsInt, LeaderShipTeam, StoryInt } from "../interfaces/AboutUsInt";
import TrustImg from "../images/Trust.png"
import Innovation from "../images/innovation.png"
import CustomerFirst from "../images/customer first.png"
import Model1 from "../images/tushar.jpeg"
import Model2 from "../images/sanket.jpeg"
import Model3 from "../images/guru.jpeg"

export const AboutConfig: AboutUsInt[] = [
  {
    img: TrustImg,
    heading: "Trust & Transparency",
    desc: "We believe in being completely transparent with our listings and services. Every property on our platform undergoes verification to ensure accuracy.",
  },
  {
    img: Innovation,
    heading: "Innovation",
    desc: "We continuously improve our platform with advanced search tools, virtual tours, and instant communication features that make property hunting efficient.",
  },
  {
    img: CustomerFirst,
    heading: "Customer-First",
    desc: "Our dedicated team of property experts is always available to provide personalized support throughout your property journey.",
  },
];

export const LeaderShipTeamConfig: LeaderShipTeam[] = [
  {
    img: Model1,
    name: "Tushar",
    position: "CEO & Founder",
    desc: "With 1+ years in real estate, Tushar leads our vision for transforming property experiences.",
  },
  {
    img: Model3,
    name: "Guru",
    position: "CTO",
    desc: "Guru brings technical innovation to our platform, leading our development team.",
  },
  {
    img: Model2,
    name: "Sanket",
    position: "Head of Customer Experience",
    desc: "Sanket ensures every client receives exceptional service throughout their property journey.",
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