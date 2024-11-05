"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  const displayName = user?.firstName || user?.username || "";

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/documents-black.png"
        height="100"
        width="200"
        alt="Empty"
        className="dark:hidden"
      />{" "}
      <Image
        src="/documents-white.png"
        height="100"
        width="200"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Welcome {displayName}</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
