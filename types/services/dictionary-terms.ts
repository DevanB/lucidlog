export interface DictionaryTermRow {
  id: number;
  name: string;
  slug: string;
  definition: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RelatedTermReference {
  id: number;
  name: string;
  slug: string;
}

export interface DictionaryTerm extends DictionaryTermRow {
  relatedTerms: Array<RelatedTermReference>;
}

export interface CreateDictionaryTermInput {
  name: string;
  slug: string;
  definition: string;
  relatedTerms?: Array<number>;
}

export interface UpdateDictionaryTermInput {
  name?: string;
  slug?: string;
  definition?: string;
  relatedTerms?: Array<number>;
}

export type DictionaryTermsGrouped = Record<string, Array<DictionaryTerm>>;
