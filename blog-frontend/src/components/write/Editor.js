import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.indigo[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const TagsInput = styled.input`
  font-size: 1rem;
  outline: none;
  padding: 0.5rem;
  border: 1px solid ${palette.gray[4]};
  margin-bottom: 1rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null);
  const [quillText, setQuillText] = useState(body);
  const [currentTitle, setTitle] = useState(title);

  // useEffect(() => {
  //   setQuillText(body);
  // }, [body]);
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    onChangeField({ key: 'title', value: e.target.value });
  };

  useEffect(() => {
    if (quillElement.current) {
      const quillInstance = quillElement.current.getEditor(); // Quill 인스턴스 가져오기
      // quillInstance.setText('');
      quillInstance.getContents(quillInstance.clipboard.convert(body || ''));
    }
  }, [body]);

  const handleQuill = (value) => {
    setQuillText(value);
    onChangeField({ key: 'body', value });
  };

  //내용의 초기값 설정
  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (mounted.current) return;
  //   mounted.current = true;
  // });

  //제목

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={currentTitle}
      />
      <QuillWrapper>
        <ReactQuill
          ref={quillElement}
          theme="bubble"
          onChange={handleQuill}
          value={quillText}
          placeholder="내용을 작성하시오..."
          modules={{
            toolbar: {
              container: [
                [{ header: '1' }, { header: '2' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'code-block', 'link', 'image'],
              ],
            },
          }}
        />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
