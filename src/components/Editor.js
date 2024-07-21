import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const Editor = ({ value, setValue }) => {
  return (
    <div>
      <ReactQuill value={value} onChange={setValue} className="custom-editor" />
    </div>
  );
};

export default Editor;
