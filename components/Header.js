import ActiveLink from './ActiveLink'

const Header = () => (
  <header>
    <h1>Александр Мансуров</h1>
    <p>Фронтенд разработчик в&nbsp;Рокетбанке&nbsp;🚀</p>
    <nav>
      <ul>
        <li>
          <ActiveLink href="/">
            Главная
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/movies">
            Фильмы
          </ActiveLink>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
