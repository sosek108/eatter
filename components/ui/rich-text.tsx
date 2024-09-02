'use client';

import * as React from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from '@/lib/utils';
import { Toggle } from './toggle';
import { Heading2, Heading3, Pilcrow, Strikethrough, Italic, Bold } from 'lucide-react';

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange?: (value: any) => void;
  defaultValue?: string;
  value?: string;
}

const MenuBar: React.FunctionComponent<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;
  editor.isActive('heading', { level: 1 });
  const iconClass = cn('h-4 w-4');

  return (
    <div className="control-group">
      <div className="button-group flex gap-1">
        <Toggle
          tabIndex={-1}
          pressed={editor.isActive('heading', { level: 2 })}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className={iconClass} />
        </Toggle>
        <Toggle
          tabIndex={-1}
          pressed={editor.isActive('heading', { level: 3 })}
          size={'sm'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className={iconClass} />
        </Toggle>
        <Toggle tabIndex={-1} pressed={editor.isActive('paragraph')} size={'sm'} onClick={() => editor.chain().focus().setParagraph().run()}>
          <Pilcrow className={iconClass} />
        </Toggle>
        <Toggle tabIndex={-1} pressed={editor.isActive('bold')} size={'sm'} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className={iconClass} />
        </Toggle>
        <Toggle tabIndex={-1} pressed={editor.isActive('italic')} size={'sm'} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className={iconClass} />
        </Toggle>
        <Toggle tabIndex={-1} pressed={editor.isActive('strike')} size={'sm'} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className={iconClass} />
        </Toggle>
      </div>
    </div>
  );
};

const RichText = React.forwardRef<HTMLInputElement, RichTextProps>(({ className, ...props }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.defaultValue ?? props.value ?? '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      props.onChange && props.onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn('mt-4 prose prose-sm'),
      },
    },
  });

  return (
    <div
      className={cn(
        'scroll-y max-h-[75vh] min-h-[100px] w-full overflow-y-auto rounded-md border border-input bg-background px-3 py-2 ring-offset-background',
        className,
      )}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});
RichText.displayName = 'RichText';

export default RichText;
