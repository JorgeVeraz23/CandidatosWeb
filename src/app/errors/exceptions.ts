export const AxiosException = (error: any): string => {
  let msg:string = "";
  if (error.response) {
    if(error.response.data?.message){
      msg = `${error.response.data.message}`
    }
    msg = error.response.data?.errors?.data[0];
  } else {
    msg = `${error.message}`
  }
  return msg;
}