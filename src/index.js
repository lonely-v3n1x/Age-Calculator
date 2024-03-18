import moment from "moment";

const form = document.querySelector("form");
const monthId = document.getElementById("monthId");
const yearId = document.getElementById("yearId");
const dayId = document.getElementById("dayId");

let leapYear = false;

let thirtyDays = [4, 6, 9, 11];
let boolThirtyOneDays = true;

yearId.addEventListener("change", () => {
  if (yearId.value > 1970 && yearId.value <= moment().year()) {
    if (moment(`${yearId.value}-01-01`).isLeapYear) {
      leapYear = true;
    }
    document.getElementById("yearId").style.borderColor="hsl(0, 0%, 94%)";
    document.getElementById("errorYearMsg").style.display="none";
    // document.getElementById("errorYearMsg").innerHTML="Not a Valid Year";
    console.log("valid year");
  } else {
    // display error of year
    document.getElementById("yearId").style.borderColor="red";
    document.getElementById("errorYearMsg").style.display="block";
    document.getElementById("errorYearMsg").innerHTML="Not a Valid Year";
    console.log("Not Valid year");
    
  }
});

monthId.addEventListener("change", () => {
  if (monthId.value > 0 && monthId.value <= 12) {
    if (thirtyDays.indexOf(monthId.value) === -1) {
      boolThirtyOneDays = false;
    }
    document.getElementById("monthId").style.borderColor="hsl(0, 0%, 94%)";
    document.getElementById("errorMonthMsg").style.display="none";
    console.log("valid month");
  } else {
    // display error of month
    document.getElementById("monthId").style.borderColor="red";
    document.getElementById("errorMonthMsg").style.display="block";
    document.getElementById("errorMonthMsg").innerHTML="Not a Valid Month";
    console.log("nvalid month");
  }
});

dayId.addEventListener("change", () => {
  if (dayId.value > 0 && dayId.value <= 31) {
    if (leapYear && monthId.value === 2 && dayId.value > 28) {
      document.getElementById("dayId").style.borderColor="red";
      document.getElementById("errorDayMsg").style.display="block";
      document.getElementById("errorDayMsg").innerHTML="Must Be a Valid Year";
      console.log("cant have more than 28day in february in a  leap year");
    } else if (!boolThirtyOneDays && dayId.value > 30) {
      //error message for not a 31 days month and day is more than 31
      document.getElementById("dayId").style.borderColor="red";
      document.getElementById("errorDayMsg").style.display="block";
      document.getElementById("errorDayMsg").innerHTML="Must Be a Valid day";
      console.log("its not a 31 days month but ur day is more than 31 days");
    } else {
      //Reset input border color to  default
      document.getElementById("dayId").style.borderColor="hsl(0, 0%, 94%)";
      document.getElementById("errorDayMsg").style.display="none";
      console.log("valid day");
    }
  } else {
    document.getElementById("dayId").style.borderColor="red";
    document.getElementById("errorDayMsg").style.display="block";
    document.getElementById("errorDayMsg").innerHTML="Not a Valid Day";
    console.log("not Valid day");
  }
});




form.addEventListener("submit", () => {
  const day = form["day"].value;
  const month = form["month"].value;
  const year = form["year"].value;
  const usrDate =moment(`${year}-${month}-${day}`);
  const now =moment();
  let results;

  if (usrDate.isValid()){
    results=moment.duration(now.diff(usrDate));
    console.log(usrDate);
    document.getElementById("yearResults").innerHTML=results.years();
    document.getElementById("monthResults").innerHTML=results.months();
    document.getElementById("dayResults").innerHTML=results.days();
  }
  else if(day===""&& month===""&& year===""){
    let cls=document.getElementsByClassName("eMsg");
    for(let i=0; i<cls.length;i++){
      cls[i].style.display="block";
      cls[i].style.borderColor="Red";
      cls[i].innerHTML="Input is Required";
    }
  }
  else{
    let cls=document.getElementsByClassName("eMsg");
    for(let i=0; i<cls.length;i++){
      cls[i].style.display="block";
      cls[i].style.borderColor="Red";
      cls[i].innerHTML="Must Be a Valid Date";
    }
  }

});
