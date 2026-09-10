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
      {/* Header Kontrol Wiring Diagram Minimalis */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Skematik Wiring Interkoneksi</span>
          </h3>
        </div>

        {/* Tombol Kontrol Diagram Ramping */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800/80 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80 p-0.5 shadow-2xs">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Perkecil (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-neutral-600 dark:text-neutral-300 min-w-[38px] text-center font-medium">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Perbesar (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 transition-colors ml-0.5 border-l border-neutral-200 dark:border-neutral-700 cursor-pointer"
              title="Reset 100%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs font-medium transition-all shadow-2xs cursor-pointer"
            title="Buka Layar Penuh"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layar Penuh</span>
          </button>

          <a
            href="wiring_diagram.jpg"
            download="WAVEID_Wiring_Diagram.jpg"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90 text-xs font-medium transition-all shadow-2xs cursor-pointer"
            title="Unduh Gambar Skematik"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh</span>
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
              src="wiring_diagram.jpg"
              alt="Wiring Diagram Skematik Sistem WAVEID"
              className="max-w-full h-auto rounded-lg shadow-md border border-neutral-200/80 dark:border-neutral-800"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Catatan Modifikasi Teknis Khusus (Minimalis & Mobile-Friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {/* Catatan 1: INA3221 */}
        <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Modifikasi Shunt INA3221</span>
          </div>
          <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 pl-3.5 list-disc leading-relaxed">
            <li>Ganti <strong>R_SHUNT R100</strong> dengan <strong>R010 (1%)</strong> untuk akurasi arus.</li>
            <li>R100 pada CH2 diganti R010 atau dijumper langsung.</li>
            <li>Jumper pin <strong>A0 ke GND</strong> (I2C address: <code className="font-mono text-[11px] text-amber-600 dark:text-amber-400">0x40</code>).</li>
          </ul>
        </div>

        {/* Catatan 2: QC 3.0 & VBUS */}
        <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span>Jalur VBUS & Fastcharging QC 3.0</span>
          </div>
          <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 pl-3.5 list-disc leading-relaxed">
            <li><strong>Jalur VBUS dipotong</strong> antara PCB modul dan soket USB.</li>
            <li>Pin <strong>DP & DM</strong> diberi pembagi tegangan resistor <code className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">7.5K</code> & <code className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">30K</code>.</li>
            <li>Gunakan soket USB kompatibel QC 2.0 / 3.0.</li>
          </ul>
        </div>

        {/* Catatan 3: ADS1115 */}
        <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>Koneksi ADS1115 ke ESP32</span>
          </div>
          <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 pl-3.5 list-disc leading-relaxed">
            <li>Pin <strong>SCL &rarr; G22</strong>, Pin <strong>SDA &rarr; G21</strong> ESP32.</li>
            <li>Pin <strong>ADDR &rarr; GND</strong> (I2C address: <code className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">0x48</code>), VDD &rarr; 3.3V.</li>
            <li>Filter: resistor <code className="font-mono text-[11px]">7K5</code>, <code className="font-mono text-[11px]">30K</code> & kapasitor <code className="font-mono text-[11px]">100nF</code>.</li>
          </ul>
        </div>

        {/* Catatan 4: Level Shifter & Relay */}
        <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Level Shifter & Proteksi Relay</span>
          </div>
          <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 pl-3.5 list-disc leading-relaxed">
            <li>Regulator <strong>AMS1117-1.8V</strong> memasok level sinyal board HP (LV).</li>
            <li>Pin <strong>G16 ESP32 &rarr; TX Board HP</strong> via Level Shifter 4-CH.</li>
            <li>Relay 12V wajib dipasang <strong>Dioda 1N4148</strong> (flyback snubber).</li>
          </ul>
        </div>
      </div>

      {/* Tabel & Daftar Pinout Interkoneksi (Responsif HP & Desktop) */}
      <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-2xs">
        <div className="px-3.5 py-2.5 border-b border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Daftar Titik Koneksi Pinout
            </h4>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {pinoutGuide.length} Jalur
          </span>
        </div>

        {/* Tampilan Khusus Mobile: List Card Kompak */}
        <div className="sm:hidden divide-y divide-neutral-100 dark:divide-neutral-800/70">
          {pinoutGuide.map((item, idx) => (
            <div key={idx} className="p-2.5 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {item.fromModule}
                </span>
                <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                  {item.pin}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-300">
                <span className="font-mono font-medium flex items-center gap-1">
                  <span className={item.color}>●</span> {item.toTarget}
                </span>
                {item.note && (
                  <span className="text-neutral-400 text-[10px] text-right truncate max-w-[140px]">
                    {item.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tampilan Desktop / Tablet: Tabel Standar */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 dark:bg-neutral-800/40 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/70 dark:border-neutral-800/70">
              <tr>
                <th className="py-2 px-3.5">Modul Sumber</th>
                <th className="py-2 px-3">Pin</th>
                <th className="py-2 px-3.5">Target Hubungan</th>
                <th className="py-2 px-3.5">Fungsi / Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {pinoutGuide.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="py-2 px-3.5 font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                    {item.fromModule}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                      {item.pin}
                    </span>
                  </td>
                  <td className="py-2 px-3.5 font-mono font-medium text-neutral-700 dark:text-neutral-300">
                    <span className={item.color}>●</span> {item.toTarget}
                  </td>
                  <td className="py-2 px-3.5 text-neutral-500 dark:text-neutral-400">
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
              src="wiring_diagram.jpg"
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
