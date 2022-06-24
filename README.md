# React로 게시판 사이트 만들기📝
- http://duck90.site
# 개발 환경
- webStorm (React 프로젝트)

# 사용 라이브러리 및 기술
- Ant Design (CSS 프레임워크)
- scss
- axios (Http 요청)
- react router (라우팅)
- formik, yup을 이용해 Dynamic Form 구현 (Form의 Validation 체크 및 상태 관리)
- react-toastify (토스트 알림)
- redux, redux-persist(로그인 성공시 생성되는 jwt-token 정보를 session storage에 저장 및 새로고침해도 로그인 정보를 저장)
- jwt-decode (jwt-token 파싱)
- axios interceptor 구현 (api에 인증 미들웨어를 설정해서 HTTP Header에 jwt-token 정보를 넘기기 위해 구현)
- Private Route 구현 (로그인에 성공해서 인증된 사용자만 통과시킬 수 있는 컴포넌트 구현)
- jwt-token 유효성 검증 & 해독 유틸리티 클래스 구현

# 기능
- 회원가입
- 로그인, 로그아웃
- 게시판 전체 보기
- 게시판 등록, 삭제, 수정 (로그인한 사용자만 가능)
- 댓글 등록, 삭제 수정(로그인한 사용자만 가능)

# 돌아보며 
- 리액트와 typeORM을 공부해서 처음 만든 SPA와 Restful API기반 프로젝트이다.
- 혼자 프론트엔드와 백엔드 개발을 진행해서 다소 힘든 부분이 있었지만 혼자 개발 후 배포까지 해서 매우 뿌듯하다.
- 리액트의 상태 관리 및 JWT TOKEN 관리의 중요성을 크게 깨달았다
- 프로젝트의 개발 과정을 처음부터 끝까지 기록해서 다음에 돌아봤을 때 매우 유용할 것 같다!
- 다음에는 더욱 다양한 라이브러리와 기술을 이용해서 많은 기능이 추가된 프로젝트를 진행해보고 싶다
- 새로운 기술을 배워서 진행한 첫 프로젝트라 기능과 코딩 컨벤션이 많이 부족할 수 있지만 사용자 CRUD 및 게시판 CRUD 등, Dynamic Form들을 직접 구현봐서 매우 뿌듯하다 ㅎㅎ

# 프로젝트 개발 과정 ↓↓↓↓
[https://duckgugong.tistory.com/category/%28typeORM%20%2B%20React%29%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EA%B5%AC%ED%98%84/React%EC%97%90%20API%20%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
](https://duckgugong.tistory.com/category/typeORM%2BReact%20%ED%92%80%EC%8A%A4%ED%83%9D%F0%9F%98%8E)
# BE 소스코드 ↓↓↓↓
https://github.com/ejzl521/Board-BE-NodeJS_typeORM
