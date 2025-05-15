type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "article"
  | "determiner";

type Pronunciation = {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
  country?: string;
};

type Meaning = {
  speach: PartOfSpeech | string;
  definition: string;
};
type history = {
  id_history_read_entrie: number
  created_at: string | Date
}
type fav = {
  id_entries_fav: number
  created_at: string | Date
}

export type WordEntry = {
  word: string;
  phonetic: string;
  audio: Pronunciation[];
  meanings: Meaning[];
  history?: history 
  fav?: fav | boolean
};


export type RespGetEntries = {
  	"results": string[],
	"totalDocs": number,
	"page": number,
	"totalPage": number,
	"hasNext": boolean,
	"hasPrev": boolean
}
