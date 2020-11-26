module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },
  graduation: function (value) {
    switch (value) {
      case "highSchool":
        return "Médio Completo";
      case "bachelor":
        return "Superior Completo";
      case "masters":
        return "Mestrado";
      case "doctorateDegree":
        return "Doutorado";
    }
  },
  grade: function (value) {
    switch (value) {
      case "5F":
        return "5º Fundamental";
      case "6F":
        return "6º Fundamental";
      case "7F":
        return "7º Fundamental";
      case "8F":
        return "8º Fundamental";
      case "9F":
        return "9º Fundamental";
      case "1M":
        return "1º Médio";
      case "2M":
        return "2º Médio";
      case "3M":
        return "3º Médio";
    }
  },
  date: function (timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
    };
  },
};
