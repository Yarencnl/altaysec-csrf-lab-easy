# AltaySEC - Cross-Site Request Forgery Lab 🛡️

Bu proje, web uygulamalarındaki CSRF (Cross-Site Request Forgery) zafiyetlerini ve oturum yönetimindeki mantık hatalarını anlamak ve test etmek amacıyla geliştirilmiş interaktif bir sızma testi laboratuvarıdır.


## 🚀 Özellikler
* **Zafiyet:** Durum değiştiren bir istekte CSRF token doğrulamasının bulunmaması (Cross-Site Request Forgery).
* **Frontend:** React + Vite (NotDefteri temalı şık arayüz).
* **Backend:** Node.js & Express (cookie tabanlı oturum yönetimi).
* **Kolay Kurulum:** Docker Compose desteği ile tek komutla ayağa kalkar.

## 🛠️ Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için Docker ve Docker Compose [kurulu](https://docs.docker.com/desktop/) olmalıdır.

1. Projeyi klonlayın veya indirin.
2. Proje ana dizininde terminali açın.
3. Şu komutu çalıştırın:

   ```bash
   docker compose up --build
   ```

4. Tarayıcınızdan arayüze gidin:
   * Kurban uygulama: `http://localhost:5173`
   * Backend API: `http://localhost:4000`

##
* Amaç, kurbanın "Hesabımı Sil" butonuna basmasına gerek kalmadan hesabın silinmesini sağlamaktır.
* Exploit sayfanızı `http://localhost:<port>` üzerinden sunun; `127.0.0.1` veya `file://` cross-site sayılır ve oturum çerezi gönderilmez.
* Hesap uygulamanın kendi arayüzünden silinirse flag gelmez; flag yalnızca istek dışarıdan tetiklendiğinde döner.

##
[<img align="left" alt="React" width="50px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1280px-React.svg.png" />][React]
[<img align="left" alt="Nodejs" width="50px" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/node-js-icon-svg-download-png-7694086.png?f=webp&w=128" />][Nodejs]
[<img align="left" alt="Docker" width="50px" src="https://w7.pngwing.com/pngs/627/244/png-transparent-docker-logo-logos-logos-and-brands-icon.png" />][Docker]
[<img align="left" alt="CSS" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />][CSS]



[React]: https://tr.react.dev
[Nodejs]: https://nodejs.org/en
[Docker]: https://www.docker.com
[CSS]: https://www.w3.org/Style/CSS/Overview.en.html


<br/>
<br/>

##
*✨Built with passion by [Yaren Canlı](https://github.com/Yarencnl)*
