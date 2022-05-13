import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { ItemType } from "../Enums";
import { yearMonthNumeric } from "../helpers/General";

type Props = {
  id: number,
  type: ItemType,
  item: IProject | IWork | IEducation | ISkill,
  onSave: (e?: any) => void,
  onRemove: (e?: any) => void,
  onChangeText: (e?: any) => void
}

const ProjectForm = ({ id, type, item, onSave, onRemove, onChangeText }: Props) => {
  const baseName = type === ItemType.Work ? `${type}` : `${type}s`;

  const projectForm = () => {
    const project = item as IProject;
    return (<>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Customer Name</Form.Label>
          <Form.Control type="text" name={`${baseName}.customerName`} onChange={onChangeText} value={project?.customerName} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name={`${baseName}.title`} onChange={onChangeText} value={project?.title} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Assignment</Form.Label>
          <Form.Control type="text" name={`${baseName}.assignment`} onChange={onChangeText} value={project?.assignment} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Tech</Form.Label>
          <Form.Control type="text" name={`${baseName}.tech`} onChange={onChangeText} value={project?.tech} />
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control as="textarea" name={`${baseName}.role`} onChange={onChangeText} value={project?.role} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name={`${baseName}.description`} onChange={onChangeText} value={project?.description} />
          </Form.Group>
        </Col>
      </Row>
    </>);
  }

  const workForm = () => {
    const work = item as IWork;
    return (<>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Employer</Form.Label>
          <Form.Control type="text" name={`${baseName}.employer`} onChange={onChangeText} value={work?.employer} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name={`${baseName}.profession`} onChange={onChangeText} value={work?.profession} />
        </Form.Group>
      </Row>
    </>);
  }

  const educationForm = () => {
    const education = item as IEducation;
    return (<>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>School</Form.Label>
          <Form.Control type="text" name={`${baseName}.school`} onChange={onChangeText} value={education?.school} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Degree</Form.Label>
          <Form.Control type="text" name={`${baseName}.degree`} onChange={onChangeText} value={education?.degree} />
        </Form.Group>
      </Row>
    </>);
  }

  const skillForm = () => {
    const skill = item as ISkill;
    return (<>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Skill Type</Form.Label>
            <Form.Control type="text" name={`${baseName}.type`} onChange={onChangeText} value={skill?.type} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Skills</Form.Label>
            <Form.Control type="text" name={`${baseName}.text`} onChange={onChangeText} value={skill?.text} />
          </Form.Group>
        </Col>
      </Row>
    </>);
  }

  const dateForm = () => {
    const i = item as IProject | IWork | IEducation;
    return (<>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Start date</Form.Label>
          <Form.Control type="month" name={`${baseName}.startDate`} onChange={onChangeText} value={yearMonthNumeric(i?.startDate)} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>End date</Form.Label>
          <Form.Control type="month" name={`${baseName}.endDate`} onChange={onChangeText} value={yearMonthNumeric(i?.endDate)} />
        </Form.Group>
      </Row>
    </>);
  }

  return (<>
    <ListGroup.Item>
      {
        (type === ItemType.Project && [projectForm(), dateForm()]) ||
        (type === ItemType.Work && [workForm(), dateForm()]) ||
        (type === ItemType.Education && [educationForm(), dateForm()]) ||
        (type === ItemType.Skill && skillForm())
      }

      <Row>
        <Col className="d-flex justify-content-end gap-2">
          <Button variant="link" className="text-decoration-none" size="sm" onClick={onSave}>Save</Button>
          <Button variant="link" className="text-decoration-none text-danger" size="sm" onClick={onRemove}>Remove</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  </>)
}

export default ProjectForm;
