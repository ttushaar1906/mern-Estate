import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold py-7 text-center">Profile</h1>
      <form className="flex flex-col border gap-4">
        <img  src={currentUser.avatar} alt="profilePic" className="h-24 object-cover w-24 rounded-full self-center mt-2" />
        <input type="text" className="p-4 border mt-4 rounded-lg" id="username" placeholder="username" />
        <input type="email" className="p-4 border mt-4 rounded-lg" id="email" placeholder="email" />
        <input type="password" className="p-4 border mt-4 rounded-lg" id="password" placeholder="password" />
        <button className="bg-secondary-color text-primary-color p-4 font-bold rounded-lg disabled:opacity-80 hover:opacity-95">Update</button>
      </form>
      <div className="flex justify-between p-2">
        <p className="text-red font-medium">Delete account</p>
        <p className="text-red font-medium">Sign out</p>
      </div>
    </div>
  )
}
