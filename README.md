# EAT-Server

2021-2 Software Engineering
Server Implementation

### Frontend(Android) 미완성으로 인해, 일단은 Pug라는 view engine을 사용하여 웹으로 구현한 상태입니다. 참고 부탁드립니다.

- nodeJS : v14.17.6
- nodeJS설치 이후 Terminal에 **npm install**하면 필요한 node_modules가 자동으로 설치됨
- mongoDB : v5.0.3
- 식당 Data.csv 파일을 mongoDB에 import 해야 함
  - mongoDB database tools : https://www.mongodb.com/try/download/database-tools
    - 환경 변수 설정
    - cmd에서 mongod 입력
    - mongoimport --db 데이터베이스 이름 --collection 콜렉션 이름 --host 연결될 호스트 주소 --type csv --headerline --file 파일 위치
    - [참고 링크](https://spidyweb.tistory.com/167)
- env파일 설정
  - PORT : 사용할 포트 번호
  - DB_URL : mongoDB의 host 주소(cmd에서 mongod를 통해 확인 가능)
  - COOKIE_SECRET : cookie 암호화를 위한 임의의 문자열
  - ADMIN_EMAIL : 이메일 인증에 필요한 인증코드를 보낼 관리자의 구글 이메일
  - ADMIN_PASSWORD : 이메일 인증에 필요한 인증코드를 보낼 관리자의 구글 비밀번호
- 서버 구동 : **npm run server**
  - 만약 babel-node는 내부 파일이 아니라는 에러가 발생할 경우, node_modules 폴더를 삭제하고 다시 npm install해야 함
