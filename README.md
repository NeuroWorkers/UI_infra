# UI_infra

## Requirements

To start the project, follow these steps:

1. Install the missing modules listed in `flask_ui.py`.
2. Run `flask_ui.py`. It will log to the console and provide a link like `http://127.0.0.1:5000`.
3. Click the link to be redirected to the default browser with the rendered page.

- **HTML and CSS**: `templates/index.html`, `static/index.css`
- **JavaScript**: `static/index.js`
- **Localhost server**: `flask_ui.py`

For extended functionality, it is recommended to set up a server, such as nginx, to allow access via an external IP.

## Guide for macOS

1. Update Homebrew:
    ```sh
    brew update
    ```

2. Install nginx:
    ```sh
    brew install nginx
    ```

3. Start nginx:
    ```sh
    brew services start nginx
    ```

4. Stop nginx:
    ```sh
    brew services stop nginx
    ```

5. Edit the sample configuration file:
    ```sh
    sudo cp sample.conf /opt/homebrew/etc/nginx/sites-enabled/sample.conf
    ```


## Attention

If the specified path is incorrect (usually due to the absence of `/sites-enabled`), follow these steps:

1. Manually create the directory.
2. Create the `*.conf` file as root.

You will need to perform step 2 as root.

## Guide for Linux

1. Update and upgrade the system:
    ```sh
    sudo apt update && sudo apt upgrade -y
    ```

2. Install nginx:
    ```sh
    sudo apt install nginx
    ```

3. Copy the sample configuration file:
    ```sh
    sudo cp sample.conf /etc/nginx/conf.d/sample.conf
    ```

## PS

Modify the `*.conf` file as needed. Here are some examples:

1. **server_name**: Replace `localhost` with your server's domain name. In your domain's DNS settings, add an A record linking the domain name to your server's IP address.
2. **listen**: Use `80` for HTTP, `443 ssl` for HTTPS.
3. **SSL/TLS**: Add the following for SSL/TLS:
    ```nginx
    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ```

   For optimization (before `server`):
    ```nginx
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;
    ```