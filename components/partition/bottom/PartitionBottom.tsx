import * as React from 'react'
const style = require('./PartitionBottom.scss')
const {ReactComponent : PLUS} = require('../../../static/images/plus.svg')
export interface PartitionBottomProps {
  icon?: React.ReactNode,
  bottomTxt: String
}

export default class PartitionBottom extends React.PureComponent<PartitionBottomProps, {}> {

  render () {
    return (
      <div className={style['PartitionBottom-Wrapper']}>
        {this.props.icon || <PLUS className={style['icon-plus']}/>}
        <div className={style.btnTxt}>{this.props.bottomTxt}</div>
      </div>
    )
  }
}