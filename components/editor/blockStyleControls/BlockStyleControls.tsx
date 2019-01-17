import * as React from 'react'
import * as Draft from 'draft-js'

import StyleButton from '../buttons'

const style = require('./BlockStyleControls.scss')

export interface BlockProps {
  label: string
  style: string
}

export interface BlockStyleControlsProps {
  editorState: Draft.EditorState
  blockTypes: Array<BlockProps>
  onToggle (blockType: any): void
}
export default class BlockStyleControls extends React.PureComponent<BlockStyleControlsProps, {}> {
  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (blockType) {
    this.props.onToggle(blockType)
  }

  render () {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className={style["RichEditor-controls"]}>
        {this.props.blockTypes.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={this.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
}