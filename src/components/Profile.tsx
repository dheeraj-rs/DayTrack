import React, { useEffect, useState } from 'react';
import Login from './Login';
import ReactAudioPlayer from 'react-audio-player';
import useradd from '../assets/user.png';

const Profile: React.FC = () => {
    const [LoginToggle, setLoginToggle] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [isAM, setIsAM] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
            setIsAM(now.getHours() < 12);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="md:min-w-[calc(100vw-75vw)]  max-w-full p-5 xl:p-14 text-[#47425b] md:order-3 ">
            {LoginToggle ? (
                <section
                    className={`h-[100vh] w-[100vw]  backdrop-blur-[2px] absolute left-0 top-0 z-30`}
                    onClick={() => setLoginToggle(!LoginToggle)}
                ></section>
            ) : (
                ''
            )}
            {LoginToggle ? <Login /> : ''}
            <div className="flex gap-3 items-center justify-between">
                <div>
                    <p className="font-semibold text-2xl tracking-wide md:text-base lg:text-2xl   ">Dheeraj R S</p>
                    <p className="text-lg font-bold text-[#f5bd6c] md:text-xs lg:text-base">My settings</p>
                </div>
                <span
                    className="w-14 h-14 logobox overflow-hidden md:w-10 md:h-10 lg:w-16 lg:h-16"
                    onClick={() => setLoginToggle(!LoginToggle)}
                >
                    <img
                        src="https://www.latest-hairstyles.com/wp-content/uploads/pompadour-haircut-1x1-1.jpg"
                        alt="img"
                        className="w-full h-full object-cover"
                    />
                </span>
            </div>

            <div className="w-full rounded-xl mt-14 2xl:mt-28 p-5 bg-[#f9fbfd] flex flex-col items-center order-3 sm:order-3 ">
                <div className="text-end w-full">
                    <span className="material-symbols-outlined text-[#e2e4e8] text-lg ">menu</span>
                </div>
                <span className="w-full flex items-center gap-5 pb-5 pl-3 md:gap-2 lg:gap-5">
                    <img
                        src="https://i.scdn.co/image/ab67616d0000b27399fed8fbd66365974c7fdfb3"
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover md:w-8 md:h-8 lg:w-12 lg:h-12  "
                    />
                    <span>
                        <h1 className="text-xl font-bold md:text-base ">Godzilla</h1>
                        <p className="text-sm font-semibold md:text-xs">Eminem</p>
                    </span>
                </span>
                <ReactAudioPlayer
                    src="my_audio_file.ogg"
                    autoPlay
                    controls
                    className="w-full bg-[#F0F3F4] rounded-lg z-0 md:h-10 lg:h-14 2xl:h-20 "
                />
            </div>

            <div className="rounded-xl mt-5 p-5 bg-[#f9fbfd] ">
                <div className="text-end w-full">
                    <span className="material-symbols-outlined text-[#e2e4e8] text-lg ">menu</span>
                </div>
                <h1 className="text-3xl tracking-wider md:text-xl lg:text-3xl ">
                    {currentTime} {isAM ? 'AM' : 'PM'}
                </h1>

                <span className="flex items-center ">
                    <picture className="w-6 h-6 text-xl md:text-sm lg:text-lg ">🌤️</picture>
                    <p className="text-sm text-[#888596] md:text-[8px] lg:text-xs  ">Now is almost Sunny</p>
                </span>
            </div>

            <div className="rounded-xl h-max mt-5 p-5 pb-0 bg-[#f9fbfd]">
                <div className="text-end w-full">
                    <span className="material-symbols-outlined text-[#e2e4e8] text-lg ">close</span>
                </div>
                <div className="">
                    <h1 className="font-semibold text-lg leading-6 ">Unleash the freelance super power</h1>
                    <p className="pt-5 text-xs ">unlimited task, premium feature and much more</p>
                </div>
                <div className="flex items-end gap-5 mt-3 md:gap-0 lg:gap-5 ">
                    <img src={useradd} alt="" className="sm:w-28 h-24 md:w-20  " />
                    <div className="bg-[#f5bd6c] w-10 h-10 rounded-xl flex items-center justify-center mb-5  ">
                        <span className="material-symbols-outlined rounded-full text-lg md:text-sm ">arrow_forward</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
