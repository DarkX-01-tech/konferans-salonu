# Konferans Salonu (Sunucusuz Statik Yapı)

Bu proje, **Node.js / port / WebSocket / framework gerektirmeden** çalışan, IIS altında servis edilen saf statik bir konferans salonu ekran sistemidir.

## Dosyalar

- `yonet.html` → Yönetim paneli
- `kursu.html` → Kürsü/sahne ekranı

## Mimari ve Senkronizasyon

- Sunucusuz, statik, vanilla HTML/CSS/JS yapısı kullanılır.
- Ortak yayın verisi localStorage içinde `konferans_state` anahtarında tutulur.
- Veri alanları sabittir: `speaker`, `symposium`, `topic`, `ticker`.
- Sekmeler arası anlık yayın senkronizasyonu için `BroadcastChannel("konferans_channel")` ve `state_update` mesaj tipi kullanılır.

## Kürsü Ekranı (`kursu.html`)

- Aydınlık, kurumsal tema (beyaz/açık gri).
- Ortalı yeni sıralama:
  1. Üstte: **Sempozyum / Etkinlik adı** (`symposium`)
  2. Ortada: **Kırmızı toplantı konusu** (`topic`)
  3. Altta: **En büyük konuşmacı adı** (`speaker`)
- Uzun metinlerde taşma azaltma için otomatik boyut uyarlama bulunur.
- Yayın boşken zarif **"Yayın bekleniyor"** bekleme modu görünür.
- Sağ üstte canlı saat+tarih ve tam ekran butonu vardır.
- Alt kısımda kırmızı kayan bant (`ticker`) bulunur.
- Logo yolu: `img/hastane.png`.
  - Logo yüklenirse kurum metni tekrar yazdırılmaz.
  - Logo yüklenemezse metin fallback görünür.

## Yönetim Paneli (`yonet.html`)

- Modern kartlı arayüz, aydınlık kurumsal görünüm.
- Alan etiketleri:
  - Konuşmacı (`speaker`)
  - **Seminer / Etkinlik / Toplantı İsmi** (`symposium`)
  - **Seminer / Etkinlik / Toplantı Konusu** (`topic`)
  - Alt Yazı / Duyuru (`ticker`)
- Tüm textbox’larda tutarlı, soluk placeholder stili kullanılır.
- Glassmorphism butonlar (yeşil/mor/gri/kırmızı vb.) + işlem sonrası toast bildirimleri.
- Üstte durum rozeti: `Yayın: AKTİF` / `Yayın: BOŞ`.
- `Kürsü Ekranını Aç` butonu ile `kursu.html` yeni sekmede açılır.
- Ctrl+Enter kısayolu: **Canlı Yayına Gönder**.

### Canlı Önizleme

- Panel içinde sahne ekranının küçük ölçekli canlı önizlemesi vardır.
- Taslak/yayında rozeti gösterir (`TASLAK` / `YAYINDA`).
- Form alanları yazıldıkça önizleme anında güncellenir.

### Liste Kartları

- Konuşmacılar, sempozyumlar/etkinlikler, konular ve duyurular için ayrı kartlar bulunur.
- Her kartta inline giriş + Ekle/Enter ile kayıt ekleme yapılır.
- Her öğede `Seç` (ilgili alana doldurur) ve `Sil` işlemleri vardır.
- Liste verileri localStorage içinde `konferans_lists` ile kalıcıdır.

### Dakika Bazlı Geri Sayım (Sadece Yönetici)

- `Konuşma Süresi / Sayaç` kartında dakika girilir ve geri sayım başlatılır.
- Butonlar: `Başlat`, `Duraklat`, `Sıfırla`.
- Gösterim formatı: `MM:SS`.
- Son 2 dakikada sarı, son 30 saniyede kırmızı uyarı görünür.
- Süre bittiğinde sayaç kırmızı yanıp söner ve `SÜRE DOLDU` mesajı gösterir.
- Sayaç **yalnızca yönetim panelinde çalışır**, kürsü ekranına gönderilmez.

## Kurulum (IIS)

1. Bu repodaki dosyaları hedef klasöre kopyalayın:
   - `C:\inetpub\wwwroot\Admin\konferans_salonu\`
2. Ek kurulum gerekmez:
   - Node.js gerekmez
   - Port ayarı gerekmez
   - Sunucu tarafı uygulama gerekmez

## Kullanım Önerisi

1. `yonet.html` ve `kursu.html` dosyalarını **aynı bilgisayarda, aynı tarayıcıda** açın.
2. Kürsü ekranını ikinci monitöre alıp `TAM EKRAN` ile büyütün.
3. Yönetim panelinden içeriği girip canlı yayına gönderin.
