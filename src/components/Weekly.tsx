import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.scss';

import { useSnapshot } from 'valtio';
import { state } from './Addform';
import { Formtype } from '../types/Formtype';

const Weekly: React.FC = () => {

    const snapshot = useSnapshot(state);

    const [calenderDate, setCalenderDate] = useState<Date | undefined>();
    const [showOption, setShowOption] = useState<boolean>(false);
    const [showForm, setShowform] = useState<boolean>(false);
    const [viewAll, setViewAll] = useState<boolean>(false);

    // pinned items toggle 
    const handleTogglePinned = (id: number) => {
        state.pinnedId = id
        state.arrData = snapshot.arrData.map((task) =>
            task.id === id ? { ...task, pinned: !task.pinned } : task
        );
    };

    // form delete button 
    const handleDelete = (id: number) => {
        state.deleteId = id
        state.arrData = snapshot.arrData.filter((todo) => todo.id !== state.deleteId);
    };

    // form Edit button 
    const handleEdit = (task: Formtype) => {
        state.formToggle = true;
        state.selectedData = task;
        setShowform(!showForm)
    };

    // Calendar date based change Todayschedule date 
    const handleCalendarChange = (date: any) => {
        setCalenderDate(date);
        state.calenderDate = date;
    };

    // covert time AM PM
    const formatTimeTo12Hour = (time: string) => {
        const [hour, minute] = time.split(":").map(Number);
        const amPM = hour >= 12 ? "PM" : "AM";
        const formattedHour = (hour % 12) || 12;
        const formattedMinute = minute.toString().padStart(2, "0");
        return `${formattedHour}:${formattedMinute} ${amPM}`;
    };

    // pinned data filter 
    const pinnedData = snapshot.arrData.filter((task) => task.pinned);

    // useEffect(() => {
    //     if (viewAll) {
    //         const pinnedData = snapshot.arrData
    //     } else {
    //         const pinnedData = snapshot.arrData.filter((task) => task.pinned);
    //     }
    // }, [viewAll])


    return (
        <section className="w-full md:w-[calc(100vw-70vw)] p-5 xl:p-14 bg-[#e7f0fa] text-[#47425b] md:order-1 relative">
            <header className="flex gap-4 items-center 2xl:gap-10">
                <span className="w-10 h-10 logobox text-lg font-extrabold flex items-center justify-center bg-[#f7d57e] text-white md:w-8 md:h-8 md:text-base lg:w-10 lg:h-10 lg:text-lg ">＋</span>
                <h1 className="font-semibold text-xl md:text-base lg:text-xl">reminder</h1>
            </header>

            <div className="py-5 mt-8 flex ">
                <h2 className="text-xl font-light md:text-base lg:text-xl ">Weekly Pinned</h2>
                <span className="flex-1"></span>
                <a className="text-xs font-bold flex items-end select-none text-[#f5bd6c] md:text-xs lg:text-sm "
                    onClick={() => setViewAll(!viewAll)}>
                    {!viewAll ? (<p>View all</p>) : (<p>View Pinned</p>)}

                </a>
            </div>

            {/* <div className={`${showForm ? 'opacity-100  right-3 transition-all duration-1000 md:hidden'
                : 'hidden '} absolute z-50 top-52  shadow-lg shadow-[#3454742a]`}>
                <Addtask />
            </div> */}

            {/* Maping container card  */}
            <main className="flex flex-col gap-5 h-80 rounded-xl overflow-y-auto lg:h-[calc(100vh-60vh)] relative">
                {pinnedData.map((task) => (
                    <div key={task.id} className={`p-5 rounded-xl shadow-sm bg-[#ffffff] relative`} onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)}>

                        {/* popup buttons  */}
                        <div className={`${showOption ? '' : 'hidden'} flex items-center absolute  top-0 right-0`}>
                            <button className={`text-xl  px-3`} onClick={() => handleTogglePinned(task.id)}>{task.pinned ? '📌' : '📍'}</button>
                            <button onClick={() => handleDelete(task.id)} className="px-3">🗑️</button>
                            <button onClick={() => handleEdit(task)} className="px-3"> 🖋️</button>
                        </div>

                        <div className="flex gap-5 md:gap-2 lg:gap-5">
                            {/* icon  */}
                            <picture className="min-w-[40px] h-10 rounded-xl flex items-center justify-center text-xl bg-[#f7d57e] md:min-w-[24px] md:h-6 md:rounded-lg lg:w-10 lg:h-10 lg:rounded-xl md:text-xs lg:text-xl">{task.icon}</picture>
                            <span>
                                <div className={`flex items-center`}>
                                    {/* title */}
                                    <h1 className="font-semibold text-base md:text-sm lg:text-lg">{task.title?.slice(0, 15)} </h1>
                                    {/* date ? */}
                                    <h2 className={`${task.personal && task.details ? 'hidden' : ''} pl-8 text-xs text-[#515151e3] md:text-xs`}>{new Date(task.date).toLocaleDateString()}</h2>
                                </div>
                                {/* date & time ? */}
                                <div className={`${task.personal && task.details ? '' : 'hidden'} text-xs text-[#515151e3] flex md:text-sm`}>
                                    <h2>{new Date(task.date).toLocaleDateString() || ''}</h2> - <h2>{formatTimeTo12Hour(task.time || '')}</h2>
                                </div>
                            </span>
                        </div>

                        <div className="pl-[60px] md:pl-8 lg:pl-[60px]">
                            {/* Personal ?  */}
                            {task.personal && (<button className="px-3 py-1 my-5 text-xs font-bold rounded-xl bg-[#f5b760] text-white">Personal</button>)}
                            {/* details ? */}
                            {task.details && task.details.length > 0 && (<ul className="list-disc list-inside text-xs">{task.details.map((detail, index) => (<li key={index} className='w-full overflow-hidden'>{detail}</li>))}</ul>)}
                        </div>
                    </div>
                ))}
            </main>
            {/* Add new weekly pin */}
            <div className="rounded-xl flex items-center gap-5 shadow-sm mt-4 p-4 bg-[#ffffff] md:gap-1 lg:gap-5 2xl:mt-10">
                <div className="w-10 h-10 rounded-xl text-lg font-extrabold flex items-center justify-center text-white bg-[#f7d57e] md:rounded-lg lg:rounded-xl md:w-8 md:h-8 md:text-sm lg:w-10 lg:h-10 lg:text-lg ">＋</div>
                <a className=" md:text-xs lg:text-lg ">Add new weekly pin</a>
            </div>
            {/* Calendar */}
            <div className='flex items-center gap-5 shadow-sm mt-8  lg:mt-5'>
                <Calendar className='react-calendar border-none md:max-h-40 overflow-y-scroll rounded-xl px-5' value={calenderDate} onChange={handleCalendarChange} />
            </div>
        </section>
    );
}

export default Weekly;
