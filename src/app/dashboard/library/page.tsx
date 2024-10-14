"use client"
import React, { useEffect, useState } from "react";
import {
  
  DocumentArrowDownIcon as DocumentDownloadIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

type Document = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

const documents: Document[] = [
  {
    id: "1",
    title: "Introduction to Quantum Physics",
    description: "A comprehensive guide to quantum physics.",
    category: "Physics",
    date: "2023-08-01",
  },
  {
    id: "2",
    title: "Advanced Calculus",
    description: "Detailed explanations of calculus concepts.",
    category: "Mathematics",
    date: "2023-07-15",
  },
  // Add more documents here
];

const Library: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredDocuments = documents.filter(
  //   (doc) =>
  //     doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const documents = [
    { name: 'Ancient Egypt', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'PDF' },
    { name: 'Cultural Barrier', author: 'Albin Holmgren', size: '482 kb', date: '07 Oct, 2024', type: 'PDF' },
    { name: 'History of Greece', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'PDF' },
    { name: 'Ancient Egypt', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'PDF' },
    { name: 'Ancient Egypt', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'URL' },
    { name: 'Cultural Barrier', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'URL' },
    { name: 'History of Greece', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'URL' },
    { name: 'Ancient Egypt', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'URL' },
    { name: 'Ancient Egypt', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'Excel' },
    { name: 'Cultural Barrier', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'Excel' },
    { name: 'History of Greece', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'Excel' },
    { name: 'Ancient Egypt', author: 'Albin Holmgren', size: '256 kb', date: '07 Oct, 2024', type: 'Excel' },
  ];
  return (
    // <div className="min-h-screen bg-gray-100">
    //   <div className=" mx-auto py-10 px-4 sm:px-6 lg:px-8">
    //     <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
    //       Digital Library
    //     </h1>

    //     <div className="relative mb-10">
    //       <input
    //         type="text"
    //         placeholder="Search documents..."
    //         className="w-full pl-12 pr-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //       />
    //       {/* <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" /> */}
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {filteredDocuments.length > 0 ? (
    //         filteredDocuments.map((doc) => (
    //           <div
    //             key={doc.id}
    //             className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
    //           >
    //             <div>
    //               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
    //                 {doc.title}
    //               </h2>
    //               <p className="text-gray-600 mb-4">{doc.description}</p>
    //               <p className="text-gray-400 text-sm">Category: {doc.category}</p>
    //               <p className="text-gray-400 text-sm">Published: {doc.date}</p>
    //             </div>
    //             <div className="mt-6 flex justify-between items-center">
    //               <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition">
    //                 <EyeIcon className="h-5 w-5 mr-2" />
    //                 View
    //               </button>
    //               <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 transition">
    //                 <DocumentDownloadIcon className="h-5 w-5 mr-2" />
    //                 Download
    //               </button>
    //             </div>
    //           </div>
    //         ))
    //       ) : (
    //         <p className="text-gray-500 italic text-center w-full">
    //           No documents found
    //         </p>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto mt-3">
      {/* Table for PDF documents */}
      <div className=" overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-bold tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left font-bold tracking-wider">Author</th>
              <th scope="col" className="px-6 py-3 text-left font-bold tracking-wider">Size</th>
              <th scope="col" className="px-6 py-3 text-left font-bold tracking-wider">Date Published</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {['PDF', 'URL','Excel'].map((type) => (
              <>
                <tr key={type}>
                  <td className="p-2 m-3" colSpan={5}>
                    <div className="bg-[#ECECEC] p-2 text-sm font-medium text-lightgraytext w-full rounded-lg">{type}</div>
                  </td>
                </tr>
                {documents.filter(doc => doc.type === type).map((doc, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">{doc.name}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{doc.author}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{doc.size}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{doc.date}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-500 hover:text-blue-700">Edit</a>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>

        </table>
      </div>


    </div>
  );
};

export default Library;
