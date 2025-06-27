<p align="center">
  <img src="./frontend/public/logo.svg" alt="Y Logo" width="200"/>
</p>

<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/haksolot/y?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/haksolot/y?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/haksolot/y?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/haksolot/y?style=flat-square)

</div>


<h1 align="center">Y</h1>

<p align="center">
  The next-gen social platform — a bold rival to X. Watch out, Elon.
</p>

---

**Y** is an open-source, full-stack social media platform built to challenge the norms of online interaction.  
Inspired by the simplicity of early Twitter, but supercharged with modern features, we aim to provide a space where users can express themselves freely, securely, and with zero distractions.

---

## Features

As a user, you can:

- Create an account and log in
- Post messages and media
- Like, comment and share posts
- Follow other users
- Customize your profile
- Receive real-time notifications
- Browse a dynamic timeline
- Use the platform with HTTPS on your local network

---

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Auth**: JWT-based authentication
- **API Gateway**: Reverse-proxied via NGINX
- **Architecture**: Microservices (auth, profile, post, notif, etc.)
- **Dev Tools**: Docker (optional), mkcert for local HTTPS, ESLint + Prettier

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- MongoDB
- `mkcert` (for local SSL)
- (Optional) Docker

### Installation

```bash
# Clone the repo
git clone https://github.com/haksolot/y.git

# Build docker images
cd y
docker compose build

# Launch images
docker compose up -d
