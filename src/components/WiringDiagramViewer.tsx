import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Maximize2,
  AlertTriangle,
  Cpu,
  Zap,
  Radio,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';

interface PinConnection {
  fromModule: string;
  pin: string;
  toTarget: string;
  color: string;
  note?: string;
}

const pinoutGuide: PinConnection[] = [
  { fromModule: 'ADS1115 (16-bit ADC)', pin: 'VDD', toTarget: 'ESP32 3.3V', color: 'text-red-500', note: 'Tegangan logika 3.3V' },
  { fromModule: 'ADS1115 (16-bit ADC)', pin: 'GND', toTarget: 'Ground Umum', color: 'text-neutral-500', note: 'Common ground' },
  { fromModule: 'ADS1115 (16-bit ADC)', pin: 'SCL', toTarget: 'ESP32 PIN G22', color: 'text-amber-500', note: 'I2C Clock' },
  { fromModule: 'ADS1115 (16-bit ADC)', pin: 'SDA', toTarget: 'ESP32 PIN G21', color: 'text-emerald-500', note: 'I2C Data' },
  { fromModule: 'ADS1115 (16-bit ADC)', pin: 'ADDR', toTarget: 'GND', color: 'text-neutral-500', note: 'Alamat I2C 0x48' },
  { fromModule: 'INA3221 Sensor', pin: 'CH1 / CH2 / CH3', toTarget: 'Shunt R010 1%', color: 'text-cyan-500', note: 'Pengukuran tegangan & arus bus' },
  { fromModule: 'INA3221 Sensor', pin: 'A0', toTarget: 'GND (Dijumper)', color: 'text-neutral-500', note: 'Alamat I2C 0x40' },
  { fromModule: 'Level Shifter', pin: 'HV (High Voltage)', toTarget: 'ESP32 3.3V / 5V', color: 'text-indigo-500', note: 'Sisi logika ESP32' },
  { fromModule: 'Level Shifter', pin: 'LV (Low Voltage)', toTarget: 'AMS1117-1.8V', color: 'text-purple-500', note: 'Sisi logika Board HP (1.8V)' },
  { fromModule: 'Level Shifter', pin: 'HV1', toTarget: 'ESP32 PIN G16', color: 'text-blue-500', note: 'Serial RX/TX ESP32' },
  { fromModule: 'Level Shifter', pin: 'LV1', toTarget: 'PIN TX Board HP', color: 'text-violet-500', note: 'Koneksi telemetri HP' },
  { fromModule: 'Relay 12V', pin: 'Coil + / -', toTarget: 'Dioda 1N4148 Flyback', color: 'text-amber-600', note: 'Proteksi induksi balik relay' },
  { fromModule: 'Port USB QC 3.0', pin: 'DP / DM', toTarget: 'Resistor R7.5K & R30K', color: 'text-teal-500', note: 'Divider identifikasi QC fastcharging' },
  { fromModule: 'Port USB QC 3.0', pin: 'VBUS', toTarget: 'Jalur dipotong ke board', color: 'text-red-600', note: 'Diputus untuk kontrol pengukuran' },
  { fromModule: 'Adaptor DC 12V', pin: 'VCC (+)', toTarget: 'Jalur Positif Adaptor', color: 'text-red-500', note: 'Input sumber daya utama' },
  { fromModule: 'Adaptor DC 12V', pin: 'GND (-)', toTarget: 'Jalur Negatif Adaptor', color: 'text-neutral-700', note: 'Common ground return' }
];

export const WiringDiagramViewer: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="space-y-6">
      {/* Header Wiring Diagram */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Skematik Resmi WAVEID
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50 mt-1">
            Wiring Diagram Interkoneksi Hardware WAVEID
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Panduan jalur perkabelan ESP32, INA3221, ADS1115, Level Shifter, Relay 12V, dan Modul QC 3.0.
          </p>
        </div>

        {/* Tombol Kontrol Diagram */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-1 shadow-xs">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title="Perkecil Diagram"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-xs text-neutral-500 dark:text-neutral-400 min-w-[48px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title="Perbesar Diagram"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ml-0.5 border-l border-neutral-200 dark:border-neutral-700"
              title="Reset Ukuran"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs font-semibold transition-all shadow-xs cursor-pointer"
            title="Buka Layar Penuh"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layar Penuh</span>
          </button>

          <a
            href="/wiring_diagram.jpg"
            download="WAVEID_Wiring_Diagram.jpg"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90 text-xs font-semibold transition-all shadow-xs"
            title="Unduh Gambar Skematik"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </a>
        </div>
      </div>

      {/* Kontainer Gambar Diagram dengan Scroll & Zoom */}
      <div className="relative w-full rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#07090e] p-2 sm:p-4 overflow-hidden shadow-sm">
        <div className="overflow-auto max-h-[600px] flex items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-950/60 p-2 sm:p-4">
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out'
            }}
            className="relative cursor-zoom-in"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src="/wiring_diagram.jpg"
              alt="Wiring Diagram Skematik Sistem WAVEID"
              className="max-w-full h-auto rounded-lg shadow-md border border-neutral-200/80 dark:border-neutral-800"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-2 px-1">
          <span>* Klik gambar untuk membuka mode layar penuh resolusi tinggi</span>
          <span>WAVEID HW Team: Kadavie & Rphone</span>
        </div>
      </div>

      {/* Catatan Modifikasi Teknis Khusus (Berdasarkan Skematik) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Catatan 1: Modifikasi Shunt INA3221 */}
        <div className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-xs sm:text-sm mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Instruksi Modifikasi Sensor INA3221</span>
          </div>
          <ul className="text-xs text-amber-950/80 dark:text-neutral-300 space-y-1.5 list-disc list-inside">
            <li>
              <strong>R_SHUNT ukuran R100</strong> wajib diganti dengan <strong>R010 (1% toleransi)</strong> untuk ketelitian pembacaan arus tanpa drop tegangan.
            </li>
            <li>
              <strong>R100 pada CH2</strong> diganti R010 atau <strong>dijumper langsung</strong>.
            </li>
            <li>
              <strong>Pinout A0 ke GND dijumper</strong> untuk menetapkan alamat I2C default modul ke <code className="px-1 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/50 font-mono text-[11px]">0x40</code>.
            </li>
          </ul>
        </div>

        {/* Catatan 2: Jalur VBUS & QC 3.0 */}
        <div className="p-4 rounded-xl border border-cyan-200/80 dark:border-cyan-900/40 bg-cyan-50/50 dark:bg-cyan-950/20">
          <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300 font-semibold text-xs sm:text-sm mb-2">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>Modifikasi Jalur VBUS & Fastcharging QC 3.0</span>
          </div>
          <ul className="text-xs text-cyan-950/80 dark:text-neutral-300 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Jalur VBUS dipotong</strong> di antara PCB board modul dan konektor USB fisik (untuk pengukuran arus mandiri via shunt).
            </li>
            <li>
              Pin <strong>DP & DM</strong> dihubungkan dengan rangkaian pembagi tegangan resistor <code className="px-1 py-0.5 rounded bg-cyan-200/60 dark:bg-cyan-900/50 font-mono text-[11px]">7.5K</code> dan <code className="px-1 py-0.5 rounded bg-cyan-200/60 dark:bg-cyan-900/50 font-mono text-[11px]">30K</code>.
            </li>
            <li>
              Gunakan soket konektor USB Fastcharging kompatibel QC 2.0 / QC 3.0.
            </li>
          </ul>
        </div>

        {/* Catatan 3: ADS1115 & Bus I2C ESP32 */}
        <div className="p-4 rounded-xl border border-indigo-200/80 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20">
          <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-semibold text-xs sm:text-sm mb-2">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Koneksi ADS1115 (16-bit ADC) ke ESP32</span>
          </div>
          <ul className="text-xs text-indigo-950/80 dark:text-neutral-300 space-y-1.5 list-disc list-inside">
            <li>
              Pin <strong>SCL &rarr; GPIO22 (G22)</strong> ESP32.
            </li>
            <li>
              Pin <strong>SDA &rarr; GPIO21 (G21)</strong> ESP32.
            </li>
            <li>
              Pin <strong>ADDR &rarr; GND</strong> (alamat I2C 0x48), VDD &rarr; 3.3V ESP32.
            </li>
            <li>
              Rangkaian filter tegangan menggunakan resistor <code className="px-1 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900/50 font-mono text-[11px]">7K5</code>, <code className="px-1 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900/50 font-mono text-[11px]">30K</code>, dan kapasitor <code className="px-1 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900/50 font-mono text-[11px]">100nF</code>.
            </li>
          </ul>
        </div>

        {/* Catatan 4: Level Shifter & Proteksi Relay */}
        <div className="p-4 rounded-xl border border-purple-200/80 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-semibold text-xs sm:text-sm mb-2">
            <Radio className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <span>Level Shifter Board HP & Proteksi Relay</span>
          </div>
          <ul className="text-xs text-purple-950/80 dark:text-neutral-300 space-y-1.5 list-disc list-inside">
            <li>
              Regulator <strong>AMS1117-1.8V</strong> memasok level tegangan rendah (LV) 1.8V untuk komunikasi serial board HP.
            </li>
            <li>
              Pin <strong>G16 ESP32</strong> terhubung ke pin <strong>TX Board HP</strong> melalui Logic Level Shifter 4-Channel.
            </li>
            <li>
              Relay 12V 1-Channel dilengkapi <strong>Dioda 1N4148</strong> sebagai flyback snubber peredam lonjakan EMF balik.
            </li>
          </ul>
        </div>
      </div>

      {/* Tabel Rangkuman Pinout Interkoneksi */}
      <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-500" />
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Tabel Pinout Ringkas Kabel Perakitan
            </h4>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {pinoutGuide.length} Titik Koneksi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/70 dark:border-neutral-800/70">
              <tr>
                <th className="py-2.5 px-4">Modul Sumber</th>
                <th className="py-2.5 px-3">Pin</th>
                <th className="py-2.5 px-4">Target Hubungan</th>
                <th className="py-2.5 px-4">Fungsi / Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {pinoutGuide.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                    {item.fromModule}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                      {item.pin}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    <span className={item.color}>●</span> {item.toTarget}
                  </td>
                  <td className="py-2.5 px-4 text-neutral-500 dark:text-neutral-400">
                    {item.note || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Dialog Layar Penuh Resolusi Tinggi */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md p-4 sm:p-6 text-white"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="flex items-center justify-between pb-3 border-b border-neutral-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                WAVEID Hardware Wiring Diagram (Skematik Lengkap)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/wiring_diagram.jpg"
                download="WAVEID_Wiring_Diagram.jpg"
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors text-xs flex items-center gap-1.5"
                title="Unduh Diagram"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Unduh</span>
              </a>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-4 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <img
              src="/wiring_diagram.jpg"
              alt="WAVEID Wiring Diagram High Resolution"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-neutral-800"
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div className="text-center text-xs text-neutral-400 font-mono pt-2 border-t border-neutral-800">
            Gunakan tombol mouse atau pinch gesture untuk memperbesar skematik
          </div>
        </div>
      )}
    </div>
  );
};
