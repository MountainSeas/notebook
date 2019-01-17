import * as React from 'react'
import classnames from 'classnames'
const style = require('./Button.scss')

export interface EditorButtonProps {
  label: string
  style: string
  active: boolean
  onToggle(blockType: string): void
}

export default class EditorButton extends React.PureComponent<EditorButtonProps, {}> {
  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (e) {
    e.preventDefault()
    this.props.onToggle(this.props.style)
  }

  render () {
    const clazz = classnames(style['RichEditor-styleButton'],
      this.props.active ? style['RichEditor-activeButton'] : undefined)
    return (
      <span className={clazz} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}