import * as React from 'react'
import classnames from 'classnames'
const { ReactComponent: Books } = require('../../static/images/books.svg')
const { ReactComponent: OpenedBooks } = require('../../static/images/opened-books.svg')
const style = require('./navigation.scss')


export interface NavigationAttrProps {
  text: string
  id: string | number
  showIcon?: boolean
  iconStyle?: string
  checked?: boolean
  update?: boolean
  // [name: string]: any
}
export type ChangeArgs = {
  value?: string
  event?: React.MouseEvent
  id?: number | string
}

export interface NavigationActionProps {
  onClick?(args: ChangeArgs): void
  onBlur?(args: ChangeArgs): void
  onChange?(args: ChangeArgs): void 
  onUpdateCompleted?(args: ChangeArgs): void
}
export interface NavigationProps  extends NavigationAttrProps, NavigationActionProps{

}
export default class Navigation extends React.PureComponent<NavigationProps, {}, {}> {
  constructor(props: NavigationProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateCompleted = this.handleUpdateCompleted.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur (e) {
    const { onBlur } = this.props
    if (onBlur) this.props.onBlur({
      event: e,
      id: this.props.id
    })
  }

  handleClick (e) {
    const { onClick } = this.props
    if (onClick) this.props.onClick({
      event: e,
      id: this.props.id
    })
  }

  handleChange (e) {
    const el = e.currentTarget
    const {value} = el
    this.props.onChange({
      id: this.props.id,
      value
    })
  }

  handleUpdateCompleted (e) {
    if (e.keyCode === 13) {
      this.props.onUpdateCompleted({
        id: this.props.id,
        value: e.currentTarget.value
      })
    }
  }

  render () {
    const { iconStyle, text, showIcon = false, checked = false } = this.props
    const iconClasses = classnames(style.icon, iconStyle)

    return (
      <div className={classnames(style.navigation, (checked ? style.active : null))} onClick={this.handleClick}>
        {showIcon ? checked ? <OpenedBooks className={iconClasses} /> : <Books className={iconClasses} /> : ''}
        {
          this.props.update ?
            (<input type='text' onBlur={this.handleBlur} onKeyDown={this.handleUpdateCompleted} autoFocus className={style.input} value={text} onChange={this.handleChange}/>) :
            (<span className={style.text}>{text}</span>)
        }
      </div>
    )
  }
}