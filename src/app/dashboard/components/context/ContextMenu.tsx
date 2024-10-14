import React from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onRename,
  onDelete,
  onDuplicate,
  onClose,
}) => {
  return (
    <div
      className="bg-white shadow-md rounded-md p-2 w-48 absolute z-10"
      style={{ top: y, left: x }}
    >
      <ul>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onRename();
            onClose();
          }}
        >
          Rename
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onDuplicate();
            onClose();
          }}
        >
          Duplicate
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
