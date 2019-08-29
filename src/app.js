export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      if(err.message){
        console.error(err.message);
      }
    },
  },
};
