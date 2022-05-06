interface IDocument {
  id: number;
  name: string;

  firstName: string;
  lastName: string;
  profession: string;
  description: string;
  characteristics: string;
  languages: string;

  avatar?: FormData;

  projects?: IProject[];
  educations?: IEducation[];
  work?: IWork[];
  skills?: ISkill[];
}
