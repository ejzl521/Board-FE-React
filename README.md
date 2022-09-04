# React로 게시판 사이트 만들기📝
- http://duck90.site
- RestAPI 작성부터 프론트엔드 개발까지 혼자만의 개발 레퍼런스 만들기

#### 메인화면
![3](https://user-images.githubusercontent.com/55455103/175644568-c38d560f-b05f-4e90-b5d4-38a889c3927d.gif)
#### 게시물 전체보기(페이지네이션)
![shorts42](https://user-images.githubusercontent.com/55455103/183496725-bce88751-8ca3-4351-9082-89b6362ad8c2.gif)
#### 게시물 상세보기(댓글 기능)
![5](https://user-images.githubusercontent.com/55455103/175644637-dbd01261-5dbb-4c8c-900d-15f2206360f6.gif)

# 개발 환경
- webStorm (React 프로젝트)


# Main Stack
  <div>
  <img src="http://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="http://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" />
  <img src="http://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  </div>
  <div>
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
  <img src="http://img.shields.io/badge/-Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white" />
  <img src="http://img.shields.io/badge/-Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white" />
  <img src="http://img.shields.io/badge/-Amazon EC2-FF4F8B?style=for-the-badge&logo=Amazon EC2&logoColor=white" />
  </div>  
  
# Main Library
### Redux & Redux-persist
- 전역 상태 유지
- redux-persist를 사용해서 redux의 state 저장소를 local storage로 사용
- ex) 사용자가 로그인 성공시 response로 받아오는 jwt 정보를 local storage에 저장 및 새로고침을 해도 local storage에 있는 jwt 정보가 남아있기 때문에 새로고침 될 때 별도의 로직을 사용해서 token을 redux에 저장하지 않아도 됨
### axios
- HTTP request & respose
### yup & formik
- form의 상태 관리 및 validation 검사
- formik ex) input의 상태를 관리하기 위해 별도의 useState와 useRef혹은 onChange를 사용하지 않아도 간단히 form의 상태 관리 가능
- yup ex) 회원가입할 때 비밀번호는 8글자 이상 및 숫자와 특수문자 하나 반드시 포함
### Material UI
- css 프레임워크
- 페이지네이션 컴포넌트와 같이 커스텀하기 까다로운 부분을 쉽게 가져다 사용
### scss
- 계층적 CSS 작업을 통해 가독성 증가 및 보일러플레이트 감소
### react-router-dom v6
- 라우팅, 동적 라우팅, query parmeter와 uri parameter를 효율적으로 파싱
### jwt-decode
- jwt parsing

# 프로젝트 주요 기능
### 회원가입
- yup을 이용한 validation을 통해 사용자에게 적절한 정보를 입력하도록 유도
### 로그인, 로그아웃
- 로그인 성공시 redux-persist에 jwt 저장 ➔ 새로고침해도 로그인 상태 유지
- 로그아웃시 redux-persist에 있는 jwt 정보 삭제
### 게시물 CRUD
- 게시물 등록, 삭제, 수정 (로그인한 사용자만 가능)
- 게시물 수정의 경우 사용자가 이전에 작성한 게시물의 상태를 그대로 불러와서 보여줌
- 게시판 페이지에서 모든 사용자가 작성한 게시물을 확인할 수 있고 내 게시물 패이지에서 내가 작성한 글들만 확인 가능
- 게시판과 내 게시물 페이지는 모두 pagination 기능이 포함되어 있어서 렌더링 시간과 서버의 response 대기 시간을 줄임
### 댓글 기능
- 게시물 상세보기 페이지에서 댓글 등록 및 pagination으로 댓글 목록 보기
- 댓글의 pagination은 댓글 더 보기 버튼을 누르면 다음 페이지에 해당하는 댓글을 가져오도록 구현

# Utility
### jwtUtils 클래스 구현
- jwt를 파싱해서 유효한 jwt인지 검증하거나 payload에 있는 사용자의 이름, DB에 저장되어 있는 ID등을 사용하는 로직이 여러 컴포넌트에서 중복되기 때문에 유틸리티 클래스 구현
### axios interceptor
- axios interceptor를 구현하여 HTTP 요청 시 redux의 store에 토큰이 있으면 넣어서 서버의 미들웨어(typeORM 인증 미들웨어)가 이를 검증하게 함
### PrivateRoutes - UX도 고려
- props로 가고자하는 URL과 보여줄 컴포넌트를 넘겨준다.
- 전역 상태(redux-persist)에 저장되어 있는 토큰을 검증하여 인증되지 않은 사용자가 인증된 사용자만 접근할 수 있는 페이지에 접근할 때, 원래 접근하려고 한 URL을 query parameter로 넘겨서 로그인 페이지로 들어가게 한 후, 로그인 페이지에서 로그인 완료시 query parameter로 받은 Redirect URL로 돌아게가 한다. UX적 관점에서 생각을 많이 했다.
- 만약 전역 상태에 저장되어 있는 토큰을 검증해서 유효한 jwt를 가지고 있는 사용자라면 원래 가고자한 페이지로 넘어가게 해준다.

# 그 밖의 고려사항 - UX
- UX와 Design에 대해 많이 고려하며 프로젝트를 진행했다.
  - 로그인이 필요한 기능을 사용할 때 로그인 페이지로 넘어간 후 로그인에 성공하면 다시 원래 페이지로 돌아오기
  - 사용자가 focus한 요소가 확대 및 강조가 되게하거나 게시물이 fade-in하게 animation 효과 주기
  - 로그인한 사용자와 로그아웃한 사용자가 다른 메뉴를 보게하는 것과 같은 기능을 많이 생각했다.
  - 일정 분기마다 html 태그의 font-size를 미디어 쿼리로 조정해서 CSS 작업을 %와 rem으로 진행한 반응형 웹 어플리케이션 
- FrontEnd 개발시에 반드시 필요한 최소한의 기능만 포함해서 UX와 디자인적으로 고려를 많이 하지 않으려고 했지만 결국 사용자와 직접적으로 소통을 하는 창구임을 잊지 않고 프로젝트를 진행했던 것 같다.
- 자주 사용하는 component 모듈화 및 directory structure를 생각하면서 프로젝트 진행

# 돌아보며 
- FrontEnd를 개발할 때 꼭 들어가야 하는 회원가입, 사용자 인증, 게시물 CRUD, 크로스 브라우징, pagination, 상태 관리 등 여러 기술을 포함해서 개발환경 설정부터 배포까지 모두 글로 정리해서 나만의 레퍼런스를 만들기 위해 프로젝트를 진행했다.
- 혼자 기획, FrontEnd와 BackEnd 개발을 진행하고 모두 블로그에 기록해서 다소 힘든 부분이 있었지만 배포까지 해서 매우 뿌듯하다.
- 이미 구현할 수 있는 기능들만 사용해서 큰 trouble shooting이 있지는 않았지만 directory structure나 많은 개발자들이 사용하는 code convention을 고려하면서 개발하는 것이 조금 신경쓰였다.
- 다음에는 typeScript를 사용해보고 더욱 다양한 상태 관리 라이브러리와 기술을 이용해서 많은 기능이 추가된 프로젝트를 진행해보고 싶다

# 프로젝트 개발 과정 ↓↓↓↓
- 개발환경 설정부터 배포까지 모두 기록해서 나만의 레퍼런스 만들기 성공!
https://duckgugong.tistory.com/category/React+REST%20API%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EA%B5%AC%ED%98%84/FE%20-%20React?page=3
# BE 소스코드 ↓↓↓↓
https://github.com/ejzl521/Board-BE-NodeJS_typeORM
