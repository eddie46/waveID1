# waveID Project

Proyek React + TypeScript dengan Google Gemini AI Integration untuk waveID.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn

### Setup Lokal

1. **Clone dan install dependencies:**
```bash
git clone https://github.com/eddie46/waveID1.git
cd waveID1
npm install
```

2. **Setup Environment Variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` dan tambahkan:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_APP_URL=http://localhost:3000
```

**Cara mendapatkan Gemini API Key:**
- Kunjungi https://aistudio.google.com/app/apikey
- Klik "Get API Key"
- Pilih atau buat project
- Copy API key ke `.env.local`

3. **Jalankan development server:**
```bash
npm run dev
```
Server akan berjalan di `http://localhost:3000`

### Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📦 Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Lucide React
- **Animation:** Motion
- **AI Integration:** Google Gemini API
- **Backend:** Express.js (untuk server-side logic jika diperlukan)

## 🌐 GitHub Pages Deployment

Project ini dikonfigurasi untuk otomatis deploy ke GitHub Pages setiap kali ada push ke branch `main`.

### Fitur Deployment:
- ✅ Automatic build & deploy via GitHub Actions
- ✅ TypeScript linting sebelum build
- ✅ Production-ready build optimization
- ✅ Custom base path: `/waveID1/`

### Status:
Website Anda tersedia di: **https://eddie46.github.io/waveID1/**

### Konfigurasi Pages:
Settings → Pages → Source: GitHub Actions (sudah auto-configured)

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini API Key | `AIzaS...` |
| `VITE_APP_URL` | URL aplikasi | `http://localhost:3000` atau `https://eddie46.github.io/waveID1/` |

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run TypeScript lint
npm run clean    # Clean dist folder
```

## 📄 File Structure

```
waveID1/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── pages/             # Page components
│   └── App.tsx            # Main app component
├── public/                # Static assets
├── dist/                  # Build output (auto-generated)
├── .github/workflows/     # GitHub Actions workflows
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── package.json           # Dependencies
├── index.html             # HTML entry point
└── .env.example           # Environment variables template
```

## 🐛 Troubleshooting

### Deployment gagal di GitHub Actions?
1. Cek tab "Actions" di repository untuk error details
2. Pastikan `.env` variables tidak di-commit (sudah di `.gitignore`)
3. Verifikasi Node.js version: `node -v` (harus >= 18)

### Asset tidak tampil setelah deploy?
- Pastikan `base: '/waveID1/'` sudah benar di `vite.config.ts`
- Clear browser cache: Ctrl+Shift+Del atau Cmd+Shift+Del

### Gemini API Error?
- Pastikan API key valid dan aktif
- Check API quota: https://console.cloud.google.com/
- Verifikasi format: `VITE_GEMINI_API_KEY` bukan `GEMINI_API_KEY`

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini API](https://ai.google.dev/)
- [GitHub Pages Guide](https://pages.github.com/)

## 📄 License

Sesuaikan dengan kebutuhan project Anda

## 👨‍💻 Author

eddie46
