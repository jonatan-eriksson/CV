import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  document: IDocument;
}

const DocumentListItem = ({ document }: Props) => {
  return (<>
    <Nav.Link as={Link} className="link-primary px-3" to={`/document/${document.id}`}>{document.name}</Nav.Link>
  </>
  )
}

export default DocumentListItem;
