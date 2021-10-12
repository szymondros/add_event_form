
Aby uruchomić aplikację należy wykonać następujące kroki:

1. Pobrać repo: https://github.com/szymondros/add_event_form

2. Utworzyć lokalnie bazę danych mongoDB dostępną pod adresem: mongodb://127.0.0.1:27017/eventer 
lub zmienić adres url znajdujący się w pliku index.js w katalogu server/db na jakąkolwiek bazę np. Utworzoną pod sprawdzanie zadania.
3. Korzystając z konsoli należy przejść do katalogu “server” i uruchomić serwer node za pomocą polecenia “nodemon index.js”
4. Korzystając z konsoli należy przejść do katalogu “client” i uruchomić aplikację REACT za pomocą polecenia “npm start”

Port React’a został ustawiony na 8000 w pliku package.json .
