# Rainame - Modern E-commerce Platform

Rainame is a modern fashion e-commerce platform built with the T3 Stack, offering stylish and high-quality apparel for every occasion. This full-stack application provides a complete online shopping experience with user authentication, product management, shopping cart functionality, and secure checkout processes.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 16, React 19, and Tailwind CSS for a responsive and beautiful interface
- **Authentication**: Secure user authentication with Better Auth supporting GitHub OAuth
- **Product Catalog**: Browse products by categories and subcategories with advanced filtering
- **Shopping Cart**: Add products to cart with size selection and quantity management
- **Wishlist**: Save favorite products for later purchase
- **Checkout Process**: Complete checkout flow with order tracking
- **User Dashboard**: Personalized user experience with purchase history and analytics
- **Admin Features**: Product and category management capabilities
- **Search & Filtering**: Advanced product search and filtering options
- **Rating System**: Product rating and review system
- **Notifications**: Real-time notifications for order updates
- **Responsive Design**: Mobile-first design that works across all devices

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Database & ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Prisma](https://prisma.io/)** - Type-safe ORM with migrations
- **Database Features**:
  - User management with sessions
  - Product catalog with categories
  - Shopping cart and wishlists
  - Order management and checkout
  - Rating and review system
  - Analytics and notifications

### Authentication
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication solution
- **GitHub OAuth** - Social login integration
- **Session Management** - Secure session handling

### State Management & Data Fetching
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### Form Handling & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Image Optimization
- **[Unpic](https://unpic.pics/)** - Universal image optimization
- **Next.js Image** - Built-in image optimization

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager

## 📁 Project Structure

```
t3-rainame/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (root)/         # Main application routes
│   │   └── api/            # API routes
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── home/           # Home page components
│   │   └── product/        # Product-related components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── server/             # Server-side code and API handlers
│   ├── styles/             # Global styles
│   ├── trpc/               # tRPC configuration
│   ├── types/              # TypeScript type definitions
│   └── env.js              # Environment variable validation
├── generated/              # Generated Prisma client
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **PostgreSQL** database
- **GitHub OAuth App** (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/t3-rainame.git
   cd t3-rainame
   ```

2. **Install dependencies**
   ```bash
   # Using bun (recommended)
   bun install
   
   # Or using npm
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/rainame"
   
   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_GITHUB_CLIENT_ID="your-github-client-id"
   BETTER_AUTH_GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # Environment
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   bun run db:generate
   
   # Run migrations
   bun run db:migrate
   
   # (Optional) Push schema changes in development
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `bun run dev` - Start development server with Turbo
- `bun run build` - Build the application for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint issues
- `bun run check` - Run linting and type checking
- `bun run typecheck` - Run TypeScript type checking
- `bun run format:check` - Check code formatting
- `bun run format:write` - Format code with Prettier
- `bun run db:generate` - Generate Prisma client
- `bun run db:migrate` - Run database migrations
- `bun run db:push` - Push schema to database
- `bun run db:studio` - Open Prisma Studio

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User accounts with authentication
- **Products** - Product catalog with variants and pricing
- **Categories** - Product categorization system
- **Cart** - Shopping cart functionality
- **Checkout** - Order processing and management
- **Wishlist** - User wishlists
- **Ratings** - Product review system
- **Notifications** - User notifications
- **Analytics** - User behavior tracking

## 🔐 Authentication

Authentication is handled by Better Auth with support for:

- **GitHub OAuth** - Social login
- **Session Management** - Secure session handling
- **User Roles** - Role-based access control
- **Account Linking** - Multiple provider support

## 🎨 UI Components

The application uses a comprehensive design system built with:

- **Radix UI** primitives for accessibility
- **Shadcn/ui** components for consistency
- **Tailwind CSS** for styling
- **Custom components** for domain-specific functionality

## 📱 Responsive Design

Rainame is built with a mobile-first approach:

- **Breakpoint System** - Responsive design across all devices
- **Touch-Friendly** - Optimized for mobile interactions
- **Performance** - Optimized loading and rendering

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Docker

```bash
# Build the Docker image
docker build -t rainame .

# Run the container
docker run -p 3000:3000 rainame
```

### Manual Deployment

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Start the production server**
   ```bash
   bun run start
   ```

## 📊 Performance

- **Core Web Vitals** optimized
- **Image Optimization** with Unpic and Next.js
- **Code Splitting** automatic with Next.js
- **Caching** with TanStack Query
- **Database** optimized queries with Prisma

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[T3 Stack](https://create.t3.gg/)** - The best way to start a full-stack, typesafe Next.js app
- **[Vercel](https://vercel.com/)** - Platform for deployment
- **[Prisma](https://prisma.io/)** - Database toolkit
- **Open Source Community** - For the amazing tools and libraries

## 📞 Support

If you have any questions or need help, please:

- **Open an issue** on GitHub
- **Join our Discord** community
- **Check the documentation** in the `/docs` folder

---

**Built with ❤️ using the T3 Stack**