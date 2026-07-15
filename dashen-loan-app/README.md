# Dashen Bank Loan Processing System

A complete, world-class web application for Dashen Bank's loan processing, built with React, Node.js, and PostgreSQL.

## Features
- Staff Mortgage, Auto, RESA, Consumer, Term, Overdraft, Pre-Shipment loans
- Credit Risk Rating (34 parameters, automatic grading)
- Collateral Valuation (all types with discounting)
- NBE Loan Classification & Provisioning
- Interactive Dashboard with charts
- JWT Authentication & Role-Based Access
- Full CRUD for customers and loans

## Tech Stack
- Frontend: React 18, TypeScript, Tailwind CSS, Recharts
- Backend: Node.js, Express, Prisma, PostgreSQL
- Deployment: Cloudflare Pages, Railway/Render

## Quick Start
```bash
# Clone
git clone https://github.com/yourusername/dashen-loan-app.git
cd dashen-loan-app

# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL
npx prisma migrate dev
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev