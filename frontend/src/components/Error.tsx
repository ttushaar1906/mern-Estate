import NotFound from "../images/notFound3.png"
interface ErrorProps {
  message?: string;
}

export default function Error({ message = "Something went wrong" }: ErrorProps) {
  return (
    <div className="customeContainer">
        <img src={NotFound} alt="notFound" className=" object-cover block m-auto w-[400px] h-[400px]"/>
        <p className="text-xl font-semibold text-center my-4 text-slate-700">{message}</p>
    </div>
  )
}
