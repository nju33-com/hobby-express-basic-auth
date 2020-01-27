```wsd
@startuml
participant browser
participant server

autonumber

browser -> server: アクセス

loop
  alt 認証が失敗
    server -> browser: 401\nwww-authenticate: Basic realm=... を返す
    browser -> browser: 認証ダイアログを出す
    opt ユーザー名とパスワード入力
       browser -> server: authorization: Basic ... を送信
       server -> server: 認証
    end
  else
    server -> browser: 200
  end
end


@enduml

```