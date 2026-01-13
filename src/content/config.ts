import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['ja', 'en']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const publicationSchema = z.object({
  authors: z.string(),
  title: z.string(),
  journal: z.string().optional(),
  conference: z.string().optional(),
  venue: z.string().optional(),
  details: z.string().optional(),
  year: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().optional(),
  note: z.string().optional(),
  showInEnglish: z.boolean(),
});

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    internationalJournals: z.array(publicationSchema),
    internationalConferences: z.array(publicationSchema),
    domesticJournals: z.array(publicationSchema),
    preprints: z.array(publicationSchema),
  }),
});

const nonPeerReviewedSchema = z.object({
  authors: z.string(),
  title: z.string(),
  conference: z.string(),
  year: z.string(),
  type: z.string(),
  doi: z.string().optional(),
  url: z.string().optional(),
  note: z.string().optional(),
  showInEnglish: z.boolean(),
});

const non_peerreviewed = defineCollection({
  type: 'data',
  schema: z.array(nonPeerReviewedSchema),
});

const cv = defineCollection({
  type: 'data',
  schema: z.object({
    awards: z.array(z.any()),
    grants: z.array(z.any()),
    internships: z.array(z.any()),
    teaching: z.array(z.any()),
    products: z.array(z.any()),
    talks: z.array(z.any()),
    organization: z.array(z.any()),
  }),
});

export const collections = {
  blog,
  publications,
  cv,
  non_peerreviewed,
};
