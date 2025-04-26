import { HowItWorksInt } from "../interfaces/HowItWorkInt";
import { AiOutlineSearch, AiOutlineHome, AiOutlineUser } from "react-icons/ai";

export const HowItWorksConf: HowItWorksInt[] = [
  {
    img: <AiOutlineSearch size={28}/>,
    title: "Search Properties",
    desc: "Browse thousands of listings with detailed filters to find your ideal home",
  },
  {
    img: <AiOutlineHome size={28}/>,
    title: "Tour Homes",
    desc: "Schedule viewings online and tour homes in-person or virtually",
  },
  {
    img: <AiOutlineUser size={28}/>,
    title: "Work With Agents",
    desc: "Connect with expert agents who will guide you through the entire process",
  },
];
