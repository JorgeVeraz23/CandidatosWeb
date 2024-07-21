export type ResponseLoginUserEntity = {
    userName: string,
    password: string
    role: string,
    firstName: string,
    lastName: string,
    token: string,
}

export type LoginUserEntity ={
    userName: string,
    password: string   
}

  
// export type CreateFormEntity = {
//     nameES: string,
//     nameEN: string,
//     description: string
//   }
    
  
//   export type EditFormEntity = CreateFormEntity & {
//     idInspectionForm: number
//   }
  
//   export type ShowFormEntity = {
//     idInspectionForm: number,
//     nameES: string,
//     nameEN: string,
//     description: string
//   }
  