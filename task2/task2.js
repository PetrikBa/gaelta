/**
 * Spracovanie webhooku
 @param {Request} request 
 */

async function handleWebhook(request) {
  try {
    // data a podpis z header
    const payload = await request.text(); // text kvoli validacii podpisu
    const signature = request.headers.get('shoptet-signature');
    const secretKey = 'shopter_secret_key';

    // autentifikacia pomocou Web Crypto API
    const isValid = await verifySignature(payload, signature, secretKey);
    if (!isValid) {
      return new Response('Invalid Signature', { status: 401 });
    }

    const data = JSON.parse(payload);

    // transformacia dat
    const formattedRow = {
      values: [[
        data.orderNumber,                                      
        new Date(data.creationTime).toLocaleString('sk-SK'),    
        data.items.map(function(i) {                           
            return i.sku + " - " + i.name + " (" + i.amount + "x)"; 
        }).join(', '),
        data.shipping.name + " / " + data.cashOnDeliveryName,  
        data.totalPriceWithVat + " " + data.currencyCode,      
        data.discountCouponCode || "Nepoužitý",                
        data.email
      ]]
    };

    // 4. Zapis do Google Sheets cez fetch
    const spreadsheetId = 'id_tvojej_tabulky';
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedRow)
      }
    );

    if (!response.ok) throw new Error('Google API Error');

    return new Response('Success', { status: 200 });

  } catch (err) {
    return new Response('Internal Error: ' + err.message, { status: 500 });
  }
}

//Pomocná funkcia na overenie podpisu pomocou natívneho Web Crypto API

async function verifySignature(payload, signature, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', 
    encoder.encode(secret), 
    { name: 'HMAC', hash: 'SHA-256' }, 
    false, 
    ['verify', 'sign']
  );
  
  const signatureBytes = new Uint8Array(
    signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  );
  
  return await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(payload)
  );
}