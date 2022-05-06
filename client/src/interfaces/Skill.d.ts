interface ISkill {
  id: number;
  documentId?: number;
  type: string;
  text: string;
  visible: boolean;
  position?: number;

  toggleEdit: boolean;
}
