# Event Ease

A web application for booking concert tickets.

## Features

*   Browse a list of upcoming concerts.
*   Book tickets for a selected concert.
*   Secure payment processing.
*   Generate PDF tickets.
*   User authentication (Login).
*   Dashboard for viewing bookings.

## Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **Build Tool:** Vite
*   **Routing:** React Router
*   **PDF Generation:** jsPDF, html2canvas
*   **Linting:** ESLint

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Manas-Gpt/Event-Ease-Event-Ticket-Booking-Platform.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Event-Ease-Event-Ticket-Booking-Platform
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Install additional dependencies:
    ```bash
    npm install @types/jspdf jspdf html2canvas react-router-dom @types/react-router-dom
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173` by default.

### Building for Production

To create a production build, run:

```bash
npm run build
```

The production files will be located in the `dist` directory.

### Linting

To lint the codebase, run:

```bash
npm run lint
```

## Folder Structure

```
.
├── src
│   ├── components
│   │   ├── BookingForm.tsx
│   │   ├── ConcertList.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── PaymentForm.tsx
│   ├── data
│   │   └── concerts.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       ├── pdfGenerator.ts
│       └── storage.ts
├── public
├── index.html
└── ...
```
