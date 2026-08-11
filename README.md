# Konferans Salonu Ekran Yönetim Sistemi

Tek Node.js sunucusu, WebSocket ile canlı senkronizasyon.

## Gereksinimler

- [Node.js](https://nodejs.org/) (Windows'ta kurulu olması gerekir)

## Kurulum

```bash
npm install
npm start
```

Sunucu **port 3000**'de çalışır.

## Ekran Adresleri

| Ekran | Adres |
|-------|-------|
| Yönetim Paneli | http://10.201.65.10:3000/yonet.html |
| Kürsü Monitörü (salona bakan büyük ekran) | http://10.201.65.10:3000/ |
| Konuşmacı Ekranı (kürsü önü) | http://10.201.65.10:3000/kursu.html |

IIS reverse proxy varsa (bkz. aşağı): `http://10.201.65.10/` (port olmadan da erişilebilir.

## Logo

`public/logo.png` dosyasına kurumunuzun logosunu koyabilirsiniz; yoksa otomatik gizlenir.

## IIS Reverse Proxy (Opsiyonel)

Mevcut IIS varsa ve `http://10.201.65.10/` adresini kullanmak istiyorsanız:

1. IIS'te **Application Request Routing (ARR)** ve **URL Rewrite** modüllerinin kurulu olduğundan emin olun.
2. IIS Manager → Sunucu düzeyinde **Application Request Routing Cache** → **Server Proxy Settings** → "Enable proxy" kutusunu işaretleyin.
3. Sitenizin `web.config` dosyasına aşağıdaki kuralı ekleyin:

```xml
<system.webServer>
  <rewrite>
    <rules>
      <rule name="NodeProxy" stopProcessing="true">
        <match url="(.*)" />
        <action type="Rewrite" url="http://localhost:3000/{R:1}" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>
```

Bu sayede `http://10.201.65.10/` istekleri otomatik olarak `http://localhost:3000/`'a yönlendirilir.

Alternatif olarak IIS'i kullanmadan Node sunucusuna doğrudan **3000** portundan erişebilirsiniz.