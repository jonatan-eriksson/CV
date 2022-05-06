import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DocumentService } from "../../api/services/DocumentService";
import DocumentList from "../../components/document/DocumentList";
import Sidebar from "../../components/Sidebar";

const Documents = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, [])

  const fetchDocuments = async () => {
    const documents = await DocumentService.getDocuments();
    setDocuments(documents);
  }

  return (<>
    <Sidebar>
      <>
        <Row xs="2" className="px-3 py-2">
          <Col>
            <div>Documents</div>
          </Col>
          <Col className="text-end">
            <Link className="link-primary text-decoration-none" to="/document/new">
              Add
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <DocumentList documents={documents} />
          </Col>
        </Row>
      </>
    </Sidebar>
  </>)
}

export default Documents;
