import { ProfileData, ProjectItem, SocialLink, SkillCategory, SupportingComponentItem, WaveidAdmin } from '../types';

/**
 * ====================================================================
 * DOKUMENTASI DATA PORTOFOLIO GITHUB.IO
 * ====================================================================
 * Anda dapat dengan mudah mengubah isi data di bawah ini untuk
 * menyesuaikan nama, profil singkat, proyek, dan media sosial Anda sendiri.
 */

// 1. BAGIAN DATA PROFIL
export const profileData: ProfileData = {
  greeting: "Selamat Datang Member WAVEID",
  name: "Delta Center",
  role: "PC Developer & WAVEID Core Team",
  bio: "Selamat datang member WAVEID! Pengembang software PC desktop, platform monitoring telemetri, dan integrasi antarmuka stasiun WAVEID. Senang berbagi proyek teknologi, eksplorasi open-source, dan berkolaborasi bersama seluruh rekan WAVEID.",
  location: "Indonesia",
  // Ganti URL foto avatar berikut dengan link foto profil GitHub Anda atau URL lain
  avatarUrl: "admin-photos/delta_center.jpg",
  status: {
    available: true,
    text: "Member WAVEID & Terbuka untuk Kolaborasi"
  }
};

// 2. BAGIAN TAUTAN KONTAK & KOMUNITAS WAVEID
export const socialLinks: SocialLink[] = [
  {
    id: "telegram",
    platform: "Telegram",
    username: "@waveid_project",
    url: "https://t.me/waveid_project",
    icon: "telegram"
  },
  {
    id: "whatsapp",
    platform: "WhatsApp",
    username: "Grup Komunitas WAVEID",
    url: "https://chat.whatsapp.com/Bj7mgrPWCwA4pGQiploqVK",
    icon: "whatsapp"
  }
];

// 3. BAGIAN DAFTAR PART UTAMA WAVEID (MINIMALIS)
export const projectsData: ProjectItem[] = [
  {
    id: "part-esp32",
    title: "ESP32 38 Pin",
    code: "ESP32-38PIN",
    brand: "Espressif Systems",
    compatibility: "Otak Utama & IoT Controller (3.3V)",
    priceEstimate: "Rp 55.000 - Rp 75.000",
    quantity: "1 Unit",
    condition: "DevKit WROOM-32",
    description: "Mikrokontroler utama dual-core Tensilica LX6 dengan 38 pin GPIO, WiFi 2.4 GHz, dan Bluetooth BLE.",
    tags: ["38 GPIO", "WiFi & BLE", "Dual-Core", "3.3V Logic"],
    category: "controller",
    buttonLink: {
      label: "Buka Link ESP32",
      url: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitc.html"
    },
    demoUrl: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitc.html",
    featured: true,
    year: "2025",
    metrics: "Otak Utama"
  },
  {
    id: "part-mini360",
    title: "Modul Mini360",
    code: "MINI360",
    brand: "Monolithic Power",
    compatibility: "Regulator Suplai Daya Logika 3.3V / 5V",
    priceEstimate: "Rp 5.000 - Rp 8.000",
    quantity: "1 Unit",
    condition: "Buck StepDown",
    description: "Step-down buck converter ultra-kompak efisiensi 96%, input 4.75V - 23V, output 1.0V - 17V (1.8A cont / 3A peak).",
    tags: ["StepDown", "Efisiensi 96%", "Ultra-Kompak"],
    category: "power",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.google.com/search?q=modul+mini360+step+down"
    },
    featured: false,
    year: "2025",
    metrics: "Regulator 96%"
  },
  {
    id: "part-xl4016",
    title: "StepDown XL4016",
    code: "XL4016-8A",
    brand: "XLSEMI",
    compatibility: "Regulator Daya Beban Arus Tinggi (Aki Motor)",
    priceEstimate: "Rp 35.000 - Rp 50.000",
    quantity: "1 Unit",
    condition: "High Power 300W",
    description: "Modul step-down daya tinggi hingga 8A (300 Watt) dengan dual heatsink. Input 4V - 40V, output 1.25V - 36V.",
    tags: ["High Power 8A", "300W Max", "Dual Heatsink"],
    category: "power",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.google.com/search?q=stepdown+xl4016+8a+300w"
    },
    featured: true,
    year: "2025",
    metrics: "Arus Besar 8A"
  },
  {
    id: "part-ina3221",
    title: "INA3221",
    code: "INA3221",
    brand: "Texas Instruments",
    compatibility: "Monitor Arus & Voltase Aki / Bus I2C",
    priceEstimate: "Rp 35.000 - Rp 55.000",
    quantity: "1 Unit",
    condition: "3-Channel I2C",
    description: "Sensor arus dan tegangan 3-channel presisi tinggi berbasis I2C (0 - 26V) untuk telemetri konsumsi daya.",
    tags: ["3 Channel", "I2C Interface", "Telemetri Daya"],
    category: "sensor",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.ti.com/product/INA3221"
    },
    featured: true,
    year: "2025",
    metrics: "3 Channel I2C"
  },
  {
    id: "part-ads1115",
    title: "ADS1115",
    code: "ADS1115",
    brand: "Texas Instruments",
    compatibility: "ADC Eksternal Presisi Sensor Analog / I2C",
    priceEstimate: "Rp 28.000 - Rp 45.000",
    quantity: "1 Unit",
    condition: "16-Bit 4-Channel",
    description: "ADC 16-bit 4-channel eksternal ultra-presisi dengan programmable gain amplifier (PGA) dan antarmuka I2C.",
    tags: ["ADC 16-Bit", "4 Channel", "PGA Internal"],
    category: "sensor",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.ti.com/product/ADS1115"
    },
    featured: false,
    year: "2025",
    metrics: "Presisi 16-Bit"
  },
  {
    id: "part-lr7843",
    title: "Modul MOSFET LR7843",
    code: "LR7843",
    brand: "Infineon / IR",
    compatibility: "Switching PWM Beban DC / Optocoupler",
    priceEstimate: "Rp 12.000 - Rp 20.000",
    quantity: "1 Unit",
    condition: "High-Speed PWM",
    description: "Saklar semikonduktor kecepatan tinggi terisolasi optocoupler (30V 161A) untuk kontrol motor, dimmer, dan solenoid.",
    tags: ["MOSFET LR7843", "Optocoupler", "PWM Switching"],
    category: "actuator",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.google.com/search?q=modul+mosfet+lr7843"
    },
    featured: false,
    year: "2025",
    metrics: "PWM Optocoupler"
  },
  {
    id: "part-relay12v",
    title: "Relay 12V 1 Channel (2bh)",
    code: "RELAY-12V",
    brand: "Songle Relay",
    compatibility: "Saklar Pemutus Fisik Jalur Utama 12V",
    priceEstimate: "Rp 16.000 - Rp 25.000 (2 Unit)",
    quantity: "2 Buah (2bh)",
    condition: "Dual Unit 10A",
    description: "2 buah modul relay elektromekanikal 12V dengan optocoupler dan kontak COM/NO/NC berkapasitas 10A.",
    tags: ["Relay 12V", "2 Buah (2bh)", "Kontak 10A"],
    category: "actuator",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.google.com/search?q=relay+12v+1+channel+optocoupler"
    },
    featured: false,
    year: "2025",
    metrics: "2 Buah (2bh)"
  },
  {
    id: "part-levelshifter",
    title: "Level Shifter",
    code: "LLC-4CH",
    brand: "Logic Converter",
    compatibility: "Konverter Logika ESP32 3.3V <-> Sensor 5V",
    priceEstimate: "Rp 4.000 - Rp 8.000",
    quantity: "1 Unit",
    condition: "Bi-Directional 4CH",
    description: "Modul konverter tingkat logika dua arah (bi-directional 4-channel) 3.3V ke 5V untuk keamanan komunikasi GPIO.",
    tags: ["Level Shifter", "3.3V <-> 5V", "Bi-Directional"],
    category: "interface",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.google.com/search?q=level+shifter+bi-directional+3.3v+5v"
    },
    featured: false,
    year: "2025",
    metrics: "3.3V <-> 5V"
  },
  {
    id: "part-qc30",
    title: "Modul QC 2.0/3.0 StepDown",
    code: "QC3.0-STEPDOWN",
    brand: "Qualcomm Compatible",
    compatibility: "Charger USB Cepat Input Aki 6V - 32V",
    priceEstimate: "Rp 18.000 - Rp 30.000",
    quantity: "1 Unit",
    condition: "Fast Charging 24W",
    description: "Modul fast charging DC-DC step-down Qualcomm Quick Charge 2.0/3.0, input 6V - 32V, output pintar hingga 24W.",
    tags: ["QC 2.0 / 3.0", "Fast Charge 24W", "Input 6-32V"],
    category: "power",
    buttonLink: {
      label: "Link Modul",
      url: "https://www.google.com/search?q=modul+qc+3.0+stepdown"
    },
    featured: false,
    year: "2025",
    metrics: "Qualcomm QC 3.0"
  }
];

// 4. BAGIAN KOMPONEN PENDUKUNG WAVEID (PASSIVE & ACCESSORIES)
export const supportingComponentsData: SupportingComponentItem[] = [
  {
    id: "supp-buzzer",
    name: "Buzzer",
    quantity: "1 Unit",
    type: "Audio & Alert",
    spec: "5V / 12V Active/Passive Buzzer",
    functionDesc: "Indikator bunyi alarm status sistem, konfirmasi suara, dan peringatan dini batas tegangan/arus."
  },
  {
    id: "supp-banana-jack",
    name: "Banana Jack Female(3set)",
    quantity: "3 Set",
    type: "Konektor Daya / Probe",
    spec: "4mm Binding Post Socket (Merah & Hitam)",
    functionDesc: "Terminal panel untuk koneksi probe multimeter, output/input tegangan DC eksternal, dan uji jalur daya."
  },
  {
    id: "supp-cap-100nf",
    name: "Capasitor 100nF (2bh)",
    quantity: "2 Buah (2bh)",
    type: "Kapasitor Keramik",
    spec: "100nF / 0.1µF (Kode 104) 50V",
    functionDesc: "Kapasitor decoupling penyaring gangguan frekuensi tinggi (noise filter) dan stabilisasi rel tegangan IC."
  },
  {
    id: "supp-res-30k",
    name: "Resistor 30k (3bh)",
    quantity: "3 Buah (3bh)",
    type: "Resistor Film Logam",
    spec: "30kΩ 1/4W 1% Presisi",
    functionDesc: "Pembagi tegangan (voltage divider) bersama resistor 7.5k untuk pembacaan tegangan aki motor."
  },
  {
    id: "supp-res-7k5-pair",
    name: "Resistor 7.5k (2bh)",
    quantity: "2 Buah (2bh)",
    type: "Resistor Film Logam",
    spec: "7.5kΩ 1/4W 1% Presisi",
    functionDesc: "Pasangan pembagi tegangan (divider) rasio sampling analog pada ADC atau sirkuit komparator."
  },
  {
    id: "supp-res-7k5-single",
    name: "Resistor 7k5 (1bh)",
    quantity: "1 Buah (1bh)",
    type: "Resistor Film Logam",
    spec: "7.5kΩ (7k5) 1/4W 1% Presisi",
    functionDesc: "Resistor presisi untuk kalibrasi impedansi referensi jalur sinyal analog atau biasing."
  },
  {
    id: "supp-res-4k7",
    name: "Resistor 4k7 (1bh)",
    quantity: "1 Buah (1bh)",
    type: "Resistor Film Logam",
    spec: "4.7kΩ (4k7) 1/4W 1% Presisi",
    functionDesc: "Resistor pull-up jalur komunikasi bus I2C (SDA/SCL) untuk kestabilan modul sensor INA3221 & ADS1115."
  },
  {
    id: "supp-res-470k",
    name: "Resistor 470k (1bh)",
    quantity: "1 Buah (1bh)",
    type: "Resistor Film Logam",
    spec: "470kΩ 1/4W 1% Presisi",
    functionDesc: "Resistor nilai tinggi untuk penguras muatan kapasitor gerbang (gate pull-down bleeder) pada MOSFET LR7843."
  },
  {
    id: "supp-potensio",
    name: "Potensio Rotari (1bh)",
    quantity: "1 Buah (1bh)",
    type: "Kontrol Analog Manual",
    spec: "Rotary Potentiometer / Trimpot 3-Pin",
    functionDesc: "Pengatur analog putar untuk kalibrasi batas sensitivitas, fine-tuning tegangan, atau dimmer kecepatan."
  },
  {
    id: "supp-usb-female",
    name: "Socket Port Usb female 2.0/3.0 (2bh)",
    quantity: "2 Buah (2bh)",
    type: "Port USB Panel Mount",
    spec: "USB Type-A Female Dual Port",
    functionDesc: "Soket keluaran pengisian daya cepat dari modul QC 2.0/3.0 untuk charge smartphone/gadget pengendara."
  }
];

// 5. DAFTAR ADMIN WAVEID (TIM INTI & PENGEMBANG)
export const adminWaveidData: WaveidAdmin[] = [
  {
    id: "admin-rphone",
    name: "Rphone",
    category: "Developer Evangelist",
    role: "Developer Evangelist",
    divisionBadge: "Evangelist",
    photoUrl: "admin-photos/rphone.jpg",
    bio: "Advokasi teknologi IoT, kurasi standar hardware WAVEID, dan penghubung ekosistem developer."
  },
  {
    id: "admin-wildan",
    name: "Wildan",
    category: "Administrasi",
    role: "Administrasi",
    divisionBadge: "Administrasi",
    photoUrl: "admin-photos/wildan.jpg",
    bio: "Manajemen data anggota, koordinasi administratif operasional, dan tata kelola registrasi WAVEID."
  },
  {
    id: "admin-delta-center",
    name: "Delta Center",
    category: "Developer",
    role: "Developer",
    subRole: "PC",
    divisionBadge: "PC Developer",
    photoUrl: "admin-photos/delta_center.jpg",
    bio: "Pengembangan software PC desktop, platform monitoring telemetri, dan integrasi antarmuka stasiun."
  },
  {
    id: "admin-deylight",
    name: "dieylights",
    category: "Developer",
    role: "Developer",
    subRole: "OS",
    divisionBadge: "OS Developer",
    photoUrl: "admin-photos/deylight.jpg",
    bio: "Arsitektur sistem operasi mikro, firmware ESP-IDF, RTOS task scheduler, dan protokol jaringan."
  },
  {
    id: "admin-kadavie",
    name: "Kadavie",
    category: "Developer",
    role: "Developer",
    subRole: "HW",
    divisionBadge: "HW Developer",
    photoUrl: "admin-photos/kadavie.jpg",
    bio: "Desain sirkuit PCB hardware, routing daya StepDown, kalibrasi sensor shunt INA3221 & switching MOSFET."
  },
  {
    id: "admin-ae-ponorogo",
    name: "AE Ponorogo",
    category: "Developer Design & Register",
    role: "Developer Design & Register",
    divisionBadge: "Design & Register",
    photoUrl: "admin-photos/ae_ponorogo.jpg",
    bio: "Perancangan tata letak visual, 3D enclosure hardware, dan standarisasi formulir registrasi sistem."
  },
  {
    id: "admin-sigma",
    name: "Sigma",
    category: "Developer Design & Register",
    role: "Developer Design & Register",
    divisionBadge: "Design & Register",
    photoUrl: "admin-photos/sigma.jpg",
    bio: "Spesialis arsitektur registrasi seri komponen, integrasi visual brand WAVEID, dan validasi unit."
  },
  {
    id: "admin-diana-novita",
    name: "Diana Novita",
    category: "Developer Design & Register",
    role: "Developer Design & Register",
    divisionBadge: "Design & Register",
    photoUrl: "admin-photos/diana_novita.jpg",
    bio: "Desain grafis teknis, dokumentasi skematik pengguna, dan pengelolaan registry identitas perangkat."
  }
];

// 6. BAGIAN KEAHLIAN & TEKNOLOGI
export const skillCategories: SkillCategory[] = [
  {
    title: "Mikrokontroler & Hardware",
    skills: ["ESP32 (38 Pin)", "Arduino IDE & ESP-IDF", "GPIO & PWM Control", "I2C / SPI / UART Bus", "Analog-to-Digital (ADC)", "Sensor Telemetri"]
  },
  {
    title: "Manajemen Daya & Kelistrikan",
    skills: ["DC-DC Buck StepDown (XL4016, Mini360)", "Quick Charge QC 2.0/3.0", "MOSFET High Speed Switching", "Relay 12V Optocoupler", "Level Shifter 3.3V-5V", "INA3221 Current Shunt"]
  },
  {
    title: "Software & IoT Web Stack",
    skills: ["Web Interface & Dashboard", "HTML5 & Tailwind CSS", "TypeScript & React", "GitHub Pages Single-File Export", "MQTT / HTTP REST API", "Dark Mode & Responsive UI"]
  }
];
