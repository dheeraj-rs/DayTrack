import React, { useEffect, useState } from 'react';
import { Formtype } from '../types/Formtype';
import { proxy, useSnapshot } from 'valtio';

export interface Types {
    arrData: Formtype[];
    selectedData: Formtype | null;
    deleteId: number | null;
    pinnedId: number | null;
    calenderDate: Date | null;
    formToggle: boolean | null;
}

export const state = proxy<Types>({
    arrData: [],
    selectedData: null,
    deleteId: null,
    pinnedId: null,
    formToggle: false,
    calenderDate: null,
});

const Addform: React.FC = () => {
    const snapshot = useSnapshot(state);

    const [id, setAuthorid] = useState<number>(0);
    const [icon, setIcon] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [details, setDetails] = useState<string[]>([]);
    const [pinned, setPinned] = useState<boolean>(false);
    const [personal, setPersonal] = useState<boolean>(false);
    const [color, setColor] = useState<string>('');
    const [date, setDate] = useState('');

    const generateNewID = () => {
        const oldID = snapshot.arrData.map((task) => task.id);
        const newID = oldID.length > 0 ? Math.max(...oldID) : 0;
        return newID + 1;
    };

    // New Form Adding 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Formtype = {
            id: generateNewID(),
            icon,
            title,
            date: Date.parse(date),
            time,
            startTime,
            endTime,
            details: [...details],
            pinned,
            personal,
            color,
            isCompleted: false,
            selectedData: null
        };
        state.arrData = [newTask, ...snapshot.arrData];
        state.formToggle = false;

        setAuthorid(0);
        setIcon('');
        setTitle('');
        setTime('');
        setStartTime('');
        setEndTime('');
        setDate(date);
        setDetails([]);
        setPinned(false);
        setColor('');
        setPersonal(false);
    };


    // Editing Form Page 
    useEffect(() => {
        if (snapshot.selectedData) {
            setAuthorid(snapshot.selectedData.id);
            setIcon(snapshot.selectedData.icon);
            setTitle(snapshot.selectedData.title);
            setTime(snapshot.selectedData.time);
            setStartTime(snapshot.selectedData.startTime);
            setEndTime(snapshot.selectedData.endTime);
            setDate(new Date(snapshot.selectedData.date).toISOString().split('T')[0]);
            setDetails([...snapshot.selectedData.details]);
            setPinned(snapshot.selectedData.pinned);
            setColor(snapshot.selectedData.color);
            setPersonal(snapshot.selectedData.personal);
        }
    }, [snapshot.selectedData]);

    // Editing Form Save 
    const handleSave = () => {
        if (!snapshot.selectedData) return;

        const updatedTodos = snapshot.arrData.map((datas) =>
            datas.id === snapshot.selectedData!.id
                ? {
                    ...snapshot.selectedData,
                    id,
                    icon,
                    title,
                    date: Date.parse(date),
                    time,
                    startTime,
                    endTime,
                    details: [...details],
                    pinned,
                    personal,
                    color,
                }
                : datas
        ) as Formtype[];

        state.arrData = updatedTodos;
        state.selectedData = null;
        state.formToggle = false;

        setAuthorid(0);
        setIcon('');
        setTitle('');
        setTime('');
        setStartTime('');
        setEndTime('');
        setDate(date);
        setDetails([]);
        setPinned(false);
        setColor('');
        setPersonal(false);
    };

    // Editing Form Cancel
    const handlecancel = () => {
        state.formToggle = false;
        state.selectedData = null;
        setAuthorid(0);
        setIcon('');
        setTitle('');
        setTime('');
        setStartTime('');
        setEndTime('');
        setDate(date);
        setDetails([]);
        setPinned(false);
        setColor('');
        setPersonal(false);
    };

    return (
        <div className="bg-[#f9fbfd] p-5 z-50">
            <span className="w-6 h-6 bg-[#f9fbfd] absolute -top-3 right-1.5 shadow-sm shadow-[#f9fbfd] rotate-45 z-40"></span>
            <form onSubmit={handleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="py-2">Date:</td>
                            <td>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Title:</td>
                            <td>
                                <input
                                    type="text"

                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Time:</td>
                            <td>
                                <input
                                    type="time"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">StartTime:</td>
                            <td>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">EndTime:</td>
                            <td>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">icon:</td>
                            <td>
                                <input
                                    type="text"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">Color:</td>
                            <td>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">details:</td>
                            <td>
                                <textarea
                                    value={details.join('\n')}
                                    onChange={(e) => setDetails(e.target.value.split('\n'))}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                ></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">Pinned:</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={pinned}
                                    onChange={(e) => setPinned(e.target.checked)}
                                    className="rounded"
                                />
                            </td>

                        </tr>
                        <tr>
                            <td className="py-2">Personal:</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={personal}
                                    onChange={(e) => setPersonal(e.target.checked)}
                                    className="rounded"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {snapshot.selectedData ? (
                    <span className="flex gap-5">
                        <button className="bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]" onClick={handleSave}>
                            Save
                        </button>
                        <button className="bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]" onClick={handlecancel}>
                            Cancel
                        </button>
                    </span>)
                    : <button
                        type="submit"
                        className="bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]"
                    > Add Task </button>}

            </form>

        </div>
    );
};

export default Addform;