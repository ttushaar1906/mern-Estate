import NotFound from "../images/notFound3.png"
export default function Error() {
  return (
    <div className="customeContainer">
        <img src={NotFound} alt="notFound" className=" object-cover block m-auto w-[400px] h-[400px]"/>
    </div>
  )
}
