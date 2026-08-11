# Konferans Salonu Ekran Sistemi

Sunucusuz, saf statik, vanilla HTML/CSS/JS sistemi.  
İki dosya: **yonet.html** (yönetici paneli) ve **kursu.html** (kürsü/sahne ekranı).

---

## Dosya Yapısı

```
/
├── yonet.html       Yönetici paneli
├── kursu.html       Kürsü/sahne ekranı (projeksiyon/LED'e bağlı)
└── img/
    └── hastane.png  Kurumsal logo (geniş oranlı, yaklaşık 3067×914)
```

---

## Senkronizasyon

| Mekanizma | Detay |
|-----------|-------|
| `localStorage` | Anahtar: `konferans_state` · Değer: `{ speaker, symposium, topic, ticker }` |
| `BroadcastChannel` | Kanal: `konferans_channel` · Mesaj tipi: `state_update` |

Aynı tarayıcıda birden fazla sekme açıksa BroadcastChannel anlık günceller;  
farklı tarayıcılar/cihazlar `storage` olayıyla senkronize olur.

---

## Özellikler

### Kürsü Ekranı (`kursu.html`)
- **Aydınlık / beyaz tema** — kurumsal, projeksiyon ve LED uyumlu.
- **Ortalı 3'lü blok:**
  - Üstte → Seminer/Etkinlik adı (gri, büyük)
  - Ortada → Konu (**kırmızı**, daha büyük)
  - Altta → Konuşmacı adı (**en büyük**, koyu)
- **Logo oranı korunur:** `img/hastane.png` geniş oranlı; `width` bazlı ölçekleme,
  `height: auto` ile en-boy oranı bozulmaz. `max-width: 480px`, `max-height: 90px`.
- **"Yayın Bekleniyor"** modu: veri yokken sayfanın tam ortasında büyük pulse animasyonlu metin.
  Header (logo + saat) ve alt bant görünmeye devam eder.
- **Alt kırmızı kayan bant:** veri varsa `sempozyum / duyuru`; veri yoksa kurumsal varsayılan metin dönmeye devam eder:
  > S.B. Marmara Üniversitesi Pendik Eğitim ve Araştırma Hastanesi | Prof. Dr. Işıl Barlan Konferans Salonu
- **Tam ekran butonu kürsüden KALDIRILDI** → artık sadece yönetici panelinde.

### Yönetici Paneli (`yonet.html`)
- Sol sütun: Yayın Yönetimi · Sayaç · Kayıt Listeleri.
- Sağ sütun: Canlı Önizleme (gerçeğe sadık, küçük ölçekli).
- **Glassmorphism butonlar:** `idle` halde renksiz cam efekti;
  `hover`'da anlam rengi (Canlı Yayına Gönder → yeşil, Duyuru → mor,
  Tümünü Kaldır → kırmızı, vb.) + `translateY(-2px)` yükselme.
- **Kompakt sayaç kartı:** dakika gir → Başlat / Duraklat / Sıfırla.
  Son 60 sn sarı, son 30 sn kırmızı yanıp söner, bitince "SÜRE DOLDU".
  Sayaç yalnızca panelde görünür; kürsüye gönderilmez.
- **"Tam Ekran Yap" butonu** üst çubukta: yönetici sayfasını tam ekran yapar/çıkar.
  Kürsü sayfasında bu buton **görünmez**.
- Alan etiketleri: `Seminer/Etkinlik/Toplantı İsmi` ve `Seminer/Etkinlik/Toplantı Konusu`.
- Tüm input'larda pasif renkli placeholder (yazınca kaybolur).
- Ctrl+Enter ile hızlı "Canlı Yayına Gönder".
- Toast bildirimleri, durum göstergesi (yeşil nabız dot).

---

## Renk Değişkenleri

Her iki dosyada da `:root` bloğunda CSS değişkenleri tanımlıdır.  
Tema veya renk değiştirmek için yalnızca bu değişkenleri düzenleyin.

---

## Dağıtım

IIS altında statik dosya olarak sunulur; port/Node/framework gerekmez.  
Üretimde `img/hastane.png` dosyasının IIS klasöründe mevcut olduğundan emin olun.
