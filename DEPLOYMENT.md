# 🚀 Comprehensive Production Deployment Guide
## Food Waste Management System

This document provides complete, step-by-step instructions for deploying the **Food Waste Management System** to production. It covers cloud PaaS platforms (Vercel, Render, Neon/Supabase), containerized deployment using Docker & Docker Compose, and traditional Linux VPS hosting using PM2 and Nginx.

---

## 📌 1. System Architecture & Tech Stack

The application uses a decoupled full-stack architecture:

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons, Clerk Auth (`@clerk/react`), React Router v7.
- **Backend**: Node.js (ES Modules), Express.js, Prisma ORM v6, JWT (`jsonwebtoken`), CORS.
- **Database**: PostgreSQL (Relational Database managed via Prisma Schema).
- **Authentication**: Clerk (Frontend authentication) and JWT (Backend session verification).

---

## 📋 2. Prerequisites

Before starting deployment, ensure you have:

- **Git** installed on your system.
- **Node.js** v18.0.0 or higher installed.
- **npm** v9.0.0 or higher.
- A **Clerk Account** ([clerk.com](https://clerk.com)) for authentication keys.
- A **PostgreSQL Database** (Cloud provider like [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Render PostgreSQL](https://render.com)).
- *(Optional)* **Docker & Docker Compose** for containerized deployments.
- *(Optional)* Accounts on **Vercel** (Frontend) and **Render** / **Railway** (Backend).

---

## 🔑 3. Environment Variables Reference

Ensure all environment variables are correctly populated in production settings.

### ⚙️ Backend Environment Variables (`backend/.env`)

| Variable Name | Required | Example / Description |
| :--- | :---: | :--- |
| `PORT` | Yes | `5000` (Port for Express server to listen on) |
| `NODE_ENV` | Yes | `production` (Enables production optimizations) |
| `DATABASE_URL` | Yes | `postgresql://user:password@ep-xyz.neon.tech/food_waste_db?sslmode=require` |
| `JWT_SECRET` | Yes | 32+ byte random string (`openssl rand -hex 32`) |
| `FRONTEND_URL` | Yes | `https://your-app-frontend.vercel.app` (Allowed CORS origin) |

### 🌐 Frontend Environment Variables (`Frontend/.env.local` or Cloud Settings)

| Variable Name | Required | Example / Description |
| :--- | :---: | :--- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | `pk_live_...` or `pk_test_...` from Clerk Dashboard |
| `VITE_API_BASE_URL` | Recommended | `https://your-backend-api.onrender.com` (API endpoint target) |

> 💡 **Generating a Secure JWT Secret**:
> Run the following terminal command to generate a cryptographically strong secret:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

## 🗄️ 4. Managed Database Provisioning & Prisma Setup

### Option A: Using Neon / Supabase (Free Managed PostgreSQL)

1. Create a project at [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
2. Copy your connection string (`DATABASE_URL`). Ensure pooled connection parameters or `?sslmode=require` are appended if required.
3. Test local connectivity and run migrations from your terminal:

```bash
cd backend
# Generate Prisma Client code
npm run prisma:generate

# Apply migrations to production database
npx prisma migrate deploy
```

---

## ☁️ 5. Strategy 1: Managed Cloud PaaS Deployment (Recommended)

This is the fastest, zero-downtime, low-maintenance deployment method using **Vercel** (Frontend) and **Render** (Backend & Database).

```
   ┌──────────────────────┐         ┌──────────────────────┐
   │   Vercel (Frontend)  │ ──────> │   Render (Backend)   │
   │   React + Vite SPA   │  CORS   │    Node/Express API   │
   └──────────────────────┘         └──────────┬───────────┘
                                               │ Prisma
                                               v
                                    ┌──────────────────────┐
                                    │ Neon / Supabase DB   │
                                    │  Managed PostgreSQL  │
                                    └──────────────────────┘
```

### Step 5.1: Deploy Backend to Render.com

1. Push your repository to GitHub / GitLab.
2. Sign in to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Connect your Git repository.
4. Configure the service settings:
   - **Name**: `food-waste-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Select region closest to your users.
   - **Branch**: `main` (or default branch).
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `node src/server.js`
5. Add the **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: *your managed postgres connection URL*
   - `JWT_SECRET`: *your generated JWT secret*
   - `FRONTEND_URL`: `https://<your-vercel-app-domain>.vercel.app`
6. Click **Create Web Service**. Note the deployed Backend URL (e.g. `https://food-waste-backend.onrender.com`).

---

### Step 5.2: Deploy Frontend to Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Configure the Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `VITE_CLERK_PUBLISHABLE_KEY`: *your Clerk publishable key*
   - `VITE_API_BASE_URL`: `https://food-waste-backend.onrender.com`
5. Click **Deploy**. Vercel will build and deploy your React SPA.

---

### Step 5.3: Update CORS & Clerk Dashboard Config

1. Go back to your **Render Backend environment variables** and set `FRONTEND_URL` to your live Vercel domain (e.g. `https://food-waste-app.vercel.app`). Trigger a redeploy on Render.
2. Log in to your **Clerk Dashboard**:
   - Navigate to **Domains** / **API Keys**.
   - Add your production URL (`https://food-waste-app.vercel.app`) under **Allowed Origins** and **Redirect URLs**.

---

## 🐳 6. Strategy 2: Docker Containerized Deployment

Using Docker allows consistent deployment across any cloud provider (AWS EC2, DigitalOcean App Platform, GCP Cloud Run, Azure Container Instances).

### Step 6.1: Run with Docker Compose (Full Stack + Database)

We have included a production-ready `docker-compose.yml` in the project root.

1. Ensure Docker Desktop or Docker Engine is running.
2. Create a `.env` file in the root or set the variables:
   ```bash
   export VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
   ```
3. Run container build and startup:
   ```bash
   docker-compose up -d --build
   ```
4. Access services:
   - **Frontend App**: `http://localhost:8080`
   - **Backend API Health**: `http://localhost:5000/api/health`
   - **PostgreSQL DB**: `localhost:5432`

5. Check running containers & logs:
   ```bash
   docker-compose ps
   docker-compose logs -f backend
   ```

---

### Step 6.2: Build Individual Docker Images Manually

#### Backend Image:
```bash
cd backend
docker build -t food-waste-backend:latest .
docker run -d -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="your_secret" \
  -e FRONTEND_URL="http://localhost:8080" \
  --name backend-service food-waste-backend:latest
```

#### Frontend Image:
```bash
cd Frontend
docker build \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY="pk_test_..." \
  --build-arg VITE_API_BASE_URL="http://localhost:5000" \
  -t food-waste-frontend:latest .

docker run -d -p 8080:80 --name frontend-service food-waste-frontend:latest
```

---

## 🐧 7. Strategy 3: Self-Hosted VPS Deployment (Ubuntu + PM2 + Nginx)

For deployment on a dedicated Ubuntu Linux Virtual Private Server (DigitalOcean Droplet, AWS EC2, Linode, Vultr).

### Step 7.1: Server Environment Preparation

Connect via SSH and install system dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 Process Manager globally
sudo npm install -g pm2
```

---

### Step 7.2: Clone Project & Setup Backend

```bash
# Clone project into server directory
cd /var/www
sudo git clone https://github.com/your-username/Food_Waste_Managment_System.git
sudo chown -R $USER:$USER /var/www/Food_Waste_Managment_System
cd Food_Waste_Managment_System/backend

# Install dependencies and setup environment
npm ci
cp .env.example .env
nano .env   # Update DATABASE_URL, JWT_SECRET, PORT=5000, FRONTEND_URL

# Prisma setup
npx prisma generate
npx prisma migrate deploy

# Start server using PM2
pm2 start src/server.js --name "food-waste-backend"
pm2 save
pm2 startup
```

---

### Step 7.3: Build & Setup Frontend

```bash
cd /var/www/Food_Waste_Managment_System/Frontend

# Install dependencies
npm ci

# Set production env
echo "VITE_CLERK_PUBLISHABLE_KEY=pk_live_..." > .env.local
echo "VITE_API_BASE_URL=https://your-domain.com" >> .env.local

# Build bundle
npm run build
```

---

### Step 7.4: Nginx Reverse Proxy & Static Hosting

Create an Nginx configuration file at `/etc/nginx/sites-available/food-waste`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend Static File Serving
    root /var/www/Food_Waste_Managment_System/Frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Reverse Proxy for Backend Express API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site & test config:

```bash
sudo ln -s /etc/nginx/sites-available/food-waste /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Step 7.5: SSL Certificate with Let's Encrypt

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 🛡️ 8. Post-Deployment Verification & Testing

### 1. Check API Health Endpoint
Execute `curl` or visit in your browser:
```bash
curl https://your-backend-api.onrender.com/api/health
```
**Expected Response:**
```json
{
  "status": "OK",
  "message": "Food Waste Management Backend Service is active",
  "timestamp": "2026-09-05T11:40:00.000Z"
}
```

### 2. Verify Database Connection
Attempt user signup or create a food donation listing. Verify data persists correctly in PostgreSQL.

---

## ❓ 9. Troubleshooting Matrix

| Issue / Symptom | Possible Cause | Resolution |
| :--- | :--- | :--- |
| **CORS Error in Browser** | `FRONTEND_URL` mismatch in backend | Ensure `backend/.env` has exact frontend origin (no trailing slash). |
| **Prisma Migration Error** | Invalid `DATABASE_URL` or missing SSL | Check `DATABASE_URL` format. Append `?sslmode=require` for cloud databases. |
| **404 Page Refresh Error on Frontend** | Missing Nginx SPA `try_files` rule | Ensure Nginx config routes missing files to `/index.html`. |
| **Clerk Auth Error (Invalid Key/Origin)** | Clerk Publishable key missing or domain not allowed | Check `.env.local` for `VITE_CLERK_PUBLISHABLE_KEY` & verify domains in Clerk dashboard. |
| **502 Bad Gateway (Nginx/PM2)** | Backend server crashed or port bound | Check PM2 logs: `pm2 logs food-waste-backend`. Ensure backend runs on port 5000. |

---

## 🧹 10. Maintenance & Database Backups

- **Prisma Migrations**: Whenever schema changes occur, run `npx prisma migrate dev --name <migration_name>` locally and commit migration files.
- **Database Backup**: Standard PostgreSQL dump command:
  ```bash
  pg_dump -h your-db-host -U postgres -d food_waste_db > backup_$(date +%Y%m%d).sql
  ```

---

*Document compiled for Food Waste Management System Production Deployment.*
