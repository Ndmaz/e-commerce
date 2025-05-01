# E-Commerce Project

A modern e-commerce platform built with Next.js 14, TypeScript, and Prisma.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Styling:** TailwindCSS
- **UI Components:** Radix UI
- **Form Validation:** Zod
- **API Integration:** React Query
- **File Storage:** AWS S3

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- AWS S3 bucket (for file storage)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="your_aws_region"
AWS_BUCKET_NAME="your_bucket_name"
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-comm
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Setup database:
```bash
npx prisma generate
npx prisma migrate dev
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # App router pages
├── components/         # Reusable components
├── lib/               # Utility functions
├── store/             # Zustand state management
├── types/             # TypeScript types
└── middleware.ts      # Next.js middleware
```

## Features

- User authentication
- Shopping cart functionality
- Product management
- Order processing
- Admin panel
- Responsive design
- Image upload to S3
- Form validation
- Toast notifications

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License


