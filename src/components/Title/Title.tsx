import { ReactElement } from 'react'
import './Title.scss'

const Title = ({ text }: { text: string }): ReactElement => {
  return <h1 className="Title">{text}</h1>
}

export default Title
