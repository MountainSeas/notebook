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

export interface EditorProps {

}

export interface EditorState {
  editorState: Draft.EditorState
}

export default class Editor extends React.PureComponent<EditorProps, EditorState> {
  constructor (props) {
    super(props)
    // this.state = {editorState: Draft.EditorState.createEmpty()}
    this.state = {
      editorState: Draft.EditorState.createWithContent(emptyContentState),
    };
    // this.onChange = (editorState) => this.setState({editorState});
    // this.onChange = (editorState) => this.setState({editorState});
  }

  onChange = (editorState) => this.setState({editorState});

  render () {
    const Editor = Draft.Editor
    const editorState = this.state.editorState
    return (
    <Editor
      placeholder="Write something!"
      editorKey="foobaz"
      editorState={editorState}
      onChange={this.onChange}
    />
    )
  }
} 