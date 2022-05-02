import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DocumentList from "../../components/document/DocumentList";
import Sidebar from "../../components/Sidebar";

const Documents = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, [])

  const fetchDocuments = async () => {
    setDocuments([
      {
        id: 1,
        name: "Doc1",
        description: "Desc1",
        createdAt: Date.now.toString(),
        modifiedAt: Date.now.toString()
      },
      {
        id: 2,
        name: "Doc2",
        description: "Desc2",
        createdAt: Date.now.toString(),
        modifiedAt: Date.now.toString()
      },
      {
        id: 3,
        name: "Doc3",
        description: "Desc3",
        createdAt: Date.now.toString(),
        modifiedAt: Date.now.toString()
      },
    ]);
  }

  const handleClickDocument = (id: string | number) => {
    console.log(id);
  }

  return (<>
    <Sidebar>
      <>
        <Row xs="2" className="px-3 py-2">
          <Col>
            <div>Documents</div>
          </Col>
          <Col className="text-end">
            <Link className="link-primary text-decoration-none" to="/">
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
