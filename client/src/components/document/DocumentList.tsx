import { Nav } from "react-bootstrap";
import DocumentListItem from "./DocumentListItem";

type Props = {
  documents: IDocument[];
}

const DocumentList = ({ documents }: Props) => {
  return (<>
    <Nav className="flex-column">
      {documents.length > 0 && documents.map((document: IDocument) =>
        <DocumentListItem key={`${document.id}${document.name}`} document={document} />
      )}
    </Nav>
  </>
  )
}

export default DocumentList;
