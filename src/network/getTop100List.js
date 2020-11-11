import { request } from "@/network/request.js"

export default function getTop100List() {
  return request({
    url: "top",
  })
    // .then((res) => {
    //   this.top100List = res.data.data.list;
    //   console.log(this.top100List);
    //   this.$store.commit("sendTop100List", this.top100List);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
}