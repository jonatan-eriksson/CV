interface IWork {
  id: number;
  documentId?: number;
  employer: string;
  profession: string;
  startDate?: string;
  endDate?: string;
  visible: boolean;
  position?: number;

  toggleEdit: boolean;
}
