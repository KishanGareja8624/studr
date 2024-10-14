"use client";

import React, { useEffect, useRef, useState } from "react";
import "../docs/docs/Docs.css";
import {ChevronRightIcon,DocumentTextIcon,UserIcon,Cog6ToothIcon,MoonIcon,SunIcon,ArrowUpCircleIcon,MagnifyingGlassIcon,} from "@heroicons/react/24/outline";
import { ArrowRightIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DropdownMenu from "../components/dropdown/DropdownMenu";
import Modals from "../components/common/modals";
import { SparklesIcons, PlusIcon, BookMarkIcon, ClockIcon, ArchivedIcon, DownIcon, SearchIcon, FileTextIcon, DuplicateIcon, CloseIcon, ShortingIcon, EditBoxPencilIcon, LayOutIcon, DaimondIcon, CricleQuestionIcon, LogOutIcon, UploadFileIcon, FillClockIcon, BookIcon, AddArrowIcon, BulbIcon, EditPencilIcon, LightSearchIcon } from "../components/icons/icons"
import Link from "next/link";
import Library from "../library/page";
import Myaccount from "../my-account/page";
import { motion } from 'framer-motion';
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

interface ExpandedDaysState {
  [key: string]: boolean;
}
const Docs: React.FC = () => {
  const days = [
    {
      id: 1,
      date: 'Previous 7 Days',
      deletedFiles: ['History of Greece', 'Ancient Egypt', 'Cultural Check', 'Society Presssure'],
    },
    {
      id: 2,
      date: 'Previous 30 Days',
      deletedFiles: ['History of Greece', 'Ancient Egypt', 'Cultural Check', 'Society Presssure'],
    },

  ];
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "folder-1",
      name: "Default Folder",
      documents: [],
      subheaders: [],
    },
  ]);
  const [collapsedSubheaders, setCollapsedSubheaders] = useState<{
    [key: string]: boolean;
  }>({});
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Premium');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isContentVisible, setContentVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [expandedDays, setExpandedDays] = useState<ExpandedDaysState>(() => {
    const initialState: ExpandedDaysState = {};
    days.forEach(day => {
      initialState[day.date] = true;
    });
    return initialState;
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFileEditPopup, setFileEditPopup] = useState({ fileIndex: null, parentId: null });
  const [expandedItems, setExpandedItems] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const myAccountRef = useRef<HTMLDivElement | null>(null);
  const [historySidebarCollapsed, setHistorySidebarCollapsed] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [isMyaccountOpen, setIsMyaccountOpen] = useState(false);
  const [openSections, setOpenSections] = useState<any>([]);

  const [files, setFiles] = useState<any>([]);
  const [editIndex, setEditIndex] = useState<any>(-1);
  const [tempFileName, setTempFileName] = useState<any>('');

  const addFile = () => {
    const defaultName = `Document ${files.length + 1}`;
    setFiles((prev: any) => [
      ...prev,
      { name: defaultName, isEditing: true, children: [], isOpen: false }
    ]);
  };

  const renameFile = (index: any) => {
    const updatedFiles = [...files];
    updatedFiles[index].name = tempFileName || updatedFiles[index].name;
    updatedFiles[index].isEditing = false;
    setFiles(updatedFiles);
    setTempFileName('');
    setEditIndex(-1);
  };

  const addChildFile = (index: any) => {
    const childName = `Child ${files[index].children.length + 1}`;
    const updatedFiles = [...files];
    updatedFiles[index].children.push({ name: childName, isEditing: true });

    updatedFiles[index].isOpen = true;

    setFiles(updatedFiles);
  };

  const renameChildFile = (parentIndex: any, childIndex: any) => {
    const updatedFiles = [...files];
    updatedFiles[parentIndex].children[childIndex].name = tempFileName || updatedFiles[parentIndex].children[childIndex].name;
    updatedFiles[parentIndex].children[childIndex].isEditing = false;
    setFiles(updatedFiles);
    setTempFileName('');
  };

  const toggleChildren = (index: any) => {
    const updatedFiles = [...files];
    updatedFiles[index].isOpen = !updatedFiles[index].isOpen;
    setFiles(updatedFiles);
  };

  const handleDelete = () => {
    if (selectedDocument) {
      console.log(`Deleting document with ID: ${selectedDocument.id}`);
    }
  };

  const handleDownload = (format: "pdf" | "docx") => {
    if (selectedDocument) {
      console.log(`Downloading document with ID: ${selectedDocument.id} as ${format}`);
    }
  };

  const toggleExpand = (itemName: any) => {
    setExpandedItems((prev: any) =>
      prev.includes(itemName)
        ? prev.filter((name: any) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleRenameclick = (child: any, index: any) => {
    setTempFileName(child.name);
    setEditIndex(index as any);
    child.isEditing = true;
    setFiles([...files]);
  }
  
  const FolderComponent: React.FC<{ folder: Folder }> = () => {
    const [isDropdownVisible, setDropdownVisible] = useState<any>(false);
    return (
      <div className="folder rounded-lg mb-4">
        <div className="mt-2">

          {files.map((file: any, index: any) => (
            <div key={index} className=" mb-2">
              <div className="flex items-center space-x-2">

                {file.isEditing ? (
                  <input
                    type="text"
                    value={tempFileName}
                    onChange={(e) => setTempFileName(e.target.value)}
                    placeholder="Rename File"
                    className="border p-1 mr-2 focus:outline-none focus:border-blue-500 bg-transparent rounded-lg text-sm"
                    onBlur={() => renameFile(index as any)} // Automatically rename on blur
                    onKeyPress={(e) => e.key === 'Enter' && renameFile(index as any)} // Rename on Enter key
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-3 w-full">
                      <span className="font-medium text-naviblue dark:text-darktext cursor-pointer">{file.name}</span>
                      <div className="flex items-center gap-4 text-naviblue dark:text-darktext">
                        <div className="" onClick={() => addChildFile(index as any)}>
                          <PlusIcon className="w-3 h-3" />
                        </div>
                        {file.children.length > 0 && (
                          <div className="" onClick={() => toggleChildren(index as any)}>
                            {file.isOpen ? <DownIcon className="w-3 h-3" /> : <DownIcon className="w-3 h-3 transform rotate-180" />}
                          </div>)}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Render child files if open */}
              {file.isOpen && file.children.map((child: any, childIndex: any) => (
                <div key={childIndex} className="ml-4 flex items-center mb-1 space-x-2">
                  {child.isEditing ? (
                    <div
                      className="flex items-center justify-between mb-1 w-full cursor-pointer dark:text-darktext hover:bg-[#ECECEC] dark:hover:bg-darkbg rounded-md py-1.5 px-2 text-[#374957] text-sm font-medium gap-2"
                    >
                      <div className="bg-white dark:bg-[#000] w-7 h-7 flex justify-center items-center rounded-md border dark:border-darkbg">
                        <FileTextIcon />
                      </div>
                      <input
                        type="text"
                        value={tempFileName}
                        onChange={(e) => setTempFileName(e.target.value)}
                        placeholder="Rename Child File"
                        className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent"
                        onBlur={() => renameChildFile(index, childIndex)} // Automatically rename on blur
                        onKeyPress={(e) => e.key === 'Enter' && renameChildFile(index, childIndex)} // Rename on Enter key
                      />
                    </div>

                  ) : (
                    <>
                      <div
                        className="flex items-center justify-between mb-1 w-full cursor-pointer dark:text-darktext hover:bg-[#ECECEC] dark:hover:bg-darkbg rounded-md py-1.5 px-2 text-[#374957] text-sm font-medium gap-2"
                      >
                        <Link href="/dashboard/editor" className="flex items-center gap-2">
                          <div className="bg-white dark:bg-[#000] w-7 h-7 flex justify-center items-center rounded-md border dark:border-darkbg">
                            <FileTextIcon />
                          </div>
                          <span>{child.name}</span>
                        </Link>
                        <div className="relative">
                          <EllipsisHorizontalIcon
                            className="h-6 w-6  cursor-pointer "
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                          />
                          <DropdownMenu
                            isVisible={isDropdownVisible}
                            onClose={() => setDropdownVisible(false)}
                            onDelete={handleDelete}
                            onDownload={handleDownload}
                            handleRenameclick={handleRenameclick}
                            index={index}
                            child={child}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const welcomeMessage = { text: 'A new user has joined the chat!', type: 'system' };
    setMessages((prevMessages) => [...prevMessages, welcomeMessage] as any);
  }, []);

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

  const openModal = ({ name }: any) => {
    console.log('name', name);
    setModalName(name);
    setIsRecentOpen(true);
  };

  const CloseModal = () => {
    setIsRecentOpen(false);
    setIsPopupOpen(false)
    setFileEditPopup({ fileIndex: null, parentId: null });
  };

  const toggleDay = (day: any) => {
    setExpandedDays((prev: any) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const toggleModalPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleFilePopup = (fileIndex: any, parentId: any) => {
    if (isFileEditPopup.fileIndex === fileIndex && isFileEditPopup.parentId === parentId) {
      setFileEditPopup({ fileIndex: null, parentId: null });
    } else {
      setFileEditPopup({ fileIndex, parentId });
    }
  };

  const allSuggestions = ['History of Germany', 'Science Innovations', 'Cultural Heritage', 'Technology Advances'];


  const openSearchModal = () => {
    setIsSearchOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeSearchModal();
      } else if (myAccountRef.current && !myAccountRef.current.contains(event.target)) {
        handleMyaccountopenclose()
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, myAccountRef]);

  const sections = [
    {
      title: 'Previous 7 Days',
      tasks: ['Drafting an outline', 'Email to HR', 'Ancient Egypt', 'Solution to world hung...'],
    },
    {
      title: 'Previous 30 Days',
      tasks: ['Drafting an outline'],
    },
    {
      title: 'July',
      tasks: ['Drafting an outline', 'Email to HR', 'Ancient Egypt', 'Solution to world hung...'],
    },
  ];

  const toggleSection = (index: any) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter((i: any) => i !== index)); // Close the section
    } else {
      setOpenSections([...openSections, index]); // Open the section
    }
  };

  const handleMyaccountopen = () => {
    setIsMyaccountOpen(true)
    setIsOpen(false);
  }

  const handleMyaccountopenclose = () => {
    setIsMyaccountOpen(false);
  };

  const handleHistorySidebarOpem = () => {
    setHistorySidebarCollapsed(!historySidebarCollapsed)
    setLibraryOpen(false)
  }

  const handleLibrarySidebarOpem = () => {
    setHistorySidebarCollapsed(false)
    setLibraryOpen(!libraryOpen)
  }

  // Check localStorage and system preferences on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div className="flex w-full h-full bg-white dark:bg-[#121212]" >
      <motion.div style={{ scrollbarWidth: "none" }}
        className={`border-r border-bordercolor dark:border-black custom-scrollbar bg-bg dark:bg-black sticky top-0 h-full overflow-y-auto`}
        initial={{ width: 0 }}  // Initial width for collapsed state
        animate={{ width: leftSidebarCollapsed ? 0 : '20rem' }} // Adjust '20rem' based on your desired width
        transition={{ duration: 0.5, ease: "easeInOut" }} >
        <>
          <div className="px-5 py-3">
            <div className="flex justify-between items-center mb-8">
              <div className="relative">
                <div
                  className={`${isOpen ? 'bg-[#E4E4E4] dark:bg-darkbg' : 'bg-transparent'} text-black dark:text-darktext p-1 rounded-md flex items-center gap-4 text-base font-bold cursor-pointer`}
                  onClick={togglePopup}
                >
                  <span>Albin Holmgren</span>
                  <DownIcon />
                </div>

                {isOpen && (
                  <div className="absolute left-0 top-9 p-4 w-fit whitespace-nowrap z-10 bg-white dark:bg-darkbg rounded-[10px] shadow-popup">
                    <ul>
                      <li className="mb-1 relative group ">
                        <div className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-[#000] rounded-lg">
                          <button
                            className="flex items-center gap-2 text-sm text-naviblue dark:text-darktext w-full text-left font-medium p-2 "
                          >
                            <DaimondIcon className="h-5 w-5" />
                            <span>Plan</span>
                          </button>
                          <button
                            className="flex items-center justify-end gap-2 text-sm text-[#AEADB5]  w-full text-left font-medium p-2 rounded-[10px]"
                          >
                            <span>{selectedItem}</span>
                            <ChevronRightIcon className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="absolute -right-2 top-9 z-50 bg-white dark:bg-[#121212] divide-y divide-gray-100 rounded-lg shadow w-44 group-hover:block hidden">
                          <ul className="py-2 text-sm text-naviblue dark:text-darktext font-medium">
                            <li>
                              <a href="#" onClick={() => handleSelect('Premium')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#000]">Premium</a>
                            </li>
                            <li>
                              <a href="#" onClick={() => handleSelect('Golden')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#000]">Golden</a>
                            </li>
                            <li>
                              <a href="#" onClick={() => handleSelect('Free')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#000]">Free</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mb-1">
                        <button className="flex items-center gap-2 text-sm text-naviblue dark:text-darktext hover:bg-gray-100 dark:hover:bg-[#000] w-full text-left font-medium p-2 rounded-lg">
                          <UserIcon className="h-5 w-5" />
                          <span>Profile</span>
                        </button>
                      </li>
                      <li className="mb-1">
                        <button onClick={handleMyaccountopen} className="flex items-center gap-2 text-sm text-naviblue dark:text-darktext hover:bg-gray-100 dark:hover:bg-[#000] w-full text-left font-medium p-2 rounded-lg">
                          <Cog6ToothIcon className="h-5 w-5" />
                          <span>Settings</span>
                        </button>
                      </li>
                      <li className="py-2 border-t flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-naviblue dark:text-darktext w-full text-left font-medium p-2 rounded-lg">
                          {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                          <span>{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
                        </div>
                        <div className="relative" onClick={toggleTheme}>
                          <input
                            type="checkbox"
                            id="toggleB"
                            className="sr-only"
                            checked={isDarkMode}
                            readOnly
                          />
                          <motion.div
                            className="block bg-[#E5E5E5] w-10 h-6 rounded-full"
                            initial={{ backgroundColor: isDarkMode ? '#4B5563' : '#E5E5E5' }}
                            animate={{ backgroundColor: isDarkMode ? '#4B5563' : '#E5E5E5' }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div
                            className={`dot absolute left-1 top-1 w-4 h-4 rounded-full`}
                            initial={{ x: 0 }}
                            animate={{ x: isDarkMode ? 16 : 0 }} // Moves the dot for light/dark mode
                            transition={{ type: 'spring', stiffness: 200 }}
                            style={{
                              backgroundColor: isDarkMode ? 'white' : 'gray',
                            }}
                          />
                        </div>
                      </li>
                      <li className="py-2 border-t ">
                        <button className="flex items-center gap-2 text-sm text-naviblue dark:text-darktext hover:bg-gray-100 dark:hover:bg-[#000] w-full text-left font-medium p-2 rounded-lg">
                          <CricleQuestionIcon className="h-5 w-5" />
                          <span>Support & feedback</span>
                        </button>
                      </li>
                      <li className="py-2 border-t m-0 flex justify-between items-center">
                        <button className="flex items-center gap-2 text-sm text-naviblue dark:text-darktext hover:bg-gray-100 dark:hover:bg-[#000] w-full text-left font-medium p-2 rounded-lg">
                          <LogOutIcon className="h-5 w-5" />
                          <span>Log out of Albin Holmgren</span>
                        </button>
                        <div className=" text-lightgraytext">
                          <ChevronRightIcon className="w-4 h-4" />
                        </div>
                      </li>
                    </ul>

                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-naviblue dark:text-darktext" onClick={openSearchModal}>
                  <SearchIcon />
                </div>
                <div className="text-naviblue dark:text-darktext w-6 h-6 hover:bg-[#ECECEC] transition-all rounded-lg flex justify-center items-center" onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}>
                  <LayOutIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
            <ul className="text-naviblue dark:text-darktext font-medium space-y-3">
              <li className="flex gap-2 items-center">
                <SparklesIcons />
                <p>Assistant</p>
              </li>
              <li className="flex gap-2 items-center cursor-default" onClick={addFile}>
                <PlusIcon />
                <p>New document</p>
              </li>
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => openModal({ name: "Bookmark Lists" })}>
                <BookMarkIcon />
                <p>Bookmark</p>
              </li>
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => openModal({ name: "Recent Files" })}>
                <ClockIcon />
                <p>Recent</p>
              </li>
              <li className="flex gap-2 items-center cursor-pointer !mt-7" onClick={() => openModal({ name: "Drafts" })}>
                <ArchivedIcon />
                <p>Archived</p>
              </li>
            </ul>
            <div className="mt-5">
              {folders.map((folder) => (
                <FolderComponent key={folder.id} folder={folder} />
              ))}
            </div>
          </div>
        </>
      </motion.div>

      <div className="flex-grow h-full relative">
        {/* Header */}
        <div className="bg-[#FFFFFF] dark:bg-[#121212] px-8 flex justify-between items-center z-50 sticky top-0 border-b border-bordercolor dark:border-black">
          {/* {libraryOpen ? (
            <>
              <div className="flex gap-4 items-center relative">
                <div className={` py-2 flex items-center gap-2 font-medium cursor-pointer`}>
                  <form className="flex flex-col items-center gap-2 border py-2 px-3 rounded-lg border-bordercolor ">
                    <label className="font-medium flex items-center gap-2 cursor-pointer">
                      <UploadFileIcon className="w-5 h-5" />
                      <span>Upload File</span>
                      <input type="file" className="hidden" />
                    </label>
                  </form>
                </div>
                <MagnifyingGlassIcon className="w-5 h-5 text-graytext" />
              </div>
            </>
          ) : (
            <>
            </>
          )} */}
          <div className="flex gap-6 items-center ">
            {leftSidebarCollapsed && (
              <div className="text-naviblue dark:text-darktext w-6 h-6 hover:bg-[#ECECEC] transition-all rounded-lg flex justify-center items-center" onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}>
                <LayOutIcon className="w-4 h-4" />
              </div>
            )}
            <div className="relative">
              <Link href="" onClick={handleHistorySidebarOpem} className={`${historySidebarCollapsed ? " before:w-16 before:h-1.5 before:content-[''] before:z-10 before:absolute before:bottom-0   before:left-5 before:rounded-t-xl before:bg-[#D9D9D9]" : ""} text-naviblue dark:text-darktext py-4 flex items-center gap-2 font-medium cursor-pointer`}>
                <FillClockIcon />
                Histroy
              </Link>
            </div>
            <div className="relative">
              <Link href="" onClick={handleLibrarySidebarOpem} className={`${libraryOpen ? " before:w-16 before:h-1.5 before:content-[''] before:z-10 before:absolute before:bottom-0   before:left-5 before:rounded-t-xl before:bg-[#D9D9D9]" : ""} text-naviblue dark:text-darktext py-4 flex items-center gap-2 font-medium cursor-pointer`}>
                <BookIcon />
                Library
              </Link>
            </div>
          </div>

        </div>
        {/* {libraryOpen && (
          <div className="w-full h-full overflow-auto px-6 pb-5 bg-white border-radius-2xl">
            <Library />
          </div>
        )} */}
        <div className="flex h-full">
          <div className="relative h-full">
            <div style={{ scrollbarWidth: "none" }} className={` fixed top-0 left-0 h-full z-10 overflow-auto transition-all duration-500 custom-scrollbar ${!historySidebarCollapsed ? 'w-0' : 'w-80  border-r border-bordercolor'} bg-bg sticky top-0 h-full overflow-y-auto`}>
              {historySidebarCollapsed && (
                <>
                  <div className="bg-gray-50 p-5 w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className=" font-semibold flex items-center gap-2">History</h2>
                      <div className="flex items-center gap-4">
                        <EditBoxPencilIcon className="h-5 w-5 text-naviblue dark:text-darktext" />
                        <SearchIcon className="h-5 w-5 text-naviblue dark:text-darktext" />

                      </div>
                    </div>
                    {sections.map((section: any, index: any) => (
                      <div key={index} className="mb-6">
                        <div
                          className="flex justify-between items-center mb-3 text-naviblue dark:text-darktext cursor-pointer"
                          onClick={() => toggleSection(index)}
                        >
                          <h2 className="font-medium">{section.title}</h2>
                          <DownIcon className={`transform transition-transform duration-200 ${openSections.includes(index) ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                        {openSections.includes(index) && (
                          <ul>
                            {section.tasks.map((task: any, taskIndex: any) => (
                              <li
                                key={taskIndex}
                                className="flex items-center justify-between mb-1 hover:bg-[#ECECEC] group rounded-md p-2 text-[#374957] text-sm font-medium gap-2"
                              >
                                <span>{task}</span>
                                <EllipsisHorizontalIcon className="w-5 h-5 group-hover:block hidden" />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="relative h-full">
            <div className={` fixed top-0 left-0 z-50  transition-all duration-500 ${!libraryOpen ? 'w-0' : 'w-80  border-r border-bordercolor'} bg-bg sticky top-0 h-full`}>
              {libraryOpen && (
                <>
                  <div className="px-6 relative h-full">
                    <h3 className="text-base font-bold text-black py-6">Library</h3>
                    <ul className="mt-3 px-4 space-y-4 h-full overflow-auto">
                      <li className="flex items-center justify-between text-naviblue dark:text-darktext font-medium">
                        <span>France library</span>
                        <button className="">
                          <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                        </button>
                      </li>
                      <li className="flex items-center justify-between text-naviblue dark:text-darktext font-medium">
                        <span>History of greece</span>
                        <button className="">
                          <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                        </button>
                      </li>
                      <li className="flex items-center justify-between text-naviblue dark:text-darktext font-medium">
                        <span>Ancient Egypt</span>
                        <button className="">
                          <CloseIcon className="w-2 h-2 text-[#AEADB5]" />
                        </button>
                      </li>
                    </ul>
                    <div className="flex items-center justify-between sticky bottom-9  w-full p-2 mt-2 h-10 border text-naviblue dark:text-darktext font-medium rounded-xl bg-white">
                      <button
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
            </div>
          </div>
          {/* Footer */}
          <div className=" py-2 px-8 flex justify-center items-end h-full sticky w-full bottom-0 pb-10 z-0 flex-grow">
            <div className="z-50 p-8 w-full flex flex-col justify-end items-center gap-3  overflow-auto h-full" style={{ scrollbarWidth: "none" }}>
              {isContentVisible && (
                <>
                  <div className="w-1/2 gap-3 px-4 py-3 rounded-lg">
                    <h2 className="font-semibold mb-4 text-white dark:text-darktext">Hi Albin Holmgren! How can I help you today?</h2>
                    {aiSuggestions.length > 0 && (
                      <>
                        <h3 className="text-naviblue dark:text-darktext font-medium">Suggested</h3>
                        <ul className="space-y-3 px-2 mb-3 py-2">
                          {aiSuggestions.map((suggestion, index) => (
                            <li key={index} className="cursor-pointer hover:bg-[#ECECEC] p-2 rounded-full flex items-center justify-between" onClick={() => {
                              setInputValue(suggestion);
                              setAiSuggestions([]);
                            }}>
                              <div className="flex items-center gap-2">
                                <BulbIcon className="h-5 w-5" />
                                {suggestion}
                              </div>
                              <div className="">
                                <AddArrowIcon className="h-5 w-5" />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {topics.length > 0 && (
                      <>
                        <h3 className="text-naviblue dark:text-darktext font-medium">Draft</h3>
                        <ul className="space-y-3 px-2 mb-3 py-2">
                          {topics.map((topic, index) => (
                            <li key={index} className="cursor-pointer hover:bg-[#ECECEC] p-2 rounded-lg flex items-center gap-2">
                              <EditPencilIcon className="h-5 w-5" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </>
              )}
              <div className={`${historySidebarCollapsed ? "w-full" : "w-[700px]"} flex items-center justify-center bg-white dark:bg-[#2f2f2f] dark:border-[#2f2f2f] gap-3 px-4 py-2 rounded-full border`}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="border-none outline-none p-1 w-full bg-transparent"
                  placeholder="Ask anything or select action..."
                />
                <div className="flex items-center text-[#848484] font-normal gap-2">
                  <select className="bg-transparent outline-none" onChange={handleSelectChange}>
                    <option value="open">Open Page</option>
                    <option value="close">Close Page</option>
                  </select>
                  <p className="text-lg">@</p>
                  <ArrowUpCircleIcon onClick={sendAiMessage} className="w-7 h-7 text-[#B3B3B3] cursor-pointer hover:text-gray-500" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {
        isRecentOpen && (
          <>
            <Modals modalName={modalName} closeModal={CloseModal} toggleModalPopup={toggleModalPopup} isPopupOpen={isPopupOpen} expandedDays={expandedDays} isFileEditPopup={isFileEditPopup} toggleFilePopup={toggleFilePopup} days={days} toggleDay={toggleDay} />
          </>
        )
      }

      {
        isSearchOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-white rounded-xl shadow-lg  w-5/12 h-[568px] overflow-y-auto text-sm" ref={modalRef} style={{ scrollbarWidth: "none" }}>
              <div className="flex items-center gap-2  pt-4 border-b px-4 pb-2 !sticky w-full !top-0 bg-white">
                <LightSearchIcon />
                <input type="text" className="w-full py-1 outline-none border-none bg-transparent" placeholder="Search or ask a question" />
              </div>
              <div className="p-4 grid grid-cols-1 gap-4">
                <div className="">
                  <h4 className="text-[#999999] font-medium mb-2">Actions</h4>
                  <ul>
                    <li className="flex items-center gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg">
                      <SparklesIcons />
                      <span className="text-black font-medium">Ask AI about...</span>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <h4 className="text-[#999999] font-medium mb-2">Today</h4>
                  <ul>
                    <li className="flex items-center gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg">
                      <FileTextIcon />
                      <span className="text-black font-medium">History of Greece</span>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <h4 className="text-[#999999] font-medium mb-2">Past week</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center justify-between gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <FileTextIcon />
                        <span className="text-black font-medium">Ancient Egypt</span>
                      </div>
                      <div className="">
                        <p className="m-0 text-[#B3B3B3] text-sm group-hover:hidden block">Sept 19</p>
                        <div className="group-hover:block hidden">
                          <AddArrowIcon className="h-5 w-5" />

                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <FileTextIcon />
                        <span className="text-black font-medium">Ancient Egypt</span>
                      </div>
                      <div className="">
                        <p className="m-0 text-[#B3B3B3] text-sm group-hover:hidden block">Sept 19</p>
                        <div className="group-hover:block hidden">
                          <AddArrowIcon className="h-5 w-5" />

                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <FileTextIcon />
                        <span className="text-black font-medium">Ancient Egypt</span>
                      </div>
                      <div className="">
                        <p className="m-0 text-[#B3B3B3] text-sm group-hover:hidden block">Sept 19</p>
                        <div className="group-hover:block hidden">
                          <AddArrowIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <FileTextIcon />
                        <span className="text-black font-medium">Ancient Egypt</span>
                      </div>
                      <div className="">
                        <p className="m-0 text-[#B3B3B3] text-sm group-hover:hidden block">Sept 19</p>
                        <div className="group-hover:block hidden">
                          <AddArrowIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <h4 className="text-[#999999] font-medium mb-2">Past 30 days</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center justify-between gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <FileTextIcon />
                        <span className="text-black font-medium">Ancient Egypt</span>
                      </div>
                      <div className="">
                        <p className="m-0 text-[#B3B3B3] text-sm group-hover:hidden block">Sept 19</p>
                        <div className="group-hover:block hidden">
                          <AddArrowIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center justify-between gap-3 text-naviblue dark:text-darktext hover:bg-[#F1F0F0] p-2 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <FileTextIcon />
                        <span className="text-black font-medium">Ancient Egypt</span>
                      </div>
                      <div className="">
                        <p className="m-0 text-[#B3B3B3] text-sm group-hover:hidden block">Sept 19</p>
                        <div className="group-hover:block hidden">
                          <AddArrowIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-bg py-2 px-8 flex justify-between items-center text-gray-500 !sticky w-full !bottom-0 border-t border-bordercolor">
                <ul className="flex gap-3 items-center">
                  <li
                    className="flex gap-2 items-center pr-3 cursor-pointer"
                  >
                    <ShortingIcon className="h-4 w-4" />
                    <p>Select</p>
                  </li>
                  <li className="flex gap-2 items-center pr-3 cursor-pointer">
                    <AddArrowIcon className="h-5 w-5" />
                    <p>Open</p>
                  </li>

                </ul>

              </div>
            </div>
          </div>
        )
      }

      {
        isMyaccountOpen && (
          <div className="" >
            <Myaccount myAccountRef={myAccountRef} />
          </div>
        )
      }
    </div >
  );
};

export default Docs;
