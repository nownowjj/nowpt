# nowpt

FE : React 
</br>
BE : Spring boot
</br>
DB : Oracle Free DataBase
</br>
DBTOOL : Dbeaver
</br>

Spring boot를 jar 파일로 bulid 시킬 때 React build를(build.gradle에 기재) 진행 시킨 다음에 bulid된 index.html을 static폴더에 위치시킴.
</br>
그리고 bulid된 index.html을 view로 사용.
</br>
server는 RestController로 json data만 response해줌.
</br>
view가 spa이기 때문에 새로고침, error발생시 index.html로 바라보게 설정.
</br>

인증 수단
- social Login(kakao , naver)
- </br>
- email login(아직 이메일 인증까지는 구현하지 않음)
- </br>
FE : isAuth.js에서 sessionStorage에 jwt의 유무를 판별하여 로그인 정보를 필요시 하는 component에서 사용.
</br>
social or email 둘다 로그인시 JWT를 발급시켜 response해줌.(FE에서는 현재 session에 jwt 저장 차후 Cookie 처리 하든지 추후 고민할 문제)
</br>
cilent가 api요청시 spring security config에 permitAll 해놓지 않은 url에 대해서는 JWT 검증 절차 실행.
</br>

websocket
</br>
로그인을 해야만 사용할 수 있게끔 isAuth의 유무에 따라 설정 해놓음.
</br>
사용자가 message send시에 닉네임은 login시 Principle에 담아놓은 정보에 있는 닉네임 사용
</br>




