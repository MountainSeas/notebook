import * as React from 'react'
const style = require('./PartitionHeader.scss')

export interface HeaderComponentProps {
  title: string,
  titleAlign?: 'left' | 'center' | 'right'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default class HeaderComponent extends React.PureComponent<HeaderComponentProps, {}> {
  render () {
    return (
      <div className={style['HeaderComponent-Wrapper']}>
        <div className={style.leftIcon}>
          {/* <ICON_ARROW  className={style['icon-arrow']}/> */}
          {this.props.leftIcon}
        </div>
        <div className={style.title} style={{textAlign: this.props.titleAlign}} >
          {this.props.title}
        </div>
        <div className={style.rightIcon}>
          {this.props.rightIcon}
          {/* <ICON_SEARCH className={style['icon-search']}/> */}
        </div>
      </div>
    )
  }
}