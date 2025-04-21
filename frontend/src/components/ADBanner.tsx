import { AdBannerConfig } from "../config/ADBannerConfig"

export default function ADBanner() {
  const ADResponse = AdBannerConfig

  return (
    <div>
      <h1 className="lgHeading">We Make A Difference </h1>

      <div className="sm:flex sm:justify-between container customerContainer">
        {ADResponse.map((item, index) => (
          <div key={index} className="sm:w-1/3 m-5 text-center flex flex-col items-center">
            <div className="w-38 h-38 flex items-center justify-center rounded-full border-4 text-3xl font-bold darkColor">
              {item.figure}
            </div>
            <p className="mdHead mt-5">{item.title}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
