# UI_infra

Верстка - templates/index.html , static/index.css<br>
Функционал - static/index.js<br>
Localhost-server - flask_ui.py<br>

Для расширения возможностей использования рекомендуется поставить сервер, например на nginx - возможность доступа по внешнему IP. 

# GUIDE FOR MAC 

1) brew update

2) brew apt install nginx

3) brew services start nginx

4) brew services stop nginx

5) sudo nano /opt/homebrew/etc/nginx/sites-enabled/YOUR_NAMING.conf

6) Содержимое *.conf:<br>
server <br>
{<br>
   listen 80; # Выберите сами<br>
   
   server_name localhost; # Выберите сами<br>
   
   root /absolute_path_to_project;<br>

   // Доступ к файлам статики (HTML, CSS, JS)<br>
   location /static/ {<br>
       alias /absolute_path_to_static/;<br>
   }<br>

   location / {<br>
       proxy_pass http://127.0.0.1:5000; # Выберите сами<br>
       proxy_set_header Host $host;<br>
       proxy_set_header X-Real-IP $remote_addr;<br>
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;<br>
   }<br>
}<br>

# ATTENTION 
В случае некорректности указанного пути (как правило это отсутствие /sites-enabled), следует: 
1) Ручками создать директорию 
2) В ней от root создавать *.conf 

Пункт 2 выполнять придется в любом случае, делать это от root. 

# GUIDE FOR LINUX 

1) sudo apt update 

2) sudo apt install nginx 

3) sudo nano /etc/nginx/conf.d/YOUR_NAMING.conf

4) Содержимое *.conf:<br>
server <br>
{<br>
   listen 80; # Выберите сами<br>
   
   server_name localhost; # Выберите сами<br>
   
   root /absolute_path_to_project;<br>

   // Доступ к файлам статики (HTML, CSS, JS)<br>
   location /static/ {<br>
       alias /absolute_path_to_static/;<br>
   }<br>

   location / {<br>
       proxy_pass http://127.0.0.1:5000; # Выберите сами<br>
       proxy_set_header Host $host;<br>
       proxy_set_header X-Real-IP $remote_addr;<br>
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;<br>
   }<br>
}<br>

# PS 
.conf модифицируйте в зависимости, вот примеры модификации:<br>
1) server_name: вместо localhost, укажите доменное имя сервера. В настройках DNS вашего домена добавьте запись типа A, которая будет связывать доменное имя с IP-адресом вашего сервера.<br>
2) listen: 80 - HTTP, 443 ssl - HTTPS<br>
3) Нужно добавить при использовании ssl/tls:<br>
    ssl_certificate     www.example.com.crt;<br>
    ssl_certificate_key www.example.com.key;<br>
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;<br>
    ssl_ciphers         HIGH:!aNULL:!MD5;<br><br>
   Можно добавить для оптимизации(перед 'server'):<br>
    ssl_session_cache   shared:SSL:10m;<br>
    ssl_session_timeout 10m;<br>