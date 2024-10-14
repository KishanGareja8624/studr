"use client";
import React, { useState, useEffect } from "react";
import {
  BookmarkIcon as SolidBookmarkIcon,
  FolderIcon as SolidFolderIcon,
  ChatBubbleLeftRightIcon as SolidChatBubbleIcon,
} from "@heroicons/react/24/solid";
import {
  BookmarkIcon as OutlineBookmarkIcon,
  FolderIcon as OutlineFolderIcon,
  ChatBubbleLeftRightIcon as OutlineChatBubbleIcon,
} from "@heroicons/react/24/outline";
import MenuLink from "./menuLink/menuLink";
import { UserButton } from "@clerk/nextjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

interface MenuItem {
  path: string;
  solidIcon: React.ReactNode;
  outlineIcon: React.ReactNode;
  title: string;
}

function Sidebar() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [documents, setDocuments] = useState<MenuItem[]>([
    {
      title: "Docs",
      path: "/dashboard/docs",
      solidIcon: <OutlineBookmarkIcon className="w-6 h-6" />,
      outlineIcon: <OutlineBookmarkIcon className="w-6 h-6" />,
    },
    {
      title: "Library",
      path: "/dashboard/library",
      solidIcon: <OutlineFolderIcon className="w-6 h-6" />,
      outlineIcon: <OutlineFolderIcon className="w-6 h-6" />,
    },
    {
      title: "Ai",
      path: "/dashboard/ai",
      solidIcon: <OutlineChatBubbleIcon className="w-6 h-6" />,
      outlineIcon: <OutlineChatBubbleIcon className="w-6 h-6" />,
    },
  ]);

  useEffect(() => {
    const currentItem = documents.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.title);
    }
  }, [pathname, documents]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDocuments(items);
  };

  return (
    <div className="flex sticky flex-col justify-between h-screen p-4 w-20">
      <div className="felx flex-col items-center justify-center">
        <div className="flex justify-center items-center w-full">
          <img
            className=" w-12 h-12 rounded-[10px] p-1.5 bg-white border border-gray-300 shadow-around"
            src="/logo.png"
            alt="Logo"
          />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="documents">
            {(provided) => (
              <ul
                className="list-none mt-4 space-y-6"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {documents.map((item, index) => (
                  <Draggable key={item.title} draggableId={item.title} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=""
                      >
                        <MenuLink
                          item={item}
                          isSelected={selectedItem === item.title}
                          onClick={() => setSelectedItem(item.title)}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="flex justify-center items-center w-10 h-10 rounded-md bg-profileiconbg">
        <UserButton />
      </div>
    </div>
  );
}

export default Sidebar;
