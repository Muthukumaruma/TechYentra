import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function CookiePage() {
  const { title, lastUpdated, intro, sections } = content.cookie;
  return (
    <LegalPage
      title={title} lastUpdated={lastUpdated} intro={intro} sections={sections}
      clauses={['modify']}
    />
  );
}
