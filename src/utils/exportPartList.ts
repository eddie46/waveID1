import { ProjectItem, SupportingComponentItem } from '../types';

/**
 * Utility untuk mengunduh daftar part dan komponen pendukung WAVEID
 * dalam berbagai format: CSV (Excel-ready), TXT (Printable Report), dan JSON.
 */

export function downloadPartListCSV(
  mainParts: ProjectItem[],
  supportingParts: SupportingComponentItem[]
) {
  const rows: string[] = [];

  // Header CSV
  rows.push(['No', 'Kelompok', 'Nama Part / Komponen', 'Kode / Spesifikasi', 'Jumlah', 'Brand / Tipe', 'Estimasi Harga', 'Fungsi / Deskripsi', 'Tautan Pembelian / Referensi'].map(escapeCSV).join(','));

  let count = 1;

  // 1. Part Utama
  mainParts.forEach(p => {
    rows.push([
      String(count++),
      'Part Utama',
      p.title,
      p.code || '-',
      p.quantity || '1 Unit',
      p.brand || '-',
      p.priceEstimate || '-',
      p.description.replace(/\n/g, ' '),
      p.buttonLink?.url || p.demoUrl || '-'
    ].map(escapeCSV).join(','));
  });

  // 2. Komponen Pendukung
  supportingParts.forEach(sp => {
    rows.push([
      String(count++),
      'Komponen Pendukung',
      sp.name,
      sp.spec || '-',
      sp.quantity || '1 Unit',
      sp.type || '-',
      '-',
      sp.functionDesc.replace(/\n/g, ' '),
      '-'
    ].map(escapeCSV).join(','));
  });

  const csvContent = '\uFEFF' + rows.join('\r\n'); // \uFEFF UTF-8 BOM for Microsoft Excel
  triggerBlobDownload(csvContent, 'Daftar_Part_WAVEID.csv', 'text/csv;charset=utf-8;');
}

export function downloadPartListTXT(
  mainParts: ProjectItem[],
  supportingParts: SupportingComponentItem[]
) {
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let txt = `================================================================================\n`;
  txt += `                      DAFTAR PART & BILL OF MATERIALS (BOM)\n`;
  txt += `                          WAVEID HARDWARE SYSTEM\n`;
  txt += `================================================================================\n`;
  txt += `Tanggal Cetak : ${dateStr}\n`;
  txt += `Koleksi       : 9 Modul Part Utama + 10 Komponen Pendukung (19 Item)\n`;
  txt += `Komunitas     : https://t.me/waveid_project | https://chat.whatsapp.com/Bj7mgrPWCwA4pGQiploqVK\n`;
  txt += `--------------------------------------------------------------------------------\n\n`;

  txt += `[ BAGIAN 1: 9 MODUL PART UTAMA ]\n`;
  txt += `--------------------------------------------------------------------------------\n`;
  mainParts.forEach((p, idx) => {
    txt += `${idx + 1}. ${p.title.toUpperCase()}\n`;
    txt += `   - Kode Part   : ${p.code || '-'}\n`;
    txt += `   - Brand       : ${p.brand || '-'}\n`;
    txt += `   - Jumlah      : ${p.quantity || '1 Unit'}\n`;
    txt += `   - Estimasi    : ${p.priceEstimate || '-'}\n`;
    txt += `   - Kegunaan    : ${p.compatibility || '-'}\n`;
    txt += `   - Deskripsi   : ${p.description}\n`;
    if (p.buttonLink?.url) {
      txt += `   - Link Ref    : ${p.buttonLink.url}\n`;
    }
    txt += `\n`;
  });

  txt += `\n[ BAGIAN 2: 10 KOMPONEN PENDUKUNG & AKSESORIS ]\n`;
  txt += `--------------------------------------------------------------------------------\n`;
  supportingParts.forEach((sp, idx) => {
    txt += `${idx + 1}. ${sp.name.toUpperCase()}\n`;
    txt += `   - Kategori    : ${sp.type}\n`;
    txt += `   - Spesifikasi : ${sp.spec}\n`;
    txt += `   - Jumlah      : ${sp.quantity}\n`;
    txt += `   - Fungsi      : ${sp.functionDesc}\n`;
    txt += `\n`;
  });

  txt += `================================================================================\n`;
  txt += `Catatan: Pastikan menggunakan resistor divider pada sensor analog dan step-down\n`;
  txt += `Mini360 diatur tepat 3.3V / 5.0V sebelum disambungkan ke mikrokontroler ESP32.\n`;
  txt += `================================================================================\n`;

  triggerBlobDownload(txt, 'Daftar_Part_WAVEID.txt', 'text/plain;charset=utf-8;');
}

export function downloadPartListJSON(
  mainParts: ProjectItem[],
  supportingParts: SupportingComponentItem[]
) {
  const data = {
    projectName: 'WAVEID Hardware System',
    exportedAt: new Date().toISOString(),
    totalItems: mainParts.length + supportingParts.length,
    mainParts: mainParts.map(p => ({
      id: p.id,
      title: p.title,
      code: p.code,
      brand: p.brand,
      quantity: p.quantity,
      priceEstimate: p.priceEstimate,
      compatibility: p.compatibility,
      description: p.description,
      tags: p.tags,
      referenceUrl: p.buttonLink?.url || p.demoUrl
    })),
    supportingComponents: supportingParts
  };

  const jsonContent = JSON.stringify(data, null, 2);
  triggerBlobDownload(jsonContent, 'Daftar_Part_WAVEID.json', 'application/json;charset=utf-8;');
}

export function printPartList(
  mainParts: ProjectItem[],
  supportingParts: SupportingComponentItem[]
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Daftar Part & BOM WAVEID</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #111; line-height: 1.4; }
        h1 { font-size: 18px; margin-bottom: 4px; }
        h2 { font-size: 14px; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
        .sub { font-size: 11px; color: #555; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 11px; }
        th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; vertical-align: top; }
        th { background: #f4f4f5; font-weight: bold; }
        .mono { font-family: monospace; }
        @media print {
          body { padding: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>Daftar Part & BOM Sistem WAVEID</h1>
      <div class="sub">Dicetak pada: ${new Date().toLocaleDateString('id-ID')} | Komunitas: t.me/waveid_project</div>
      
      <h2>1. Modul Part Utama (${mainParts.length} Item)</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 25px;">No</th>
            <th>Nama Modul</th>
            <th>Kode / Brand</th>
            <th>Jumlah</th>
            <th>Estimasi Harga</th>
            <th>Fungsi & Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          ${mainParts.map((p, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><strong>${p.title}</strong></td>
              <td class="mono">${p.code || '-'} / ${p.brand || '-'}</td>
              <td>${p.quantity || '1 Unit'}</td>
              <td>${p.priceEstimate || '-'}</td>
              <td>${p.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>2. Komponen Pendukung & Aksesoris (${supportingParts.length} Item)</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 25px;">No</th>
            <th>Nama Komponen</th>
            <th>Kategori</th>
            <th>Jumlah</th>
            <th>Spesifikasi</th>
            <th>Deskripsi Fungsi</th>
          </tr>
        </thead>
        <tbody>
          ${supportingParts.map((sp, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><strong>${sp.name}</strong></td>
              <td>${sp.type}</td>
              <td>${sp.quantity}</td>
              <td class="mono">${sp.spec}</td>
              <td>${sp.functionDesc}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

function escapeCSV(text: string): string {
  if (text.includes(',') || text.includes('"') || text.includes('\n') || text.includes('\r')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function triggerBlobDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
