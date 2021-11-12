// ################## Validators and Filters ###################################
export const validations = {
  emailValidator: (email) => {
    const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailregex.test(email.toLowerCase());
  },

  nameFilter: (name) => {
    const reg = /\d{3}/g;
    const res = name.trim().replace(reg, "");
    return res;
  },
};
