export type CreateReportEntity = {
    FromDate: Date,
    ToDate: Date,
    IdInspectionForm: number
  }
    
  
  export type EditReportEntity = CreateReportEntity & {
    IdInspectionForm: number
  }
  
  export type ShowReportEntity = {
    IdInspectionForm: number,
    FromDate: Date,
    ToDate: Date,
  }
  