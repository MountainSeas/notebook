import * as React from 'react'
import classNames from 'classnames'
const style = require('./Layout.scss')

interface PartitionLayoutProps {
  HeaderComponent?: React.ReactNode
  BottomComponent?: React.ReactNode,
  wrapperStyle?: string
  onContextMenu?(e: React.MouseEvent<HTMLDivElement>): void
}

export abstract class AbstractPartitionLayout extends React.PureComponent<PartitionLayoutProps, {}>{
  abstract handleContextMenu(e): void
}
export default class PartitionLayout extends AbstractPartitionLayout {
// export default class PartitionLayout extends React.PureComponent<PartitionLayoutProps, {}> {

  constructor(props) {
    super(props)
    this.handleContextMenu = this.handleContextMenu.bind(this)
  }

  handleContextMenu (e) {
    const {onContextMenu} = this.props
    if(onContextMenu) {
      onContextMenu(e)
    }
    e.preventDefault()
  }

  render () {
    return (
      <div
        onContextMenu={this.handleContextMenu}
        className={classNames(style['PartitionLayout-Wrapper'], this.props.wrapperStyle)}>
        {/* <div className={style.header}> */}
          {this.props.HeaderComponent}
        {/* </div> */}
        <div className={style.main}>
          {this.props.children}
        </div>
        {/* <div className={style.bottom}> */}
          {this.props.BottomComponent}
        {/* </div> */}
      </div>
    )
  }
}