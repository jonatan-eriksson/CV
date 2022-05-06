import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentService } from "../../api/services/DocumentService";
import ListItem from "../../components/ListItem";
import ListItemForm from "../../components/ListItemForm";
import { ItemType } from "../../Enums";
import { getProperty, setProperty } from "../../helpers/General";

const defaultDocument: IDocument = {
  id: 0,
  name: "cv#new",
  firstName: "",
  lastName: "",
  profession: "",
  description: "",
  characteristics: "",
  languages: "",
  work: [],
  projects: [],
  educations: [],
  skills: [],
};

const defaultProject: IProject = {
  id: 0,
  customerName: "",
  title: "",
  assignment: "",
  role: "",
  description: "",
  tech: "",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  visible: true,
  toggleEdit: true
};

const defaultEducation: IEducation = {
  id: 0,
  school: "",
  degree: "",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  visible: true,
  toggleEdit: true
};

const defaultWork: IWork = {
  id: 0,
  employer: "",
  profession: "",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  visible: true,
  toggleEdit: true
};

const defaultSkill: ISkill = {
  id: 0,
  type: "",
  text: "",
  visible: true,
  toggleEdit: true
}

const DocumentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState<IDocument>(defaultDocument);
  const [toggleEditProject, setToggleEditProject] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    if (id) {
      const document = await DocumentService.getDocument(id);
      setDocument(document);
    }
    else
      setDocument(defaultDocument);
  }

  const updateDocument = async () => {
    if (id) {
      return await DocumentService.updateDocument(id, document);
    }
    else {
      return await DocumentService.createDocument(document);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    const docId = await updateDocument();
    if (docId)
      navigate(`/document/${docId}`);
  }

  const onChangeText = (e: any, index?: number) => {
    const { name, value, type } = e.target;

    console.log(type)
    if (name.indexOf('.') > -1) {
      const [parent, child] = name.split('.');

      const prop = getProperty(document, parent);
      const isArray = Array.isArray(prop);

      let parentObj = Object.assign(isArray ? [] : {}, prop);

      if (isArray && index !== undefined && index >= 0)
        setProperty(parentObj[index], child, value);
      else
        setProperty(parentObj, child, value);

      setDocument({ ...document, [parent]: parentObj });
    }
    else {
      setDocument({ ...document, [name]: value });
    }
  }

  const onChangeCheckbox = (e: any, index?: number) => {
    const { name, checked } = e.target;

    if (name.indexOf('.') > -1) {
      const [parent, child] = name.split('.');

      const prop = getProperty(document, parent);
      const isArray = Array.isArray(prop);

      let parentObj = Object.assign(isArray ? [] : {}, prop);

      if (isArray && index !== undefined && index >= 0)
        setProperty(parentObj[index], child, checked);
      else
        setProperty(parentObj, child, checked);

      setDocument({ ...document, [parent]: parentObj });
    }
    else {
      setDocument({ ...document, [name]: checked });
    }
  }

  const addItem = (itemType: ItemType) => {
    switch (itemType) {
      case ItemType.Work:
        const updatedWork = document?.work
          ? [...document.work, { ...defaultWork }]
          : [{ ...defaultWork }];
        setDocument({ ...document, work: updatedWork });
        break;

      case ItemType.Project:
        const updatedProjects = document?.projects
          ? [...document.projects, { ...defaultProject }]
          : [{ ...defaultProject }];
        setDocument({ ...document, projects: updatedProjects });
        break;

      case ItemType.Education:
        const updatedEducations = document?.educations
          ? [...document.educations, { ...defaultEducation }]
          : [{ ...defaultEducation }];
        setDocument({ ...document, educations: updatedEducations });
        break;

      case ItemType.Skill:
        const updatedSkills = document?.skills
          ? [...document.skills, { ...defaultSkill }]
          : [{ ...defaultSkill }];
        setDocument({ ...document, skills: updatedSkills });
        break;
    }
  }

  const removeItem = (itemType: ItemType, index: number) => {
    switch (itemType) {
      case ItemType.Work:
        if (document?.work && document.work.length > 0) {
          const work = [...document.work];
          work.splice(index, 1);
          setDocument({ ...document, work: work });
        }
        break;

      case ItemType.Project:
        if (document?.projects && document.projects.length > 0) {
          const projects = [...document.projects];
          projects.splice(index, 1);
          setDocument({ ...document, projects: projects });
        }
        break;

      case ItemType.Education:
        if (document?.educations && document.educations.length > 0) {
          const educations = [...document.educations];
          educations.splice(index, 1);
          setDocument({ ...document, educations: educations });
        }
        break;

      case ItemType.Skill:
        if (document?.skills && document.skills.length > 0) {
          const skills = [...document.skills];
          skills.splice(index, 1);
          setDocument({ ...document, skills: skills });
        }
        break;
    }
  }

  const toggleEdit = (itemType: ItemType, index: number) => {
    switch (itemType) {
      case ItemType.Work:
        if (document?.work) {
          const work = [...document.work];
          work[index].toggleEdit = !work[index].toggleEdit;
          setDocument({ ...document, work: work });
        }
        break;

      case ItemType.Project:
        if (document?.projects) {
          const projects = [...document.projects];
          projects[index].toggleEdit = !projects[index].toggleEdit;
          setDocument({ ...document, projects: projects });
        }
        break;

      case ItemType.Education:
        if (document?.educations) {
          const educations = [...document.educations];
          educations[index].toggleEdit = !educations[index].toggleEdit;
          setDocument({ ...document, educations: educations });
        }
        break;

      case ItemType.Skill:
        if (document?.skills) {
          const skills = [...document.skills];
          skills[index].toggleEdit = !skills[index].toggleEdit;
          setDocument({ ...document, skills: skills });
        }
        break;
    }
  }

  return (
    <>
      <Row>
        <Col>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <h4>Edit document</h4>
              </Col>
              <Col className="text-end">
                <Button type="submit" variant="link" className="text-decoration-none">Save</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Document Name</Form.Label>
                  <Form.Control required minLength={3} type="text" name="name" onChange={onChangeText} value={document?.name} />
                </Form.Group>
                <Accordion defaultActiveKey={["0"]} flush alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Profile</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <Row>
                            <Form.Group as={Col}>
                              <Form.Label>First name</Form.Label>
                              <Form.Control type="text" name="firstName" onChange={onChangeText} value={document?.firstName} />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>Last name</Form.Label>
                              <Form.Control type="text" name="lastName" onChange={onChangeText} value={document?.lastName} />
                            </Form.Group>
                          </Row>
                          <Row>
                            <Form.Group as={Col}>
                              <Form.Label>Profession</Form.Label>
                              <Form.Control type="text" name="profession" onChange={onChangeText} value={document?.profession} />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>Languages</Form.Label>
                              <Form.Control type="text" name="languages" onChange={onChangeText} value={document?.languages} />
                            </Form.Group>
                          </Row>

                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" onChange={onChangeText} value={document?.description} />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Characteristics</Form.Label>
                            <Form.Control as="textarea" name="characteristics" onChange={onChangeText} value={document?.characteristics} />
                          </Form.Group>

                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Projects</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {document?.projects && document.projects.length > 0 && document?.projects.map((project: IProject, index: number) =>
                          project.toggleEdit ?
                            <ListItemForm
                              id={project.id}
                              type={ItemType.Project}
                              item={project}
                              onChangeText={(e) => onChangeText(e, index)}
                              onSave={() => toggleEdit(ItemType.Project, index)}
                              onRemove={() => removeItem(ItemType.Project, index)}
                            />
                            :
                            <ListItem
                              key={`${index}${project.title}`}
                              id={project.id}
                              type={ItemType.Project}
                              item={project}
                              onChangeCheckbox={(e) => onChangeCheckbox(e, index)}
                              onEdit={() => toggleEdit(ItemType.Project, index)}
                              onRemove={() => removeItem(ItemType.Project, index)}
                            />
                        )}
                      </ListGroup>
                      <Button variant="link" className="text-decoration-none" onClick={() => addItem(ItemType.Project)}>Add project</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Work experience</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {document?.work && document.work.length > 0 && document?.work.map((work: IWork, index: number) =>
                          work.toggleEdit ?
                            <ListItemForm
                              id={work.id}
                              type={ItemType.Work}
                              item={work}
                              onChangeText={(e) => onChangeText(e, index)}
                              onSave={() => toggleEdit(ItemType.Work, index)}
                              onRemove={() => removeItem(ItemType.Work, index)}
                            />
                            :
                            <ListItem
                              key={`${index}${work.employer}`}
                              id={work.id}
                              type={ItemType.Work}
                              item={work}
                              onChangeCheckbox={(e) => onChangeCheckbox(e, index)}
                              onEdit={() => toggleEdit(ItemType.Work, index)}
                              onRemove={() => removeItem(ItemType.Work, index)}
                            />
                        )}
                      </ListGroup>
                      <Button variant="link" className="text-decoration-none" onClick={() => addItem(ItemType.Work)}>Add work</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Education</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {document?.educations && document.educations.length > 0 && document?.educations.map((education: IEducation, index: number) =>
                          education.toggleEdit ?
                            <ListItemForm
                              id={education.id}
                              type={ItemType.Education}
                              item={education}
                              onChangeText={(e) => onChangeText(e, index)}
                              onSave={() => toggleEdit(ItemType.Education, index)}
                              onRemove={() => removeItem(ItemType.Education, index)}
                            />
                            :
                            <ListItem
                              key={`${index}${education.school}`}
                              id={education.id}
                              type={ItemType.Education}
                              item={education}
                              onChangeCheckbox={(e) => onChangeCheckbox(e, index)}
                              onEdit={() => toggleEdit(ItemType.Education, index)}
                              onRemove={() => removeItem(ItemType.Education, index)}
                            />
                        )}
                      </ListGroup>
                      <Button variant="link" className="text-decoration-none" onClick={() => addItem(ItemType.Education)}>Add education</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Skills</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {document?.skills && document.skills.length > 0 && document?.skills.map((skill: ISkill, index: number) =>
                          skill.toggleEdit ?
                            <ListItemForm
                              id={skill.id}
                              type={ItemType.Skill}
                              item={skill}
                              onChangeText={(e) => onChangeText(e, index)}
                              onSave={() => toggleEdit(ItemType.Skill, index)}
                              onRemove={() => removeItem(ItemType.Skill, index)}
                            />
                            :
                            <ListItem
                              key={`${index}${skill.type}`}
                              id={skill.id}
                              type={ItemType.Skill}
                              item={skill}
                              onChangeCheckbox={(e) => onChangeCheckbox(e, index)}
                              onEdit={() => toggleEdit(ItemType.Skill, index)}
                              onRemove={() => removeItem(ItemType.Skill, index)}
                            />
                        )}
                      </ListGroup>
                      <Button variant="link" className="text-decoration-none" onClick={() => addItem(ItemType.Skill)}>Add skill</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default DocumentEdit;
