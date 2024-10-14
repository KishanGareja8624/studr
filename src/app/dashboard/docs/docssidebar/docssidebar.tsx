import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { Skeleton } from "@components/ui/skeleton";

interface Document {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface DocsSidebarProps {
  onDocumentSelect: (document: Document) => void;
  onNewDocument: () => void;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({
  onDocumentSelect,
  onNewDocument,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching documents:", error);
    else setDocuments(data || []);

    setLoading(false);
  };

  const handleNewDocument = async () => {
    const { data, error } = await supabase
      .from("documents")
      .insert([{ title: "Untitled Document", content: "" }])
      .single();

    if (error) console.error("Error creating document:", error);
    else {
      setDocuments([data, ...documents]);
      onNewDocument();
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("documents")
      .upload(`uploads/${file.name}`, file);

    if (error) {
      console.error("Error uploading file:", error);
    } else {
      console.log("File uploaded successfully:", data);
    }
  };

  const ItemSkeleton: React.FC<{ level?: number }> = ({ level }) => {
    return (
      <div
        style={{
          paddingLeft: level ? `${(level * 12) + 25}px` : "12px",
        }}
        className="flex gap-x-2 py-[3px]"
      >
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
    );
  };

  return (
    <div>
      {/* Render your sidebar content here */}
      {loading ? (
        <ItemSkeleton />
      ) : (
        documents.map((doc) => (
          <div key={doc.id} onClick={() => onDocumentSelect(doc)}>
            {doc.title}
          </div>
        ))
      )}
      <button onClick={handleNewDocument}>New Document</button>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default DocsSidebar;