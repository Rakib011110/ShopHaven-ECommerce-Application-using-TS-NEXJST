import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";

import "draft-js/dist/Draft.css";
import { IInput as DTIinput } from "@/src/types";

interface IProps extends DTIinput {
  as?: "input" | "textarea" | "richtext";
  rows?: number;
}

export default function TIInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  placeholder = " ",
  name,
  as = "input",
  rows,
}: IProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Rich text editor state
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const content = JSON.stringify(convertToRaw(state.getCurrentContent()));

    setValue(name, content); // Update form value with rich text content
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);

      return "handled";
    }

    return "not-handled";
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Register hidden field for rich text content
  useEffect(() => {
    register(name, { required });
  }, [register, name, required]);

  // Handling textarea input
  if (as === "textarea") {
    return (
      <textarea
        {...register(name, { required })}
        className={`w-full px-4 py-2 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    );
  }

  // Handling rich text editor input
  if (as === "richtext") {
    return (
      <div className="w-full">
        <div className="editor-toolbar mb-2 flex space-x-2">
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleInlineStyle("BOLD")}
          >
            <b>B</b>
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleInlineStyle("ITALIC")}
          >
            <i>I</i>
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleInlineStyle("UNDERLINE")}
          >
            <u>U</u>
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleInlineStyle("STRIKETHROUGH")}
          >
            <s>S</s>
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleBlockType("unordered-list-item")}
          >
            • List
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleBlockType("ordered-list-item")}
          >
            1. List
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleBlockType("blockquote")}
          >
            “ Blockquote
          </button>
          <button
            className="text-xl"
            type="button"
            onClick={() => toggleBlockType("code-block")}
          >
            {"</>"} Code
          </button>
        </div>

        <div
          className={`border ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 min-h-[150px]`}
        >
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            placeholder={placeholder}
            onChange={handleEditorChange}
          />
        </div>
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  }

  // Handling default input (non-richtext)
  return (
    <Input
      {...register(name, { required })}
      placeholder={placeholder}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
