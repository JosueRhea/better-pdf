import { Doc } from '../services/types';
import { Box } from './ui/box';
import { Text } from './ui/text';

interface Props {
  data: Doc[];
}

export function PdfList({ data }: Props) {
  return (
    <Box>
      {data.length > 0 ? (
        data.map((doc) => <Text key={doc.fileCopyUri}>{doc.name}</Text>)
      ) : (
        <Text>You don't have any docs yet.</Text>
      )}
    </Box>
  );
}
