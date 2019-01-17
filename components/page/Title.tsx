import * as React from 'react'
import * as Draft from 'draft-js'


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

export interface TitleProps {
  editorState: Draft.EditorState
  onChange(editorState: Draft.EditorState): void
}

// export interface TitleState {
//   editorState: Draft.EditorState
// }

export default class TitleComponent extends React.PureComponent<TitleProps, {}> {
  constructor (props) {
    super(props)
    // this.state = {editorState: Draft.EditorState.createEmpty()}
    this.state = {
      editorState: Draft.EditorState.createWithContent(emptyContentState),
    };
    // this.onChange = (editorState) => this.setState({editorState});
    // this.onChange = (editorState) => this.setState({editorState});
  }

  onChange = (editorState) => this.props.onChange(editorState);

  render () {
    const Editor = Draft.Editor
    // const editorState = this.state.editorState
    return (
    <Editor
      placeholder="标题"
      editorKey="foobaz"
      editorState={this.props.editorState}
      onChange={this.onChange}
    />
    )
  }
} 