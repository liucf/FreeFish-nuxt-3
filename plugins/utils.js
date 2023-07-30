export default defineNuxtPlugin(() => {
  return {
    provide: {
      format: (rawtime) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // let date = new Date("2021-10-30T19:51:27.710Z");
        console.log(rawtime)
        let date = new Date(rawtime);
        console.log(date)
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();

        let AmOrPm = hh >= 12 ? 'AM' : 'AM';
        hh = (hh % 12) || 12;

        let diffInSec = Math.floor((Date.now() - date) / 1000);
        console.log(diffInSec)
        if (diffInSec < 30) {
          return 'Just Now';
        }
        if (diffInSec < 59) {
          return diffInSec + ' seconds ago';
        }
        let diffInMin = Math.floor(diffInSec / 60);
        if (diffInMin < 59) {
          return diffInMin + ' mins ago';
        }
        let diffInHour = Math.floor(diffInSec / 60 / 60);
        if (diffInHour < 24) {
          return diffInHour + ' hours ago';
        }
        let diffInDays = Math.floor(diffInSec / 60 / 60 / 24);
        if (diffInDays < 30) {
          return diffInDays + ' days ago';
        }
        return months[month] + ' ' + day + ' ' + year + ' , ' + hh + ':' + mm + ' ' + AmOrPm;
      },
      getimgpath: (imgName) => {
        const config = useRuntimeConfig();
        if (!imgName) return config.public.BASE_URL_SERVER + '/storage/default/computer.jpeg'
        return config.public.BASE_URL_SERVER + '/storage/product/' + imgName;
      }
    }
  }
})