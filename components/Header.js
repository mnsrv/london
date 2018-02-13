import Emoji from './Emoji'

const rowStyle = {
  display: 'flex',
  marginBottom: 40
}
const textStyle = {
  color: 'white'
}

export default () => (
  <div style={rowStyle}>
    <Emoji>👨🏻‍💻</Emoji>
    <div style={textStyle}>
      <h1>Александр Мансуров</h1>
      <p>Фронтенд разработчик в&nbsp;Рокетбанке&nbsp;🚀</p>
    </div>
    <style jsx>{`
      h1 { margin: 0 }
      p { margin: 0 }
      @media (max-width: 470px) {
        h1 { font-size: 24px }
        p { font-size: 14px }
      }
      @media (max-width: 414px) {
        h1 { margin-left: 20px }
        p { margin-left: 20px }
      }
   `}</style>
  </div>
)
