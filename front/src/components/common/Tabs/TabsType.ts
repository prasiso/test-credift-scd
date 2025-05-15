export type TabProps = {
  label: string;
  key: number;
  type: 'favorite' | 'word' | 'history';
  children: React.ReactNode;
};