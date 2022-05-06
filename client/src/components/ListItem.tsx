import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { ItemType } from "../Enums";
import { yearMonth } from "../helpers/General";

type Props = {
  id: number,
  type: ItemType,
  item: IProject | IWork | IEducation | ISkill,
  onChangeCheckbox: (e?: any) => void,
  onEdit: (e?: any) => void,
  onRemove: (e?: any) => void,
}

const ProjectItem = ({ id, type, item, onEdit, onRemove, onChangeCheckbox }: Props) => {
  const baseName = type === ItemType.Work ? `${type}` : `${type}s`;

  const getDate = (startDate?: string, endDate?: string) => {
    let date = "";
    if (startDate && endDate)
      date = yearMonth(startDate) + " - " + yearMonth(endDate)
    else if (startDate || endDate)
      date = yearMonth(startDate || endDate)

    return date;
  }

  const projectItem = () => {
    const project = item as IProject;
    const date = getDate(project.startDate, project.endDate);
    return (<>
      <Col>
        <div className="fw-bold">{project?.customerName} {project?.title}</div>
        <div>{project?.assignment}</div>
        <div>{project?.role}</div>
        <div>{project?.description}</div>
        <div>{project?.tech}</div>
      </Col>
      <Col className="text-end">
        <div>{date}</div>
      </Col>
    </>);
  }

  const workItem = () => {
    const work = item as IWork;
    const date = getDate(work.startDate, work.endDate);
    return (<>
      <Col>
        <div className="fw-bold">{work?.employer}</div>
        <div>{work?.profession}</div>
      </Col>
      <Col className="text-end">
        <div>{date}</div>
      </Col>
    </>);
  }

  const educationItem = () => {
    const education = item as IEducation;
    const date = getDate(education.startDate, education.endDate);
    return (<>
      <Col>
        <div className="fw-bold">{education?.school}</div>
        <div>{education?.degree}</div>
      </Col>
      <Col className="text-end">
        <div>{date}</div>
      </Col>
    </>);
  }

  const skillItem = () => {
    const skill = item as ISkill;
    return (<>
      <Col>
        <div className="fw-bold">{skill?.type}</div>
        <div>{skill?.text}</div>
      </Col>
    </>);
  }


  return (<>
    <ListGroup.Item id={`${item.id}`}>
      <Row>
        <Col sm={"auto"} className="text-center">
          <Form.Label className="fw-bold">Visible</Form.Label>
          <Form.Check type="checkbox" name={`${baseName}.visible`} checked={item?.visible} onChange={onChangeCheckbox} />
        </Col>
        {
          (type === ItemType.Project && projectItem()) ||
          (type === ItemType.Work && workItem()) ||
          (type === ItemType.Education && educationItem()) ||
          (type === ItemType.Skill && skillItem())
        }
      </Row>
      <Row>
        <Col className="d-flex justify-content-end gap-2">
          <Button variant="link" className="text-decoration-none" size="sm" onClick={onEdit}>Edit</Button>
          <Button variant="link" className="text-decoration-none text-danger" size="sm" onClick={onRemove}>Remove</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  </>)
}

export default ProjectItem
