import * as React from 'react'
import * as Draft from 'draft-js'
import Classnames from 'classnames'

import BlockStyleControls from './blockStyleControls'
import InlineStyleControls from './inlineStyleControls'

const style = require('./Editor.scss')
// import './Editor.scss'

const { EditorState, RichUtils, getDefaultKeyBinding } = Draft

const emptyContentState = Draft.convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
      depth: 10,
      inlineStyleRanges: [],
    }
  ]
})

export interface EditorProps {
  editorState: Draft.EditorState
  onChange(editorState: Draft.EditorState): void
}

export interface EditorState {
  
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
}

function getBlockStyle (block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

export default class Editor extends React.PureComponent<EditorProps, EditorState> {
  constructor(props) {
    super(props)
    // this.state = {editorState: Draft.EditorState.createEmpty()}
    // this.state = {
    //   editorState: Draft.EditorState.createWithContent(emptyContentState),
    // };
    this.onChange = this.onChange.bind(this)

    this.focus = this.focus.bind(this)

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  focus () {
    this.refs.editor.focus()
  }

  handleKeyCommand (command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  mapKeyToEditorCommand (e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.props.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.props.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  toggleBlockType (blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle (inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  onChange (editorState) {
    this.props.onChange(editorState)
    // this.setState({ editorState })
  }

  render () {
    const Editor = Draft.Editor
    const editorState = this.props.editorState


    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = undefined
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className = 'RichEditor-hidePlaceholder';
      }
    }
    const clazz = Classnames('RichEditor-editor', className)
    return (
      // <Editor
      //   placeholder="Write something!"
      //   editorKey="foobaz"
      //   editorState={editorState}
      //   onChange={this.onChange}
      // />
      <div className={Classnames("RichEditor-root", style.RichEditor)}>
        <div className={style.control}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
            blockTypes={BLOCK_TYPES}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            inlineTypes={INLINE_STYLES}
          />
        </div>
        <div className={Classnames(clazz, style.editor)} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            ref="editor"
            spellCheck={true}
            placeholder="Write something!"
            editorKey="foobaz"
            editorState={editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
} 