import {
    ArrowDownIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    EllipsisHorizontalIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

import {
    CloseIcon,
    ShortingIcon,
    EditBoxPencilIcon,
    FillFeilIcon,
    FillBookMarkIcon,
    OpenIcon,
    RenameIcon,
    FolderIcon,
    BookMarkIcon,
    PinIcon,
    ShareIcon,
    PreviewIcon,
    TrashIcon,
    MoveTrashIcon,
    DownIcon,
} from '../../components/icons/icons';

interface Day {
    date: string;
    deletedFiles: any;
}

interface ModalsProps {
    closeModal: () => void;
    toggleModalPopup: () => void;
    isPopupOpen: boolean;
    expandedDays: Record<string, boolean>;
    isFileEditPopup: any;
    toggleFilePopup: (fileIndex: any, day: any) => void;
    days: Day[];
    toggleDay: (date: string) => void;
    modalName: any
}

interface Action {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    extraClass?: string;
}

interface Actions {
    [key: string]: Action[];
}

const Modals: React.FC<ModalsProps> = ({
    toggleModalPopup,
    isPopupOpen,
    expandedDays,
    isFileEditPopup,
    toggleFilePopup,
    days,
    toggleDay,
    modalName,
    closeModal
}) => {

    const [modalsName, setModalName] = useState<any>(modalName);
    const actions: Actions = {
        Drafts: [
            { icon: <OpenIcon className="h-5 w-5" />, label: 'Open', onClick: () => handleOpen() },
            { icon: <RenameIcon className="h-5 w-5" />, label: 'Rename', onClick: () => handleOpen() },
            { icon: <FolderIcon className="w-5 h-5" />, label: 'Move to Folder', onClick: () => handleOpen() },
            { icon: <ShareIcon className="w-5 h-5" />, label: 'Share', onClick: () => handleOpen() },
            { icon: <MoveTrashIcon className="w-5 h-5" />, label: 'Move to Bin', onClick: () => { setModalName('Recently Deleted'); handleOpen(); }, extraClass: 'pt-3 border-t', },
        ],
        'Bookmark Lists': [
            { icon: <OpenIcon className="h-5 w-5" />, label: 'Open', onClick: () => handleOpen() },
            { icon: <RenameIcon className="h-5 w-5" />, label: 'Rename', onClick: () => handleOpen() },
            { icon: <BookMarkIcon className="w-5 h-5" />, label: 'Unbookmark', onClick: () => handleOpen() },
            { icon: <ShareIcon className="w-5 h-5" />, label: 'Share', onClick: () => handleOpen() },
            { icon: <MoveTrashIcon className="w-5 h-5" />, label: 'Move to Bin', onClick: () => { setModalName('Recently Deleted'); handleOpen(); }, extraClass: 'pt-3 border-t', },
        ],
        'Recent Files': [
            { icon: <OpenIcon className="h-5 w-5" />, label: 'Open', onClick: () => handleOpen() },
            { icon: <PinIcon className="w-5 h-5" />, label: 'Pin to Recents', onClick: () => handleOpen() },
            { icon: <ShareIcon className="w-5 h-5" />, label: 'Share', onClick: () => handleOpen() },
            { icon: <MoveTrashIcon className="w-5 h-5" />, label: 'Move to Bin', onClick: () => { setModalName('Recently Deleted'); handleOpen(); }, extraClass: 'pt-3 border-t', },
        ],
        'Recently Deleted': [
            { icon: <RenameIcon className="w-5 h-5" />, label: 'Restore', onClick: () => handleOpen() },
            { icon: <PreviewIcon className="w-5 h-5" />, label: 'Preview', onClick: () => handleOpen() },
            { icon: <TrashIcon className="w-5 h-5" />, label: 'Delete', onClick: () => handleOpen(), extraClass: 'pt-3 border-t' },
        ],
    };

    const defaultActions = [
        { icon: <OpenIcon className="h-5 w-5" />, label: 'Open', onClick: () => handleOpen() },
        { icon: <ShareIcon className="w-5 h-5" />, label: 'Share', onClick: () => handleOpen() },
        { icon: <MoveTrashIcon className="w-5 h-5" />, label: 'Move to Bin', onClick: () => { setModalName('Recently Deleted'); handleOpen() }, extraClass: 'pt-3 border-t' },
    ];

    const handleOpen = () => {
    };

    return (
        <div>
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#000000be] ">
                <div className="bg-white dark:bg-[#2f2f2f] w-5/12 p-4 rounded-xl shadow-lg">
                    <div className="w-full flex flex-col gap-3">
                        <div className="flex gap-3 justify-between items-center w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{modalsName}</span>
                                <p className="text-lightgraytext dark:text-darktext font-bold">23 Files</p>
                            </div>
                            <div className="flex text-[#374957] gap-2 items-center">
                                <div onClick={closeModal}>
                                    <CloseIcon className="w-4 h-4" />
                                </div>
                                <div className="relative">
                                    <EllipsisVerticalIcon
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={toggleModalPopup}
                                    />
                                    {isPopupOpen && (
                                        <div className="absolute right-0 top-9 p-4 w-auto z-10 bg-white rounded-[10px] shadow-lg">
                                            <ul className="space-y-1">
                                                <li className="flex justify-between items-center whitespace-nowrap hover:bg-gray-100 gap-12 text-naviblue dark:text-white font-medium rounded-[10px]">
                                                    <button className="flex items-center gap-2   w-full text-left  p-2 ">
                                                        <ShortingIcon className="h-5 w-5" />
                                                        <span>Sort by</span>
                                                    </button>
                                                    <div className="flex items-center gap-1 text-[#AEADB5] ">
                                                        <span>Date</span>
                                                        <ArrowDownIcon className="h-4 w-4" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <button className="flex items-center gap-2 text-naviblue dark:text-white hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
                                                        <EditBoxPencilIcon className="h-5 w-5" />
                                                        <span>Edit</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                        <ul className="text-naviblue dark:text-white font-semibold">
                            {days.map((day: any, index: any) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-2 rounded-lg flex flex-col"
                                    onClick={(e: any) => !e.target.closest('.file-item') && toggleDay(day.date)}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-[#555363] dark:text-white">{day.date}</h3>
                                        <div className="flex items-center">
                                            {expandedDays[day.date] ? (
                                                <DownIcon className="w-3 h-3" />
                                            ) : (
                                                <DownIcon className="w-3 h-3 transform rotate-180" />
                                            )}
                                        </div>
                                    </div>
                                    {expandedDays[day.date] && (
                                        <ul className="mt-2">
                                            {day.deletedFiles.map((file: any, fileIndex: any) => (
                                                <li
                                                    key={fileIndex}
                                                    className="group cursor-pointer hover:bg-[#ECECEC] p-2  rounded-lg flex items-center justify-between file-item relative h-[44px]"
                                                >
                                                    <div className="flex items-center gap-2 text-naviblue dark:text-white font-normal">
                                                        <FillFeilIcon />
                                                        {file}
                                                    </div>
                                                    <div className="relative flex items-center gap-1">
                                                        {modalsName === 'Bookmark Lists' && (
                                                            <FillBookMarkIcon className="h-4 w-4" />
                                                        )}
                                                        <EllipsisHorizontalIcon
                                                            className={`h-7 w-7 cursor-pointer ${isFileEditPopup.fileIndex === fileIndex && isFileEditPopup.parentId === day.id ? "block" : " hidden"} group-hover:block`}
                                                            onClick={() => toggleFilePopup(fileIndex, day.id)}
                                                        />
                                                        {isFileEditPopup.fileIndex === fileIndex &&
                                                            isFileEditPopup.parentId === day.id && (
                                                                <div className="absolute right-0 top-9 p-4 w-auto whitespace-nowrap z-10 bg-white rounded-[10px] shadow-lg">
                                                                    <ul className="space-y-1">
                                                                        {actions[modalsName]
                                                                            ? actions[modalsName].map((action: any, idx: any) => (
                                                                                <li key={idx} className={action.extraClass || ''}>
                                                                                    <button
                                                                                        className="flex items-center gap-2 text-sm text-naviblue dark:text-white hover:bg-gray-100 w-full text-left font-normal p-2 rounded-lg"
                                                                                        onClick={action.onClick}
                                                                                    >
                                                                                        {action.icon}
                                                                                        <span>{action.label}</span>
                                                                                    </button>
                                                                                </li>
                                                                            ))
                                                                            : defaultActions.map((action, idx) => (
                                                                                <li key={idx} className={action.extraClass || ''}>
                                                                                    <button
                                                                                        className="flex items-center gap-2 text-sm text-naviblue dark:text-white hover:bg-gray-100 w-full text-left font-normal p-2 rounded-lg"
                                                                                        onClick={action.onClick}
                                                                                    >
                                                                                        {action.icon}
                                                                                        <span>{action.label}</span>
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {modalsName === 'Recently Deleted' && (
                        <p className="text-[#767676] mt-4 text-center">
                            <span className="font-semibold text-lightgraytext dark:text-darktext">Note:</span> The file will be permanently deleted once you delete it from here.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modals;
