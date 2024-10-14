import React, { useState } from "react";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import DropdownMenu from "../components/dropdown/DropdownMenu";

const DocumentItem: React.FC<{ document: Document; folderId: string }> = ({
  document,
  folderId,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "DOCUMENT",
    item: { id: document.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div
      ref={drag}
      className={`flex items-center justify-between space-x-2 p-2 rounded-md transition-all duration-300 ${
        document.id === selectedDocumentId
          ? "bg-highlightgray"
          : "hover:bg-highlightgray"
      } ${isDragging ? "opacity-50" : "opacity-100"} cursor-pointer`}
      onClick={() => handleDocumentSelect(document)}
    >
      <div className="flex flex-grow items-center">
        {/* Render document title or input field */}
        {document.isEditing ? (
          <input
            type="text"
            value={document.title}
            onChange={(event) =>
              handleDocumentTitleChange(event, document.id, folderId)
            }
            onBlur={() => {
              document.isEditing = false;
              setFolders([...folders]); // Trigger re-render
            }}
            autoFocus
            className="text-sm font-medium text-gray-700 w-full border-none focus:ring-0 bg-transparent"
          />
        ) : (
          <span className="text-sm font-medium text-gray-700 ml-2">
            {document.title}
          </span>
        )}
      </div>
      <div className="relative flex">
        <PlusIcon className="h-5 w-5" />
        <EllipsisVerticalIcon
          className="h-5 w-5 text-gray-600 cursor-pointer"
          onClick={() => setDropdownVisible(!isDropdownVisible)}
        />
        <DropdownMenu
          isVisible={isDropdownVisible}
          onClose={() => setDropdownVisible(false)}
        />
      </div>
    </div>
  );
};

export default DocumentItem
