import { Button, Col, Row } from "react-bootstrap";

const Document = () => {
  return (<>
    <Row>
      <Col>
        <h4>Document name</h4>
      </Col>
      <Col className="text-end">
        <Button size="sm">Edit</Button>
      </Col>
    </Row>
  </>)
}

export default Document;
