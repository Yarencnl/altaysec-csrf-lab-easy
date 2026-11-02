const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 4000;

const APP_ORIGIN = "http://localhost:5173";

const FLAG = process.env.FLAG || "AltaySec{çItA_mI_0}";

const USERS = {
  user: {
    password: "1234",
    email: "user@example.com",
    isDeleted: false,
    deletedViaCsrf: false,
    notes: [
      { id: 1, title: "Market listesi", content: "Süt, yumurta, ekmek..." },
      { id: 2, title: "Toplantı notları", content: "Pazartesi saat 10'da..." },
      { id: 3, title: "Fikirler", content: "Yeni proje için CSRF lab yapmak 🎯" },
    ],
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: "cok-gizli-bir-anahtar-lab-icin",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  })
);

function requireLogin(req, res, next) {
  if (!req.session.username || USERS[req.session.username]?.isDeleted) {
    return res.status(401).json({ message: "Giriş yapılmamış" });
  }
  next();
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Kullanıcı adı ve şifre gerekli" });
  }
  const user = USERS[username];
  if (!user || user.password !== password || user.isDeleted) {
    return res.status(401).json({ message: "Hatalı kullanıcı adı veya şifre" });
  }
  req.session.username = username;
  res.json({ user: { username, email: user.email } });
});

app.get("/api/me", requireLogin, (req, res) => {
  const user = USERS[req.session.username];
  res.json({ user: { username: req.session.username, email: user.email } });
});

app.get("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/notes", requireLogin, (req, res) => {
  const user = USERS[req.session.username];
  res.json({ notes: user.notes });
});

app.post("/api/notes", requireLogin, (req, res) => {
  const { title, content } = req.body || {};
  const user = USERS[req.session.username];
  const newNote = { id: Date.now(), title, content };
  user.notes.push(newNote);
  res.json({ notes: user.notes });
});

app.get("/api/user-status/:username", (req, res) => {
  const user = USERS[req.params.username];
  if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  res.json({
    isDeleted: user.isDeleted,
    deletedViaCsrf: user.deletedViaCsrf,
    flag: user.deletedViaCsrf ? FLAG : undefined,
  });
});


app.post("/api/delete-account", requireLogin, (req, res) => {
  const { confirm } = req.body || {};
  if (confirm !== "SIL") {
    return res.status(400).json({ message: "Onay eksik: 'confirm' alanı 'SIL' olmalı" });
  }

  const origin = req.get("origin") || "";
  const user = USERS[req.session.username];
  user.isDeleted = true;
  user.deletedViaCsrf = origin !== "" && origin !== APP_ORIGIN;

  res.json({ ok: true });
});

app.post("/api/reset-demo", (req, res) => {
  USERS.user.isDeleted = false;
  USERS.user.deletedViaCsrf = false;
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT} adresinde çalışıyor`);
});