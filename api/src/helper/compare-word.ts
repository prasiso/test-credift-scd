export function compare_word(word1: string, word2: string) {
  const regex = new RegExp(`^${word1}$`, 'i');
  return regex.test(word2);
}
