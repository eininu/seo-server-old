# jp9.org
A simple web server with a set of tools, mainly focused on solving personal work tasks.

## 1. Deploy
Instruction to deploy on clean CentOS Stream 9 server. If you know how work with servers and configure packages and nginx - just skip this step.

### Configure server

#### Login
- Use your credentials. Usually its `root` login with some autogenerated password.

#### Update OS
- `apt-get update -y`
- `apt-get upgrade -y`

#### Create user
- `sudo adduser ein` # here use your username instead ein
- `sudo adduser ein sudo`
- `su ein` # use it for switch to your new user; in future just log in to your server by this username
- `cd`

#### Install important packages
##### Git
- `sudo apt-get install git -y`

##### Node
- `curl -sL https://deb.nodesource.com/setup_19.x -o /tmp/nodesource_setup.sh`
- `sudo bash /tmp/nodesource_setup.sh`
- `sudo apt-get install nodejs -y`

### Working with repository & configure app
- `cd`
- `git clone https://github.com/eininu/jp9.org.git`
- `cd jp9.org`
- `npm install`
- `npm run setup`
- `npm run client:build`

### PM2
Configure a package for set app like daemon with autorun after reboot

- `sudo npm install pm2 -g`
- `pm2 start npm -- start`
- `pm2 save`
- `pm2 startup`
  - `sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd - u ein --hp /home/ein` # this command you should use for autorun your app after server reboot. You should insert it manually, it will be generated automatically in terminal

So, now your app configured and worked locally. You can't see it's by your server adders, because it has firewall. You will disable firewall for get external access to your app by default port but I'm not recommend to do it. Instead of it we will set up Nginx reverse proxy for better security.

You will manually check the app availability by curl with command `curl localhost:3001`, and see the result of api request to the server.

For me now it's this response: `
{"message":"The app isn't installed!"}`

If you weren't get similar response by curl - something went wrong in previous steps... Check it and try to fix.

---

### Nginx configure

#### Install
- `sudo apt-get install nginx -y`
- `sudo systemctl enable nginx`
- `sudo systemctl start nginx`

So, now you can exactly check your api connection by server_ip:3001. It should work.

#### Configure custom ports
- `sudo nano /etc/nginx/conf.d/jp9.conf`
- in server param change root param to your build client file.
```
server {
        server_name 0.0.0.0;
        proxy_set_header X-Forwarded-For $remote_addr;
        location / {
                root /home/ein/jp9.org/client/build;
                index index.html;
                
                try_files $uri /index.html;
        }

        location /api/ {
                proxy_pass http://127.0.0.1:3001;
        }
        
        listen 80;
        listen [::]:80;
}
```
  where instead 0.0.0.0 use your server ip address

- by command `sudo nano /etc/nginx/nginx.conf` change param `user` to your username (for me its `ein`)
- `sudo nginx -t` # to check if config have some troubles
- `sudo systemctl restart nginx` # reboot nginx

- Congratulations! Your app is work just by http://server_ip and app api works here http://server_ip/api # of course here instead `server_ip` should be your server ip address

## 2. Usage
For using `websites` - add following line to your nginx config for read configs from your app (at the end of http param).
- `include /home/ein/jp9.org/nginx-configs/*.conf;`