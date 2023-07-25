import { useState } from "react"

function Login() {
    const [ToggleLogin, setToggleLogin] = useState(false)
    return (
        <section className="h-[calc(100vh-35vh)] w-[calc(100dvw-70dvw)] md:min-h-[200px] md:top-48 absolute top-[calc(100dvh-80dvh)] left-[calc(100dvw-65dvw)] flex justify-center items-center">
            <div className={`${ToggleLogin ? 'opacity-100 z-50' : 'rotate-6 z-40 animate-shuffle sm:right-0'}
                 duration-1000 w-[calc(100dvh-60dvh)] h-max p-6 shadow-lg  flex flex-col gap-10 absolute md:w-full bg-white`}>
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <input className=" border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#fca223]" type="text" placeholder="Username" />
                <input className=" border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#fca223]" type="text" placeholder="Email" />
                <input className=" border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#fca223]" type="password" placeholder="Password" />
                <p className="cursor-pointer">Forgot Password</p>
                <button className="bg-gradient-to-r from-[#fca223] via-[#fdbf24] to-[#f9da8b] text-white font-bold py-2 rounded-md">Sign Up</button>
                <p className="text-sm text-gray-500 md:text-xs lg:text-sm">Already have an account? <span className="text-[#fca223] cursor-pointer" onClick={() => setToggleLogin(!ToggleLogin)}>Sign In</span></p>
            </div>
            <div className={`${ToggleLogin ? 'rotate-6 z-40 animate-shuffle sm:right-0' : ' opacity-100 z-50'}
                 duration-1000 w-[calc(100dvh-60dvh)] h-max p-6 py-14 shadow-lg flex flex-col gap-10 absolute  md:w-full  bg-white`}>
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <input className=" border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#fca223]" type="text" placeholder="Username" />
                <input className=" border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#fca223]" type="password" placeholder="Password" />
                <p className="cursor-pointer">Forgot Password</p>
                <button className="bg-gradient-to-r from-[#fca223] via-[#fdbf24] to-[#f9da8b] text-white font-bold py-2 rounded-md">Login</button>
                <p className="text-sm text-gray-500 md:text-xs lg:text-sm">Don't have an account? <span className="text-[#fca223] cursor-pointer" onClick={() => setToggleLogin(!ToggleLogin)}>Sign Up</span></p>
            </div>
        </section>
    )
}

export default Login



