# Autrade 🚗

![.NET](https://img.shields.io/badge/.NET-8.0-purple)
![Next.js](https://img.shields.io/badge/Next.js-15.3-black)

Autrade is a modern microservices-based online auction platform for automobiles. Built with .NET microservices and Next.js frontend, it provides a seamless experience for buying and selling vehicles through real-time auctions.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Configure Local Host](#1-configure-local-host)
  - [2. Choose Your Method](#2-choose-your-method)
- [Services Description](#services-description)

## 🔍 Project Overview

Autrade is a comprehensive online auction platform where users can:

- Browse and search for vehicles
- Create auction listings with detailed information
- Place bids on active auctions
- Receive real-time notifications for auction events
- Manage user accounts and authentication
- Track auction history and outcomes

The system uses a microservices architecture to ensure scalability, resilience, and maintainability, with services communicating via RabbitMQ message broker and gRPC for direct service-to-service communication.

## 🏗️ System Architecture

Autrade follows a microservices architecture with the following components:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │     │   Gateway   │     │  Identity   │
│  (Next.js)  │────▶│   Service   │────▶│   Service   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           │
                           ▼
       ┌─────────┬─────────┴─────────┬─────────┐
       │         │                   │         │
       ▼         ▼                   ▼         ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   Auction   │ │   Bidding   │ │   Search    │ │ Notification│
│   Service   │ │   Service   │ │   Service   │ │   Service   │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
       │                 │             │               │
       └─────────────────┴─────────────┴───────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  RabbitMQ   │
                    │ (Message Bus)│
                    └─────────────┘
```

- **Frontend (Next.js)**: User interface for the application
- **Gateway Service**: API Gateway that routes requests to appropriate services
- **Identity Service**: Handles authentication and authorization
- **Auction Service**: Manages auction listings and core business logic
- **Bidding Service**: Processes bid placements and auction completions
- **Search Service**: Provides search capabilities across auction listings
- **Notification Service**: Delivers real-time updates via SignalR
- **RabbitMQ**: Message broker for async communication between services

## 💻 Technologies

- **Backend**:

  - .NET 8.0
  - ASP.NET Core
  - Entity Framework Core
  - MongoDB
  - PostgreSQL
  - MassTransit (RabbitMQ)
  - gRPC
  - SignalR
  - IdentityServer

- **Frontend**:

  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Flowbite React components
  - Zustand (State management)
  - NextAuth.js

- **DevOps**:
  - Docker
  - Docker Compose
  - Nginx

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) & [Docker Compose](https://docs.docker.com/compose/install/)
- For local development: [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) & [Node.js](https://nodejs.org/) (v18+)

### 1. Configure Local Host

Add these entries to your hosts file (`/etc/hosts` on macOS/Linux or `C:\Windows\System32\drivers\etc\hosts` on Windows):

```
127.0.0.1 app.autrade.local
127.0.0.1 id.autrade.local
127.0.0.1 api.autrade.local
```

### 2. Choose Your Method

#### 🐳 Quick Start Mode (Docker Compose)

```bash
# Clone repository
git clone https://github.com/yourusername/autrade.git
cd autrade

# Start everything
docker-compose up -d

# Access at http://app.autrade.local
```

#### 👨‍💻 Development Mode

```bash
# Clone repository
git clone https://github.com/yourusername/autrade.git
cd autrade

# Start infrastructure only
docker-compose up -d postgres mongodb rabbitmq

# Start backend services (run these in separate terminals)
dotnet run --project src/IdentityService
dotnet run --project src/AuctionService
dotnet run --project src/SearchService
dotnet run --project src/BiddingService
dotnet run --project src/NotificationService
dotnet run --project src/GatewayService

# Start frontend
cd frontend/web-app
npm install
npm run dev

# Access at http://app.autrade.local
```

## 📦 Services Description

### 🔐 Identity Service

Handles authentication and user management using IdentityServer4. It provides:

- User registration and login
- Token issuance and validation
- User profile management

### 🏢 Auction Service

The core service that manages auction listings:

- Create, read, update and delete auctions
- Auction lifecycle management
- Integration with other services via messages

### 💰 Bidding Service

Processes bids and manages auction completions:

- Bid placement and validation
- Auction completion and winner determination
- Bid history tracking

### 🔍 Search Service

Provides search capabilities for auction listings:

- Indexed searching of auctions
- Filtering and sorting of results
- Real-time index updates via messaging

### 📢 Notification Service

Delivers real-time updates to clients:

- Real-time notifications via SignalR
- Notification history and tracking
- Integration with other services via message queue

### 🌐 Gateway Service

API Gateway routing requests to appropriate services:

- Request routing
- Cross-cutting concerns
- API composition

### 🖥️ Frontend Web App

Next.js-based user interface:

- Responsive design for all devices
- Real-time updates with SignalR
- Modern UI with Tailwind CSS and Flowbite components
