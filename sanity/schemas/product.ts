import {defineArrayMember, defineField, defineType} from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: '商品',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '商品名稱',
      type: 'string',
      // 商品主標題，前台列表與詳情頁顯示使用
      validation: (rule) => rule.required().min(1).error('請輸入商品名稱'),
    }),
    defineField({
      name: 'slug',
      title: '網址路徑',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // SEO 友善網址，必填
      validation: (rule) => rule.required().error('請產生並填寫 slug'),
    }),
    defineField({
      name: 'price',
      title: '價格',
      type: 'number',
      initialValue: 790,
      // 商品售價，預設 790，避免未填資料
      validation: (rule) =>
        rule.required().min(0).precision(0).error('請輸入有效價格（不可小於 0）'),
    }),
    defineField({
      name: 'shopeeUrl',
      title: '蝦皮結帳連結',
      type: 'url',
      // 前台 CTA 外連使用，必填
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .error('請輸入有效的蝦皮連結（http/https）'),
    }),
    defineField({
      name: 'images',
      title: '輪播圖',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: '替代文字',
              type: 'string',
            }),
          ],
        }),
      ],
      // 商品多圖輪播，支援後台裁切（hotspot）
      validation: (rule) => rule.required().min(1).error('請至少上傳 1 張商品圖片'),
    }),
    defineField({
      name: 'customOptions',
      title: '客製化選項',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'optionGroup',
          title: '選項群組',
          type: 'object',
          fields: [
            defineField({
              name: 'groupName',
              title: '群組名稱',
              type: 'string',
              // 例如：十二生肖、生辰花
              validation: (rule) => rule.required().error('請填寫群組名稱'),
            }),
            defineField({
              name: 'choices',
              title: '可選項目',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              // 群組底下可選值，可持續擴充
              validation: (rule) => rule.required().min(1).error('請至少輸入 1 個選項'),
            }),
          ],
          preview: {
            select: {
              title: 'groupName',
              choices: 'choices',
            },
            prepare({title, choices}) {
              const count = Array.isArray(choices) ? choices.length : 0
              return {
                title: title || '未命名群組',
                subtitle: `共 ${count} 個選項`,
              }
            },
          },
        }),
      ],
      // 客製化規格區塊，可自由新增多組
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: '詳細商品介紹',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      // 商品詳情文案（Portable Text）
      validation: (rule) => rule.required().min(1).error('請填寫商品詳細介紹'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'price',
    },
    prepare({title, media, subtitle}) {
      return {
        title: title || '未命名商品',
        media,
        subtitle: typeof subtitle === 'number' ? `NT$ ${subtitle}` : '尚未設定價格',
      }
    },
  },
})

export default productSchema
