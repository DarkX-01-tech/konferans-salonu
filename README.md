# Konferans Salonu (Sunucusuz Statik Yapı)

Bu proje, **Node.js / port / WebSocket gerektirmeden** çalışan, IIS altında servis edilen saf statik bir konferans salonu kürsü ekran sistemidir.

## Dosyalar

- `yonet.html` → Yönetici Ekranı
- `kursu.html` → Kürsü Ekranı (seyircinin gördüğü büyük ekran)

## Kurulum (IIS)

1. Bu repodaki dosyaları şu klasöre kopyalayın:
   - `C:\inetpub\wwwroot\Admin\konferans_salonu\`
2. Ek kurulum gerekmez.
   - Node.js gerekmez
   - Port ayarı gerekmez
   - Sunucu tarafı uygulama gerekmez

## Erişim Adresleri

- Yönetici Ekranı: `http://10.201.65.10/Admin/konferans_salonu/yonet.html`
- Kürsü Ekranı: `http://10.201.65.10/Admin/konferans_salonu/kursu.html`

## Kullanım

1. Yönetici ve Kürsü ekranlarını **aynı bilgisayarda, aynı tarayıcıda** (farklı sekme/pencere) açın.
2. Yönetici ekranında konuşmacı, sempozyum, konu ve duyuru bilgilerini girin.
3. `CANLI YAYINA GÖNDER` ile kürsü ekranını anında güncelleyin.
4. Alt yazı/duyuru satırı için `Duyuruyu Yayınla` ve `Duyuruyu Kaldır` butonlarını kullanın.
5. `TÜMÜNÜ KALDIR` ile tüm yayını temizleyin.
6. Yönetici panelinde `⛶ Tam Ekran Yap` butonu ile paneli tam ekrana alın (kürsüde bu buton yoktur).

## Kürsü Ekranı Özellikleri

- **Glassmorphism cam içerik kartı**: aydınlık degrade zemin üzerinde yarı saydam, blur'lu cam panel; içinde üstte sempozyum adı, ortada kırmızı konu başlığı, altta büyük konuşmacı adı.
- **Alt kayan bant**: yalnızca duyuru/ticker metnini gösterir; sempozyum adı alt bantta yer almaz.  
  Duyuru yoksa kurumsal varsayılan metin döner: *"S.B. Marmara Üniversitesi Pendik Eğitim ve Araştırma Hastanesi | Prof. Dr. Işıl Barlan Konferans Salonu"*
- Yayın yokken "YAYIN BEKLENİYOR" mesajı sayfanın tam ortasında gösterilir.

## Yönetici Paneli Özellikleri

- **İki sütun düzeni**: Sol sütun — Yayın Yönetimi + Kayıt Listeleri; Sağ sütun — Canlı Önizleme + Konuşma Süresi/Sayaç.
- **Konuşma Süresi/Sayaç kartı** sağ sütunda Canlı Önizleme kartının hemen altındadır, aynı genişlikte ve hizalıdır.
- **Canlı önizleme** içeriği kart içine tam ve taşmadan sığar (transform: scale ile orantılı küçültme).
- **Glassmorphism butonlar**: idle durumda renksiz/nötr cam görünüm; hover'da anlam rengi (Yayına Gönder → yeşil, Tümünü Kaldır → kırmızı, Duyuru → mor, vb.).
- **Dakika bazlı geri sayım sayacı** (yalnızca yöneticide görünür, kürsüye gönderilmez):
  - Dakika girin → Başlat / Duraklat / Sıfırla
  - Son 3 dakika: sarı uyarı; son 1 dakika: kırmızı tehlike
  - Süre dolunca: "SÜRE DOLDU" yanıp söner

## Logo Notu

- Kürsü ekranı `img/hastane.png` yolundan logo yükler.
- Dosya yoksa ekran bozulmaz; logo otomatik gizlenir.

## Teknik Not

Senkronizasyon, aynı tarayıcı ve aynı bilgisayar senaryosu için `BroadcastChannel` + `localStorage` (`storage` event yedeği) ile çalışır.
Farklı cihazlar arası gerçek zamanlı senkron için ileride sunucu tarafı bir çözüm gerekir.
