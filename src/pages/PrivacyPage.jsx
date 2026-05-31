import LegalPage from '../components/ui/LegalPage';
import content from '../content.json';

export default function PrivacyPage() {
  const { title, lastUpdated, intro, sections } = content.privacy;
  return <LegalPage title={title} lastUpdated={lastUpdated} intro={intro} sections={sections} />;
}
