"use client";

import React, { useEffect, useState } from "react";
import "../docs/docs/Docs.css";
import {
  ChevronRightIcon,
  SparklesIcon,
  BookmarkIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowDownTrayIcon,
  DocumentIcon,
  ComputerDesktopIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  EllipsisVerticalIcon,
  ArrowUpCircleIcon,
  PencilIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,

} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DropdownMenu from "../components/dropdown/DropdownMenu";
import Modals from "../components/common/modals";
import {
  SparklesIcons, PlusIcon, BookMarkIcon, ClockIcon, ArchivedIcon, DownIcon, CalendarIcon, UserIcon,
  TagIcon, SearchIcon, FileTextIcon, DuplicateIcon, CloseIcon, PdfIcon, WebIcon, PagesIcon, AnalysisIcon, CricleQuestionIcon,
  FillShortingIcon,
  AdjustmentsIcon,
  LayOutIcon,
  CheckIcon
} from "../components/icons/icons"
import { Editor } from "primereact/editor";
import ProgressBar from 'react-progressbar';
import Image from "next/image";
import Link from "next/link";
import User from "../../images/user.png";
import ChatLogo from "../../images/chat-logo.svg";
// import AlertsList from "./alert/AlertsList";
// import Alert from "./alert/Alert";
// import SearchBar from "../components/navbar/searchbar/searchbar";
// import { PlusIcon, , ChevronRightIcon } from "@heroicons/react/24/outline";

type Document = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  isEditing: boolean;
};

type Subheader = {
  id: string;
  title: string;
  isEditing: boolean;
};

type Folder = {
  id: string;
  name: string;
  documents: Document[];
  subheaders: Subheader[];
};

const Docs: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Main");
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [criteria, setCriteria] = useState('');
  const [uploadedCriteria, setUploadedCriteria] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isAskAiVisible, setIsAskAiVisible] = useState(false);
  const [isContentVisible, setContentVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [activeButton, setActiveButton] = useState(false);
  const [members, setMembers] = useState(membersData);
  const [isOpen, setIsOpen] = useState(false);
  const [islibarayModelOpen, setIslibarayModelOpen] = useState(false);


  const handleDeletes = (index: any) => {
    setUploadedCriteria(uploadedCriteria.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    setIsFileOpen(!isFileOpen);
  };

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setProgress(0);
    setIsDownloaded(false);
    setIsFileOpen(false)
    const downloadInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(downloadInterval);
          setIsDownloading(false);
          setIsDownloaded(true);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 300);
  };

  const handleOpenFile = () => {
    console.log("File opened");
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { text: message, type: 'self' };
      setMessages((prevMessages) => [...prevMessages, newMessage] as any);
      setMessage(''); ``
    }
  };

  useEffect(() => {
    const welcomeMessage = { text: 'A new user has joined the chat!', type: 'system' };
    setMessages((prevMessages) => [...prevMessages, welcomeMessage] as any);
  }, []);

  const handleAskAiClick = () => {
    setIsAskAiVisible(!isAskAiVisible);
  };

  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    setContentVisible(value === 'open');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Update suggestions based on the input
    if (value) {
      const filteredSuggestions = allSuggestions.filter(topic =>
        topic.toLowerCase().includes(value.toLowerCase())
      );
      setAiSuggestions(filteredSuggestions);
    } else {
      setAiSuggestions([]);
    }
  };

  const sendAiMessage = () => {
    if (inputValue) {
      // Add input value to topics and reset the input field
      setTopics(prevTopics => [...prevTopics, inputValue]);
      setInputValue('');
      setAiSuggestions([]);
    }
  };
  const scores = [
    { name: 'Purpose', value: 66, color: '#FFBB32' },
    { name: 'Grammar', value: 64, color: '#289D99' },
    { name: 'Analysis', value: 70, color: '#9D33D9' },
  ];

  const suggestion = [
    {
      id: 1,
      status: 'has',
      message: 'Correction of verb',
      color: 'bg-green-700',
    },
    {
      id: 2,
      status: 'A guy never fells...',
      message: 'Plagiarism Detected',
      color: 'bg-[#905D2B]',
    },
  ];


  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const allSuggestions = ['History of Germany', 'Science Innovations', 'Cultural Heritage', 'Technology Advances'];

  return (
    <div className="flex w-full h-full bg-white">
      {/* Right Sidebar */}
      <div style={{ scrollbarWidth: "none" }} className={`transition-all duration-700 ease-in-out ${rightSidebarCollapsed ? 'w-0' : 'w-1/5'} bg-bg sticky top-0 h-full overflow-y-auto border-l border-gray-200`}>
        {!rightSidebarCollapsed && (
          <>
            <div className="w-full h-full">
              <div className="px-4 sticky top-0 py-3.5 z-50 bg-[#FAFAFA] mb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex justify-between bg-[#ECECEC] border-b p-1 rounded-lg w-full">
                    <button
                      className={`text-black font-medium px-4 rounded-lg py-[1px] ${activeTab === "Main" ? " bg-white" : "bg-transparent"
                        }`}
                      onClick={() => setActiveTab("Main")}
                    >
                      Main
                    </button>
                    <button
                      className={`text-black font-medium px-4 rounded-lg py-[1px] ${activeTab === "Ai" ? " bg-white" : "bg-transparent"
                        }`}
                      onClick={() => setActiveTab("Ai")}
                    >
                      Ai
                    </button>
                    <button
                      className={`text-black font-medium px-4 rounded-lg py-[1px] ${activeTab === "Library" ? " bg-white" : "bg-transparent"
                        }`}
                      onClick={() => setActiveTab("Library")}
                    >
                      Library
                    </button>
                    <button
                      className={`text-black font-medium px-4 rounded-lg py-[1px] ${activeTab === "Share" ? " bg-white" : "bg-transparent"
                        }`}
                      onClick={() => setActiveTab("Share")}
                    >
                      Share
                    </button>
                  </div>
                  <div className={`text-naviblue w-6 h-6 hover:bg-[#ECECEC] transition-all rounded-lg flex justify-center items-center`} onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}>
                    <LayOutIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Content based on active tab */}
              {activeTab === "Main" && (
                <>
                  <div className=" h-full relative">
                    <div className="w-full border-b pb-3 px-6 flex items-center gap-2 mb-3">
                      <div className="w-full">
                        <p className="font-bold text-lg">Free Token Used</p>
                        <div className="flex items-center gap-3">
                          <div className="mt-2 bg-[#00000017] w-5/12 rounded-full h-1">
                            <div
                              className="bg-[#289D99] h-1 rounded-full"
                              style={{ width: `${70}%` }}
                            ></div>
                          </div>
                          <p className="mt-2 text-xs text-[#757575]">35 out of 50</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 justify-center items-center">
                        <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.7136 17.3442C14.7131 18.1809 14.3806 18.9832 13.7891 19.5749C13.1975 20.1666 12.3953 20.4993 11.5586 20.5L3.44192 20.5C2.85919 20.5002 2.28783 20.3388 1.79127 20.0338C1.29471 19.7289 0.892397 19.2923 0.629001 18.7725C0.365604 18.2527 0.251435 17.67 0.299171 17.0893C0.346907 16.5085 0.554679 15.9523 0.899416 15.4825L3.21108 12.3333C2.6496 12.2922 2.10938 12.1014 1.64657 11.7808C1.18375 11.4602 0.815232 11.0216 0.579294 10.5104C0.343357 9.99925 0.248613 9.43422 0.304908 8.87405C0.361203 8.31388 0.566483 7.779 0.899416 7.325L4.95775 1.79083C5.25069 1.39191 5.63341 1.06754 6.07496 0.843971C6.51651 0.620399 7.00449 0.503899 7.49941 0.503899C7.99434 0.503899 8.48232 0.620399 8.92387 0.843971C9.36542 1.06754 9.74814 1.39191 10.0411 1.79083L14.0994 7.325C14.4323 7.77889 14.6376 8.31362 14.694 8.87366C14.7503 9.4337 14.6557 9.99862 14.42 10.5097C14.1842 11.0209 13.8159 11.4596 13.3534 11.7802C12.8908 12.1009 12.3508 12.2919 11.7894 12.3333L14.1011 15.4825C14.4983 16.022 14.7129 16.6742 14.7136 17.3442V17.3442Z" fill="#5F5C6F" />
                        </svg>
                        <span className="text-xs font-semibold text-[#289D99]">Upgrade</span>
                      </div>
                    </div>
                    <div className="h-full space-y-5 px-6">
                      <div>
                        <h3 className="text-base font-bold text-black mb-3">Info</h3>
                        <ul className="text-[#374957] space-y-2">
                          <li className="text-base flex items-center justify-between border-b pb-2 border-bordercolor font-medium">
                            <p className="flex items-center gap-2"> <UserIcon className="h-5 w-5" /> Creator</p>
                            <span className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-black overflow-hidden">
                                <Image src={User} alt="" />
                              </div>
                              Andrew M.</span>
                          </li>
                          <li className="text-base flex items-center justify-between border-b pb-2 border-bordercolor font-medium">
                            <p className="flex items-center gap-2"> <CalendarIcon className="h-5 w-5" />Date of creation</p>
                            <span>28 May</span>
                          </li>
                          <li className="text-base flex items-center justify-between border-b pb-2 border-bordercolor font-medium">
                            <p className="flex items-center gap-2">
                              <TagIcon className="h-5 w-5" />
                              Tags</p>
                            <span>
                              <select className="bg-transparent">
                                <option value="">12</option>
                              </select>
                            </span>
                          </li>
                        </ul>
                      </div>
                      {/* Purpose done */}
                      <div>
                        <h3 className="text-base font-bold text-black mb-1">Purpose</h3>
                        <div className="">
                          <label htmlFor="" className="text-sm">A purpose gives AI a goal</label>
                          <textarea
                            className="w-full p-2 mt-2 border rounded-xl text-sm bg-white h-20"
                          />
                        </div>
                      </div>

                      {/* Grading Criteria  not complete */}
                      <div>
                        <h3 className="text-base font-bold text-black mb-3">Grading criteria</h3>
                        <div className="flex items-center justify-between w-full p-2 mt-2 h-10 border text-naviblue font-medium rounded-xl bg-white">
                          <button
                            onClick={handleOpen}
                            className="w-full flex gap-3 items-center justify-center"
                          >
                            <DuplicateIcon className="w-5 h-5" />

                            Upload grading criteria
                          </button>
                        </div>
                        <div className="mt-3 px-4">
                          <div className="flex items-center justify-between text-naviblue font-medium">
                            <span>Grading criterias for hisroty</span>
                            <button className="">
                              <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Overall Score */}
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-base font-bold text-black mb-3">Overall Score</h3>
                          <p className="font-bold">66%</p>
                        </div>
                        <div className="space-y-5 mt-2 mb-3">
                          {scores.map((score) => (
                            <div className="grid grid-cols-6 justify-between items-center font-medium" key={score.name}>
                              <span className="col-span-2">{score.name}</span>
                              <div className="rounded-md w-full col-span-3">
                                <ProgressBar
                                  {...({ completed: score.value, color: score.color, height: '16px', className: 'bg-[#E9EDF7] rounded-xl', transitionDuration: '0.3s' } as any)}

                                />
                              </div>
                              <span className="flex justify-end">{score.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FAFAFA] sticky bottom-3 flex flex-col justify-center items-cente px-6">
                      <div className="relative w-full">
                        {isDownloading && (
                          <div className="w-full p-2 bg-[#f0f4ff]  rounded-xl flex items-center gap-2 mb-3 shadow-custom">
                            <ArrowDownTrayIcon className="h-9 w-9 text-[#374957]" />
                            <div className="w-full">
                              <div className="flex justify-between items-center">
                                <p>Your file is downloading</p>
                                <XMarkIcon className="h-4 w-4" />
                              </div>
                              <div className="flex items-center gap-3 ml-2">
                                <div className="mt-2 bg-gray-400 w-5/12 rounded-full h-1">
                                  <div
                                    className="bg-blue-500 h-1 rounded-full"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                                <p className="mt-2 text-xs text-[#757575]">{progress}%</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {isDownloaded && (
                          <div className="w-full px-2.5 py-3 bg-[#f0f4ff]  rounded-xl flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-4">
                              <CheckIcon className="h-8 w-8 text-graytext" />
                              <p>Your file is downloaded</p>
                            </div>
                            <button
                              className="text-[#007AFF] text-sm  underline"
                              onClick={handleOpenFile}
                            >
                              Open
                            </button>
                          </div>
                        )}
                        <button
                          className="w-full px-2 py-3 border rounded-xl bg-white text-gray-600 font-medium flex items-center justify-center gap-2"
                          onClick={handleClick}

                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                          Download File
                        </button>

                        {isFileOpen && (
                          <div className="absolute left-0 bottom-16 p-4 w-full z-10 bg-white rounded-[10px] shadow-popup">
                            <ul>
                              <li className="mb-1">
                                <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg" onClick={handleDownloadClick}>
                                  <PdfIcon className="h-5 w-5" />
                                  <span>PDF</span>
                                </button>
                              </li>
                              <li className="mb-1">
                                <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
                                  <FileTextIcon className="h-5 w-5" />
                                  <span>Word</span>
                                </button>
                              </li>
                              <li className="mb-1">
                                <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
                                  <WebIcon className="h-5 w-5" />
                                  <span>Web Page</span>
                                </button>
                              </li>
                              <li className="mb-1">
                                <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
                                  <PagesIcon className="h-5 w-5" />
                                  <span>Pages</span>
                                </button>
                              </li>
                              <li className="py-2 border-t m-0">
                                <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
                                  <AnalysisIcon className="h-5 w-5" />

                                  <span>Document Analysis</span>
                                </button>
                              </li>
                              <li className="py-2 border-t ">
                                <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
                                  <CricleQuestionIcon className="h-5 w-5" />
                                  <span>Grade Argue</span>
                                </button>
                              </li>

                            </ul>

                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Ai" && (
                <div className="px-6 h-full">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-lg font-semibold whitespace-nowrap">Ai Chat</h2>
                    <div className="flex items-center justify-end gap-2 w-auto text-naviblue">
                      <SearchIcon className="h-5 w-5" />
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </div>
                  </div>
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center text-center mt-8 h-full">
                      <div className="h-fit">
                        <p className="text-naviblue mb-6">
                          Welcome to Ai !! Here’s few suggestions that we might think would help you.
                        </p>
                        <div className="flex flex-col gap-3 px-8">
                          <button className="text-[#374957] border border-bordercolor py-4 px-2 w-full bg-white rounded-lg flex items-center gap-4">
                            <PencilIcon className="w-7 h-7" />
                            <p className="text-[#585454] font-medium text-start">
                              Find the key points of this document for me
                            </p>
                          </button>

                          <button className="text-[#374957] border border-bordercolor py-4 px-2 w-full bg-white rounded-lg flex items-center gap-4">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                              <path d="M19 0.5H5C3.67441 0.501588 2.40356 1.02888 1.46622 1.96622C0.528882 2.90356 0.00158786 4.17441 0 5.5L0 19.5C0.00158786 20.8256 0.528882 22.0964 1.46622 23.0338C2.40356 23.9711 3.67441 24.4984 5 24.5H16.343C16.9999 24.5019 17.6507 24.3735 18.2576 24.1222C18.8646 23.8709 19.4157 23.5017 19.879 23.036L22.535 20.378C23.0008 19.9149 23.37 19.364 23.6215 18.7572C23.873 18.1504 24.0016 17.4998 24 16.843V5.5C23.9984 4.17441 23.4711 2.90356 22.5338 1.96622C21.5964 1.02888 20.3256 0.501588 19 0.5V0.5ZM2 19.5V5.5C2 4.70435 2.31607 3.94129 2.87868 3.37868C3.44129 2.81607 4.20435 2.5 5 2.5H19C19.7957 2.5 20.5587 2.81607 21.1213 3.37868C21.6839 3.94129 22 4.70435 22 5.5V15.5H18C17.2044 15.5 16.4413 15.8161 15.8787 16.3787C15.3161 16.9413 15 17.7044 15 18.5V22.5H5C4.20435 22.5 3.44129 22.1839 2.87868 21.6213C2.31607 21.0587 2 20.2957 2 19.5ZM18.465 21.622C18.063 22.023 17.5547 22.3006 17 22.422V18.5C17 18.2348 17.1054 17.9804 17.2929 17.7929C17.4804 17.6054 17.7348 17.5 18 17.5H21.925C21.8013 18.0535 21.524 18.5609 21.125 18.964L18.465 21.622Z" fill="currentcolor" />
                            </svg>
                            <p className="text-[#585454] font-medium text-start">
                              Write a summary consisting of 300 words
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 h-full overflow-y-scroll z-0" style={{ scrollbarWidth: "none" }}>
                      {messages.map((msg: any, index: any) => (
                        <div key={index} className={`mb-4 flex ${msg.type === 'self' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`${msg.type === 'self' ? 'bg-[#ECECEC]' : msg.type === 'system' ? 'bg-gray-100' : 'bg-green-100'
                              } rounded-md p-4 max-w-xs relative mx-5 text-graytext font-medium`}
                          >
                            {msg.text}
                            <div className={` ${msg.type === 'self' ? '-right-3 bg-gray-600' : msg.type === 'system' ? '-left-3 ' : 'bg-green-100'
                              }  w-7 h-7  absolute rounded-full z-10 overflow-hidden flex justify-center items-center  border-2 border-white`}>
                              {msg.type === 'self' ? <Image src={User} alt="" className=" object-cover" /> : <Image src={ChatLogo} alt="" className=" object-cover" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input Field */}
                  <div className="sticky bottom-4 left-0 right-0 p-4">
                    <div className="border border-gray-300 py-2 px-2 h-28 bg-white rounded-lg flex items-end">
                      <textarea
                        className="w-full px-2 py-2 bg-transparent h-full border-none outline-none resize-none"
                        placeholder="Ask Ai anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ scrollbarWidth: 'none' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <ArrowUpCircleIcon onClick={sendMessage} className="w-9 h-9 text-[#B3B3B3] cursor-pointer" />
                    </div>
                  </div>
                </div>

              )}

              {activeTab === "Library" && (
                <>
                  {/* Library Criteria */}
                  <div className="px-6 relative h-full">
                    <h3 className="text-base font-bold text-black mb-3">Library</h3>
                    <ul className="mt-3 px-4 h-full overflow-auto space-y-4">
                      <li className="flex items-center justify-between text-naviblue font-medium">
                        <span>France library</span>
                        <button className="">
                          <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                        </button>
                      </li>
                      <li className="flex items-center justify-between text-naviblue font-medium">
                        <span>History of greece</span>
                        <button className="">
                          <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                        </button>
                      </li>
                      <li className="flex items-center justify-between text-naviblue font-medium">
                        <span>Ancient Egypt</span>
                        <button className="">
                          <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                        </button>
                      </li>
                    </ul>
                    <div className="flex items-center justify-between sticky bottom-3  w-full p-2 mt-2 h-10 border text-naviblue font-medium rounded-xl bg-white">
                      <button
                        onClick={() => setIslibarayModelOpen(true)}
                        className="w-full flex gap-3 items-center justify-center"
                      >
                        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M6.58341 12.1667C7.35668 12.1658 8.09801 11.8582 8.64479 11.3114C9.19157 10.7646 9.49916 10.0233 9.50008 9.25001V4.14176C9.50099 3.83514 9.44103 3.53138 9.32367 3.2481C9.20631 2.96483 9.0339 2.70766 8.81641 2.49151L7.50858 1.18368C7.29243 0.966195 7.03526 0.793778 6.75199 0.676422C6.46871 0.559065 6.16496 0.499103 5.85833 0.50001H3.08341C2.31015 0.500936 1.56882 0.808525 1.02204 1.35531C0.475263 1.90209 0.167674 2.64341 0.166748 3.41668V9.25001C0.167674 10.0233 0.475263 10.7646 1.02204 11.3114C1.56882 11.8582 2.31015 12.1658 3.08341 12.1667H6.58341ZM1.33341 9.25001V3.41668C1.33341 2.95255 1.51779 2.50743 1.84598 2.17924C2.17417 1.85105 2.61929 1.66668 3.08341 1.66668C3.08341 1.66668 5.95283 1.67484 6.00008 1.68068V2.83334C6.00008 3.14276 6.123 3.43951 6.34179 3.6583C6.56058 3.87709 6.85733 4.00001 7.16675 4.00001H8.31941C8.32525 4.04726 8.33341 9.25001 8.33341 9.25001C8.33341 9.71414 8.14904 10.1593 7.82085 10.4874C7.49266 10.8156 7.04754 11 6.58341 11H3.08341C2.61929 11 2.17417 10.8156 1.84598 10.4874C1.51779 10.1593 1.33341 9.71414 1.33341 9.25001ZM11.8334 5.16668V11.5833C11.8325 12.3566 11.5249 13.0979 10.9781 13.6447C10.4313 14.1915 9.69001 14.4991 8.91675 14.5H3.66675C3.51204 14.5 3.36367 14.4386 3.25427 14.3292C3.14487 14.2198 3.08341 14.0714 3.08341 13.9167C3.08341 13.762 3.14487 13.6136 3.25427 13.5042C3.36367 13.3948 3.51204 13.3333 3.66675 13.3333H8.91675C9.38088 13.3333 9.826 13.149 10.1542 12.8208C10.4824 12.4926 10.6667 12.0475 10.6667 11.5833V5.16668C10.6667 5.01197 10.7282 4.86359 10.8376 4.7542C10.947 4.6448 11.0954 4.58334 11.2501 4.58334C11.4048 4.58334 11.5532 4.6448 11.6626 4.7542C11.772 4.86359 11.8334 5.01197 11.8334 5.16668Z" fill="#374957" />
                        </svg>

                        Connect Library
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Share" && (
                <div className="px-6 h-full relative">
                  <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-lg font-semibold">Share</h2>
                  </div>

                  <div className="h-full">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className=" font-semibold flex items-center gap-2">Members <div className="w-6 h-6 rounded-full bg-[#ECECEC] flex items-center justify-center text-sm text-black">15</div></h2>
                      <div className="flex items-center gap-4">
                        <SearchIcon className="h-5 w-5 text-naviblue" />
                        <AdjustmentsIcon className="h-5 w-5 text-naviblue" />
                        <FillShortingIcon className="h-5 w-5 text-naviblue" />

                      </div>
                    </div>
                    <div>
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between mb-4">
                          {/* Profile Info */}
                          <div className="flex items-center gap-3">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <h4 className="text-sm font-semibold">{member.name}</h4>
                              <p className="text-xs text-[#B3B3B3] font-medium">{member.status === 'online' ? 'Senior Member' : 'Member'}</p>
                            </div>
                          </div>

                          {/* Role Badge */}
                          <div>
                            {member.role === "Admin" && (
                              <span className="text-xs bg-[#DFEBDD] text-lightgraytext py-1 px-2 rounded-md">Admin</span>
                            )}
                            {member.role === "Editor" && (
                              <span className="text-xs bg-[#E9D4CB] text-lightgraytext py-1 px-2 rounded-md">Editor</span>
                            )}
                            {member.role === "Viewer" && (
                              <span className="text-xs bg-[#FBF0A7] text-lightgraytext py-1 px-2 rounded-md">Viewer</span>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Offline Section */}
                      <h4 className="text-sm font-semibold text-gray-600 mt-6 mb-2">Offline</h4>
                      {members.filter(member => member.status === 'offline').map((member, index) => (
                        <div key={index} className="flex items-center justify-between mb-4">
                          {/* Profile Info */}
                          <div className="flex items-center gap-3">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <h4 className="text-sm font-semibold">{member.name}</h4>
                              <p className="text-xs text-naviblue">Member</p>
                            </div>
                          </div>

                          {/* Role Badge */}
                          <div>
                            {member.role === "Admin" && (
                              <span className="text-xs bg-[#DFEBDD] text-lightgraytext py-1 px-2 rounded-md">Admin</span>
                            )}
                            {member.role === "Editor" && (
                              <span className="text-xs bg-[#E9D4CB] text-lightgraytext py-1 px-2 rounded-md">Editor</span>
                            )}
                            {member.role === "Viewer" && (
                              <span className="text-xs bg-[#FBF0A7] text-lightgraytext py-1 px-2 rounded-md">Viewer</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`sticky bottom-0 bg-[#FAFAFA] flex flex-col justify-center items-center  p-4`}>
                    {/* Title */}
                    <div className="font-bold mb-4 text-lg">Invite people to join your team</div>

                    {/* Share Link Button */}
                    <button
                      className={`w-full border border-gray-300 py-3 px-2 bg-gray-200 rounded-lg font-medium flex justify-center items-center gap-2 ${activeButton ? "!bg-[#017A5B] text-white" : ""}`}
                      onClick={() => setActiveButton(!activeButton)}
                    >
                      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                      Share a link
                    </button>

                    <div className="text-sm text-naviblue mt-2 mb-5">
                      Expires in 30 days. <button className="text-red-500 font-bold">Deactivate link</button>
                    </div>
                    {activeButton && (
                      <div className="flex items-center justify-center mt-1 mb-6 text-naviblue font-medium">
                        <span className="w-24 h-[1px] bg-naviblue"></span>
                        <span className="px-3">OR</span>
                        <span className="w-24 h-[1px] bg-naviblue"></span>
                      </div>)}
                    {/* Invite via Contacts, Google Contacts, and Email */}
                    {activeButton && (
                      <div className="grid grid-cols-1 gap-4 w-full">
                        <button
                          className={`w-full border border-gray-300 py-3 px-2 bg-white rounded-lg font-medium flex justify-center items-center gap-2`}
                        >
                          {/* Replace with your Contacts icon */}
                          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9998 0.5H5.33317C4.68533 0.500852 4.05177 0.69047 3.50998 1.04567C2.96819 1.40086 2.54164 1.90624 2.2825 2.5H1.33317C1.15636 2.5 0.98679 2.57024 0.861766 2.69526C0.736742 2.82029 0.666504 2.98986 0.666504 3.16667C0.666504 3.34348 0.736742 3.51305 0.861766 3.63807C0.98679 3.7631 1.15636 3.83333 1.33317 3.83333H1.99984V5.16667H1.33317C1.15636 5.16667 0.98679 5.2369 0.861766 5.36193C0.736742 5.48695 0.666504 5.65652 0.666504 5.83333C0.666504 6.01014 0.736742 6.17971 0.861766 6.30474C0.98679 6.42976 1.15636 6.5 1.33317 6.5H1.99984V7.83333H1.33317C1.15636 7.83333 0.98679 7.90357 0.861766 8.0286C0.736742 8.15362 0.666504 8.32319 0.666504 8.5C0.666504 8.67681 0.736742 8.84638 0.861766 8.97141C0.98679 9.09643 1.15636 9.16667 1.33317 9.16667H1.99984V10.5H1.33317C1.15636 10.5 0.98679 10.5702 0.861766 10.6953C0.736742 10.8203 0.666504 10.9899 0.666504 11.1667C0.666504 11.3435 0.736742 11.513 0.861766 11.6381C0.98679 11.7631 1.15636 11.8333 1.33317 11.8333H1.99984V13.1667H1.33317C1.15636 13.1667 0.98679 13.2369 0.861766 13.3619C0.736742 13.487 0.666504 13.6565 0.666504 13.8333C0.666504 14.0101 0.736742 14.1797 0.861766 14.3047C0.98679 14.4298 1.15636 14.5 1.33317 14.5H2.2825C2.54164 15.0938 2.96819 15.5991 3.50998 15.9543C4.05177 16.3095 4.68533 16.4991 5.33317 16.5H11.9998C12.8836 16.4989 13.7308 16.1474 14.3557 15.5225C14.9806 14.8976 15.3321 14.0504 15.3332 13.1667V3.83333C15.3321 2.9496 14.9806 2.10237 14.3557 1.47748C13.7308 0.852588 12.8836 0.501059 11.9998 0.5V0.5ZM13.9998 13.1667C13.9998 13.6971 13.7891 14.2058 13.4141 14.5809C13.039 14.956 12.5303 15.1667 11.9998 15.1667H5.33317C4.80274 15.1667 4.29403 14.956 3.91896 14.5809C3.54388 14.2058 3.33317 13.6971 3.33317 13.1667V3.83333C3.33317 3.3029 3.54388 2.79419 3.91896 2.41912C4.29403 2.04405 4.80274 1.83333 5.33317 1.83333H11.9998C12.5303 1.83333 13.039 2.04405 13.4141 2.41912C13.7891 2.79419 13.9998 3.3029 13.9998 3.83333V13.1667ZM8.6665 8.5C9.19694 8.5 9.70565 8.28929 10.0807 7.91421C10.4558 7.53914 10.6665 7.03043 10.6665 6.5C10.6665 5.96957 10.4558 5.46086 10.0807 5.08579C9.70565 4.71071 9.19694 4.5 8.6665 4.5C8.13607 4.5 7.62736 4.71071 7.25229 5.08579C6.87722 5.46086 6.6665 5.96957 6.6665 6.5C6.6665 7.03043 6.87722 7.53914 7.25229 7.91421C7.62736 8.28929 8.13607 8.5 8.6665 8.5ZM11.9998 12.5C11.9998 12.6768 11.9296 12.8464 11.8046 12.9714C11.6796 13.0964 11.51 13.1667 11.3332 13.1667C11.1564 13.1667 10.9868 13.0964 10.8618 12.9714C10.7367 12.8464 10.6665 12.6768 10.6665 12.5C10.6665 11.9696 10.4558 11.4609 10.0807 11.0858C9.70565 10.7107 9.19694 10.5 8.6665 10.5C8.13607 10.5 7.62736 10.7107 7.25229 11.0858C6.87722 11.4609 6.6665 11.9696 6.6665 12.5C6.6665 12.6768 6.59627 12.8464 6.47124 12.9714C6.34622 13.0964 6.17665 13.1667 5.99984 13.1667C5.82303 13.1667 5.65346 13.0964 5.52843 12.9714C5.40341 12.8464 5.33317 12.6768 5.33317 12.5C5.47384 8.09467 11.8605 8.096 11.9998 12.5Z" fill="currentcolor" />
                          </svg>

                          Add from Contacts
                        </button>

                        <button
                          className={`w-full border border-gray-300 py-3 px-2 bg-white rounded-lg font-medium flex justify-center items-center gap-2`}
                        >
                          {/* Replace with your Google Contacts icon */}
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_235_2320)">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3572 6.90313H8.66904C8.66904 7.70268 8.66903 9.30163 8.66413 10.1012H13.1192C12.9485 10.9007 12.3432 12.0203 11.488 12.584C11.488 12.584 11.4863 12.5887 11.4847 12.5879C10.3477 13.3387 8.84711 13.509 7.73293 13.2852C5.98651 12.9382 4.60438 11.6716 4.04321 10.0629C4.04648 10.0605 4.04894 10.0383 4.05139 10.0367C3.70014 9.03889 3.70014 7.70268 4.05139 6.90313H4.05057C4.5031 5.43356 5.92686 4.09278 7.67574 3.72579C9.08236 3.42756 10.6695 3.7504 11.8368 4.84259C11.992 4.69067 13.9851 2.74465 14.1346 2.58634C10.1467 -1.02523 3.7614 0.245216 1.37211 4.90899H1.3713C1.3713 4.90899 1.37212 4.90918 1.36722 4.91798C0.185237 7.20869 0.234247 9.90789 1.37539 12.0891C1.37212 12.0915 1.36967 12.0929 1.36722 12.0953C2.40135 14.1022 4.28337 15.6413 6.55095 16.2274C8.95984 16.859 12.0255 16.4273 14.079 14.5699L14.0815 14.5723C15.8214 13.0052 16.9045 10.3356 16.3572 6.90313Z" fill="currentcolor" />
                            </g>
                            <defs>
                              <clipPath id="clip0_235_2320">
                                <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
                              </clipPath>
                            </defs>
                          </svg>

                          Add from Google Contacts
                        </button>

                        <button
                          className={`w-full border border-gray-300 py-3 px-2 bg-white rounded-lg font-medium flex justify-center items-center gap-2`}
                        >
                          <EnvelopeIcon className="w-5 h-5" />
                          Add by Email
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex-grow h-full relative shadow-sidebar overflow-y-auto">
        <div className="flex w-full h-full p-4">
          {/* Header */}
          <div className="bg-white w-full text-naviblue h-full">
            <div className="flex items-baseline gap-4 h-full">
              <div className="flex items-center gap-5">
                <div className={`${rightSidebarCollapsed ? "block" : "hidden"} text-naviblue w-6 h-6 hover:bg-[#ECECEC] transition-all rounded-lg flex justify-center items-center`} onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}>
                  <LayOutIcon className="h-4 w-4" />
                </div>
                <XMarkIcon className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="px-6 h-full w-full">
                {selectedDocument ? (
                  <div>
                    <span className="text-sm font-medium">{selectedDocument.title}</span>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <p className="text-2xl text-black font-bold">Select or create a document</p>
                  </div>
                )}
                {selectedDocument ? (
                  <div className="flex flex-col h-full max-w-[800px] mx-auto">
                    <div className="flex-grow p-5">
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-medium flex justify-center mt-8 h-full">
                    No Data
                  </p>
                )}
              </div>
            </div>
            {/* Ask AI Section */}
            {isAskAiVisible && (
              <div className="z-50 p-8 w-full grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between bg-white shadow-custom gap-3 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2 text-graytext w-full">
                    <SparklesIcon className="h-6 w-6" />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="border-none outline-none p-1 w-full bg-transparent"
                      placeholder="Ask AI anything"
                    />
                  </div>
                  <div className="flex items-center text-[#848484] font-normal gap-2">
                    <select className="bg-transparent outline-none" onChange={handleSelectChange}>
                      <option value="open">Open Page</option>
                      <option value="close">Close Page</option>
                    </select>
                    <p className="text-lg">@</p>
                    <ArrowUpCircleIcon onClick={sendAiMessage} className="w-7 h-7 text-[#B3B3B3] cursor-pointer hover:text-naviblue" />
                  </div>
                </div>

                {isContentVisible && (
                  <>

                    <div className="bg-white shadow-custom gap-3 px-4 py-3 rounded-lg">
                      {aiSuggestions.length > 0 && (
                        <>
                          <h3 className="text-graytext font-medium">Suggested</h3>
                          <ul className="space-y-3 px-2 mb-3 py-2">
                            {aiSuggestions.map((suggestion, index) => (
                              <li key={index} className="cursor-pointer hover:bg-[#ECECEC] p-2 rounded-lg flex items-center justify-between" onClick={() => {
                                setInputValue(suggestion);
                                setAiSuggestions([]);
                              }}>
                                <div className="flex items-center gap-2">
                                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8 13.8334H14M11 2.8334C11.2652 2.56819 11.6249 2.41919 12 2.41919C12.1857 2.41919 12.3696 2.45577 12.5412 2.52684C12.7128 2.59791 12.8687 2.70208 13 2.8334C13.1313 2.96472 13.2355 3.12063 13.3066 3.29221C13.3776 3.46379 13.4142 3.64769 13.4142 3.8334C13.4142 4.01912 13.3776 4.20302 13.3066 4.3746C13.2355 4.54618 13.1313 4.70208 13 4.8334L4.66667 13.1667L2 13.8334L2.66667 11.1667L11 2.8334Z" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                  {suggestion}
                                </div>
                                <div className="">
                                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <g clip-path="url(#clip0_324_2756)">
                                      <path d="M12.8333 4.00003L12.8333 6.9167L1.64676 6.9167L4.15509 4.40837C4.26135 4.29835 4.32015 4.151 4.31882 3.99805C4.31749 3.8451 4.25614 3.6988 4.14799 3.59064C4.03983 3.48249 3.89352 3.42114 3.74058 3.41981C3.58763 3.41848 3.44028 3.47728 3.33026 3.58353L0.445094 6.4687C0.309634 6.60413 0.20218 6.76491 0.128868 6.94187C0.0555557 7.11882 0.0178221 7.30849 0.0178221 7.50003C0.0178221 7.69158 0.0555557 7.88125 0.128868 8.0582C0.20218 8.23516 0.309634 8.39594 0.445094 8.53137L3.33259 11.4189C3.44228 11.5282 3.59093 11.5896 3.74583 11.5894C3.90074 11.5891 4.04921 11.5274 4.15859 11.4177C4.26797 11.308 4.3293 11.1594 4.32908 11.0045C4.32886 10.8496 4.26711 10.7011 4.15742 10.5917L1.64909 8.08337L12.8333 8.08337L12.8333 11C12.8333 11.1547 12.8948 11.3031 13.0042 11.4125C13.1136 11.5219 13.262 11.5834 13.4167 11.5834C13.5714 11.5834 13.7198 11.5219 13.8291 11.4125C13.9385 11.3031 14 11.1547 14 11L14 4.00003C14 3.84532 13.9385 3.69695 13.8291 3.58756C13.7198 3.47816 13.5714 3.4167 13.4167 3.4167C13.262 3.4167 13.1136 3.47816 13.0042 3.58756C12.8948 3.69695 12.8333 3.84532 12.8333 4.00003Z" fill="#848484" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_324_2756">
                                        <rect width="14" height="14" fill="white" transform="translate(0 14.5) rotate(-90)" />
                                      </clipPath>
                                    </defs>
                                  </svg>

                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {topics.length > 0 && (
                        <>
                          <h3 className="text-graytext font-medium">Write about a topic of</h3>
                          <ul className="space-y-3 px-2 mb-3 py-2">
                            {topics.map((topic, index) => (
                              <li key={index} className="cursor-pointer hover:bg-[#ECECEC] p-2 rounded-lg flex items-center gap-2">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                  <path d="M8 13.8334H14M11 2.8334C11.2652 2.56819 11.6249 2.41919 12 2.41919C12.1857 2.41919 12.3696 2.45577 12.5412 2.52684C12.7128 2.59791 12.8687 2.70208 13 2.8334C13.1313 2.96472 13.2355 3.12063 13.3066 3.29221C13.3776 3.46379 13.4142 3.64769 13.4142 3.8334C13.4142 4.01912 13.3776 4.20302 13.3066 4.3746C13.2355 4.54618 13.1313 4.70208 13 4.8334L4.66667 13.1667L2 13.8334L2.66667 11.1667L11 2.8334Z" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="w-5/12">
            {/* Header */}
            <div className="px-6 pb-4">
              <div className="text-center border border-bordercolor p-3 rounded-xl">
                <span className="text-sm font-semibold text-lightgraytext">82 - <span className="text-green-700">A</span> </span>
                <h2 className="text-lg font-medium text-graytext">Overall Score</h2>
              </div>
            </div>
            <div className="px-6">
              {/* All Suggestions */}
              <div className="mt-4 h-full">
                <div className="flex items-center mb-3 justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-black">All Suggestions </h3>
                    <p className="text-sm w-7 h-7 rounded-full font-bold bg-[#ECECEC] flex justify-center items-center">12</p>
                  </div>
                  <button className="text-center text-sm font-medium text-[#374957] border border-bordercolor p-1 rounded-md">Accept All</button>
                </div>
                {/* Suggestion Items */}
                <div className="space-y-4">

                  {suggestion.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-center bg-white shadow-custom gap-3 px-4 py-3 rounded">
                      <div className={`w-1.5 h-1.5 ${suggestion.color} rounded-full`}></div>
                      <div className="flex gap-3 items-center">
                        <span className="text-sm font-semibold whitespace-nowrap">{suggestion.status}</span>
                        <div className="w-[3px] h-[3px] bg-graytext rounded-full"></div>
                        <span className="text-sm text-graytext">{suggestion.message}</span>
                      </div>
                    </div>
                  ))}
                  {/* Spelling Suggestion */}
                  <div className="flex items-baseline bg-white shadow-custom gap-3 px-4 py-3 rounded">
                    <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex gap-3 justify-between items-center w-full">
                        <span className="text-sm text-graytext">Spelling</span>
                        <div className="flex text-graytext gap-2 items-center">
                          <XMarkIcon className="w-5 h-5" />
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className=" line-through flex items-center gap-2">Control <ArrowRightIcon className="w-4 h-4" /></p>
                        <button className=" bg-green-600 text-white px-2 py-1 rounded">
                          Control
                        </button>

                      </div>
                      <p className="text-xs text-gray-900">
                        Lorem ipsum dolor sit amet consectetur. Neque pellentesque ut libero tristique in dictum. Auctor odio donec vitae blandit.
                      </p>
                      <div className="flex justify-end items-center">
                        <button className="mt-2 text-xs bg-[#ECECEC] text-graytext px-3 py-2 rounded flex justify-center items-center gap-1 font-medium">
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.756567 5.7435L2.83957 7.8265C3.12086 8.10771 3.50232 8.26568 3.90007 8.26568C4.29781 8.26568 4.67927 8.10771 4.96057 7.8265L11.3936 1.3935C11.4846 1.2992 11.535 1.1729 11.5339 1.0418C11.5328 0.910699 11.4802 0.785293 11.3875 0.692589C11.2948 0.599885 11.1694 0.547301 11.0383 0.546161C10.9072 0.545022 10.7809 0.595419 10.6866 0.686498L4.25357 7.1195C4.1598 7.21324 4.03265 7.26589 3.90007 7.26589C3.76749 7.26589 3.64033 7.21324 3.54657 7.1195L1.46357 5.0365C1.36927 4.94542 1.24296 4.89502 1.11187 4.89616C0.980768 4.8973 0.855362 4.94989 0.762658 5.04259C0.669954 5.13529 0.617369 5.2607 0.61623 5.3918C0.615091 5.5229 0.665488 5.6492 0.756567 5.7435V5.7435Z" fill="#5F5C6F" />
                          </svg>

                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                  {suggestion.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-center bg-white shadow-custom gap-3 px-4 py-3 rounded">
                      <div className={`w-1.5 h-1.5 ${suggestion.color} rounded-full`}></div>
                      <div className="flex gap-3 items-center">
                        <span className="text-sm font-semibold whitespace-nowrap">{suggestion.status}</span>
                        <div className="w-[3px] h-[3px] bg-graytext rounded-full"></div>
                        <span className="text-sm text-graytext">{suggestion.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-bg py-2 px-8 flex justify-between items-center text-naviblue !sticky w-full !bottom-0 border-t border-bordercolor">
          {/* <ul className="flex gap-3 items-center">
            <li
              className="flex gap-2 items-center border-r border-gray-300 pr-3 cursor-pointer"
              onClick={handleAskAiClick}
            >
              <SparklesIcon className="h-5 w-5" />
              <p>Ask AI</p>
            </li>
            <li className="flex gap-2 items-center border-r border-gray-300 pr-3 cursor-pointer">
              <PlusIcon />
              <p>Comment</p>
            </li>
            <li className="flex gap-2 items-center border-r border-gray-300 pr-3">
              <ArrowUturnRightIcon className="h-5 w-5" />
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </li>
            <li className="flex gap-2 items-center border-r border-gray-300 pr-3">
              <ClockIcon />
            </li>
            <li className="flex gap-2 items-center pr-3">
              <BookmarkIcon className="h-5 w-5" />
            </li>
            <li className="flex gap-2 items-center pr-3">
              <EllipsisHorizontalIcon className="h-8 w-8" />
            </li>
          </ul>
          <select className="bg-transparent">
            <option value="">1,158 Words</option>
          </select> */}
        </div>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
        <div className="bg-white rounded-lg shadow-lg w-[450px] p-5 relative">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h2 className="text-lg font-semibold">Upload File or Folder</h2>
            <button onClick={handleClose} className="text-naviblue hover:text-gray-700">
              <CloseIcon />
            </button>
          </div>

          <div className="mb-3">
            <h5 className="text-graytext font-medium mb-1">Select files or folder to upload</h5>
            <p className="m-0 text-xs text-lightgraytext">The selected file or folder will open once you upload</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="flex justify-start items-center gap-4 mb-8">
                <svg width="41" height="48" viewBox="0 0 41 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28.5 32C28.5 32.5305 28.2893 33.0392 27.9142 33.4143C27.5391 33.7893 27.0304 34 26.5 34H22.5V38C22.5 38.5305 22.2893 39.0392 21.9142 39.4143C21.5391 39.7893 21.0304 40 20.5 40C19.9696 40 19.4609 39.7893 19.0858 39.4143C18.7107 39.0392 18.5 38.5305 18.5 38V34H14.5C13.9696 34 13.4609 33.7893 13.0858 33.4143C12.7107 33.0392 12.5 32.5305 12.5 32C12.5 31.4696 12.7107 30.9609 13.0858 30.5858C13.4609 30.2108 13.9696 30 14.5 30H18.5V26C18.5 25.4696 18.7107 24.9609 19.0858 24.5858C19.4609 24.2108 19.9696 24 20.5 24C21.0304 24 21.5391 24.2108 21.9142 24.5858C22.2893 24.9609 22.5 25.4696 22.5 26V30H26.5C27.0304 30 27.5391 30.2108 27.9142 30.5858C28.2893 30.9609 28.5 31.4696 28.5 32ZM40.5 20.97V38C40.4968 40.6512 39.4422 43.1929 37.5676 45.0676C35.6929 46.9423 33.1512 47.9969 30.5 48H10.5C7.84881 47.9969 5.30712 46.9423 3.43244 45.0676C1.55776 43.1929 0.503176 40.6512 0.5 38V10C0.503176 7.34886 1.55776 4.80716 3.43244 2.93249C5.30712 1.05781 7.84881 0.00322181 10.5 4.60973e-05H19.53C21.3692 -0.00468775 23.1912 0.355222 24.8904 1.05896C26.5897 1.76271 28.1327 2.79632 29.43 4.10005L36.398 11.072C37.7025 12.3685 38.7367 13.911 39.4409 15.61C40.145 17.309 40.505 19.1309 40.5 20.97V20.97ZM26.602 6.92805C25.9726 6.31837 25.2659 5.79389 24.5 5.36805V14C24.5 14.5305 24.7107 15.0392 25.0858 15.4143C25.4609 15.7893 25.9696 16 26.5 16H35.132C34.7059 15.2344 34.1807 14.5283 33.57 13.9L26.602 6.92805ZM36.5 20.97C36.5 20.64 36.436 20.324 36.406 20H26.5C24.9087 20 23.3826 19.3679 22.2574 18.2427C21.1321 17.1175 20.5 15.5913 20.5 14V4.09405C20.176 4.06405 19.858 4.00005 19.53 4.00005H10.5C8.9087 4.00005 7.38258 4.63219 6.25736 5.75741C5.13214 6.88262 4.5 8.40875 4.5 10V38C4.5 39.5913 5.13214 41.1175 6.25736 42.2427C7.38258 43.3679 8.9087 44 10.5 44H30.5C32.0913 44 33.6174 43.3679 34.7426 42.2427C35.8679 41.1175 36.5 39.5913 36.5 38V20.97Z" fill="#5F5C6F" />
                </svg>

                <p className="font-medium text-gray-600">Click or drag to upload your document</p>
              </div>
              <p className="text-[9px] text-gray-400">The Selected file or folder must be under 10 MB or <a href="#" className="underline">upgrade to premium</a></p>
            </div>
          </div>

          <div className="flex items-center justify-center my-6 text-gray-400">
            <span className="block w-1/5 border-t border-gray-300"></span>
            <span className="px-3">OR</span>
            <span className="block w-1/5 border-t border-gray-300"></span>
          </div>

          <div className="mb-4">
            <div className="mb-3">
              <h5 className="text-graytext font-medium mb-1">Enter a URL</h5>
              <p className="m-0 text-xs text-lightgraytext">Type a URL you want to upload</p>
            </div>
            <input
              type="text"
              placeholder="Press Enter to confirm a URL"
              className="w-full p-3 border rounded-lg text-sm placeholder-gray-400 bg-transparent focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleClose}
              className="py-2 px-4 border text-[#B3B3B3] rounded-lg"
            >
              Cancel
            </button>
            <button className="py-2 px-4 border text-naviblue rounded-lg">
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className={`${islibarayModelOpen ? '' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
        <div className="bg-white rounded-lg shadow-lg w-[450px] p-5 relative">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h2 className="text-lg font-semibold">Connect Library</h2>
            <button onClick={() => setIslibarayModelOpen(false)} className="text-naviblue hover:text-gray-700">
              <CloseIcon />
            </button>
          </div>

          <ul className="mt-3 px-4 h-52 overflow-auto space-y-1" style={{ scrollbarWidth: "none" }}>
            <li className="flex items-center justify-between text-naviblue font-medium hover:bg-[#ECECEC] px-3 py-2 rounded-lg">
              <span>France library</span>
              <button className="">
                <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
              </button>
            </li>
            <li className="flex items-center justify-between text-naviblue font-medium hover:bg-[#ECECEC] px-3 py-2 rounded-lg">
              <span>History of greece</span>
              <button className="">
                <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
              </button>
            </li>
            <li className="flex items-center justify-between text-naviblue font-medium hover:bg-[#ECECEC] px-3 py-2 rounded-lg">
              <span>Ancient Egypt</span>
              <button className="">
                <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
              </button>
            </li>
            <li className="flex items-center justify-between text-naviblue font-medium hover:bg-[#ECECEC] px-3 py-2 rounded-lg">
              <span>France library</span>
              <button className="">
                <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
              </button>
            </li>
          </ul>
          <div className="flex justify-end space-x-2 mt-8">
            <button
              onClick={handleClose}
              className="py-2 px-4 border text-[#B3B3B3] rounded-lg"
            >
              Cancel
            </button>
            <button className="py-2 px-4 border text-naviblue rounded-lg">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Docs;

const membersData = [
  {
    name: "John Smith",
    role: "Admin",
    status: "online",
    avatar: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid", // Replace with actual image URL
  },
  {
    name: "John Smith",
    role: "Editor",
    status: "online",
    avatar: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid",
  },
  {
    name: "John Smith",
    role: "Viewer",
    status: "online",
    avatar: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid",
  },
  {
    name: "John Smith",
    role: "Viewer",
    status: "offline",
    avatar: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid",
  },
  {
    name: "John Smith",
    role: "Admin",
    status: "offline",
    avatar: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid",
  },
  {
    name: "John Smith",
    role: "Editor",
    status: "offline",
    avatar: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid",
  },
];
