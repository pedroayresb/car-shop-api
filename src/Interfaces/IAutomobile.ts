interface IAutomobile {
  id?: string | undefined;
  model: string;
  year: number;
  color: string;
  status?: boolean | undefined;
  buyValue: number;
}

export default IAutomobile;