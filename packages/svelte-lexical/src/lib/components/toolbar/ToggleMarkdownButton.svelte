<script lang="ts">
  import {$createTextNode as createTextNode, $getRoot as getRoot} from 'lexical';
  import {getContext} from 'svelte';
  import type {Readable} from 'svelte/store';
  import {getEditor, getIsEditable} from '$lib/core/composerContext.js';
  import {PLAYGROUND_TRANSFORMERS} from '$lib/core/plugins/MardownShortcut/transformers.js';
  import {$createCodeNode as createCodeNode, $isCodeNode as isCodeNode} from '@lexical/code';
  import {
    $convertFromMarkdownString as convertFromMarkdownString,
    $convertToMarkdownString as convertToMarkdownString,
  } from '@lexical/markdown';
  import {IS_APPLE} from '@lexical/utils';

  const FONT_SIZE_OPTIONS: [string, string][] = [
    ['10px', '10px'],
    ['11px', '11px'],
    ['12px', '12px'],
    ['13px', '13px'],
    ['14px', '14px'],
    ['15px', '15px'],
    ['16px', '16px'],
    ['17px', '17px'],
    ['18px', '18px'],
    ['19px', '19px'],
    ['20px', '20px'],
  ];

  const editor = getEditor();
  const value: Readable<string> = getContext('fontSize');
  const style = 'font-size';
  const isEditable = getIsEditable();
  let isMarkdown = $state();

  const handleClick = () => {
    editor.update(() => {
      const root = getRoot();
      const firstChild = root.getFirstChild();
      if (isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
        convertFromMarkdownString(
          firstChild.getTextContent(),
          PLAYGROUND_TRANSFORMERS,
          undefined,
          true,
        );
        isMarkdown = false;
      } else {
        const markdown = convertToMarkdownString(
          PLAYGROUND_TRANSFORMERS,
          undefined,
          true,
        );
        const codeNode = createCodeNode('markdown');
        codeNode.append(createTextNode(markdown));
        root.clear().append(codeNode);
        if (markdown.length === 0) {
          codeNode.select();
        }
        isMarkdown = true;
      }
    });
  };

  const buttonAriaLabel = 'Formatting options for font size';

</script>

<button
  disabled={!$isEditable}
  onclick={() => handleClick()}
  class={'toolbar-item spaced ' + (isMarkdown ? 'active' : '')}
  title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
  type="button"
  aria-label={`Toggle editor markdown status. Shortcut: ${
  IS_APPLE ? '⌘I' : 'Ctrl+I'
}`}>
  <i class="format markdown"></i>
</button>

