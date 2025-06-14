export interface DictionaryTermRow {
  id: number;
  name: string;
  definition: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RelatedTermReference {
  id: number;
  name: string;
}

export interface DictionaryTerm extends DictionaryTermRow {
  relatedTerms: Array<RelatedTermReference>;
}

export interface CreateDictionaryTermInput {
  name: string;
  definition: string;
  relatedTerms?: Array<number>;
}

export interface UpdateDictionaryTermInput {
  name?: string;
  definition?: string;
  relatedTerms?: Array<number>;
}

export type DictionaryTermsGrouped = Record<string, Array<DictionaryTerm>>;
