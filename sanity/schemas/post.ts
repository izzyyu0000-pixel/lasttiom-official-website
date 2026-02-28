import {defineArrayMember, defineField, defineType} from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: '文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '文章標題',
      type: 'string',
      // 文章主標題，列表與內頁共用
      validation: (rule) => rule.required().min(1).error('請輸入文章標題'),
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
      name: 'mainImage',
      title: '列表封面圖',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: '替代文字',
          type: 'string',
        }),
      ],
      // 文章列表與社群分享常用主圖
      validation: (rule) => rule.required().error('請上傳文章封面圖'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO 專用標題',
      type: 'string',
      // 搜尋結果標題，建議控制在 60 字內
      validation: (rule) => rule.max(60).warning('SEO 標題建議不超過 60 字元'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO 專用描述',
      type: 'text',
      rows: 3,
      // 搜尋結果描述，建議控制在 160 字內
      validation: (rule) => rule.max(160).warning('SEO 描述建議不超過 160 字元'),
    }),
    defineField({
      name: 'body',
      title: '文章內容',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      // 文章主內容（Portable Text）
      validation: (rule) => rule.required().min(1).error('請填寫文章內容'),
    }),
    defineField({
      name: 'relatedProducts',
      title: '關聯推薦商品',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
      options: {
        layout: 'tags',
      },
      // 文章結尾導購商品，前端可透過 GROQ 使用 -> 展開資料
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      seoTitle: 'seoTitle',
    },
    prepare({title, media, seoTitle}) {
      return {
        title: title || '未命名文章',
        media,
        subtitle: seoTitle ? `SEO: ${seoTitle}` : '尚未設定 SEO 標題',
      }
    },
  },
})

export default postSchema
