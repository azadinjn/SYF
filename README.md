# SYF – File Sharing Platform

SYF is a web-based file-sharing platform that allows users to upload files, create shareable packages, and transfer files between devices using a unique 5-character sharing code.

The platform provides a simple and secure way to share files without requiring user registration.

## Features

- **File Upload:** Upload one or multiple files.
- **Unique Sharing Code:** Generate a 5-character code for each package.
- **File Receiving:** Retrieve shared files using a sharing code.
- **Password Protection:** Protect packages with an optional password.
- **Individual Download:** Download files separately.
- **Download All:** Download an entire package as a ZIP archive.
- **Package Expiration:** Automatically expire packages after a selected period.
- **File Validation:** Validate file types, MIME types, and file sizes.
- **Rate Limiting:** Protect API endpoints against excessive requests.
- **Responsive Interface:** Designed for desktop and mobile devices.

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- React
- Vite
- Tailwind CSS
- Fetch API
- React Router

### Backend
- PHP
- MySQL
- REST API

## Project Structure

```text
SYF/
│
├── syf/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── syf-backend/            # PHP Backend
    ├── api/
    ├── config/
    ├── controllers/
    ├── cron/
    ├── models/
    ├── services/
    └── storage/
```

## Getting Started

### Requirements

- Node.js and npm
- PHP 8 or compatible version
- MySQL
- XAMPP or another local PHP/MySQL environment

### 1. Clone the Repository

```bash
git clone https://github.com/azadinjn/SYF
cd SYF
```

### 2. Set Up the Backend

1. Copy the `syf-backend` folder into your XAMPP `htdocs` directory.
2. Create a MySQL database for SYF.
3. Configure the database connection in the backend configuration.
4. Configure the frontend origin in the backend CORS settings.
5. Make sure the backend storage directory is writable.

### 3. Set Up the Frontend

```bash
cd syf
npm install
npm run dev
```

The development server will normally be available at:

```text
http://localhost:5173
```

### 4. Configure the API

Make sure the frontend API configuration points to your local backend:

```text
http://localhost/syf-backend/api/
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload.php` | Upload files and create a package |
| POST | `/api/package.php` | Retrieve package information |
| POST | `/api/download.php` | Download individual files or a package ZIP |

## File Upload Restrictions

- Maximum file size: 10 MB.
- Maximum total package size: 10 MB.
- Maximum files per package: 20.
- Maximum filename length: 255 characters.
- Supported formats include PDF, TXT, CSV, images, Office documents, and ZIP archives.

## Security

SYF includes several security measures:

- Password hashing and verification.
- File extension and MIME type validation.
- ZIP archive structure validation.
- API request validation.
- Rate limiting.
- Package expiration.
- Server-generated storage filenames.

## Current Status

The main frontend and backend features have been implemented and tested locally.

Deployment configuration and production testing are still pending.

## License

This project is currently developed as an educational and portfolio project.
