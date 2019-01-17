import * as React from 'react'

import Layout from './layout/Layout'
import PartitionBottom from './bottom/PartitionBottom'
import PartitionHeader from './header/PartitionHeader'
const style = require('./Bookmark.scss')
const { ReactComponent : ICON_ARROW } = require('../../static/images/arrow-left.svg')
const { ReactComponent : ICON_SEARCH } = require('../../static/images/search.svg')

export interface BookmarkProps {
  leftBtnTxt?: string
  rightBtnTxt?: string
  primaryMarkData?: React.ReactNode
  secondMarkData?: React.ReactNode
  onLeftContextMenu?(e): void
  onRightContextMenu?(e): void
}

abstract class abstractBookmark extends React.PureComponent<BookmarkProps, {}> {
  abstract handleLefContextMenu(e): void
  abstract handleRightContextMenu(e): void
}

export default class Bookmark extends abstractBookmark {

  constructor (props) {
    super(props)
    this.handleLefContextMenu = this.handleLefContextMenu.bind(this)
    this.handleRightContextMenu = this.handleRightContextMenu.bind(this)
  }

  handleLefContextMenu(e) {
    const {onLeftContextMenu} = this.props
    if (onLeftContextMenu) onLeftContextMenu(e)
  }

  handleRightContextMenu(e) {
    const {onRightContextMenu} = this.props
    if (onRightContextMenu) onRightContextMenu(e)
  }

  renderHeader = () => {
    return (
      <PartitionHeader
        leftIcon={<ICON_ARROW  className={style['icon-arrow']}/>}
        rightIcon={<ICON_SEARCH className={style['icon-search']}/>}
        title='title'
        titleAlign='center'
        />
    )
  }

  render () {
    return (
      <Layout
        HeaderComponent={this.renderHeader()}
      >
        <div className={style.layout}>
          <div className={style.item}>
            <Layout
              onContextMenu={this.handleLefContextMenu}
              BottomComponent={<PartitionBottom bottomTxt={this.props.leftBtnTxt} />}
            >
              {this.props.primaryMarkData}
            </Layout>
          </div>
          <div className={style.item}>
            <Layout
              onContextMenu={this.handleRightContextMenu}
              wrapperStyle={style.pageMark}
              BottomComponent={<PartitionBottom bottomTxt={this.props.rightBtnTxt} />}
            >
              {this.props.secondMarkData}
            </Layout>
          </div>
        </div>
      </Layout>
    )
  }
}