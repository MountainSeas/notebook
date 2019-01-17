import * as React from 'react'

export interface ContextmenuItemProps {
  code: string,
  label: string
  icon?: React.ReactNode
  onClick?(e): void
}

export abstract class AbstractContextmenuItem extends React.PureComponent<ContextmenuItemProps, {}> {
  abstract handleClick(e): void
}

export interface ContextmenuProps {
  show?: boolean
  top?: number
  left?: number
  menuItems: Array<ContextmenuItemProps>
  onClick?(e): void
}


export abstract class AbstractContextmenu extends React.PureComponent<ContextmenuProps, {}> {
  abstract handleClick(e): void
}