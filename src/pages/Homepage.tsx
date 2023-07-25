import Profile from "../components/Profile"
import Today from "../components/Today"
import Weekly from "../components/Weekly"

function Homepage() {
    return (
        <div className="w-screen xl:h-screen md:flex overflow-hidden">
            <Today />
            <Weekly />
            <Profile />
        </div>
    )
}

export default Homepage