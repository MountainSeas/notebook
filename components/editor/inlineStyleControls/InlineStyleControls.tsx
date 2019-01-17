import * as React from 'react'
import * as Draft from 'draft-js'

import StyleButton from '../buttons'

const style = require('./InlineStyleControls.scss')

export interface Inline {
  label: string
  style: string
}

export interface InlineStyleControlsProps {
  editorState: Draft.EditorState
  inlineTypes: Array<Inline>
  onToggle (blockType: any): void
}

export default class InlineStyleControls extends React.PureComponent<InlineStyleControlsProps, {}> {
  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (blockType) {
    this.props.onToggle(blockType)
  }

  render () {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();

    return (
      <div className={style["RichEditor-controls"]}>
        {this.props.inlineTypes.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
}