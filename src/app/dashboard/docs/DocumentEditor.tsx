import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { withYjs, YjsEditor } from 'slate-yjs';
import Popover from 'react-popover';

const CollaborativeEditor = () => {
  const [comment, setComment] = useState('');
  const [target, setTarget] = useState(null);
  const [commenting, setCommenting] = useState(false);
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider('your-document-id', ydoc);
  const sharedType = ydoc.get('content', Y.XmlText);

  const editor = useMemo(
    () =>
      withYjs(
        withHistory(withReact(createEditor())),
        sharedType
      ),
    [sharedType]
  );

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    return (
      <span
        {...attributes}
        style={{ backgroundColor: leaf.comment ? '#ffeeba' : 'transparent' }}
      >
        {children}
      </span>
    );
  }, []);

  const handleComment = () => {
    if (target) {
      Transforms.setNodes(
        editor,
        { comment },
        { at: target, match: n => Text.isText(n) }
      );
      setComment('');
      setTarget(null);
      setCommenting(false);
    }
  };

  return (
    <div>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={value => {
          const { selection } = editor;
          if (selection && Text.isText(selection.anchor.path)) {
            setTarget(selection);
          }
        }}
      >
        <Editable renderLeaf={renderLeaf} />
      </Slate>
      {commenting && target && (
        <Popover
          isOpen={commenting}
          body={
            <div>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button onClick={handleComment}>Add Comment</button>
            </div>
          }
        />
      )}
      <button onClick={() => setCommenting(true)}>Comment</button>
    </div>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'This is a collaborative text editor with comments!' }],
  },
];

export default CollaborativeEditor;
