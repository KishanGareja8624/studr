import { ArrowDownTrayIcon, ArrowPathIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { DownloadIcon, DuplicateIcon, ShareIcon, TrashIcon } from "../icons/icons"
import React from "react";

type DropdownMenuProps = {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onDownload: (format: "pdf" | "docx") => void;
  handleRenameclick: any;
  child: any;
  index: number;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isVisible,
  onClose,
  onDelete,
  onDownload,
  handleRenameclick,
  child,
  index
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute right-0 top-9 p-4 w-40 z-10 bg-white rounded-[10px] shadow-popup">
      <ul className="space-y-1">
        <li>
          <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg" onClick={() => handleRenameclick(child,index)}>
            <ArrowPathIcon className="h-5 w-5" />
            <span> Rename</span>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
            <ShareIcon className="h-5 w-5" />
            <span>Share</span>
          </button>
        </li>
        <li>
          <button onClick={() => { onDownload("docx"); onClose(); }} className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
            <DuplicateIcon className="h-5 w-5" />
            <span>Duplicate</span>
          </button>
        </li>
        <li>
          <button onClick={() => { onDownload("pdf"); onClose(); }} className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
            <DownloadIcon className="h-5 w-5" />
            <span>Download</span>
          </button>
        </li>
        <li className="pt-3 border-t ">
          <button onClick={() => { onDelete(); onClose(); }} className="flex items-center gap-2 text-sm text-naviblue hover:bg-gray-100 w-full text-left font-medium p-2 rounded-lg">
            <TrashIcon className="h-5 w-5" />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
