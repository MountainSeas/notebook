import * as React from 'react'
import * as Draft from 'draft-js'
// import Link from 'next/link'
// import Classnames from 'classnames'

import { RichEditor } from '../components/page'



import '../static/style/style.scss'
import '../static/lib/index.scss'
const style = require('./index.scss')

import Navigation from '../components/navigation'
import { Caption, Bookmark } from '../components/partition'
import Contextmenu from '../components/contextmenu'
import * as AbstractContextMenu from '../components/contextmenu/AbstractContextmenu'
import { NavigationAttrProps, ChangeArgs } from '../components/navigation/Navigation'

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

export enum MenuCode {
  NOTEBOOKS = 'NOTEBOOKS',
  PARTITION = 'PARTITION',
  PAGE = 'PAGE'
}

export interface IndexProps {
  noteData: Array<NavigationAttrProps>
  partitionData: Array<NavigationAttrProps>
  pageData: Array<NavigationAttrProps>
}
export interface IndexState {
  menuItems: Array<AbstractContextMenu.ContextmenuItemProps>
  noteData: Array<NavigationAttrProps>
  partitionData: Array<NavigationAttrProps>
  pageData: Array<NavigationAttrProps>
  contextmenuTop: number
  contextmenuLeft: number
  showContextmenu: boolean
  titleEditorState: Draft.EditorState
  richEditorState: Draft.EditorState
}

export interface IndexStaticState {
}

export default class Index extends React.Component<IndexProps, IndexState, IndexStaticState> {

  currentUpdateNavigation: Array<NavigationAttrProps> = []

  handleTitleChange = (editorState) => { 
    this.setState({ titleEditorState: editorState }) 
  }

  handleRichEditorChange = (editorState) => { 
    this.setState({ richEditorState: editorState }) 
  }

  handleCaptionContextMenu = (e) => {
    const menuItems: Array<AbstractContextMenu.ContextmenuItemProps> = [
      {
        label: '新建笔记本',
        code: MenuCode.NOTEBOOKS
      }
    ]
    this.setState({
      menuItems,
      showContextmenu: true,
      contextmenuTop: e.pageY,
      contextmenuLeft: e.pageX
    })
  }

  handleBookmarkLeftContextMenu = (e) => {
    const menuItems: Array<AbstractContextMenu.ContextmenuItemProps> = [
      {
        label: '新建分区',
        code: MenuCode.PARTITION
      }
    ]
    this.setState({
      menuItems,
      showContextmenu: true,
      contextmenuTop: e.pageY,
      contextmenuLeft: e.pageX
    })
  }

  handleBookmarkRightContextMenu = (e) => {
    const menuItems: Array<AbstractContextMenu.ContextmenuItemProps> = [
      {
        label: '新建页面',
        code: MenuCode.PAGE
      }
    ]
    this.setState({
      menuItems,
      showContextmenu: true,
      contextmenuTop: e.pageY,
      contextmenuLeft: e.pageX
    })
  }

  updateNavigationData = ({data, value}: {data: Array<NavigationAttrProps>, value: string}): Array<NavigationAttrProps> => {
    const item = data[data.length - 1]
    item.text = value
    return data;
  }

  handleNoteChange = ({value}) => {
    let noteData = this.updateNavigationData({
      data: this.state.noteData,
      value
    })
    this.setState({
      noteData
    })
  }

  handlePartitionChange = ({value}) => {
    let partitionData = this.updateNavigationData({
      data: this.state.partitionData,
      value
    })
    this.setState({
      partitionData
    })
  }

  handlePageChange = ({value}) => {
    let pageData = this.updateNavigationData({
      data: this.state.pageData,
      value
    })
    this.setState({
      pageData
    })
  }

  // 点击菜单 
  _handleClickContextMenu = ({dataname, text, id}) => {
    let data = this.state[dataname]
    let item = data.find(item => item.checked)
    if (item) item.checked = false
    data.push({
      text: text,
      id: id + Math.random(),
      update: true,
      checked: true
    })
    return data
  }

  // 点击菜单项
  handleClickContextMenu = (menuCode) => {
    switch (menuCode) {
      case MenuCode.NOTEBOOKS:
        let noteData = this._handleClickContextMenu({dataname: 'noteData', text: '新建笔记本', id: 'new'})
        this.currentUpdateNavigation = noteData
        this.setState({
          noteData
        })
        break;
      case MenuCode.PARTITION:
        let partitionData = this._handleClickContextMenu({dataname: 'partitionData', text: '新建分区', id: 'new'})
        this.currentUpdateNavigation = partitionData
        this.setState({
          partitionData
        })
        break;
      case MenuCode.PAGE:
        let pageData = this._handleClickContextMenu({dataname: 'pageData', text: '新建分区', id: 'new'})
        this.currentUpdateNavigation = pageData
        this.setState({
          pageData
        })
        break;
      default:
        break;
    }
    this.setState({
      showContextmenu: false
    })
  }


  // 点击容器 关闭菜单
  handleWrapperClick = () => {
    if (this.state.showContextmenu) {
      this.setState({
        showContextmenu: false
      })
    }
  }

  // 笔记模块菜单修改时，失去光标事件处理函数
  // 把修改状态修改成普通展示状态
  handleNoteBlur = ({id}: ChangeArgs) => {
    let noteData = this._handleNavigationBlur({id, data: this.state.noteData})
    this.setState({
      noteData
    })
  }

  // 分区模块菜单修改时，失去光标事件处理函数
  // 把修改状态修改成普通展示状态
  handlePartitionBlur = ({id}: ChangeArgs) => {
    let partitionData = this._handleNavigationBlur({id, data: this.state.partitionData})
    this.setState({
      partitionData
    })
  }

  // 页面模块菜单修改时，失去光标事件处理函数
  // 把修改状态修改成普通展示状态
  handlePageBlur = ({id}: ChangeArgs) => {
    let pageData = this._handleNavigationBlur({id, data: this.state.pageData})
    this.setState({
      pageData
    })
  }

  // 把修改状态修改成普通展示状态
  _handleNavigationBlur = ({id, data}): Array<NavigationAttrProps> => {
    let item = data.find(item => item.id === id)
    if (item) item.update = false
    return data
  }

  /**
   * 页面模块菜单点击事件处理函数
   */
  handlePageNavigationClick = ({event, id}: ChangeArgs) => {
    event.stopPropagation()
    let datasource = this.state.pageData
    datasource = this.updateNavigationActiveState(datasource, id)
    this.setState({
      pageData: datasource
    })
  }

   /**
   * 分区模块菜单点击事件处理函数
   */
  handlePartitionNavigationClick = ({event, id}: ChangeArgs) => {
    event.stopPropagation()
    let datasource = this.state.partitionData
    datasource = this.updateNavigationActiveState(datasource, id)
    this.setState({
      partitionData: datasource
    })
  }

  /**
   * 笔记模块菜单点击事件处理函数
   */
  handleNoteNavigationClick = ({event, id}: ChangeArgs) => {
    event.stopPropagation()
    let datasource = this.state.noteData
    datasource = this.updateNavigationActiveState(datasource, id)
    this.setState({
      noteData: datasource
    })
  }

  updateNavigationActiveState = (datasource: Array<NavigationAttrProps>, id: string | number) => {
    datasource.forEach(data => {
      if (data.checked) data.checked = false
      if (data.id === id) data.checked = true
    })
    return datasource
  }

  renderBookmarkPrimaryMarkData = () => {
    return (
      <div className={style.navigationList}>
        {
          this.state.partitionData.map(partition => <Navigation
            id={partition.id}
            onClick={this.handlePartitionNavigationClick}
            onBlur={this.handlePartitionBlur}
            onChange={this.handlePartitionChange}
            key={partition.id}
            onUpdateCompleted={this.handlePartitionBlur}
            update={partition.update}
            checked={partition.checked}
            showIcon
            text={partition.text} />)
        }
      </div>
    )
  }

  renderBookmarkSecondMarkData = () => {
    return (
      <div className={style.navigationList}>
        {
          this.state.pageData.map(page => <Navigation
            id={page.id}
            onClick={this.handlePageNavigationClick}
            onBlur={this.handlePageBlur}
            onChange={this.handlePageChange}
            key={page.id}
            onUpdateCompleted={this.handlePageBlur}
            update={page.update}
            checked={page.checked}
            showIcon
            text={page.text} />)
        }
      </div>
    )
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return true
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate () {
    console.log('componentDidUpdate')
  }

  componentWillReceiveProps(){
    console.log('componentWillReceiveProps')
  }

  static async getInitialProps () {
    console.log('getInitialProps')
    const noteData: Array<NavigationAttrProps> = [
      {
        text: '笔记本',
        id: 'note'
      }
    ]
    const partitionData: Array<NavigationAttrProps> = [
      {
        text: '分区',
        id: 'partition'
      }
    ]
    const pageData: Array<NavigationAttrProps> = [
      {
        text: '页面',
        id: 'page'
      }
    ]

    return {
      noteData,
      partitionData,
      pageData
    }
  }

  constructor(props) {
    super(props)
    console.log('constructor')
    this.state = {
      menuItems: [],
      noteData: this.props.noteData || [],
      partitionData: this.props.partitionData || [],
      pageData: this.props.pageData || [],
      showContextmenu: false,
      contextmenuTop: 0,
      contextmenuLeft: 0,
      titleEditorState: Draft.EditorState.createWithContent(emptyContentState),
      richEditorState: Draft.EditorState.createWithContent(emptyContentState)
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  render () {
    console.log('render')
    return (
      <div className={style['Index-Wrapper']} onClick={this.handleWrapperClick}>
        <Contextmenu menuItems={this.state.menuItems}
          onClick={this.handleClickContextMenu}
          show={this.state.showContextmenu}
          left={this.state.contextmenuLeft}
          top={this.state.contextmenuTop} />
        {/* Hello World.{' '}
        <Link href="/about">
          <Button>About</Button>
        </Link>
        <Navigation text='navigation' showIcon/>
        <Navigation text='navigation' iconStyle={style.red} showIcon clicked/> */}
        <div className={style.caption}>
          <Caption
            btnTxt='笔记本'
            onContextMenu={this.handleCaptionContextMenu}
          >
            <div className={style.navigationList}>
              {
                this.state.noteData.map(note => <Navigation
                  onClick={this.handleNoteNavigationClick}
                  onBlur={this.handleNoteBlur}
                  onChange={this.handleNoteChange}
                  key={note.id}
                  id={note.id}
                  onUpdateCompleted={this.handleNoteBlur}
                  update={note.update}
                  showIcon
                  checked={note.checked}
                  text={note.text} />)
              }
            </div>
          </Caption>
        </div>
        <div className={style.bookmark}>
          <Bookmark
            leftBtnTxt='分区'
            rightBtnTxt='页面'
            onLeftContextMenu={this.handleBookmarkLeftContextMenu}
            onRightContextMenu={this.handleBookmarkRightContextMenu}
            primaryMarkData={this.renderBookmarkPrimaryMarkData()}
            secondMarkData={this.renderBookmarkSecondMarkData()}
          />
        </div>
        <div className={style.page}>
          <RichEditor
            titleEditState={this.state.titleEditorState}
            onTitleChange={this.handleTitleChange}
            richEditorState={this.state.richEditorState}
            onRichEditorChange={this.handleRichEditorChange}
          />
        </div>
      </div>
    )
  }

  componentDidMount () {
    console.log('componentDidMount')
  }
 
}
