import * as React from 'react'
import * as AbstractContextmenu from './AbstractContextmenu'
const style = require('./Contextmenu.scss')
export class ContextmenuItem extends AbstractContextmenu.AbstractContextmenuItem {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.code)
  }

  render () {
    return (
      <div className={style.contextmenuItem} onClick={this.handleClick}>
        <div>
          {this.props.label}
        </div>
        <div></div>
      </div>
    )
  }
}


export class Contextmenu extends AbstractContextmenu.AbstractContextmenu {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static defaultProps = {
    top: 0,
    left: 0,
    show: false
  }

  handleContextMenu (e) {
    e.preventDefault()
  }

  handleClick (menuCode) {
    this.props.onClick(menuCode)
  }

  render () {
    const cxtmStyle = {
      display: this.props.show ? 'block' : 'none',
      top: this.props.top + 'px',
      left: this.props.left + 'px'
    }
    return (
      <div
        onContextMenu={this.handleContextMenu}
        className={style.contextmenu}
        style={cxtmStyle}>
        {this.props.menuItems.map(menu => <ContextmenuItem key={menu.code} code={menu.code} label={menu.label} onClick={this.handleClick} />)}
      </div>
    )
  }
}

export interface ContextmenuIndexProps extends AbstractContextmenu.ContextmenuProps {
  menuItems: Array<AbstractContextmenu.ContextmenuItemProps>
  onClick? (e): void
}

export default class ContextmenuIndex extends React.Component<ContextmenuIndexProps, {}> {

  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick (menuCode) {
    this.props.onClick(menuCode)
  }


  render () {
    return (
      <React.Fragment>
        <Contextmenu
          top={this.props.top}
          left={this.props.left}
          show={this.props.show}
          menuItems={this.props.menuItems}
          onClick={this.handleMenuClick}/>
      </React.Fragment>
    )
  }
}