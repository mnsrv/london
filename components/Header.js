import ActiveLink from './ActiveLink'

const Header = () => (
  <header>
    <h1>Александр Мансуров</h1>
    <p>Фронтенд разработчик в&nbsp;<a href="https://rocketbank.ru/loves/sasha" target="_blank">Рокетбанке</a>&nbsp;🚀</p>
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
        <li>
          <ActiveLink href="/worldcup">
            Чемпионат мира ⚽🏆
          </ActiveLink>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
