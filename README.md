# 💬 Flownium Chat

**Flownium Chat**은 실시간 채팅 기능을 지원하는 감성 토이 프로젝트입니다.  
React + Vite + TailwindCSS + Socket.IO 기반으로 구현되었으며,  
사용자 간 실시간 대화, 자동 스크롤, 닉네임 입력, 타임스탬프 표시 등  
기본적인 채팅 UX를 충실히 반영했습니다.

---

## 🚀 데모 링크 (추후 배포 시)
- 프론트: https://flownium.vercel.app
- 백엔드: https://flownium-server.onrender.com

---

## 🧩 주요 기능

- ✅ 카카오 소셜 로그인 (OAuth2)
- ✅ 실시간 채팅 (Socket.IO)
- ✅ 1:1 및 그룹 채팅방 생성
- ✅ 채팅방 목록 + 마지막 메시지 미리보기
- ✅ 익명 1회용 채팅방 (Optional)
- ✅ 24시간 제한 채팅방 (Optional)
- ✅ 메시지 자동 스크롤 및 말풍선 UI

---

## 🛠️ 기술 스택

| 구분 | 스택 |
|------|------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express + Socket.IO |
| DB | MongoDB (Mongoose) |
| Auth | Kakao OAuth 2.0 |
| 배포 | Vercel (FE) + Render / Railway (BE) |

---

## 🗂️ 폴더 구조

```
flownium-chat/
├── server/           # 백엔드 (Express + Socket.IO)
│   ├── models/
│   ├── routes/
│   ├── index.cjs
│   └── .env
├── src/              # 프론트엔드 (React)
│   ├── api/
│   ├── components/
│   ├── pages/
│   └── App.jsx
└── package.json
```

---

## ✨ 주요 화면

(스크린샷 또는 preview.gif 삽입 예정)

---

## 📦 설치 및 실행 방법 (로컬 개발용)

### 1) 백엔드
```bash
cd server
npm install
npm run dev
```

### 2) 프론트엔드
```bash
npm install
npm run dev
```

- `.env` 파일은 각각 `/server/.env`, `/` 에서 분리 관리

---

## 📝 향후 계획

- 카카오 로그인 연동 및 세션 유지
- 채팅방 상세 → 메시지 로딩 + 입력 기능 완성
- 그룹 채팅방/알림/읽음 처리/모바일 대응

---

## 🧑‍💻 개발자

| 이름 | GitHub | Blog |
|------|--------|------|
| yoooon0104 | [@yoooon0104](https://github.com/yoooon0104) | [Velog](https://velog.io/@yoooon0104) |
```