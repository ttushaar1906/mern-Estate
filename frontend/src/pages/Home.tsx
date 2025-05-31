import ADBanner from "../components/ADBanner";
import HowItWorks from "../components/HowItWorks";
import ListProp from "../components/ListProp";
import WalletFriendlySection from "../components/WalletFriendlySection";
import HomeBanner from "../images/bannerImg.png"

export default function Home() {

  return (
    <div>
      <div className="w-full">
        <img src={HomeBanner} alt="Home Banner" className="w-full h-auto object-cover" />
      </div>


      <div className="customeContainer">
        <section className="my-6 ">
          <h2 className="lgHeading mb-2">Wallet-Friendly Finds</h2>
          <WalletFriendlySection />
        </section>
        <ADBanner />
        <HowItWorks />
        <ListProp />
      </div>
    </div>

  );
}
