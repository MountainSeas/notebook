import * as React from 'react'
import * as Draft from 'draft-js'
import Editor from '../editor'
import TitleComponent from './Title'

const style = require('./RichEditor.scss')

export interface RichEditorProps {
  titleEditState: Draft.EditorState
  richEditorState: Draft.EditorState
  onTitleChange(editorState: Draft.EditorState): void
  onRichEditorChange(editorState: Draft.EditorState): void
}
export default class RichEditor extends React.PureComponent<RichEditorProps, {}> {
  render () {
    return (
      <div className={style.RichEditor_Wrapper}>
        <div className={style.header}>
          <div>
            <div className={style.title_wrapper}>
              <TitleComponent editorState={this.props.titleEditState} onChange={this.props.onTitleChange} />
            </div>
          </div>
          <div className={style.time}>
            <span>2018年6月28日</span>
            <span>星期四</span>
            <span>下午11:19</span>
          </div>
        </div>
        <div className={style.main}><Editor editorState={this.props.richEditorState} onChange={this.props.onRichEditorChange} /></div>
      </div>
    )
  }
}