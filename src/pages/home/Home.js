import "./home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-title">
        <span>Duckgugong</span>에 오신걸 환영합니다
      </div>
      <div className="home-contents">
        자유롭게 게시판에 글을 작성하고📝<br/>
        댓글로 여러 의견을 나눠보세요✏️
      </div>
      <div className="about-project">
        이 프로젝트는 Duckgugong이 레퍼런스로 쓰기위해<br/>
        <span>React</span>와
        <span> TypeORM</span>으로 만들었습니다😎
      </div>
      <div className="my-website">
        <div className="my-website-title">Duckgugong's Website</div>
        <a href="https://github.com/ejzl521/Board-FE-React" target="_blank">
          🏴GitHub
        </a>
        <a href="https://duckgugong.tistory.com/" target="_blank">
          📖 Tistory
        </a>
      </div>
    </div>
  )
}
export default Home;