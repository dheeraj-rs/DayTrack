import React, { useEffect, useState } from 'react';
import { subscribe, useSnapshot } from 'valtio';
import Addform, { state } from './Addform';
import { Formtype } from '../types/Formtype';

const Today: React.FC = () => {

    const snapshot = useSnapshot(state);

    const [showForm, setShowForm] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [selectDate, setSelectDate] = useState(new Date());

    // show selectDate or todayDate
    useEffect(() => {
        const calenderSelectDate = subscribe(state, () => {
            if (state.calenderDate) {
                setSelectDate(state.calenderDate);
            } else {
                setSelectDate(new Date());
            }
        });
        return () => calenderSelectDate();
    }, [state.calenderDate]);

    // Show Form Weekly edit or Today edit and add 
    useEffect(() => {
        const toggleEditbtn = subscribe(state, () => {
            if (state.formToggle) {
                setShowForm(state.formToggle);
            } else {
                setShowForm(false);
            }
        });
        return () => toggleEditbtn();
    }, [state.formToggle]);

    // pinned items toggle 
    const handleTogglePinned = (id: number) => {
        state.pinnedId = id
        state.arrData = snapshot.arrData.map((task) => task.id === id ? { ...task, pinned: !task.pinned } : task);
    };

    // form delete button 
    const handleDelete = (id: number) => {
        state.deleteId = id
        state.arrData = snapshot.arrData.filter((del) => del.id !== state.deleteId);
    };

    // form Edit button 
    const handleEdit = (task: Formtype) => {
        state.selectedData = task;
        state.formToggle = true;
    };

    // covert time AM PM
    const formatTimeTo12Hour = (time: string) => {
        const [hour, minute] = time.split(':').map(Number);
        const amPM = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = (hour % 12) || 12;
        const formattedMinute = minute.toString().padStart(2, '0');
        return `${formattedHour}:${formattedMinute} ${amPM}`;
    };

    // click date back and forward button 
    const handleChangeDate = (view: number) => {
        const changeDate = new Date(selectDate);
        changeDate.setDate(changeDate.getDate() + view);
        setSelectDate(changeDate);
    };

    // selectDate based task data showing and sorting pinned items to topside 
    const filteredData = [...snapshot.arrData].filter((task) => {
        return new Date(task.date).toLocaleDateString() === selectDate.toLocaleDateString()
    }).sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });

    return (
        <section className="w-full md:min-w-[calc(100vw-55vw)] pt-5 xl:p-14 text-[#47425b] md:order-2">
            <main className="flex min-w-max px-5 mb-12 relative ">
                <header className='w-full'>
                    <h1 className="text-3xl leading-[60px] tracking-normal md:text-2xl lg:text-4xl   ">Today's schedule</h1>
                    <aside className="flex items-center gap-4  mt-3">

                        {/* show selected Date  */}
                        <h1 className="text-3xl leading-[50px] tracking-wide text-[#f5bd6c] md:text-2xl lg:text-4xl  w-52 lg:w-64">
                            {selectDate.toLocaleDateString(undefined, {
                                weekday: 'long',
                                day: 'numeric',
                            })}
                        </h1>
                        <a className="material-symbols-outlined bg-[#edeff3] cursor-pointer select-none w-6 h-6 rounded-full text-lg font-semibold flex items-center justify-center md:text-base md:w-5 md:h-5 lg:w-6 lg:h-6 lg:text-lg "
                            onClick={() => handleChangeDate(-1)}>
                            arrow_back
                        </a>
                        <a className="material-symbols-outlined bg-[#edeff3] cursor-pointer select-none w-6 h-6 rounded-full text-lg font-semibold flex items-center justify-center md:text-base md:w-5 md:h-5 lg:w-6 lg:h-6 lg:text-lg "
                            onClick={() => handleChangeDate(+1)}>
                            arrow_forward
                        </a>
                    </aside>
                </header>
                <button
                    className="w-14 h-14 logobox text-2xl font-extrabold flex items-center justify-center cursor-pointer select-none active:bg-[#fcc22f] bg-[#f7d57e] text-white md:w-10 md:h-10 md:text-xl lg:text-2xl  lg:w-14 lg:h-14 "
                    onClick={() => setShowForm(!showForm)}
                >
                    ＋
                </button>

                {/* Show task toggle form  */}
                <div className={`${showForm ? 'opacity-100  right-0 transition-all duration-1000 '
                    : 'hidden  right-[-100px] transition-all duration-1000'} absolute z-50 top-24 shadow-lg shadow-[#3454742a]`}>
                    <Addform />
                </div>

            </main>

            <main className="h-[calc(100vh-24vh)] rounded-xl flex flex-col gap-3  overflow-y-scroll  p-5 relative ">
                {filteredData.map((task) => (
                    <div className="flex items-center gap-4 relative w-full" key={task.id}
                        onMouseEnter={() => setShowOption(true)}
                        onMouseLeave={() => setShowOption(false)}>

                        <div className={`${showOption ? '' : 'hidden'} flex items-center absolute  -top-6 right-0 w-max`}>
                            <button className={`text-lg px-3`} onClick={() => handleTogglePinned(task.id)}>
                                {task.pinned ? '📌' : '📍'}</button>
                            <button onClick={() => handleDelete(task.id)} className="px-3">🗑️</button>
                            <button onClick={() => handleEdit(task)} className="px-3">🖋️</button>
                        </div>

                        <div className={`w-full px-5 py-4  rounded-xl 2xl:p-10
                          ${task.pinned && !task.color ? 'bg-[#f7d57e] text-[#47425b]' : 'bg-[#edeff3] text-[#47425b]'}`}
                            onDoubleClick={() => setShowOption(!showOption)}>

                            <div className="flex gap-4 w-full items-center ">
                                <picture className="min-w-[40px] h-10 text-xl rounded-xl flex items-center justify-center bg-[#ffffff] l">{task.icon}</picture>
                                <h1 className="font-medium w-max md:text-lg " >{task.title?.slice(0, 15)}</h1>
                                <div className={`${task.pinned ? 'block ' : 'hidden '} left-14 top-1  text-lg`} onClick={() => handleTogglePinned(task.id)}>📌</div>
                                <span className="flex gap-3  md:gap-5 items-center justify-end w-full ">
                                    {task.time && !task.startTime && !task.endTime && (
                                        <p className=" text-sm w-max md:text-base lg:text-sm  duration-500">{formatTimeTo12Hour(task.time)}</p>
                                    )}

                                    {task.startTime && task.endTime && (
                                        <span>
                                            <p className="text-sm w-max md:text-base lg:text-sm "> {formatTimeTo12Hour(task.startTime)}</p>
                                            <p className="text-xs pl-1 2xl:pl-5 w-max  md:text-sm lg:text-xs 2xl:text-3xl">{formatTimeTo12Hour(task.endTime)}</p>
                                        </span>
                                    )}
                                </span>
                            </div>

                            <div className="pl-[60px] text-xs ">
                                {task.details?.map((detail, index) => (
                                    <li className={index < 2 ? 'list-none' : 'list-disc'} key={index}>{detail}</li>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </main>
        </section >
    )
}

export default Today
