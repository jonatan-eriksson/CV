interface IEducation {
  id: number;
  documentId?: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  visible: boolean;
  position?: number;

  toggleEdit: boolean;
}
