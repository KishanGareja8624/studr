"use client";

import React, { useState } from 'react'
import { ConnectionsIcon, CricleQuestionIcon, CrossArrowIcon, DownIcon, DriveIcon, FigmaIcon, GitIcon, HeadPhoneIcon, LanguageIcon, NotificationsIcon, SettingIcon, SquarCrossArrowIcon } from '../components/icons/icons'
import Image from 'next/image';
import User from "../../images/user.png";

function Myaccount({myAccountRef}:any) {
    const [selectedPage, setSelectedPage] = useState('Notifications');
    const [webPushEnabled, setWebPushEnabled] = useState(false);
    const [activityEnabled, setActivityEnabled] = useState(false);
    const [alwaysEmailEnabled, setAlwaysEmailEnabled] = useState(false);
    const [pageUpdatesEnabled, setPageUpdatesEnabled] = useState(false);
    const [workspaceDigestEnabled, setWorkspaceDigestEnabled] = useState(true);

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const ToggleSwitch = ({ enabled, setEnabled }: any) => (
        <button
            type="button"
            className={`${enabled ? 'bg-black border-black' : 'bg-white border-lightgraytext'
                } relative inline-flex h-7 w-11 items-center rounded-full border-2 transition-colors duration-300`}
            onClick={() => setEnabled(!enabled)}
        >
            <span
                className={`${enabled ? 'translate-x-4 bg-white ' : 'translate-x-1 bg-lightgraytext '
                    } inline-block h-5 w-5 transform rounded-full transition-transform duration-300`}
            />
        </button>
    );

    const boxContents = [
        {
            logoSrc: <GitIcon />,
            title: "Github",
            description: "Notifications, live links, and workflows between Studr and Github.",
            buttonText: "LINK PREVIEW"
        },
        {
            logoSrc: <DriveIcon />,
            title: "Google Drive",
            description: "Add previews of files.",
            buttonText: "LINK PREVIEW"
        },
        {
            logoSrc: <FigmaIcon />,
            title: "Figma",
            description: "View Figma designs",
            buttonText: "LINK PREVIEW"
        }
    ];

    const renderPageContent = () => {
        switch (selectedPage) {
            case 'Settings':
                return <div>Settings content goes here</div>;
            case 'Notifications':
                return <div>
                    <h1 className="text-2xl font-bold mb-2">Notifications</h1>
                    <div className="border-t border-[#CAC4D0] py-4 ">
                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-base font-medium">Web push notifications</span>
                                <p className="text-sm text-lightgraytext mb-4">
                                    You must have the app installed.
                                </p>
                            </div>
                            <div className="w-12">
                                <ToggleSwitch enabled={webPushEnabled} setEnabled={setWebPushEnabled} />
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Email Notifications</h2>

                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-base font-medium">Activity in your workspace</span>
                                <p className="text-sm text-lightgraytext mb-4">
                                    Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes.
                                </p>
                            </div>
                            <div className="w-12">
                                <ToggleSwitch enabled={activityEnabled} setEnabled={setActivityEnabled} />
                            </div>
                        </div>

                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-base font-medium">Always send email notifications</span>
                                <p className="text-sm text-lightgraytext mb-4">
                                    Reminders, notifications, and emails are delivered based on your time zone.
                                </p>
                            </div>
                            <div className="w-12">
                                <ToggleSwitch enabled={alwaysEmailEnabled} setEnabled={setAlwaysEmailEnabled} />
                            </div>
                        </div>

                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-base font-medium">Page updates</span>
                                <p className="text-sm text-lightgraytext mb-4">
                                    Receive email digests every 8 hours for changes to pages youre subscribed to.
                                </p>
                            </div>
                            <div className="w-12">
                                <ToggleSwitch enabled={pageUpdatesEnabled} setEnabled={setPageUpdatesEnabled} />
                            </div>
                        </div>

                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-base font-medium">Workspace digest</span>
                                <p className="text-sm text-lightgraytext mb-4">
                                    Receive email digests of whats happening on your workspace.
                                </p>
                            </div>
                            <div className="w-12">
                                <ToggleSwitch enabled={workspaceDigestEnabled} setEnabled={setWorkspaceDigestEnabled} />
                            </div>
                        </div>

                        <div className="">
                            <p className="text-base font-medium">Email</p>
                            <p>adelhomelgene@gmail.com</p>
                            <div className="mt-4 border-b pb-2 ml-4 ">
                                <button className="text-sm text-lightgraytext flex items-center gap-2"><CricleQuestionIcon /> Learn about notifications</button>
                            </div>
                        </div>
                    </div>

                </div>;
            case 'Connections':
                return <div>
                    <h2 className="text-sm text-lightgraytext mb-4">Discover new connections</h2>
                    <div className="grid grid-cols-3 gap-3 mb-8 h-full">
                        {boxContents.map((content, index) => (
                            <div key={index} className="border rounded-lg p-4 h-auto flex flex-col justify-between">
                                <div className="">
                                    <div className="w-10 h-10">
                                        {content.logoSrc}
                                    </div>
                                    <div className="mb-2">
                                        <div className="h-full ">
                                            <h3 className="text-lg font-semibold">{content.title}</h3>
                                            <p className="text-xs text-lightgraytext">{content.description}</p>
                                        </div>
                                        <button className="w-fit text-xs h-fit px-1 bg-[#E3E3E3] rounded text-lightgraytext hover:bg-gray-50">
                                            {content.buttonText}
                                        </button>
                                    </div>
                                </div>
                                <button className="w-full py-1 font-medium border sticky bottom-0 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="">
                        <h2 className="text-sm text-lightgraytext mb-4">See all</h2>
                        <div className="text-sm">
                            <p className="mb-2">
                                <a href="#" className="text-naviblue flex items-center gap-2">
                                    <div className="w-4">
                                        <CrossArrowIcon className="" />
                                    </div>
                                    Browse connections in Gallery
                                </a>
                            </p>
                            <p className="mb-2">
                                <a href="#" className="text-naviblue flex items-center gap-2">
                                    <div className="w-4">
                                        <CrossArrowIcon className="" />
                                    </div>
                                    Develop or manage integrations
                                </a>
                            </p>
                            <p className="mb-2">
                                <a href="#" className="text-naviblue flex items-center gap-2">
                                    <div className="w-4">
                                        <CricleQuestionIcon className="" />
                                    </div>
                                    Develop or manage integrations
                                </a>
                            </p>
                            <p>
                                <a href="#" className="text-naviblue flex items-center gap-2">
                                    <div className="w-4">
                                        <CricleQuestionIcon className="" />
                                    </div>
                                    Studr connectors
                                </a>
                            </p>
                        </div>
                    </div>
                </div>;
            case 'Language & region':
                return <div>
                    <h1 className="text-2xl font-semibold mb-2">Language & region</h1>
                    <div className="border-t  border-[#CAC4D0] py-4 ">
                        <div className="flex justify-between items-baseline border-b border-[#CAC4D0] mb-5 pb-2">
                            <div className="flex flex-col w-full">
                                <span className="text-base font-medium">Language</span>
                                <p className="text-sm text-lightgraytext">
                                    Change the language used in the user interface.
                                </p>
                            </div>
                            <div className="w-28 text-end">
                                <select name="" id="" className="bg-transparent">
                                    <option value="">English</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-4 border-b border-[#CAC4D0] pb-2">Date & time</h2>

                            <div className="flex justify-between items-baseline mb-4">
                                <div className="flex flex-col w-full">
                                    <span className="text-base font-medium">Set time zone automatically using your location</span>
                                    <p className="text-sm text-lightgraytext">
                                        Receive email digests of what happening on your workspace.
                                    </p>
                                </div>
                                <div className="w-12">
                                    <ToggleSwitch enabled={workspaceDigestEnabled} setEnabled={setWorkspaceDigestEnabled} />
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline mb-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <span className="text-base font-medium">Time Zone</span>
                                    <p className="text-sm text-lightgraytext">
                                        Current time zone setting.
                                    </p>
                                </div>
                                <button className="text-gray-700 whitespace-nowrap  rounded-md py-1 px-3 hover:bg-gray-100">
                                    (GMT+02:00) Europe/Stockholm (GMT +2)
                                </button>
                            </div>
                        </div>
                    </div>
                </div >;
            case 'Customer Support':
                return <div> <h1 className="text-2xl font-bold mb-2">Customer Support</h1>

                    <div className="border-t border-[#CAC4D0] py-4 ">
                        <div className="flex justify-between items-baseline mb-4">
                            <div className="flex flex-col w-full">
                                <span className="text-base font-medium">Email Support</span>
                                <p className="text-sm text-lightgraytext">
                                    Email us on studrofficial@gmail.com
                                </p>
                            </div>
                            <SquarCrossArrowIcon className="" />
                        </div>

                        <div className="flex justify-between items-baseline mb-4">
                            <div className="flex flex-col w-full">
                                <span className="text-base font-medium">Live Chat Support</span>
                                <p className="text-sm text-lightgraytext">
                                    24/7 live chat support for real-time issue resolution
                                </p>
                            </div>
                            <div className="w-12">
                                <button className="flex items-center gap-2 border py-1 px-2 rounded-lg border-bordercolor ">
                                    <div className="w-1 h-1 rounded-full bg-green-600"></div>
                                    Chat
                                </button>
                            </div>
                        </div>
                        <div className="mt-7">
                            <h2 className="text-base font-bold mb-4 text-center">Frequently Asked Questions</h2>
                            <div className="border-t border-gray-200">
                                {[
                                    {
                                        question: 'What platforms does Studr support?',
                                        answer:
                                            'Studr is available as a web-based application, a browser extension (for Chrome, Firefox, etc.), and as an add-in for Microsoft Word and Google Docs.',
                                    },
                                    { question: 'Is there a free version of Studr?', answer: 'Yes, Studr offers a free version with limited features.' },
                                    { question: 'What’s the difference between the Free and Premium versions?', answer: 'The Premium version includes advanced features like ...' },
                                    { question: 'What payment methods do you accept for Premium?', answer: 'We accept major credit cards, PayPal, and other secure payment methods.' },
                                    { question: 'How do I use Studr for grammar and spelling checks?', answer: 'Simply install the Studr extension or use the web app to check your text.' },
                                ].map((item, index) => (
                                    <div key={index} className="border-b border-gray-200 py-3">
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className="w-full text-left flex justify-between items-center focus:outline-none"
                                        >
                                            <span className="text-sm font-semibold">{index + 1}. {item.question}</span>
                                            <DownIcon className={`w-2.5 h-2.5 text-graytext transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openIndex === index && (
                                            <div className="py-2 px-1 text-lightgraytext font-normal text-sm">{item.answer}</div>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>;
            default:
                return <div>Select a page</div>;
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-white rounded-2xl shadow-lg  w-[1111px] h-[700px] text-sm flex overflow-hidden " ref={myAccountRef}>
                {/* Sidebar */}
                <aside className="w-1/4 bg-white  border-r ">
                    <div className="p-2 h-full">
                        <div className="mb-6 px-2">
                            <div className="text-base text-lightgraytext">Account</div>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="text-base text-white w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full">A</div>
                                <div className="">
                                    <div className="text-base text-black">Albin Holmgren</div>
                                    <div className="text-lightgraytext text-xs">albinholmgren102@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        <nav className="overflow-auto h-full">
                            <ul className=" space-y-1">
                                <li className={`${selectedPage === 'Settings' ? 'bg-[#ECECEC]' : 'hover:bg-[#ECECEC]'} text-naviblue px-4 py-2 rounded-md`}>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedPage('Settings')}
                                        className={` flex items-center gap-3 text-base`}
                                    >
                                        <SettingIcon className="w-5 h-5" />
                                        Settings
                                    </a>
                                </li>
                                <li className={`${selectedPage === 'Notifications' ? 'bg-[#ECECEC]' : 'hover:bg-[#ECECEC]'} text-naviblue px-4 py-2 rounded-md`}>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedPage('Notifications')}
                                        className={`flex items-center gap-3 text-base`}
                                    >
                                        <NotificationsIcon className="w-5 h-5" />
                                        Notifications
                                    </a>
                                </li>
                                <li className={`${selectedPage === 'Connections' ? 'bg-[#ECECEC]' : 'hover:bg-[#ECECEC]'} text-naviblue px-4 py-2 rounded-md`}>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedPage('Connections')}
                                        className={` flex items-center gap-3 text-base`}
                                    >
                                        <ConnectionsIcon className="w-5 h-5" />
                                        Connections
                                    </a>
                                </li>
                                <li className={`${selectedPage === 'Language & region' ? 'bg-[#ECECEC]' : 'hover:bg-[#ECECEC]'} text-naviblue px-4 py-2 rounded-md`}>
                                    <a
                                        href="#"
                                        onClick={() => setSelectedPage('Language & region')}
                                        className={` flex items-center gap-3 text-base`}
                                    >
                                        <LanguageIcon className="w-5 h-5" />
                                        Language & region
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <button onClick={() => setSelectedPage('Customer Support')} className="bg-bg py-3 px-8 flex justify-center gap-2 font-medium items-center text-naviblue !sticky w-full !bottom-0 border-t border-bordercolor">
                        <HeadPhoneIcon/>
                        Customer Support
                    </button>
                </aside>

                {/* Main Content */}
                <main className="w-3/4 overflow-auto p-12 " style={{ scrollbarWidth: "none" }}>
                    {renderPageContent()}
                </main>

            </div>
        </div>
    )
}

export default Myaccount