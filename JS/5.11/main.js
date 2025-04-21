let date = new Date(2012, 1, 20, 3, 12);
alert(date);

let date = new Date();

function getWeekDay(date) {
  switch (date.getDay()) {
    case 1:
      return "ПН";
    case 2:
      return "ВТ";
    case 3:
      return "СР";
    case 4:
      return "ЧТ";
    case 5:
      return "ПТ";
    case 6:
      return "СБ";
    case 7:
      return "ВС";
  }
}

// function getWeekDay(date){
//   let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
//   return days[date.getDay()];
// }
alert(getWeekDay(date));

let date = new Date(2012, 0, 3);

function getWeekDay(date) {
  return date.getDay();
}
alert(getWeekDay(date));

let date = new Date(2015, 0, 2);

function getDateAgo(date, day) {
  let s = new Date(date);
  s.setDate(date.getDate() - day);
  return s.getDate();
}

console.log(getDateAgo(date, 2));

let date = new Date(2012, 1);

function getDateAgo(date) {
  let s = new Date(date.getFullYear(), date.getMonth() + 1);
  s.setDate(s.getDate() - 1);
  return s.getDate();
}

console.log(getDateAgo(date));

function getSecondsToday() {
  let s = new Date();
  let h = s.getHours();
  let m = s.getMinutes();
  let sec = s.getSeconds();
  return h * 60 * 60 + m * 60 + sec;
}

console.log(getSecondsToday());
// alert(getSecondsToday())

function getSecondsToday() {
  let s = new Date();
  let h = s.getHours();
  let m = s.getMinutes();
  let sec = s.getSeconds();
  return 24 * 60 * 60 - (h * 60 * 60 + m * 60 + sec);
}

console.log(getSecondsToday());
// alert(getSecondsToday())

function formatDate(date) {
  let datas = new Date() - date;
  if (datas < 1000) {
    return "Прямо сейчас";
  }
  let sec = Math.floor(datas / 1000);
  if (sec < 60) {
    return sec + " секунд назад";
  }
  let hour = Math.floor(sec / 60);
  if (hour < 60) {
    return hour + " минут назад";
  }
  let dat = date;
  let day = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
  let month =
    dat.getMonth() < 10 ? "0" + +(dat.getMonth() + 1) : dat.getMonth();
  return `${day}.${month}.${dat.getFullYear()}, ${dat.getHours()}:${dat.getMinutes()}`;
}

console.log(formatDate(new Date(new Date() - 86400 * 1000)));
