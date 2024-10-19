import React, { SetStateAction } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorComponentProps {
  name: string;
  value: string;
  onChange: Function;
  setIsFormDirty: React.Dispatch<SetStateAction<boolean>>;
}

const QuillEditorComponent = ({
  name,
  value,
  onChange,
  setIsFormDirty,
}: QuillEditorComponentProps) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <ReactQuill
      value={value}
      onChange={(newContent) => {
        onChange(name, newContent);
        setIsFormDirty(true);
      }}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditorComponent;
