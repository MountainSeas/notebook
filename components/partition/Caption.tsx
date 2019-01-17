import * as React from 'react'
import Layout from './layout/Layout'
import PartitionBottom from './bottom/PartitionBottom'
import PartitionHeader from './header/PartitionHeader'
const style = require('./Caption.scss')
const { ReactComponent: ICON_BOOKS } = require('../../static/images/books.svg')

export interface PartitionCaptionProps {
  btnTxt?: string
  onContextMenu?(e): void
}

abstract class abstractPartitionCaption extends React.PureComponent<PartitionCaptionProps, {}>{
  abstract handleContextMenu(e): void
}
export default class PartitionCaption extends abstractPartitionCaption {
  constructor (props) {
    super(props)
    this.handleContextMenu = this.handleContextMenu.bind(this)
  }

  handleContextMenu (e) {
    const {onContextMenu} = this.props
    if (onContextMenu) onContextMenu(e)
  }

  renderHeader = () => {
    return (
      <PartitionHeader
        leftIcon={<ICON_BOOKS  className={style['icon-books']}/>}
        title='笔记本'
        titleAlign='left'
        />
    )
  }

  render () {
    return (
      <Layout
        onContextMenu={this.handleContextMenu}
        HeaderComponent={this.renderHeader()}
        BottomComponent={<PartitionBottom bottomTxt={this.props.btnTxt} />}
      >
        {this.props.children}
      </Layout>
    )
  }
}