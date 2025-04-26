import { Spin } from "antd";


export default function Loading() {
    return (
        <div className="customeContainer h-screen flex justify-center items-center ">
            <Spin size="large" />
        </div>
    )
}
