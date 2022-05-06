import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { DocumentService } from "../../api/services/DocumentService";

const Document = () => {
  const { id } = useParams();

  const [document, setDocument] = useState<IDocument>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    if (id) {
      const document = await DocumentService.getDocument(id);
      setDocument(document);
      setLoading(false);
    }
  }

  const downloadDocument = async () => {
    if (id) {
      const data = await DocumentService.downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = window.document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${document?.name}.pdf`);
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 0);
    }
  }
  return (<>
    {loading ? <div className="text-center mt-auto">Loading...</div> :
      document && <>
        <Row xs="2">
          <Col>
            <h4>{document.name}</h4>
          </Col>
          <Col className="text-end">
            <Button variant="link" className="text-decoration-none" onClick={downloadDocument}>Download PDF</Button>
            <Link className="btn link-primary text-decoration-none" to={`/document/${id}/edit`}>Edit</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            Preview PDF
          </Col>
        </Row>
      </>}
  </>)
}

export default Document;
