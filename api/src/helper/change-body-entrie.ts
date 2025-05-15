import { WordEntry } from 'src/services/free-dictionary/interface/dictionary';

export function change_body_entrie(resp: WordEntry): any {
  const meanings = resp.meanings
    .map((dt) => {
      return dt.definitions.map((def) => ({
        speach: dt.partOfSpeech,
        definition: def.definition,
      }));
    })
    .flat();
  const data = {
    word: resp.word,
    phonetic: resp.phonetic,
    audio: resp.phonetics.map((ph) => {
      if (!ph.audio) return ph;
      const audio = ph.audio.split('.');
      const country = audio[audio.length - 2].split('-').pop();
      ph.country = country
      return ph;
    }),
    meanings,
  };
  return data;
}
