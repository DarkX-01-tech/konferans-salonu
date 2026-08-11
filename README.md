# Konferans Salonu (Sunucusuz Statik Yapı)

Bu proje, **Node.js / port / WebSocket gerektirmeden** IIS altında çalışan saf statik konferans yönetim ekranıdır.

## Dosyalar

- `yonet.html` → Yönetim paneli
- `kursu.html` → Kürsü / seyirci ekranı

## Kurulum (IIS)

1. Dosyaları şu klasöre kopyalayın:
   - `C:\inetpub\wwwroot\Admin\konferans_salonu\`
2. Yönetim ve kürsü ekranını aynı bilgisayarda/ağda HTTP ile açın:
   - `http://10.201.65.10/Admin/konferans_salonu/yonet.html`
   - `http://10.201.65.10/Admin/konferans_salonu/kursu.html`

## Kullanım

> **Önemli:** Senkronizasyon için iki ekran aynı bilgisayarda ve aynı tarayıcıda açık olmalıdır (farklı sekme/pencere olabilir).

### Yönetim paneli butonları

- **CANLI YAYINA GÖNDER**
  - Formdaki tüm alanları (`konuşmacı`, `sempozyum`, `konu`, `alt yazı/duyuru`) kürsü ekranına yayınlar.
  - Kısayol: `Ctrl + Enter`

- **Duyuruyu Yayınla**
  - Sadece `Alt Yazı / Duyuru` alanını canlı olarak günceller.

- **KALDIR**
  - Sadece `Alt Yazı / Duyuru` alanını temizler ve kürsü alt banttan kaldırır.

- **TÜMÜNÜ KALDIR**
  - Tüm yayını durdurur; kürsü ekranını bekleme durumuna döndürür.

### Yönetim paneli özellikleri

- Form değiştikçe anlık **Canlı Önizleme** (TASLAK / YAYINDA rozeti).
- Üst barda yayın durumu göstergesi: `Yayın: AKTİF` / `Yayın: BOŞ`.
- `Kürsü Ekranını Aç` butonu ile `kursu.html` yeni sekmede açılır.
- Konuşmacılar/Sempozyumlar/Konular/Duyurular listeleri:
  - Inline input + **EKLE**
  - **SEÇ** ile formu doldurma
  - **SİL** ile silme
  - Çift tıkla hızlı düzenleme
  - Kalıcılık: `localStorage` (`konferans_lists`)

### Kürsü ekranı özellikleri

- Logo yolu: **`img/hastane.png`**
  - Logo varsa üstte logo gösterilir.
  - Logo yoksa metinsel başlıklar fallback olarak görünür.
- Büyük ekran uyumlu tipografi, otomatik metin küçültme.
- Alt kırmızı bantta kesintisiz kayan yazı (içerik boşsa bant gizlenir).
- Boş yayında zarif bekleme durumu (`Yayın bekleniyor`).
- Köşede **Tam Ekran** butonu (ikinci monitörde fullscreen kullanım için idealdir; F11 de kullanılabilir).

## Teknik Not

- Durum anahtarı: `konferans_state` = `{ speaker, symposium, topic, ticker }`
- Liste anahtarı: `konferans_lists` = `{ speakers, symposiums, topics, announcements }`
- Senkronizasyon: `BroadcastChannel('konferans_channel')` + `localStorage` `storage` event.
- Mesaj türü: `state_update`, payload: state.
