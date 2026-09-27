// 輸出 JSON-LD 字串；把 < 轉成 <，避免內容中的 </script> 提早結束標籤
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
