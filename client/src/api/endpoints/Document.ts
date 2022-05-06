const url = process.env.REACT_APP_API_URL;

const documentEndpoints = {
  base: url + "/document",
  getById: (id: string) => `${url}/document/${id}`,
  update: (id: string) => `${url}/document/${id}`,
  download: (id: string) => `${url}/document/${id}/download`,
}

export default documentEndpoints;
