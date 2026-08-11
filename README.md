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
4. Alt yazı/duyuru satırı için `YAYINLA` ve `KALDIR` butonlarını kullanın.

## Logo Notu

- Kürsü ekranı logoyu `img/hastane.png` yolundan yükler.
- Logo kullanmak için `img/hastane.png` dosyasını aynı klasör yapısında koruyun.
- Dosya yoksa ekran bozulmaz; logo otomatik gizlenir.

## Kürsü Görünümü

- Kürsü içerik alanı konu ve konuşmacıyı sola yaslı, üst-orta bölgede gösterir.
- Konu kırmızı üst etiket olarak, konuşmacı adı ise daha büyük ve koyu ana vurgu olarak gösterilir.

## Teknik Not

Senkronizasyon, aynı tarayıcı ve aynı bilgisayar senaryosu için `BroadcastChannel` + `localStorage` (`storage` event yedeği) ile çalışır.
Farklı cihazlar arası gerçek zamanlı senkron için ileride sunucu tarafı bir çözüm gerekir.
