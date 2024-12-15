import React from "react";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  let editorState;

  try {
    // Try to parse the content as Draft.js raw format
    const rawContent = JSON.parse(content);
    const contentState = convertFromRaw(rawContent);

    editorState = EditorState.createWithContent(contentState);
  } catch (error) {
    // If parsing fails, treat it as plain text and create a ContentState from it
    console.error(
      "Error parsing content:",
      error,
      "Content received:",
      content,
    );

    const plainTextContentState = ContentState.createFromText(content);

    editorState = EditorState.createWithContent(plainTextContentState);
  }

  return (
    <div className="post-content">
      <Editor
        editorState={editorState}
        readOnly={true} // Ensure it's read-only since this is for display
        onChange={() => {}} // No need for onChange in read-only mode
      />
    </div>
  );
};

export default PostContent;
