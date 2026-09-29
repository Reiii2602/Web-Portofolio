# AR / Studio — Design direction

## Arah visual
Homepage ini memakai editorial minimalism: ruang putih yang lega, tipografi besar, garis 1px, dan palet hitam-putih. Tujuannya terasa tenang, percaya diri, dan profesional tanpa dekorasi yang tidak perlu.

## Sistem visual
- **Warna:** `#f7f7f5` (paper), `#111111` (ink), `#6c6c68` (muted), `#d7d7d2` (line), `#ececea` (surface).
- **Tipografi:** Inter untuk body/UI; Times New Roman sebagai aksen serif pada kata yang ingin terasa lebih personal.
- **Bentuk:** radius minimal, border tipis, tidak memakai gradient, shadow, atau gambar eksternal.
- **Spacing:** section besar dengan whitespace yang konsisten; layout mengikuti container maksimum 1240px.

## Struktur homepage
1. Header dengan wordmark, anchor navigation, dan CTA email.
2. Hero dengan positioning statement, dua aksi, dan availability status.
3. Selected work berupa tiga case-study cards dengan visual CSS ringan.
4. About dengan narasi singkat dan tiga prinsip kerja.
5. Contact CTA yang mengarah ke email.
6. Footer ringkas dengan social links dan back-to-top.

## Prinsip UX
- Navigasi memakai anchor native agar cepat dan dapat diakses.
- Semua aksi utama memiliki fokus keyboard yang terlihat.
- Layout mobile-first tanpa menu JavaScript atau state yang tidak perlu.
- `prefers-reduced-motion` dihormati.

## Performa
Tidak ada dependency baru, font eksternal, video, gambar besar, atau animasi runtime. Visual portfolio menggunakan CSS sehingga halaman tetap ringan dan cepat dirender.

## Konten yang perlu diganti
Ganti `AR / Studio`, deskripsi, email `hello@yourname.studio`, social links, dan data proyek di `app/page.tsx` dengan identitas asli sebelum dipublikasikan.
