"use client";
import { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

interface TextEditorProps {
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState)); // Convert to raw JSON

    onChange(rawContent); // Send content to parent
  };

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleEditorChange(newState);

      return "handled";
    }

    return "not-handled";
  };

  return (
    <div
      style={{ border: "1px solid #ddd", padding: "10px", minHeight: "200px" }}
    >
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Write your content here..."
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
