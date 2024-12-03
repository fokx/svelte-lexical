import { createHeadlessEditor } from '@lexical/headless';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';

// function to extract markdown
export const getTextEditorMarkdown = async (stringifiedEditorState: string) => {
  try {
    const editor = createHeadlessEditor({
      nodes: [],
      onError: () => {}
    });
    editor.setEditorState(editor.parseEditorState(JSON.parse(stringifiedEditorState)));

    await editor.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);

    });
  } catch (e: any) {
    // error handling
  }
};
const stringifiedEditorState = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ju","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

// extracting markdown
getTextEditorMarkdown(stringifiedEditorState);
