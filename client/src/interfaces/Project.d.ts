interface IProject {
  id: number;
  documentId?: number;
  customerName: string;
  title: string;
  assignment: string;
  role: string;
  description: string;
  tech: string;
  startDate: string;
  endDate: string;
  visible: boolean;
  position?: number;

  toggleEdit: boolean;
}
