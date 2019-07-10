import { DbConfig } from '../controllers/SqlConnector'

export const documentServiceDb : DbConfig = {
  database: "DocumentService",
  server: "localhost\\MSSQLSERVER17",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
}